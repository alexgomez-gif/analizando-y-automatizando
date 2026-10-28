/**
 * Escena «Amanecer» (marca.md §5): montañas andinas del hero.
 * Se calculan al compilar, así que el navegador recibe solo el trazado SVG, sin JavaScript.
 * La fórmula es la del prototipo aprobado el 2026-10-21: con la misma semilla, la misma cresta.
 */

/** Una onda de la cresta: cuántas veces sube y baja a lo ancho, qué tan alta es y dónde empieza. */
type Onda = readonly [frecuencia: number, amplitud: number, fase: number];

/** Medidas del lienzo SVG de las montañas (viewBox 0 0 1440 300). */
export const ANCHO_MONTES = 1440;
export const ALTO_MONTES = 300;

/**
 * Cresta de montaña: suma de ondas más un ruido pequeño y repetible (generador de Park-Miller).
 * - `borde`: solo la línea de la cresta (se dibuja en neón).
 * - `relleno`: la cresta cerrada hasta el suelo (la silueta de la montaña).
 * `base` es la altura media de la cresta, medida desde arriba del lienzo.
 */
export function cresta(semilla: number, base: number, ondas: readonly Onda[]) {
	let estado = semilla;
	const azar = () => (estado = (estado * 16807) % 2147483647) / 2147483647;

	const puntos: string[] = [];
	for (let x = 0; x <= ANCHO_MONTES; x += 24) {
		let y = 0;
		for (const [frecuencia, amplitud, fase] of ondas) {
			y += Math.sin((x / ANCHO_MONTES) * Math.PI * frecuencia + fase) * amplitud;
		}
		y += (azar() - 0.5) * 14.4;
		puntos.push(`${x} ${(base - y).toFixed(1)}`);
	}

	const borde = `M${puntos.join(" L")}`;
	return { borde, relleno: `${borde} L${ANCHO_MONTES} ${ALTO_MONTES} L0 ${ALTO_MONTES} Z` };
}
