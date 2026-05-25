import esbuild from "esbuild";
import process from "process";
import { copyFileSync, existsSync, mkdirSync } from "fs";

const nodeBuiltins = [
	"assert", "buffer", "child_process", "cluster", "console", "constants",
	"crypto", "dgram", "dns", "domain", "events", "fs", "http", "https",
	"module", "net", "os", "path", "punycode", "querystring", "readline",
	"repl", "stream", "string_decoder", "sys", "timers", "tls", "tty",
	"url", "util", "v8", "vm", "worker_threads", "zlib",
];

const prod = process.argv[2] === "production";

const context = await esbuild.context({
    entryPoints: ["src/main.ts"],
    bundle: true,
    external: [
        "obsidian",
        "electron",
        "@codemirror/autocomplete",
        "@codemirror/collab",
        "@codemirror/commands",
        "@codemirror/language",
        "@codemirror/lint",
        "@codemirror/search",
        "@codemirror/state",
        "@codemirror/view",
        "@lezer/common",
        "@lezer/highlight",
        "@lezer/lr",
        ...nodeBuiltins,
    ],
    format: "cjs",
    minify: prod,
    target: "es2018",
    logLevel: "info",
    sourcemap: prod ? false : "inline",
    treeShaking: true,
    outfile: "dist/main.js",
});

if (prod) {
    await context.rebuild();
    if (existsSync('assets')) {
        if (!existsSync('dist/assets')) mkdirSync('dist/assets', { recursive: true });
        ['wechat-donate.jpg'].forEach(f => {
            const src = `assets/${f}`;
            if (existsSync(src)) {
                copyFileSync(src, `dist/assets/${f}`);
                console.log(`Copied ${src} -> dist/assets/${f}`);
            }
        });
    }
    process.exit(0);
} else {
    await context.watch();
    console.log("👀 Watching for changes...");
}
