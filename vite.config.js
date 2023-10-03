import { fileURLToPath } from "url";
import { defineConfig } from "vite";
import path from "path";
import react from "@vitejs/plugin-react";
import reactRefresh from "@vitejs/plugin-react-refresh";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const root = path.resolve(__dirname, "src");
const outDir = path.resolve(__dirname, "dist");
console.log(root);
export default defineConfig({
	base: "/comickApp/",
	root,
	plugins: [react(), reactRefresh()],
	build: {
		chunkSizeWarningLimit: 10000,
		outDir,
		emptyOutDir: true,
		rollupOptions: {
			input: {
				main: path.resolve(root, "index.html"),
			},
		},
	},
});
