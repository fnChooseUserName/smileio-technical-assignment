import { defineConfig } from "vite";

export default defineConfig({
	// base: '',
	server: {
		port: 5172,
	},
	build: {
		// outDir: "dist/client",
		// manifest: true,
		rollupOptions: { 
			input: {
				// ...glob.sync(path.resolve("pages/*", "*.html")),
				/* SPECIFY the specific page to be watched, to speed up reload */	
				home: "src/pages/index.html",
				1: "src/pages/1/index.html",
				2: "src/pages/2/index.html",
			}
		},
		outDir: "dist/",
	},
});