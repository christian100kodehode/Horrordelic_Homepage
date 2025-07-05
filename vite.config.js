import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
// import { jsToBottomNoModule } from "@vitejs/";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    // jsToBottomNoModule()
  ],
});
