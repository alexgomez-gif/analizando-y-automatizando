// Genera la imagen para compartir en redes y WhatsApp (Open Graph, 1200 × 630) sin dependencias:
// arma una tarjeta HTML con el logo, las fuentes y los colores de marca y la fotografía con Chrome.
//
// Uso (después de npm run build, porque toma las fuentes de dist/):
//   npm run imagen-social        → public/og/compartir.png
//
// Necesita Google Chrome instalado (igual que npm run verificar).
import { execFileSync } from "node:child_process";
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";

const raiz = resolve(import.meta.dirname, "..");
const temporal = resolve(raiz, ".verificacion/imagen-social");
const salida = resolve(raiz, "public/og/compartir.png");
mkdirSync(temporal, { recursive: true });
mkdirSync(resolve(raiz, "public/og"), { recursive: true });

// Las fuentes compiladas por Astro tienen nombres con huella; sus @font-face van en línea en cada página.
const css = readFileSync(resolve(raiz, "dist/index.html"), "utf8");
const fuente = (familia) => {
	const m = css.match(new RegExp(`@font-face\\{font-family:"?${familia}-[a-f0-9]+"?;[^}]*?(/_astro/fonts/[a-f0-9]+\\.woff2)`));
	if (!m) throw new Error(`No encontré la fuente ${familia} en dist/. Corre npm run build primero.`);
	return `file://${resolve(raiz, "dist" + m[1])}`;
};

const html = `<!doctype html>
<html lang="es-CO"><head><meta charset="utf-8"><style>
	@font-face { font-family: Titulo; src: url(${fuente("Space Grotesk")}); font-weight: 300 700; }
	@font-face { font-family: Mono; src: url(${fuente("JetBrains Mono")}); font-weight: 100 800; }
	* { margin: 0; box-sizing: border-box; }
	body {
		width: 1200px; height: 630px; overflow: hidden; padding: 80px 88px;
		display: flex; flex-direction: column; justify-content: space-between;
		background: radial-gradient(ellipse at top, rgba(167,139,250,.25), transparent 60%),
			radial-gradient(ellipse at bottom right, rgba(255,61,220,.15), transparent 50%), #070B1F;
		color: #EEF4FF; font-family: Titulo, sans-serif;
	}
	img { width: 460px; height: auto; display: block; }
	h1 { font-size: 68px; font-weight: 700; line-height: 1.08; letter-spacing: -0.02em; }
	.degradado { background: linear-gradient(135deg, #00E5FF 0%, #A78BFA 50%, #FF3DDC 100%);
		-webkit-background-clip: text; background-clip: text; color: transparent; }
	.pie { display: flex; align-items: center; gap: 20px; font-family: Mono, monospace; font-size: 22px;
		letter-spacing: 0.08em; color: #A7B3DA; }
	.horizonte { flex: 1; height: 3px; border-radius: 3px; background: linear-gradient(90deg, #00E5FF 0%, #B8FF3D 100%); }
</style></head><body>
	<img src="file://${resolve(raiz, "public/logo/logo-horizontal.svg")}" alt="">
	<h1>Analizamos lo que tienes.<br><span class="degradado">Automatizamos lo que repites.</span></h1>
	<div class="pie"><span>ANALIZANDOYAUTOMATIZANDO.COM</span><span class="horizonte"></span></div>
</body></html>`;

const pagina = resolve(temporal, "tarjeta.html");
writeFileSync(pagina, html);
execFileSync("google-chrome", [
	"--headless=new", "--no-sandbox", "--hide-scrollbars", "--allow-file-access-from-files",
	`--user-data-dir=${temporal}/perfil-chrome`, "--window-size=1200,630", "--virtual-time-budget=3000",
	`--screenshot=${salida}`, `file://${pagina}`,
], { stdio: "ignore" });
console.log(`Imagen lista: ${salida}`);
