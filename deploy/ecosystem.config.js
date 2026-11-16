// deploy/ecosystem.config.js — PM2 cho Next.js 16 (output: "standalone")
//
// Không cần sửa đường dẫn: cwd được suy ra từ vị trí file này
// (<repo>/deploy/ecosystem.config.js -> <repo>/web).
//
// Vì sao script là .next/standalone/server.js: next.config.ts đã bật
// output: "standalone" nên server.js tự chứa node_modules tối thiểu.
// BẮT BUỘC phải copy `public/` và `.next/static/` vào .next/standalone/
// (deploy/deploy-web.sh làm việc này), nếu không CSS/JS/ảnh sẽ 404.
//
// Cách dùng:
//   pm2 start deploy/ecosystem.config.js
//   pm2 save && pm2 startup

const path = require("path");

const repoDir = path.resolve(__dirname, "..");

module.exports = {
  apps: [
    {
      name: "sophchem-web",
      cwd: path.join(repoDir, "web"),
      script: ".next/standalone/server.js",
      exec_mode: "fork",
      instances: 1,
      env: {
        NODE_ENV: "production",
        PORT: process.env.PORT || "3006",
        // Chỉ lắng nghe loopback, Nginx là cửa ngõ duy nhất ra ngoài.
        HOSTNAME: "127.0.0.1",
        NEXT_TELEMETRY_DISABLED: "1",
      },
      // VPS 2GB RAM: restart khi tiến trình phình quá mức
      max_memory_restart: "700M",
      autorestart: true,
      time: true,
    },
  ],
};
