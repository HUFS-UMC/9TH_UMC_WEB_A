// vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      "/v1": {
        target: "http://localhost:8000",
        changeOrigin: true,
        // Vite 4/5에서 지원되는 bypass 패턴
        bypass(req) {
          // ✅ 프론트가 직접 처리해야 하는 콜백 경로는 프록시를 건너뜀
          if (req.url?.startsWith("/v1/auth/google/callback")) {
            return "/index.html"; // SPA 라우터로 넘김
          }
          
        },
      },
    },
  },
});
