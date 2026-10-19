// Verificación de una página con Chrome sin interfaz (Chrome DevTools Protocol), sin dependencias.
//
// Uso (con la vista previa corriendo en otra terminal: npm run build && npm run preview):
//   npm run verificar                         → revisa http://localhost:4321/
//   npm run verificar -- http://localhost:4321/servicios/
//
// Revisa: contraste WCAG (texto, bordes de controles y campos), etiquetas de formularios, desborde,
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
	// Baja por toda la página como un visitante (dispara las apariciones de scroll) y vuelve arriba.
	await cdp("Runtime.evaluate", { awaitPromise: true, expression: `(async () => {
		for (let y = 0; y < document.documentElement.scrollHeight; y += innerHeight / 3) { scrollTo(0, y); await new Promise((r) => setTimeout(r, 160)); }
		scrollTo(0, 0); })()` });
	await espera(900);
};
await cdp("Page.enable"); await cdp("Runtime.enable");

// --- Contraste: cada texto visible contra su fondo efectivo; bordes de controles a 3:1 ---
const auditar = `(() => {
	// Cualquier color CSS (rgb, oklab, color-mix…) → [r, g, b, a]. Los que no son rgb se pintan en un lienzo y se lee el píxel.
	const lienzo = document.createElement('canvas').getContext('2d', { willReadFrequently: true });
	const rgba = (s) => { if (/^rgba?\\(/.test(s)) { const m = s.match(/[\\d.]+/g).map(Number); return [m[0], m[1], m[2], m[3] ?? 1]; }
		lienzo.clearRect(0, 0, 1, 1); lienzo.fillStyle = s; lienzo.fillRect(0, 0, 1, 1); const d = lienzo.getImageData(0, 0, 1, 1).data; return [d[0], d[1], d[2], d[3] / 255]; };
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
	for (const b of document.querySelectorAll('button, a.border, input, select, textarea')) { if (!visible(b)) continue; const s = getComputedStyle(b); if (parseFloat(s.borderTopWidth) === 0 || rgba(s.borderTopColor)[3] === 0) continue;
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

// --- Estructura: títulos, ids, alt, nombres accesibles y referencias ARIA ---
console.log("== ESTRUCTURA");
await ir(1280, "oscuro");
const estructura = await ev(`(() => {
	const problemas = [];
	const titulos = [...document.querySelectorAll('h1, h2, h3, h4, h5, h6')].map(h => +h.tagName[1]);
	const h1 = titulos.filter(n => n === 1).length;
	if (h1 !== 1) problemas.push('Hay ' + h1 + ' h1 (debe haber 1)');
	titulos.forEach((n, i) => { if (i && n > titulos[i - 1] + 1) problemas.push('Salto de h' + titulos[i - 1] + ' a h' + n); });
	const ids = [...document.querySelectorAll('[id]')].map(e => e.id);
	[...new Set(ids.filter((id, i) => ids.indexOf(id) !== i))].forEach(id => problemas.push('id repetido: ' + id));
	document.querySelectorAll('img:not([alt])').forEach(i => problemas.push('Imagen sin alt: ' + i.getAttribute('src')));
	document.querySelectorAll('a[href], button, summary').forEach(e => {
		const nombre = (e.getAttribute('aria-label') || e.textContent || [...e.querySelectorAll('img[alt]')].map(i => i.alt).join('')).trim();
		if (!nombre && !e.getAttribute('aria-labelledby')) problemas.push('Sin nombre accesible: ' + e.outerHTML.slice(0, 60));
	});
	document.querySelectorAll('[aria-labelledby], [aria-controls]').forEach(e => {
		for (const atr of ['aria-labelledby', 'aria-controls']) for (const ref of (e.getAttribute(atr) || '').split(/\\s+/).filter(Boolean))
			if (!document.getElementById(ref)) problemas.push(atr + ' apunta a un id inexistente: ' + ref);
	});
	document.querySelectorAll('input:not([type=hidden]), select, textarea').forEach(c => {
		if (!(c.labels && c.labels.length) && !c.getAttribute('aria-label') && !c.getAttribute('aria-labelledby')) problemas.push('Campo sin etiqueta: ' + (c.id || c.name));
	});
	if (!document.documentElement.lang) problemas.push('Falta lang en <html>');
	return { titulos: titulos.length, problemas };
})()`);
console.log(`  ${estructura.titulos} títulos revisados · problemas: ${estructura.problemas.length ? "" : "ninguno"}`);
for (const p of estructura.problemas) console.log(`     PROBLEMA ${p}`);

// --- Teclado: orden de Tab, tamaño de cada objetivo y foco en tarjetas-enlace ---
console.log("== TECLADO (oscuro, 1280px)");
await ir(1280, "oscuro");
const estadoFoco = `(() => { const a = document.activeElement, r = a.getBoundingClientRect(), t = a.closest('.tarjeta-enlace');
	const base = (a.getAttribute('aria-label') || a.innerText || '').trim().replace(/\\s+/g, ' ').slice(0, 38) + ' [' + Math.round(r.width) + '×' + Math.round(r.height) + ']';
	if (!t) return base; const s = getComputedStyle(t), anillo = getComputedStyle(t, '::before').opacity;
	return base + ' → tarjeta: contorno ' + s.outlineStyle + ', glow ' + (s.boxShadow !== 'none') + ', anillo ' + anillo; })()`;
// Recorre toda la página: se detiene cuando el foco vuelve al primer elemento (máximo 120 pasos).
let primero = null;
for (let i = 1; i <= 120; i++) {
	await tecla("Tab", "Tab", 9);
	const actual = await ev("(() => { const a = document.activeElement; return a === document.body ? 'body' : a.outerHTML.slice(0, 120); })()");
	if (i === 1) primero = actual;
	else if (actual === primero || actual === "body") { console.log(`  (recorrido completo: ${i - 1} elementos enfocables)`); break; }
	console.log(`  Tab ${String(i).padStart(2)}: ${await ev(estadoFoco)}`);
}
await ir(1280, "oscuro");
await tecla("Tab", "Tab", 9); await tecla("Enter", "Enter", 13); await tecla("Tab", "Tab", 9);
console.log(`  Saltar al contenido → siguiente Tab: ${await ev(estadoFoco)}`);

// --- Acordeones (<details>): se abren con Enter y el árbol de accesibilidad anuncia «expandido» ---
const totalAcordeones = await ev("document.querySelectorAll('details').length");
if (totalAcordeones) {
	console.log(`== ACORDEONES (${totalAcordeones})`);
	await cdp("DOM.enable"); await cdp("Accessibility.enable");
	for (let i = 0; i < totalAcordeones; i++) {
		const nombre = await ev(`document.querySelectorAll('details summary')[${i}].textContent.trim()`);
		await ev(`document.querySelectorAll('details summary')[${i}].focus()`);
		const antes = await ev(`document.querySelectorAll('details')[${i}].open`);
		await tecla("Enter", "Enter", 13);
		const despues = await ev(`document.querySelectorAll('details')[${i}].open`);
		const { result: { root } } = await cdp("DOM.getDocument", { depth: -1 });
		const { result: { nodeIds } } = await cdp("DOM.querySelectorAll", { nodeId: root.nodeId, selector: "details summary" });
		const nodo = (await cdp("Accessibility.getPartialAXTree", { nodeId: nodeIds[i], fetchRelatives: false })).result.nodes[0];
		const expandido = nodo.properties?.find((p) => p.name === "expanded")?.value.value;
		console.log(`  ${i + 1}. «${nombre}» · Enter: ${antes ? "abierto" : "cerrado"} → ${despues ? "abierto" : "cerrado"} · rol ${nodo.role.value} · expandido=${expandido}`);
	}
}
console.log(`  Errores de JavaScript: ${errores.length ? errores.join(" | ") : "ninguno"}`);
ws.close(); chrome.kill(); process.exit(0);
