# HƯỚNG DẪN TRIỂN KHAI HỆ THỐNG (DEPLOYMENT GUIDE)
### Dự án: Sophpower Vietnam Website
### Môi trường giả định: VPS Ubuntu Server 22.04 LTS/24.04 LTS

Tài liệu này hướng dẫn chi tiết từng bước triển khai hệ thống tích hợp **Next.js (Frontend SSR)** và **Laravel (Backend API & CMS)** lên một máy chủ VPS Ubuntu sạch.

---

## 🗺️ 1. Mô hình Kiến trúc Triển khai

Hệ thống được chạy song song trên cùng một VPS:
*   **Domain chính** (`sophpower.vn`): Trỏ về Next.js SSR chạy trên cổng `3000` (được quản lý bởi PM2) thông qua Nginx Reverse Proxy.
*   **Subdomain API** (`api.sophpower.vn`): Trỏ trực tiếp về thư mục `be/public` chạy PHP-FPM thông qua cấu hình Nginx.

```plaintext
                   [ Người dùng truy cập ]
                              │
                      ( Cổng 80 / 443 )
                              │
                        ▼ [ NGINX ]
             ┌──────────────────────┴──────────────────────┐
             ▼ (Reverse Proxy)                             ▼ (FastCGI PHP-FPM)
     [ Next.js SSR ]                               [ Laravel API & CMS ]
      (Cổng: 3000)                                  (Thư mục: be/public)
           │                                               │
      (Quản lý bởi PM2)                              (PHP 8.3 + FPM)
             │                                             │
             └───────────────► [ MySQL ] ◄─────────────────┘
                               (Database)
```

---

## 🛠️ 2. Chuẩn bị Môi trường Máy chủ (Ubuntu)

Đăng nhập vào VPS với quyền `root` hoặc tài khoản có quyền `sudo`, sau đó chạy các lệnh sau:

### 2.1. Cập nhật hệ thống
```bash
sudo apt update && sudo apt upgrade -y
```

### 2.2. Cài đặt Nginx & Git
```bash
sudo apt install nginx git unzip curl -y
```

### 2.3. Cài đặt PHP 8.3 và các extension cần thiết cho Laravel
```bash
sudo apt install software-properties-common -y
sudo add-apt-repository ppa:ondrej/php -y
sudo apt update
sudo apt install php8.3-fpm php8.3-cli php8.3-mysql php8.3-xml php8.3-curl php8.3-mbstring php8.3-zip php8.3-intl php8.3-sqlite3 php8.3-bcmath -y
```

### 2.4. Cài đặt Composer
```bash
curl -sS https://getcomposer.org/installer | php
sudo mv composer.phar /usr/local/bin/composer
```

### 2.5. Cài đặt Node.js (v20.x LTS) & PM2
```bash
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs
sudo npm install --global pm2
```

### 2.6. Cài đặt MySQL Server 8.0
```bash
sudo apt install mysql-server -y
```
Cấu hình bảo mật và tạo Database:
```bash
sudo mysql_secure_installation
```
Đăng nhập vào MySQL để tạo cơ sở dữ liệu và người dùng:
```sql
sudo mysql -u root -p

-- Chạy các lệnh sau trong MySQL monitor:
CREATE DATABASE `bed_sophpower` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
CREATE USER 'sophpower_user'@'localhost' IDENTIFIED BY 'MatKhauBaoMat123@';
GRANT ALL PRIVILEGES ON `bed_sophpower`.* TO 'sophpower_user'@'localhost';
FLUSH PRIVILEGES;
EXIT;
```

---

## 📦 3. Cài đặt Mã nguồn trên VPS

Khuyến nghị clone mã nguồn vào thư mục `/var/www/sophpower`:
```bash
sudo mkdir -p /var/www/sophpower
sudo chown -R $USER:$USER /var/www/sophpower
cd /var/www/sophpower
git clone <URL_REPOSITORY_CUA_BAN> .
```

### 3.1. Triển khai Backend (Laravel)
1.  Truy cập thư mục backend:
    ```bash
    cd /var/www/sophpower/be
    ```
2.  Cài đặt thư viện Composer:
    ```bash
    composer install --no-dev --optimize-autoloader
    ```
3.  Tạo file cấu hình `.env`:
    ```bash
    cp .env.example .env
    ```
4.  Chỉnh sửa cấu hình `.env` bằng `nano .env`:
    ```ini
    APP_ENV=production
    APP_DEBUG=false
    APP_URL=https://api.sophpower.vn

    DB_CONNECTION=mysql
    DB_HOST=127.0.0.1
    DB_PORT=3306
    DB_DATABASE=bed_sophpower
    DB_USERNAME=sophpower_user
    DB_PASSWORD=MatKhauBaoMat123@

    # Cấu hình gửi Mail thông báo liên hệ
    MAIL_MAILER=smtp
    MAIL_HOST=smtp.gmail.com
    MAIL_PORT=587
    MAIL_USERNAME=your_email@gmail.com
    MAIL_PASSWORD=your_app_password
    MAIL_ENCRYPTION=tls
    MAIL_FROM_ADDRESS="no-reply@sophpower.vn"
    MAIL_FROM_NAME="Sophpower Website"
    ```
5.  Sinh App Key và chạy Migration để dựng bảng & seed dữ liệu mẫu:
    ```bash
    php artisan key:generate
    php artisan migrate --force
    php artisan db:seed --class=DatabaseSeeder --force
    ```
6.  Tạo liên kết thư mục tải lên tệp (Storage Link):
    ```bash
    php artisan storage:link
    ```
7.  Phân quyền thư mục ghi cho Web Server (Nginx):
    ```bash
    sudo chown -R www-data:www-data storage bootstrap/cache
    sudo chmod -R 775 storage bootstrap/cache
    ```

### 3.2. Cài đặt Laravel Queue Worker (Systemd)
Laravel sử dụng hàng đợi (Queue) để xử lý việc gửi email liên hệ ngầm. Hãy tạo một service chạy nền:
```bash
sudo nano /etc/systemd/system/laravel-worker.service
```
Dán nội dung sau vào:
```ini
[Unit]
Description=Laravel Queue Worker
After=network.target

[Service]
User=www-data
Group=www-data
Restart=always
ExecStart=/usr/bin/php /var/www/sophpower/be/artisan queue:work --sleep=3 --tries=3 --max-time=3600

[Install]
WantedBy=multi-user.target
```
Khởi động và bật service chạy cùng hệ thống:
```bash
sudo systemctl daemon-reload
sudo systemctl start laravel-worker.service
sudo systemctl enable laravel-worker.service
```

### 3.3. Triển khai Frontend (Next.js SSR)
1.  Truy cập thư mục frontend:
    ```bash
    cd /var/www/sophpower/web
    ```
2.  Cài đặt dependencies:
    ```bash
    npm install --omit=dev
    ```
3.  Tạo file `.env` bằng `nano .env`:
    ```ini
    NEXT_PUBLIC_API_URL=https://api.sophpower.vn/api
    NEXT_PUBLIC_SITE_URL=https://sophpower.vn
    ```
4.  Build dự án thành phiên bản tối ưu chạy độc lập (Standalone):
    ```bash
    npm run build
    ```
5.  Khởi chạy Next.js ngầm bằng **PM2**:
    ```bash
    # Chạy Next.js từ thư mục build standalone (.next/standalone/server.js)
    pm2 start .next/standalone/server.js --name "sophpower-frontend" --env PORT=3000
    
    # Lưu trạng thái PM2 để tự khởi chạy lại khi VPS restart
    pm2 save
    pm2 startup
    ```

---

## 🌐 4. Cấu hình Nginx & SSL Certbot

### 4.1. Tạo file cấu hình Nginx
```bash
sudo nano /etc/nginx/sites-available/sophpower
```
Dán cấu hình sau (thay đổi `sophpower.vn` và `api.sophpower.vn` bằng tên miền thật):
```nginx
# 1. Cấu hình Frontend Next.js (Reverse Proxy)
server {
    listen 80;
    server_name sophpower.vn www.sophpower.vn;

    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}

# 2. Cấu hình Backend Laravel API & CMS (Inertia + Static assets)
server {
    listen 80;
    server_name api.sophpower.vn;
    root /var/www/sophpower/be/public;

    index index.php;
    charset utf-8;

    # Hỗ trợ tải lên file dung lượng lớn (ảnh sản phẩm, tài liệu)
    client_max_body_size 50M;

    location / {
        try_files $uri $uri/ /index.php?$query_string;
    }

    # Phục vụ file storage upload của Laravel
    location /storage/ {
        alias /var/www/sophpower/be/storage/app/public/;
        access_log off;
        expires max;
        try_files $uri =404;
    }

    location = /favicon.ico { access_log off; log_not_found off; }
    location = /robots.txt  { access_log off; log_not_found off; }

    error_page 404 /index.php;

    location ~ \.php$ {
        fastcgi_pass unix:/var/run/php/php8.3-fpm.sock;
        fastcgi_param SCRIPT_FILENAME $realpath_root$fastcgi_script_name;
        include fastcgi_params;
    }

    location ~ /\.(?!well-known).* {
        deny all;
    }
}
```

Kích hoạt cấu hình và restart Nginx:
```bash
sudo ln -s /etc/nginx/sites-available/sophpower /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

### 4.2. Cài đặt chứng chỉ bảo mật SSL (Let's Encrypt Certbot)
```bash
sudo apt install certbot python3-certbot-nginx -y
sudo certbot --nginx -d sophpower.vn -d www.sophpower.vn -d api.sophpower.vn
```
Làm theo các bước trên màn hình để cấu hình chuyển hướng tự động HTTP sang HTTPS. Certbot sẽ tự động đăng ký cronjob tự gia hạn chứng chỉ mỗi 3 tháng.

---

## 💾 5. Quy trình Bảo trì & Sao lưu Cơ sở dữ liệu (Backup)

Để tránh mất mát dữ liệu, nên tạo cron job sao lưu database tự động hàng ngày:
1.  Tạo script sao lưu:
    ```bash
    mkdir -p ~/backups
    nano ~/backup_db.sh
    ```
2.  Dán script sau vào:
    ```bash
    #!/bin/bash
    BACKUP_DIR="$HOME/backups"
    DB_USER="sophpower_user"
    DB_PASS="MatKhauBaoMat123@"
    DB_NAME="bed_sophpower"
    DATE=$(date +%Y-%m-%d_%H%M%S)

    mysqldump -u $DB_USER -p$DB_PASS $DB_NAME > $BACKUP_DIR/db_backup_$DATE.sql
    find $BACKUP_DIR -type f -mtime +7 -name "*.sql" -exec rm {} \; # Xóa file cũ hơn 7 ngày
    ```
3.  Cấp quyền thực thi và add vào cronjob:
    ```bash
    chmod +x ~/backup_db.sh
    crontab -e
    # Thêm dòng sau để tự động chạy vào lúc 2:00 sáng mỗi ngày:
    0 2 * * * /bin/bash /home/ubuntu/backup_db.sh
    ```
