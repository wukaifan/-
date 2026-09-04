import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  base: "./",
  plugins: [react()],
  server: {
    host: true,
    port: 5173,
    open: false,
    watch: {
      // 不监听视频等大文件，避免 Windows 上文件被占用导致 watcher 崩溃
      ignored: ["**/*.mp4", "**/public/videos/**"],
    },
  },
});
