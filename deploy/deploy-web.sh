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

# npm ci cài CẢ devDependencies: bắt buộc, vì next build cần typescript,
# tailwind/postcss, eslint-config-next... (đừng dùng --omit=dev ở bước build).
echo "==> [2/5] Cài dependencies"
npm ci --no-audit --no-fund

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

echo "==> [5/5] Reload PM2"
if pm2 describe "$APP_NAME" >/dev/null 2>&1; then
  pm2 restart "$APP_NAME" --update-env
else
  pm2 start "$STANDALONE_DIR/server.js" --name "$APP_NAME" --cwd "$STANDALONE_DIR" --update-env
fi
pm2 save

echo "==> Health check http://127.0.0.1:${PORT:-3006}/"
sleep 2
curl -fsS -o /dev/null -w "   HTTP %{http_code} — %{time_total}s\n" "http://127.0.0.1:${PORT:-3006}/" \
  || echo "!! Không kết nối được Next.js, xem: pm2 logs $APP_NAME --lines 100"
