import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import env from "vite-plugin-env-compatible";

export default defineConfig({
    test:{
        environment: "jsdom",
        globals: true,
        setupFiles:"./jest.setup.ts"
    },
    plugins: [react(), env({ prefix: "VITE", mountedPath: "process.env" })],
});
