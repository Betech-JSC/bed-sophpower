#!/usr/bin/env bash
#
# deploy/be-check.sh — Kiểm tra READ-ONLY trạng thái backend trên VPS .51.
# Script này KHÔNG sửa gì trên hệ thống: chỉ đọc file, chạy lệnh xem thông tin.
#
# Cách chạy (từ máy bạn):
#   scp deploy/be-check.sh root@<IP_VPS>:/tmp/
#   ssh root@<IP_VPS> 'bash /tmp/be-check.sh'
#
# Hoặc trên VPS (nếu repo đã clone):
#   bash /var/www/sophchem/deploy/be-check.sh
#
# Nếu Laravel không nằm trong các thư mục mặc định:
#   APP_DIR=/duong/dan/be bash /tmp/be-check.sh
#
# Không có quyền root vẫn chạy được, chỉ thiếu vài mục (nginx -T, ufw, systemctl).

set -u

APP_DIR="${APP_DIR:-}"
HOSTHDR=""
ISSUES=()

c_ok=$'\033[32m✔\033[0m'
c_warn=$'\033[33m!\033[0m'
c_bad=$'\033[31m✘\033[0m'
c_hdr=$'\033[1m'

hdr() { printf '\n%s== %s%s\n' "$c_hdr" "$*" $'\033[0m'; }
ok() { printf '  %s %s\n' "$c_ok" "$*"; }
note() { printf '  %s %s\n' "$c_warn" "$*"; }
warn() { printf '  %s %s\n' "$c_warn" "$*"; ISSUES+=("$*"); }
bad() { printf '  %s %s\n' "$c_bad" "$*"; ISSUES+=("$*"); }
have() { command -v "$1" >/dev/null 2>&1; }

# ---------------------------------------------------------------------------
hdr "0. Môi trường"
# ---------------------------------------------------------------------------
if [ "$(id -u)" -eq 0 ]; then ok "Đang chạy bằng root"; else note "Không phải root — một số mục sẽ bị hạn chế (không tính là lỗi)"; fi
uname -srm 2>/dev/null || true
have free && free -h | sed -n '1,2p'
df -h / 2>/dev/null | tail -1
echo "  Giờ máy chủ: $(date '+%F %T %Z')"

# ---------------------------------------------------------------------------
hdr "1. Mã nguồn Laravel"
# ---------------------------------------------------------------------------
if [ -z "$APP_DIR" ]; then
  if [ -f "$PWD/artisan" ]; then
    APP_DIR="$PWD"
  else
    for base in /var/www /www/wwwroot /home /opt /srv; do
      [ -d "$base" ] || continue
      found=$(find "$base" -maxdepth 5 -type f -name artisan 2>/dev/null | head -n 1)
      if [ -n "$found" ]; then APP_DIR=$(dirname "$found"); break; fi
    done
  fi
fi

if [ -n "$APP_DIR" ] && [ -f "$APP_DIR/artisan" ]; then
  ok "Laravel: $APP_DIR"
  if have php; then
    echo "  $(cd "$APP_DIR" && php artisan --version 2>&1 | head -1)"
  fi
else
  bad "Không tìm thấy Laravel (artisan). Chạy lại với: APP_DIR=/duong/dan/be bash $0"
  APP_DIR=""
fi

if [ -n "$APP_DIR" ]; then
  echo "  Quyền thư mục:"
  ls -ld "$APP_DIR" "$APP_DIR/public" "$APP_DIR/storage" "$APP_DIR/bootstrap/cache" 2>/dev/null | sed 's/^/    /'
  if id www-data >/dev/null 2>&1; then
    own=$(stat -c '%U' "$APP_DIR/storage" 2>/dev/null || echo '?')
    if [ "$own" = "www-data" ]; then ok "storage thuộc www-data"; else warn "storage thuộc '$own' (nên là www-data)"; fi
  fi
  if [ -L "$APP_DIR/public/storage" ]; then
    ok "public/storage symlink: $(readlink -f "$APP_DIR/public/storage" 2>/dev/null)"
  else
    warn "Chưa có public/storage — ảnh upload sẽ 404. Cần: php artisan storage:link"
  fi
  if [ -f "$APP_DIR/bootstrap/cache/config.php" ]; then
    warn "CONFIG ĐANG CACHE — sửa .env xong phải chạy: php artisan config:clear && php artisan optimize"
  else
    ok "Chưa cache config (sửa .env có hiệu lực ngay)"
  fi
fi

# ---------------------------------------------------------------------------
hdr "2. PHP & PHP-FPM"
# ---------------------------------------------------------------------------
if have php; then
  php -v | head -1 | sed 's/^/  /'
  missing=""
  for ext in mbstring pdo_mysql intl xml curl zip bcmath; do
    php -m 2>/dev/null | grep -qix "$ext" || missing="$missing $ext"
  done
  if [ -n "$missing" ]; then bad "Thiếu PHP extension:$missing"; else ok "Đủ extension Laravel cơ bản"; fi
else
  bad "Không có lệnh php trong PATH"
fi

fpm_active=""
for v in 8.4 8.3 8.2 8.1; do
  if have systemctl && systemctl is-active --quiet "php$v-fpm" 2>/dev/null; then fpm_active="php$v-fpm"; break; fi
done
if [ -n "$fpm_active" ]; then ok "FPM đang chạy: $fpm_active"; else warn "Không thấy php*-fpm active (có thể BE đang chạy bằng artisan serve)"; fi
ls /run/php/*.sock 2>/dev/null | sed 's/^/  socket: /' || warn "Không thấy socket /run/php/*.sock"

# ---------------------------------------------------------------------------
hdr "3. Cấu hình .env (chỉ in các key không nhạy cảm)"
# ---------------------------------------------------------------------------
if [ -n "$APP_DIR" ] && [ -f "$APP_DIR/.env" ]; then
  for k in APP_ENV APP_DEBUG APP_URL DB_CONNECTION DB_HOST DB_DATABASE DB_PORT \
           SESSION_DRIVER SESSION_SECURE_COOKIE SESSION_DOMAIN \
           SANCTUM_STATEFUL_DOMAINS CORS_ALLOWED_ORIGINS \
           MAIL_MAILER MAIL_HOST MAIL_FROM_ADDRESS QUEUE_CONNECTION; do
    line=$(grep -E "^${k}=" "$APP_DIR/.env" 2>/dev/null | head -1)
    if [ -n "$line" ]; then printf '  %s\n' "$line"; else printf '  %s (chưa khai báo)\n' "$k"; fi
  done

  env_of() { grep -E "^$1=" "$APP_DIR/.env" 2>/dev/null | head -1 | cut -d= -f2-; }

  [ "$(env_of APP_ENV)" = "production" ] || warn "APP_ENV chưa phải production → URL::forceScheme(https) không chạy, route cache không bật"
  case "$(env_of APP_DEBUG)" in false|False|FALSE) ok "APP_DEBUG=false";; *) bad "APP_DEBUG đang bật → lộ stack trace/DB khi có lỗi";; esac
  case "$(env_of APP_URL)" in https://*) ok "APP_URL https";; *) warn "APP_URL chưa phải https (giá trị: $(env_of APP_URL))";; esac
  [ -n "$(env_of CORS_ALLOWED_ORIGINS)" ] || warn "CORS_ALLOWED_ORIGINS trống → API không trả header CORS, form liên hệ từ domain khác sẽ bị chặn"
  case "$(env_of MAIL_MAILER)" in log|array) warn "MAIL_MAILER=$(env_of MAIL_MAILER) → email KHÔNG được gửi thật";; esac
  [ -n "$(env_of DB_PASSWORD)" ] && ok "Đã có DB_PASSWORD" || warn "DB_PASSWORD trống?"
else
  warn "Không đọc được .env"
fi

# ---------------------------------------------------------------------------
hdr "4. Database"
# ---------------------------------------------------------------------------
if [ -n "$APP_DIR" ] && have php; then
  out=$(cd "$APP_DIR" && php artisan migrate:status 2>&1 | tail -6)
  echo "$out" | sed 's/^/  /'
  echo "$out" | grep -qi "error\|exception\|could not" && bad "Kết nối DB lỗi — xem log: storage/logs/laravel.log"
fi

# ---------------------------------------------------------------------------
hdr "5. Queue worker (email thông báo form liên hệ)"
# ---------------------------------------------------------------------------
if have systemctl; then
  systemctl list-units --all --type=service --no-pager --no-legend 2>/dev/null \
    | grep -iE 'queue|laravel' | sed 's/^/  /' || true
fi
workers=$(ps -ef 2>/dev/null | grep -c '[q]ueue:work')
if [ "$workers" -gt 0 ]; then ok "Có $workers tiến trình queue:work"; else warn "Không có queue:work → notification NewLeadReceived (ShouldQueue) sẽ nằm im trong bảng jobs"; fi

# ---------------------------------------------------------------------------
hdr "6. Nginx"
# ---------------------------------------------------------------------------
if have nginx; then
  nginx -v 2>&1 | sed 's/^/  /'
  if nginx -t >/dev/null 2>&1; then ok "nginx -t OK"; else bad "nginx -t LỖI:"; nginx -t 2>&1 | sed 's/^/    /'; fi
  echo "  site đang bật:"
  ls -1 /etc/nginx/sites-enabled/ 2>/dev/null | sed 's/^/    /' || true
  echo "  server_name / root / fastcgi / proxy:"
  grep -RhE '^[[:space:]]*(server_name|root|fastcgi_pass|proxy_pass|listen)[[:space:]]' \
    /etc/nginx/sites-enabled/ /etc/nginx/conf.d/ 2>/dev/null | sed 's/^[[:space:]]*/    /' | sort -u | head -40
  HOSTHDR=$(grep -RhE '^[[:space:]]*server_name[[:space:]]' /etc/nginx/sites-enabled/ 2>/dev/null \
    | head -1 | awk '{print $2}' | tr -d ';')
else
  warn "Không có nginx"
fi

# ---------------------------------------------------------------------------
hdr "7. Cổng đang mở & firewall"
# ---------------------------------------------------------------------------
if have ss; then
  ss -lntp 2>/dev/null | grep -E ':(80|443|3000|8000|3306)[[:space:]]' | sed 's/^/  /' || echo "  (không thấy cổng 80/443/3000/8000/3306)"
else
  warn "Không có lệnh ss (thiếu iproute2)"
fi
if have ufw; then
  ufw status 2>/dev/null | sed -n '1,12p' | sed 's/^/  ufw: /'
else
  echo "  ufw: chưa cài (kiểm tra firewall ở panel nhà cung cấp VPS)"
fi

# ---------------------------------------------------------------------------
hdr "8. SSL hiện có"
# ---------------------------------------------------------------------------
if have certbot; then
  certbot certificates 2>/dev/null | grep -E 'Certificate Name|Domains|Expiry' | sed 's/^/  /' || echo "  (chưa có cert nào)"
else
  warn "Chưa cài certbot → chưa thể phát hành HTTPS"
fi

# ---------------------------------------------------------------------------
hdr "9. Node.js & PM2 (để chạy UI Next.js)"
# ---------------------------------------------------------------------------
if have node; then
  v=$(node -v); echo "  node $v"
  case "$v" in
    v1[6-9]*|v[2-9][0-9]*) ok "Node đủ mới (Next 16 cần >= 20.9)";;
    *) bad "Node $v quá cũ — Next 16.1 cần >= 20.9";;
  esac
else
  warn "Chưa có node (cần cho UI Next.js)"
fi
if have pm2; then ok "pm2 $(pm2 -v 2>/dev/null)"; pm2 list 2>/dev/null | sed -n '1,12p' | sed 's/^/  /'; else warn "Chưa có pm2 (npm i -g pm2)"; fi

# ---------------------------------------------------------------------------
hdr "10. Kiểm tra HTTP thực tế"
# ---------------------------------------------------------------------------
probe() { # $1=url, $2=label, $3=host header (tuỳ chọn)
  local url="$1" label="$2" host="${3:-}" code
  if [ -n "$host" ]; then
    code=$(curl -s -o /dev/null -m 10 -w '%{http_code}' -H "Host: $host" "$url" 2>/dev/null)
  else
    code=$(curl -s -o /dev/null -m 10 -w '%{http_code}' "$url" 2>/dev/null)
  fi
  case "$code" in
    200|201|302|301) ok "$label → HTTP $code";;
    000|"") bad "$label → không kết nối được ($url)";;
    *) warn "$label → HTTP $code ($url)";;
  esac
}

if [ -n "${HOSTHDR}" ]; then
  probe "http://127.0.0.1/api/settings" "API qua nginx (Host: $HOSTHDR)" "$HOSTHDR"
  probe "http://127.0.0.1/admin/login" "Admin CMS qua nginx (Host: $HOSTHDR)" "$HOSTHDR"
  cors=$(curl -sI -m 10 -H "Host: $HOSTHDR" -H 'Origin: https://example.com' http://127.0.0.1/api/settings 2>/dev/null | grep -i '^access-control-allow-origin')
  if [ -n "$cors" ]; then ok "CORS: ${cors%$'\r'}"; else warn "Không có header Access-Control-Allow-Origin → UI ở domain khác sẽ bị trình duyệt chặn"; fi
fi
probe "http://127.0.0.1:8000/api/settings" "API qua artisan serve (nếu có :8000)"
probe "http://127.0.0.1:3000/" "Next.js :3000 (nếu đã chạy)"

# ---------------------------------------------------------------------------
hdr "TỔNG KẾT"
# ---------------------------------------------------------------------------
if [ "${#ISSUES[@]}" -eq 0 ]; then
  ok "Không phát hiện vấn đề. Sẵn sàng build UI và trỏ DNS."
else
  echo "  ${#ISSUES[@]} mục cần xử lý:"
  i=1
  for it in "${ISSUES[@]}"; do printf '   %2d. %s\n' "$i" "$it"; i=$((i+1)); done
fi
echo
echo "  Gợi ý bước tiếp theo: deploy/README.md (mục 3 — Thứ tự thực hiện)"
