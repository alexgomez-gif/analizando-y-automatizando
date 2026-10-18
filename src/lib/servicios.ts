/**
 * Los 5 servicios del sitio (textos aprobados de docs/contenido.md).
 * Fuente única: la usan las tarjetas del inicio y el índice /servicios.
 * acento = color del ícono según su significado (marca.md §2.1):
 *   cian = análisis · magenta = automatización · violeta = predictivo (IA).
 */
import { ClipboardCheck, Combine, LayoutDashboard, TrendingUp, Workflow } from "@lucide/astro";

export const servicios = [
	{
		titulo: "Diagnóstico de datos",
		href: "/servicios/diagnostico-de-datos",
		acento: "cian",
		icono: ClipboardCheck,
		texto: "Te mostramos dónde se te van las horas y qué conviene automatizar primero.",
	},
	{
		titulo: "Tableros",
		href: "/servicios/tableros",
		acento: "cian",
		icono: LayoutDashboard,
		texto: "Tus números clave en una sola pantalla, actualizados solos.",
	},
	{
		titulo: "Limpieza y consolidación de datos",
		href: "/servicios/limpieza-y-consolidacion-de-datos",
		acento: "cian",
		icono: Combine,
		texto: "Juntamos tus hojas de cálculo y archivos en una sola fuente que sí cuadra.",
	},
	{
		titulo: "Automatización de reportes y procesos",
		href: "/servicios/automatizacion-de-reportes",
		acento: "magenta",
		icono: Workflow,
		texto: "Tus reportes listos cada lunes, sin que tengas que armarlos.",
	},
	{
		titulo: "Análisis predictivo",
		href: "/servicios/analisis-predictivo",
		acento: "violeta",
		icono: TrendingUp,
		texto: "Cuando tus datos lo permiten, te ayudamos a anticipar ventas e inventario.",
	},
] as const;
