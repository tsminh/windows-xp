import { defineConfig } from "vite";
import react, { reactCompilerPreset } from "@vitejs/plugin-react";
import babel from "@rolldown/plugin-babel";
import VitePluginSvgSpritemap from "@spiriit/vite-plugin-svg-spritemap";
import createSvgSpritePlugin from "vite-plugin-svg-sprite";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
    plugins: [
        react(),
        tsconfigPaths(),
        babel({ presets: [reactCompilerPreset()] }),
        createSvgSpritePlugin({
            exportType: "react", // or 'react' or 'vue'
            include: "**/icons/*.svg",
        }),
        VitePluginSvgSpritemap("./src/assets/icons/*.svg", {
            svgo: {
                multipass: true,
                plugins: [
                    {
                        name: "preset-default",
                        params: {
                            overrides: {
                                // Alternative: disable ID minification completely if prefixing is not preferred
                                cleanupIds: false,
                            },
                        },
                    },
                ],
            },
        }),
    ],
});
