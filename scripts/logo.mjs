// Genera todas las versiones del logo v2 desde la geometría original (scripts/logo/geometria.json).
// marca.md §4: el logo no se edita a mano; si cambia, se regeneran todas las versiones juntas.
//
// Uso:  npm run logo        → reescribe public/logo/*.svg (horizontal, claro, blanco, oscuro, animado, monogramas)
//
// Logo v2 (2026-10-21): «más cuerpo y profundidad».
// - Cuerpo: trazo del monograma 14 → 17 y el texto engrosado con un contorno del mismo color.
// - Profundidad: relieve de tres capas con el degradado Amanecer (cian → violeta → magenta) bajo el
//   texto y el monograma. Las versiones a una tinta (blanco, oscuro) llevan cuerpo pero no relieve.
// El favicon y los íconos PNG no cambian: ya usan trazo grueso y a 16-32 px el relieve sería ruido.
import { readFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";

const raiz = resolve(import.meta.dirname, "..");
const geo = JSON.parse(readFileSync(resolve(raiz, "scripts/logo/geometria.json"), "utf8"));

const CAJA_HORIZONTAL = "-18.5 -2.92 763.29 191.92";
const CAJA_MONOGRAMA = "-16.5 -27.82 241.71 241.71";
const CUERPO = { trazo: 17, hueco: 18.6, nodo: 12, texto: 3.4, conector: 2.6 };

// Colores de docs/marca.md §2 (oscuro = predeterminado, claro = neones oscurecidos)
const TEMAS = {
	oscuro: { degradado: ["#00E5FF", "#A78BFA", "#FF3DDC"], texto: "#EEF4FF", conector: "#A7B3DA", nodo: "#B8FF3D", brillo: true, relieveMonograma: 0.35 },
	claro: { degradado: ["#00788A", "#6233D6", "#B5148F"], texto: "#0B1030", conector: "#465079", nodo: "#3F7A00", brillo: false, relieveMonograma: 0.3 },
};

const ANIMACION = `<style>
.linea,.barra{stroke-dasharray:1;stroke-dashoffset:1;stroke-opacity:0;animation:dibujar 1.5s cubic-bezier(.2,.8,.2,1) .15s forwards}
.barra{animation-duration:.7s;animation-delay:1.15s}
.nodo,.brillo{opacity:0;transform-box:fill-box;transform-origin:center;animation:encender .6s cubic-bezier(.2,.8,.2,1) 1.55s forwards}
.texto,.conector,.relieve{opacity:0;animation:aparecer .7s cubic-bezier(.2,.8,.2,1) 1.25s forwards}
@keyframes dibujar{0%{stroke-opacity:0}4%{stroke-opacity:1}100%{stroke-opacity:1;stroke-dashoffset:0}}
@keyframes encender{0%{opacity:0;transform:scale(.2)}60%{opacity:1;transform:scale(1.3)}100%{opacity:1;transform:scale(1)}}
@keyframes aparecer{from{opacity:0;transform:translateX(-10px)}to{opacity:1;transform:none}}
@media (prefers-reduced-motion:reduce){.linea,.barra{stroke-dashoffset:0;stroke-opacity:1;animation:none}.nodo,.brillo,.texto,.conector,.relieve{opacity:1;animation:none}}
</style>`;

/**
 * Arma un SVG del logo.
 * @param {object} o
 * @param {string} o.id        prefijo único de los id internos (evita choques si hay dos logos en la página)
 * @param {"oscuro"|"claro"} [o.tema]  versión a color
 * @param {string} [o.tinta]   versión a una tinta: un solo color, sin relieve ni brillo
 * @param {boolean} [o.conTexto]  horizontal (true) o solo monograma (false)
 * @param {boolean} [o.animado]   la línea se dibuja una vez (respeta prefers-reduced-motion)
 */
function logo({ id, tema, tinta, conTexto = true, animado = false }) {
	const t = tema ? TEMAS[tema] : null;
	const caja = conTexto ? CAJA_HORIZONTAL : CAJA_MONOGRAMA;
	const trazoColor = t ? `url(#${id}-grad)` : tinta;
	const lineaAnimada = animado ? ' pathLength="1"' : "";

	const defs = [
		t && `<linearGradient id="${id}-grad" gradientUnits="userSpaceOnUse" x1="0.5" y1="170" x2="208.21" y2="20">${paradas(t.degradado)}</linearGradient>`,
		t && conTexto && `<linearGradient id="${id}-rel" gradientUnits="userSpaceOnUse" x1="250" y1="0" x2="745" y2="0">${paradas(t.degradado)}</linearGradient>`,
		t?.brillo && `<filter id="${id}-glow" x="-150%" y="-150%" width="400%" height="400%"><feGaussianBlur stdDeviation="8.4"/></filter>`,
		`<mask id="${id}-mask" maskUnits="userSpaceOnUse" x="-20" y="-20" width="240" height="220"><rect x="-20" y="-20" width="240" height="220" fill="#fff"/><circle cx="${geo.nodo.cx}" cy="${geo.nodo.cy}" r="${CUERPO.hueco}" fill="#000"/></mask>`,
		// Las letras se definen una vez y cada capa las reutiliza con <use> (el archivo no crece por el relieve)
		conTexto && `<g id="${id}-letras">${geo.texto.map((d) => `<path d="${d}"/>`).join("")}</g><path id="${id}-y" d="${geo.conector}"/>`,
	].filter(Boolean).join("");

	const trazos = (color, dx = 0, dy = 0, clase = "trazos", animable = false) =>
		`<g class="${clase}"${dx || dy ? ` transform="translate(${r(dx)} ${r(dy)})"` : ""} fill="none" stroke="${color}" stroke-width="${CUERPO.trazo}" stroke-linecap="round" stroke-linejoin="round" mask="url(#${id}-mask)">` +
		// Solo la capa del frente lleva las clases que anima logo-animado.svg; el relieve aparece entero
		(animable ? `<path class="linea"${lineaAnimada} d="${geo.linea}"/><path class="barra"${lineaAnimada} d="${geo.barra}"/>`
			: `<path d="${geo.linea}"/><path d="${geo.barra}"/>`) + `</g>`;
	const contorno = (color, ancho) => `stroke="${color}" stroke-width="${ancho}" stroke-linejoin="round" paint-order="stroke"`;
	const texto = (color, colorConector, dx = 0, dy = 0, claseTexto = "texto", claseConector = "conector") => {
		const mover = dx || dy ? ` transform="translate(${r(dx)} ${r(dy)})"` : "";
		return `<use class="${claseTexto}" href="#${id}-letras"${mover} fill="${color}" ${contorno(color, CUERPO.texto)}/>` +
			`<use class="${claseConector}" href="#${id}-y"${mover} fill="${colorConector}" ${contorno(colorConector, CUERPO.conector)}/>`;
	};

	const capas = [];
	if (t) {
		// Relieve: tres copias desplazadas abajo a la derecha, de la más lejana a la más cercana
		for (const k of [3, 2, 1]) capas.push(`<g class="relieve" opacity="${t.relieveMonograma}">${trazos(trazoColor, 1.3 * k, 2.1 * k, "relieve-trazos")}</g>`);
		if (conTexto) for (const k of [3, 2, 1]) capas.push(`<g class="relieve">${texto(`url(#${id}-rel)`, `url(#${id}-rel)`, 0.9 * k, 1.5 * k, "relieve-texto", "relieve-conector")}</g>`);
	}
	capas.push(trazos(trazoColor, 0, 0, "trazos", true));
	const nodo = t ? t.nodo : tinta;
	if (t?.brillo) capas.push(`<circle class="brillo" cx="${geo.nodo.cx}" cy="${geo.nodo.cy}" r="${CUERPO.nodo}" fill="${nodo}" filter="url(#${id}-glow)"/>`);
	capas.push(`<circle class="nodo" cx="${geo.nodo.cx}" cy="${geo.nodo.cy}" r="${CUERPO.nodo}" fill="${nodo}"/>`);
	if (conTexto) capas.push(texto(t ? t.texto : tinta, t ? t.conector : tinta));

	return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${caja}" role="img" aria-labelledby="${id}-t"><title id="${id}-t">Analizando y Automatizando</title>` +
		`${animado ? ANIMACION : ""}<defs>${defs}</defs>${capas.join("")}</svg>\n`;
}

const paradas = ([a, b, c]) => `<stop offset="0" stop-color="${a}"/><stop offset=".5" stop-color="${b}"/><stop offset="1" stop-color="${c}"/>`;
const r = (n) => +n.toFixed(2);

const versiones = {
	"logo-horizontal.svg": logo({ id: "aa-h", tema: "oscuro" }),
	"logo-horizontal-claro.svg": logo({ id: "aa-hc", tema: "claro" }),
	"logo-animado.svg": logo({ id: "aa-an", tema: "oscuro", animado: true }),
	"logo-blanco.svg": logo({ id: "aa-hb", tinta: "#FFFFFF" }),
	"logo-oscuro.svg": logo({ id: "aa-ho", tinta: "#070B1F" }),
	"monograma.svg": logo({ id: "aa-m", tema: "oscuro", conTexto: false }),
	"monograma-claro.svg": logo({ id: "aa-mc", tema: "claro", conTexto: false }),
};
for (const [archivo, svg] of Object.entries(versiones)) {
	writeFileSync(resolve(raiz, "public/logo", archivo), svg);
	console.log(`public/logo/${archivo} · ${(svg.length / 1024).toFixed(1)} KB`);
}
