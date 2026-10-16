// Verificación de una página con Chrome sin interfaz (Chrome DevTools Protocol), sin dependencias.
//
// Uso (con la vista previa corriendo en otra terminal: npm run build && npm run preview):
//   npm run verificar                         → revisa http://localhost:4321/
//   npm run verificar -- http://localhost:4321/servicios/
//
// Revisa: contraste WCAG (2 temas × 3 anchos, menú abierto en móvil), desborde horizontal,
// orden de Tab con tamaño de cada objetivo, «Saltar al contenido» y foco en tarjetas-enlace.
// Guarda capturas en .verificacion/ (carpeta ignorada por Git). Necesita Google Chrome instalado.
//
// Límite: no ve imágenes de fondo (Aurora, degradados); esos contrastes se calculan aparte.
import { spawn } from "node:child_process";
import { mkdirSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";

const url = process.argv[2] ?? "http://localhost:4321/";
const salida = resolve(process.argv[3] ?? ".verificacion");
mkdirSync(salida, { recursive: true });
const puerto = 9350;
const chrome = spawn("google-chrome", ["--headless=new", "--disable-gpu", "--no-sandbox", "--hide-scrollbars",
	`--remote-debugging-port=${puerto}`, `--user-data-dir=${salida}/perfil-chrome`, "about:blank"], { stdio: "ignore" });
const espera = (ms) => new Promise((r) => setTimeout(r, ms));
let ws;
for (let i = 0; i < 40 && !ws; i++) {
	try { const p = (await (await fetch(`http://127.0.0.1:${puerto}/json`)).json()).find((t) => t.type === "page"); if (p) ws = new WebSocket(p.webSocketDebuggerUrl); }
	catch { await espera(250); }
}
await new Promise((r) => ws.addEventListener("open", r));
let id = 0; const pend = new Map(); const errores = [];
ws.addEventListener("message", (e) => {
	const m = JSON.parse(e.data);
	if (m.method === "Runtime.exceptionThrown") errores.push(m.params.exceptionDetails.text);
	if (pend.has(m.id)) { pend.get(m.id)(m); pend.delete(m.id); }
});
const cdp = (method, params = {}) => new Promise((r) => { const n = ++id; pend.set(n, r); ws.send(JSON.stringify({ id: n, method, params })); });
const ev = async (x) => (await cdp("Runtime.evaluate", { expression: x, returnByValue: true })).result.result.value;
const tecla = async (key, code, kc) => {
	await cdp("Input.dispatchKeyEvent", { type: "keyDown", key, code, windowsVirtualKeyCode: kc, ...(key === "Enter" ? { text: "\r" } : {}) });
	await cdp("Input.dispatchKeyEvent", { type: "keyUp", key, code, windowsVirtualKeyCode: kc });
	await espera(120);
};
const ir = async (ancho, tema) => {
	await cdp("Emulation.setDeviceMetricsOverride", { width: ancho, height: 900, deviceScaleFactor: 1, mobile: ancho < 768 });
	await cdp("Page.navigate", { url }); await espera(900);
	await ev(`localStorage.setItem('tema', '${tema}')`); await cdp("Page.reload"); await espera(1200);
};
await cdp("Page.enable"); await cdp("Runtime.enable");

// --- Contraste: cada texto visible contra su fondo efectivo; bordes de controles a 3:1 ---
const auditar = `(() => {
	const rgba = (s) => { const m = s.match(/[\\d.]+/g)?.map(Number) ?? [0,0,0,0]; return [m[0], m[1], m[2], m[3] ?? 1]; };
	const lum = ([r,g,b]) => { const f = (c) => { c /= 255; return c <= 0.04045 ? c/12.92 : ((c+0.055)/1.055) ** 2.4; }; return 0.2126*f(r)+0.7152*f(g)+0.0722*f(b); };
	const cr = (a, b) => { const [x, y] = [lum(a), lum(b)].sort((p, q) => q - p); return (x + 0.05) / (y + 0.05); };
	const sobre = (a, b) => [0,1,2].map(i => a[i]*a[3] + b[i]*(1-a[3])).concat(1);
	const fondoDe = (el) => { const capas = []; for (let n = el; n; n = n.parentElement) { const c = rgba(getComputedStyle(n).backgroundColor); if (c[3] > 0) { capas.push(c); if (c[3] === 1) break; } }
		let f = rgba(getComputedStyle(document.documentElement).backgroundColor); for (const c of capas.reverse()) f = sobre(c, f); return f; };
	const visible = (el) => { const r = el.getBoundingClientRect(), s = getComputedStyle(el); return r.width > 1 && r.height > 1 && s.visibility !== 'hidden' && s.display !== 'none' && !el.closest('.sr-only'); };
	const filas = []; const vistos = new Set(); const w = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
	while (w.nextNode()) { const el = w.currentNode.parentElement; const t = w.currentNode.textContent.trim();
		if (!t || !el || vistos.has(el) || !visible(el)) continue; vistos.add(el);
		const s = getComputedStyle(el), color = rgba(s.color); if (color[3] === 0) continue;
		const px = parseFloat(s.fontSize), grande = px >= 24 || (px >= 18.66 && Number(s.fontWeight) >= 700);
		filas.push({ texto: t.slice(0, 40), ratio: +cr(sobre(color, fondoDe(el)), fondoDe(el)).toFixed(2), minimo: grande ? 3 : 4.5 }); }
	for (const b of document.querySelectorAll('button, a.border')) { if (!visible(b)) continue; const s = getComputedStyle(b); if (parseFloat(s.borderTopWidth) === 0 || rgba(s.borderTopColor)[3] === 0) continue;
		const f = fondoDe(b.parentElement); filas.push({ texto: '[borde] ' + (b.id || b.textContent.trim()).slice(0, 30), ratio: +cr(sobre(rgba(s.borderTopColor), f), f).toFixed(2), minimo: 3 }); }
	return filas; })()`;

let fallas = 0;
console.log("== CONTRASTE Y DESBORDE");
for (const tema of ["oscuro", "claro"]) for (const ancho of [375, 768, 1280]) {
	await ir(ancho, tema);
	if (ancho < 1024) { await ev("document.getElementById('menu-boton')?.click()"); await espera(250); }
	const filas = await ev(auditar); const malas = filas.filter((f) => f.ratio < f.minimo); fallas += malas.length;
	const peor = [...filas].sort((a, b) => a.ratio / a.minimo - b.ratio / b.minimo)[0];
	const desborde = await ev("document.documentElement.scrollWidth > innerWidth");
	console.log(`  ${tema.padEnd(6)} ${String(ancho).padStart(4)}px · ${filas.length} elementos · fallas ${malas.length} · desborde ${desborde} · más justo ${peor.ratio}:1 «${peor.texto}»`);
	for (const m of malas) console.log(`     FALLA ${m.ratio}:1 < ${m.minimo} «${m.texto}»`);
	if (ancho < 1024) { await ev("document.getElementById('menu-boton')?.click()"); await espera(250); }
	const { result } = await cdp("Page.captureScreenshot", { format: "png", captureBeyondViewport: true });
	writeFileSync(`${salida}/pagina-${tema}-${ancho}.png`, Buffer.from(result.data, "base64"));
}
console.log(`  TOTAL DE FALLAS: ${fallas}`);

// --- Teclado: orden de Tab, tamaño de cada objetivo y foco en tarjetas-enlace ---
console.log("== TECLADO (oscuro, 1280px)");
await ir(1280, "oscuro");
const estadoFoco = `(() => { const a = document.activeElement, r = a.getBoundingClientRect(), t = a.closest('.tarjeta-enlace');
	const base = (a.getAttribute('aria-label') || a.innerText || '').trim().replace(/\\s+/g, ' ').slice(0, 38) + ' [' + Math.round(r.width) + '×' + Math.round(r.height) + ']';
	if (!t) return base; const s = getComputedStyle(t), anillo = getComputedStyle(t, '::before').opacity;
	return base + ' → tarjeta: contorno ' + s.outlineStyle + ', glow ' + (s.boxShadow !== 'none') + ', anillo ' + anillo; })()`;
for (let i = 1; i <= 16; i++) { await tecla("Tab", "Tab", 9); console.log(`  Tab ${String(i).padStart(2)}: ${await ev(estadoFoco)}`); }
await ir(1280, "oscuro");
await tecla("Tab", "Tab", 9); await tecla("Enter", "Enter", 13); await tecla("Tab", "Tab", 9);
console.log(`  Saltar al contenido → siguiente Tab: ${await ev(estadoFoco)}`);
console.log(`  Errores de JavaScript: ${errores.length ? errores.join(" | ") : "ninguno"}`);
ws.close(); chrome.kill(); process.exit(0);
