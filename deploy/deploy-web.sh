#!/usr/bin/env bash
#
# deploy/deploy-web.sh — build & reload UI Next.js trên VPS.
#
#   cd /var/www/sophchem && bash deploy/deploy-web.sh
#
# Yêu cầu: Node >= 20.9, npm, pm2, git; web/.env.production đã tạo từ
# deploy/web.env.example. Xem deploy/README.md.

set -euo pipefail

APP_DIR="${APP_DIR:-/var/www/bed-sophpower}"
WEB_DIR="$APP_DIR/web"
APP_NAME="${APP_NAME:-sophchem-fe}"

echo "==> Repo: $APP_DIR"

cd "$APP_DIR"
echo "==> [1/5] Cập nhật mã nguồn"
git pull --ff-only

cd "$WEB_DIR"

if [ ! -f .env.production ]; then
  echo "!! Thiếu web/.env.production — copy từ deploy/web.env.example rồi sửa domain thật."
  echo "   NEXT_PUBLIC_* chỉ được nhúng vào bundle lúc build, thiếu file này web sẽ"
  echo "   fallback về http://127.0.0.1:8000/api và hỏng ở production."
  exit 1
fi

# Cài CẢ devDependencies: bắt buộc, vì next build cần typescript,
# tailwind/postcss, eslint-config-next... (đừng dùng --omit=dev ở bước build).
# Repo dùng yarn.lock làm lockfile chuẩn (package-lock.json đã lệch) ->
# ưu tiên yarn, chỉ fallback npm ci khi không có yarn.lock.
echo "==> [2/5] Cài dependencies"
if [ -f yarn.lock ]; then
  yarn install --frozen-lockfile --non-interactive
else
  npm ci --no-audit --no-fund
fi

echo "==> [3/5] Build (.env.production được nhúng vào bundle tại bước này)"
npm run build

echo "==> [4/5] Chuẩn bị standalone (public + .next/static)"
# Next co the dat server.js o .next/standalone/server.js hoac .next/standalone/<app>/server.js
# (phu thuoc workspace root). Tu dong tim de khong sai duong dan.
SERVER_JS=$(find .next/standalone -maxdepth 2 -type f -name server.js | head -n 1)
if [ -z "$SERVER_JS" ]; then
  echo "!! Khong tim thay server.js trong .next/standalone — kiem tra output: standalone trong next.config.ts"
  exit 1
fi
STANDALONE_DIR=$(dirname "$SERVER_JS")
echo "   standalone: $STANDALONE_DIR"
rm -rf "$STANDALONE_DIR/public" "$STANDALONE_DIR/.next/static"
cp -r public "$STANDALONE_DIR/public"
mkdir -p "$STANDALONE_DIR/.next"
cp -r .next/static "$STANDALONE_DIR/.next/static"

APP_PORT="${PORT:-3006}"

# Next đổi được đường dẫn server.js giữa các lần build (standalone/ vs
# standalone/<app>/) => "pm2 restart" giữ path cũ sẽ chết. Luôn start lại từ
# đường dẫn vừa phát hiện, giữ nguyên tên process.
echo "==> [5/5] Start lại PM2 (port $APP_PORT)"
pm2 delete "$APP_NAME" >/dev/null 2>&1 || true
( cd "$STANDALONE_DIR" && PORT="$APP_PORT" HOSTNAME=127.0.0.1 NODE_ENV=production \
    pm2 start server.js --name "$APP_NAME" --update-env >/dev/null )
pm2 save >/dev/null 2>&1

echo "==> Health check http://127.0.0.1:${APP_PORT}/"
code=000
for i in 1 2 3 4 5 6 7 8 9 10; do
  code=$(curl -s -o /dev/null -m 5 -w '%{http_code}' "http://127.0.0.1:${APP_PORT}/" || true)
  if [ "$code" = "200" ]; then echo "   HTTP 200 (sau ${i}s)"; break; fi
  sleep 1
done
if [ "$code" != "200" ]; then
  echo "!! Không truy cập được Next.js (HTTP $code) — xem: pm2 logs $APP_NAME --lines 100"
  exit 1
fi
