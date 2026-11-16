#!/usr/bin/env bash
#
# deploy/restore-db.sh — Nạp lại DB từ file dump cũ (dữ liệu CMS gốc).
#
#   bash deploy/restore-db.sh /root/sophchem-old-2026-11-12.sql.gz
#   bash deploy/restore-db.sh ./backup.sql            # file .sql chưa nén cũng được
#
# Script sẽ:
#   1. Backup DB hiện tại (không mất gì) -> /root/backups/sophchem/pre-restore-<ts>.sql.gz
#   2. Import dump (dump chuẩn mysqldump có DROP TABLE IF EXISTS nên ghi đè bảng cũ)
#   3. Clear cache Laravel + phân quyền storage
#   4. In số dòng các bảng chính để kiểm tra
#
# Chạy trên VPS .51 (đường dẫn mặc định đúng với server hiện tại).

set -euo pipefail

APP_DIR="${APP_DIR:-/var/www/bed-sophpower}"
BE_DIR="$APP_DIR/be"
DUMP="${1:-}"

[ -n "$DUMP" ] || { echo "Dùng: bash deploy/restore-db.sh <file-dump.sql|.sql.gz>"; exit 1; }
[ -f "$DUMP" ] || { echo "Không thấy file: $DUMP"; exit 1; }

ENV_FILE="$BE_DIR/.env"
U=$(grep '^DB_USERNAME=' "$ENV_FILE" | cut -d= -f2)
P=$(grep '^DB_PASSWORD=' "$ENV_FILE" | cut -d= -f2)
D=$(grep '^DB_DATABASE=' "$ENV_FILE" | cut -d= -f2)

BK_DIR=/root/backups/sophchem
mkdir -p "$BK_DIR"
BK="$BK_DIR/pre-restore-$(date +%Y-%m-%d_%H%M%S).sql.gz"

echo "==> [1/4] Backup DB hiện tại ($D)"
mysqldump --no-tablespaces --single-transaction --quick --default-character-set=utf8mb4 \
  -u"$U" -p"$P" "$D" | gzip > "$BK"
echo "    $BK ($(du -h "$BK" | cut -f1))"

echo "==> [2/4] Import $DUMP"
case "$DUMP" in
  *.gz) zcat "$DUMP" | mysql -u"$U" -p"$P" "$D" ;;
  *)    mysql -u"$U" -p"$P" "$D" < "$DUMP" ;;
esac

echo "==> [3/4] Clear cache + quyền thư mục"
cd "$BE_DIR"
php artisan optimize:clear >/dev/null 2>&1 || true
[ -L public/storage ] || php artisan storage:link >/dev/null 2>&1 || true
chown -R www-data:www-data storage bootstrap/cache
chmod -R 775 storage bootstrap/cache

echo "==> [4/4] Kiểm tra số dòng"
for t in products product_categories articles banners pages users leads translations; do
  n=$(mysql -N -B -u"$U" -p"$P" "$D" -e "SELECT COUNT(*) FROM \`$t\`;" 2>/dev/null || echo "n/a")
  printf '    %-20s %s\n' "$t" "$n"
done

echo
echo "Xong. Nếu website vẫn hiển thị cũ: pm2 restart sophchem-fe"
echo "Rollback: zcat $BK | mysql -u$U -p*** $D"
