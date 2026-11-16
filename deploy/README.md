# Chuyển UI Next.js từ Vercel về VPS .51 — Runbook

> Bối cảnh: website (Next.js) đang chạy trên Vercel, backend Laravel + Admin CMS đã dựng
> trên VPS `…​.51`. Mục tiêu: UI chạy trên chính VPS đó, cùng backend, tên miền vẫn giữ.
>
> Thời gian ước tính: **45–90 phút** (chưa tính thời gian DNS lan truyền ~10 phút).
> Rủi ro chính: **cấu hình DNS** và **biến `NEXT_PUBLIC_*` bị nhúng cứng lúc build**.

---

## Bộ file kèm theo

| File | Dùng để |
|---|---|
| [`be-check.sh`](be-check.sh) | Chạy trên VPS `.51` để **kiểm tra read-only** (không sửa gì): PHP-FPM, `.env`, CORS, storage, queue worker, nginx, cổng, SSL, node/pm2, HTTP thật. In ra danh sách việc còn thiếu. |
| [`nginx-sophchem.conf`](nginx-sophchem.conf) | Nginx cho 2 domain (web + api) — copy sang `/etc/nginx/sites-available/`. |
| [`ecosystem.config.js`](ecosystem.config.js) | PM2 chạy UI Next.js (port 3000, loopback). |
| [`deploy-web.sh`](deploy-web.sh) | Pull → `npm ci` → build → copy static → reload PM2. |
| [`web.env.example`](web.env.example) | Mẫu `web/.env.production`. |
| [`khach-hang/`](khach-hang/) | Tài liệu **gửi khách hàng** để trỏ tên miền (`.md`; `make_customer_guide.py` xuất lại `.docx` khi cần). |

Chạy `be-check.sh` từ máy bạn:

```bash
scp deploy/be-check.sh root@<IP_VPS>:/tmp/
ssh root@<IP_VPS> 'bash /tmp/be-check.sh'
```

---

## 0. Tóm tắt: phải đổi những gì

| Lớp | Hiện tại (Vercel) | Sau khi chuyển về VPS |
|---|---|---|
| **Biến môi trường web** | Environment Variables trên Vercel | `web/.env.production` — **phải build lại** thì mới có hiệu lực |
| **Tiến trình web** | Vercel Serverless/Edge | PM2 chạy `.next/standalone/server.js` ở `127.0.0.1:3000` |
| **Web server / SSL** | Vercel tự lo | Nginx reverse proxy + certbot (Let's Encrypt) |
| **DNS** | `@` → `216.198.79.1`, `www` → `vercel-dns-017.com` | `@`, `www` → IP VPS; thêm `api` → IP VPS. **Giữ nguyên MX / SPF / mail CNAME của Aliyun** |
| **Backend `.env`** | không có yêu cầu gì thêm | `APP_ENV/APP_DEBUG/APP_URL`, `CORS_ALLOWED_ORIGINS`, `SANCTUM_STATEFUL_DOMAINS`, `SESSION_SECURE_COOKIE` + `config:cache` |
| **CORS** | có thể đang thiếu hẳn | thêm `be/config/cors.php` (đã có trong repo) |
| **Vercel** | nơi chạy chính | giữ 1–2 ngày làm bản dự phòng rồi gỡ domain |

**Không cần đụng tới:** database, migrations, code admin CMS (Laravel Inertia), các route API.

---

## 1. Điền thông tin trước khi làm

| Placeholder | Ý nghĩa | Ví dụ |
|---|---|---|
| `__DOMAIN__` | tên miền chính, **không** kèm `www` | `sophchem.com` |
| `__API_DOMAIN__` | subdomain API | `api.sophchem.com` |
| `__APP_DIR__` | thư mục repo trên VPS | `/var/www/sophchem` |
| `__VPS_IP__` | IP công khai của VPS `.51` | `103.x.x.51` |

Điền vào file nginx (file này sẽ được copy sang `/etc/nginx`, không sửa trực tiếp trong repo):

```bash
cd __APP_DIR__
sed 's#__DOMAIN__#sophchem.com#g; s#__API_DOMAIN__#api.sophchem.com#g; s#__APP_DIR__#/var/www/sophchem#g' \
    deploy/nginx-sophchem.conf | sudo tee /etc/nginx/sites-available/sophchem >/dev/null
```

`deploy/ecosystem.config.js` **không cần sửa** — nó tự suy ra đường dẫn từ vị trí file.

---

## 2. Kiến trúc đích

```
                    Internet (80/443)
                            │
                    ┌───────▼────────┐
                    │     NGINX      │
                    └───┬────────┬───┘
      __DOMAIN__ / www  │        │  __API_DOMAIN__
                        ▼        ▼
              Next.js :3000   Laravel be/public
              (PM2, loopback) (PHP-FPM 8.3)
                        │        │
                        └──► MySQL ◄──┘
```

- UI gọi API qua `https://__API_DOMAIN__/api` (cross-origin → **cần CORS**).
- Admin CMS là `https://__API_DOMAIN__/admin` (same-origin với API → không cần CORS/cookie đặc biệt).
- Ảnh upload: `https://__API_DOMAIN__/storage/...` (do `php artisan storage:link`).

---

## 3. Thứ tự thực hiện (quan trọng)

> Certbot xác thực qua HTTP-01 nên **DNS phải trỏ về VPS trước khi xin cert**.
> Vì vậy: làm xong `api` (không ảnh hưởng site đang chạy) → build & test web qua IP →
> mới đổi `@`/`www` → xin cert tên miền chính.

### Bước 0 — Kiểm tra môi trường VPS

```bash
node -v                 # cần >= 20.9 (Next 16.1 yêu cầu)
pm2 -v                  # pm2 chưa có: sudo npm i -g pm2
nginx -v
php -v                  # 8.3
systemctl is-active php8.3-fpm nginx
ss -lntp | grep -E ':(3000|8000|80|443)\b'
curl -s -o /dev/null -w '%{http_code}\n' http://127.0.0.1:8000/api/settings
```

Nếu `__APP_DIR__` chưa có mã nguồn:

```bash
sudo mkdir -p /var/www
sudo git clone <REPO_URL> /var/www/sophchem
sudo chown -R "$USER":"$USER" /var/www/sophchem
```

Xác định backend đang chạy kiểu gì:
- **`php-fpm` + nginx vhost** → bỏ qua, chỉ cần thêm block API trong file nginx ở bước 2.
- **`php artisan serve --host=0.0.0.0 --port=8000`** → vẫn dùng file nginx ở bước 2 (nó trỏ
  thẳng `fastcgi_pass` tới `php8.3-fpm.sock`), sau khi nginx phục vụ được thì **tắt `artisan
  serve`** và **đóng cổng 8000 ra ngoài** (xem bước 9).

### Bước 1 — Tạo DNS cho `__API_DOMAIN__` (an toàn, chưa ảnh hưởng site)

Trong Aliyun DNS, thêm:

| Loại | Tên | Giá trị | TTL |
|---|---|---|---|
| A | `api` | `__VPS_IP__` | 600 |

```bash
dig +short __API_DOMAIN__     # phải ra đúng IP VPS
```

### Bước 2 — Nginx cho API + SSL

```bash
sudo ln -sf /etc/nginx/sites-available/sophchem /etc/nginx/sites-enabled/sophchem
sudo nginx -t && sudo systemctl reload nginx
sudo apt install -y certbot python3-certbot-nginx
sudo certbot --nginx -d __API_DOMAIN__ --redirect
```

Kiểm tra:

```bash
curl -s https://__API_DOMAIN__/api/settings | head -c 200; echo
curl -sI https://__API_DOMAIN__/admin/login | head -3
```

### Bước 3 — Cấu hình backend cho production

```bash
cd __APP_DIR__/be
cp .env .env.bak.$(date +%F-%H%M)
nano .env
```

Các dòng cần đúng:

```ini
APP_ENV=production
APP_DEBUG=false
APP_URL=https://api.sophchem.com
LOG_LEVEL=error

# origin được phép gọi API từ trình duyệt (domain site, KHÔNG có "/" cuối)
CORS_ALLOWED_ORIGINS=https://sophchem.com,https://www.sophchem.com

# admin CMS cookie/session
SANCTUM_STATEFUL_DOMAINS=api.sophchem.com
SESSION_SECURE_COOKIE=true
```

> `be/config/cors.php` mới được thêm vào repo (trước đó **không hề có** file này →
> Laravel không trả về header CORS nào → form liên hệ gọi từ domain khác sẽ bị trình duyệt chặn).
> Nếu BE trên VPS chưa có file này, copy lên rồi chạy lại config cache.

```bash
php artisan migrate --force          # nếu chưa migrate
php artisan storage:link             # public/storage -> storage/app/public
php artisan optimize                 # config + route + view cache
sudo chown -R www-data:www-data storage bootstrap/cache
sudo chmod -R 775 storage bootstrap/cache
```

Kiểm tra CORS thật sự có header:

```bash
curl -sSI -H 'Origin: https://sophchem.com' https://api.sophchem.com/api/settings \
  | grep -i 'access-control-allow-origin'
# phải thấy: access-control-allow-origin: https://sophchem.com
```

> Ghi nhớ: **sửa `.env` xong phải `php artisan config:clear && php artisan optimize`**,
> vì khi `APP_ENV=production` Laravel đọc config từ cache.

### Bước 4 — Build & chạy UI trên VPS

```bash
cd __APP_DIR__/web
cp ../deploy/web.env.example .env.production
nano .env.production
```

```ini
NEXT_PUBLIC_API_URL=https://api.sophchem.com/api
NEXT_PUBLIC_SITE_URL=https://www.sophchem.com
```

```bash
cd __APP_DIR__
bash deploy/deploy-web.sh
```

Script sẽ: `git pull` → `npm ci` → `npm run build` → copy `public/` + `.next/static/`
vào `.next/standalone/` → `pm2 reload/start` → health check.

Kiểm tra (chưa cần DNS):

```bash
curl -s http://127.0.0.1:3000/ | grep -o '<title>[^<]*'      # phải là title thật, không phải trang lỗi
curl -s -o /dev/null -w '%{http_code}\n' http://127.0.0.1:3000/nguyen-lieu-thuc-pham
pm2 logs sophchem-web --lines 50 --nostream
```

Nếu trang trắng/500 → 90% là do `.env.production` sai hoặc build cũ: xem mục 5.

### Bước 5 — Thêm block nginx cho `__DOMAIN__` (chưa có SSL) và test "như thật"

Nginx đã được symlink ở bước 2 (file chứa cả 2 server block) → chỉ cần reload:

```bash
sudo nginx -t && sudo systemctl reload nginx
```

Test bằng hosts file trên máy bạn (site thật vẫn đang ở Vercel):

```bash
sudo sh -c 'echo "__VPS_IP__ www.sophchem.com sophchem.com" >> /etc/hosts'
curl -sI http://www.sophchem.com/ | head -3
```

Mở trình duyệt `http://www.sophchem.com` để test form liên hệ: devtools → Network →
request `POST https://api.sophchem.com/api/contact` phải **không** bị CORS/mixed-content.
Xong thì xoá dòng đã thêm trong `/etc/hosts`.

### Bước 6 — Đổi DNS tên miền chính (Aliyun)

Sửa **đúng 2 bản ghi**, các bản ghi khác giữ nguyên (xem mục 4):

| Loại | Tên | Từ | Thành |
|---|---|---|---|
| A | `@` | `216.198.79.1` (Vercel) | `__VPS_IP__` |
| CNAME | `www` | `vercel-dns-017.com` | `@` (hoặc A → `__VPS_IP__`) |

```bash
dig +short sophchem.com
dig +short www.sophchem.com
```

### Bước 7 — Xin SSL cho tên miền chính

```bash
sudo certbot --nginx -d sophchem.com -d www.sophchem.com --redirect
```

> Từ lúc đổi DNS đến lúc certbot xong (~1–2 phút) HTTPS tên miền chính sẽ báo lỗi cert.
> Nếu cần **zero-downtime**: xin cert trước bằng DNS-01 (`certbot-dns-aliyun` + RAM user
> AccessKey của Aliyun), rồi mới đổi DNS.
>
> Chọn 1 domain canonical (www hoặc non-www) và bật redirect trong file nginx (phần
> comment `if ($host != ...)`), đồng thời đặt `NEXT_PUBLIC_SITE_URL` đúng theo domain đó.

### Bước 8 — Verify

```bash
# 1. Trang chủ + HTTP -> HTTPS
curl -sSI http://sophchem.com | head -3                    # 301 -> https
curl -sSI https://www.sophchem.com | head -5               # 200, có HSTS (certbot thêm)

# 2. API & ảnh
curl -s https://api.sophchem.com/api/settings | head -c 120; echo
curl -sI https://api.sophchem.com/storage/products/<file>.jpg | head -3

# 3. SEO phải trỏ domain mới, không còn vercel.app / domain cũ
curl -s https://www.sophchem.com/robots.txt | grep -i sitemap
curl -s https://www.sophchem.com/sitemap.xml | head -c 300
curl -s https://www.sophchem.com/ | grep -o 'canonical[^>]*'

# 4. CORS
curl -sSI -H 'Origin: https://www.sophchem.com' https://api.sophchem.com/api/settings \
  | grep -i access-control-allow-origin
```

Checklist trên trình duyệt:

- [ ] Trang chủ, danh mục, chi tiết sản phẩm, tin tức, tuyển dụng, liên hệ đều render dữ liệu thật
- [ ] Ảnh sản phẩm/banner load được (không 404, không `localhost`)
- [ ] Form liên hệ gửi thành công (Network: 201) **và** lead hiện trong admin
- [ ] `https://api.sophchem.com/admin` đăng nhập được, upload ảnh được
- [ ] `www` và non-www chỉ còn 1 domain canonical (cái còn lại 301)
- [ ] `http://` tự nhảy `https://`
- [ ] Không còn request nào tới `vercel`/IP VPS trong devtools

### Bước 9 — Dọn Vercel & đóng cổng

```bash
# firewall
sudo ufw allow 80,443/tcp
sudo ufw allow 22/tcp
sudo ufw enable
# KHÔNG mở 3000 (Next) và 8000 (artisan serve) ra ngoài
ss -lntp | grep -E ':(3000|8000)\b'   # phải là 127.0.0.1:3000, không phải 0.0.0.0:8000
```

Vercel: giữ project 1–2 ngày (rollback = trỏ DNS về `216.198.79.1` + `vercel-dns-017.com`),
sau đó Remove domain khỏi project và xoá các bản ghi `_vercel` (nếu có).

---

## 4. Bảng DNS theo ảnh chụp

| Bản ghi trong ảnh | Xử lý |
|---|---|
| `www` CNAME → `vercel-dns-017.com` | **Đổi** → `@` (hoặc A → IP VPS) |
| `@` A → `216.198.79.1` | **Đổi** → IP VPS |
| `api` A | **Thêm mới** → IP VPS |
| `mail`, `smtp`, `imap`, `pop3` CNAME → `*.qiye.aliyun.com` | **GIỮ NGUYÊN** — đây là mail doanh nghiệp Aliyun |
| `@` TXT `v=spf1 include:spf.qiye.aliyun.com -all` | **GIỮ NGUYÊN** |
| `@` MX `mx1/mx2/mx3.qiye.aliyun.com` (5/10/15) | **GIỮ NGUYÊN** |

⚠️ Đừng đổi nameserver, đừng xoá các record `mail/smtp/imap/pop3/MX/SPF` — nếu không
toàn bộ email của khách sẽ chết dù web vẫn chạy.

Kiểm tra mail còn sống sau khi đổi DNS:

```bash
dig +short MX sophchem.com
dig +short TXT sophchem.com
```

---

## 5. Những điểm dễ sai trong repo này

1. **`NEXT_PUBLIC_*` bị nhúng cứng lúc build** (`web/src/lib/api.ts:2`).
   Thiếu `web/.env.production` → fallback `http://127.0.0.1:8000/api` → production hỏng
   (SSR 500 + trình duyệt gọi localhost). Sửa `.env` **phải build lại**, `pm2 restart` không đủ.
2. **Không được `npm install --omit=dev` rồi build** (DEPLOYMENT.md dòng 187 đang ghi vậy).
   `next build` cần `typescript`, `@tailwindcss/postcss`, `eslint-config-next`… → dùng `npm ci`.
3. **Standalone phải copy `public/` + `.next/static/`**. Chỉ chạy `node .next/standalone/server.js`
   sẽ ra trang không CSS/JS và ảnh 404 (`deploy/deploy-web.sh` đã làm, Dockerfile cũng copy).
   Đường dẫn `server.js` đã được cố định bằng `outputFileTracingRoot` trong `web/next.config.ts`:
   trước đó Next suy ra root là gốc monorepo (vì có lockfile ở root) và sinh ra
   `.next/standalone/web/server.js` → `pm2 start .next/standalone/server.js` báo `MODULE_NOT_FOUND`.
4. **Thiếu `be/config/cors.php`** → không có header CORS (đã thêm vào repo). Nhớ set
   `CORS_ALLOWED_ORIGINS` + `php artisan optimize`.
5. **Mixed content**: nếu `NEXT_PUBLIC_API_URL` là `http://…` mà site là `https://` →
   trình duyệt chặn form/ảnh. Luôn dùng `https://` cho API.
6. **`api.getImageUrl()`** (`web/src/lib/api.ts:185`) lấy `API_BASE_URL` bỏ hậu tố `/api` →
   ảnh phải truy cập được ở `https://__API_DOMAIN__/storage/...` (cần `storage:link` +
   quyền `www-data` + block `/storage/` trong nginx).
7. **`NEXT_PUBLIC_SITE_URL` sai** → `canonical`, OG image, `sitemap.xml`, `robots.txt` trỏ
   domain Vercel cũ → mất SEO. Kiểm tra lại ở bước 8.
8. **`web/src/middleware.ts` gọi `/api/redirects` ở MỌI request** → TTFB tăng gấp đôi,
   và nếu API chậm thì cả site chậm theo. Trên VPS nên cache ~60s (hoặc bỏ hẳn nếu CMS
   ít dùng redirect) — xem ghi chú cuối file.
9. **`web/src/app/admin/page.tsx`** từng hard-code `http://localhost:8000/admin` (đã sửa
   thành suy ra từ `NEXT_PUBLIC_API_URL`).
10. **`APP_DEBUG=true` + `APP_ENV=local`** trong `be/.env` hiện tại → lộ stack trace và
    `URL::forceScheme('https')` không chạy (`be/app/Providers/AppServiceProvider.php:25`).
11. **Email thông báo**: `NewLeadReceived implements ShouldQueue` + `QUEUE_CONNECTION=database`
    → cần **queue worker** (`systemd laravel-worker`, DEPLOYMENT.md §3.2), nếu không mail
    không bao giờ gửi. Và `MAIL_MAILER=log` trong `.env` hiện tại nghĩa là **chưa gửi mail thật**
    — phải cấu hình SMTP trước khi bàn giao.
12. **`pm2 save` + `pm2 startup`** để web tự chạy lại sau reboot (script đã `pm2 save`).
13. **Nếu deploy bằng Docker/CapRover** (`.github/workflows/deploy.yml`): `NEXT_PUBLIC_*`
    phải truyền bằng `--build-arg`, không phải biến runtime. `web/Dockerfile` đã thêm `ARG`.

---

## 6. Vận hành sau khi chuyển

```bash
# deploy bản mới
cd __APP_DIR__ && bash deploy/deploy-web.sh

# log / trạng thái
pm2 status
pm2 logs sophchem-web --lines 100
sudo tail -f /var/log/nginx/error.log

# SSL tự gia hạn (certbot cài sẵn timer)
systemctl list-timers | grep certbot
sudo certbot renew --dry-run

# backup DB hằng ngày (DEPLOYMENT.md §5)
```

---

## 7. Phương án B — một domain duy nhất, không cần CORS (tuỳ chọn)

Nếu không muốn tạo `api.__DOMAIN__` (thêm 1 DNS + 1 cert + cấu hình CORS), có thể proxy
ngay trên domain chính:

```nginx
location /api/      { try_files $uri $uri/ /index.php?$query_string; }
location /storage/  { try_files $uri =404; }
location /admin/    { try_files $uri $uri/ /index.php?$query_string; }
```

Khi đó `NEXT_PUBLIC_API_URL=https://__DOMAIN__/api`, ảnh ở `https://__DOMAIN__/storage/...`,
trình duyệt coi tất cả là same-origin → **không cần CORS**, chỉ cần 1 cert.

Đánh đổi: mọi request `/api`, `/admin`, `/storage` phải đứng trước `location /` (proxy Next.js),
dễ nhầm thứ tự; và Next.js và Laravel dùng chung hostname nên log/khó tách. Với dự án này
cấu hình 2 subdomain (mục 1–3) rõ ràng hơn nên được khuyến nghị.

---

## Phụ lục — Trạng thái triển khai thực tế (16/11/2026)

Khác với kế hoạch ban đầu (`api.<domain>` riêng), hệ thống đang chạy **same-origin** — không cần
subdomain API, không cần CORS:

| Thành phần | Thực tế |
|---|---|
| https://sophchem.com | Next.js, PM2 process `sophchem-fe`, `127.0.0.1:3006` |
| SSL | Let's Encrypt (`sophchem.com` + `www`), HTTP → HTTPS 301, tự gia hạn |
| API | `https://sophchem.com/api` → Laravel `be/public` qua `php8.3-fpm` (cùng vhost) |
| Ảnh upload | `https://sophchem.com/storage/...` (cùng vhost) |
| `NEXT_PUBLIC_API_URL` | `https://sophchem.com/api` (nhúng lúc build) |
| Dữ liệu | Seed mẫu: 14 sản phẩm, 7 danh mục, 4 bài viết, 2 banner, 1 admin |

Vì sao đổi: bản build cũ trỏ `https://api-sophpower.betech-digital.com/api`, nhưng bản ghi DNS
này không còn → web mất toàn bộ dữ liệu. Chuyển API về cùng domain nên **khách không phải thêm
bản ghi nào**, và bỏ được phụ thuộc domain của agency.

### CMS `/admin`

Hiện CMS chỉ phục vụ trên host `api-sophpower.betech-digital.com` (đang không có DNS). Muốn dùng
ngay tại `https://sophchem.com/admin`, thêm vào server block 443 của `/etc/nginx/sites-available/sophchem.com.conf`:

```nginx
    location ^~ /admin {
        root /var/www/bed-sophpower/be/public;
        try_files $uri $uri/ /index.php?$query_string;
    }

    location ^~ /build/ {
        root /var/www/bed-sophpower/be/public;
        expires 30d;
        access_log off;
        try_files $uri =404;
    }
```

rồi `nginx -t && systemctl reload nginx`. Tài khoản admin tạo bởi seeder: `admin@sophpower.com` —
**đổi mật khẩu ngay** sau khi đăng nhập.

### Rollback

```bash
# bản build trước khi deploy (16/11/2026)
cd /var/www/bed-sophpower/web && rm -rf .next && mv .next.bak-20261116_1035 .next && pm2 restart sophchem-fe
# nginx
cp /root/sophchem.com.conf.bak.* /etc/nginx/sites-available/sophchem.com.conf && nginx -t && systemctl reload nginx
```
