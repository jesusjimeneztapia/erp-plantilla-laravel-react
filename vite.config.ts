import { defineConfig } from "vite";
import laravel from "laravel-vite-plugin";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";
import tailwindcss from "@tailwindcss/vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
    plugins: [
        laravel({
            input: "resources/ts/main.tsx",
            refresh: true,
        }),
        react(),
        svgr({
            svgrOptions: {
                icon: true,
                exportType: "named",
                namedExport: "ReactComponent",
            },
        }),
        tailwindcss(),
        tsconfigPaths(),
    ],
});
