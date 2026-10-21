/**
 * Datos estructurados schema.org (CLAUDE.md §8). Solo datos reales y aprobados.
 * Correo y NIT salen de negocio.ts y solo se incluyen cuando están llenos. Dirección y teléfono: pendientes.
 */
import { negocio } from "./negocio";

export const SITIO = "https://analizandoyautomatizando.com";

const zona = { "@type": "Country", name: "Colombia" };

const proveedor = {
	"@type": "ProfessionalService",
	name: "Analizando y Automatizando",
	url: `${SITIO}/`,
};

/** Inicio: el negocio como servicio profesional */
export const esquemaNegocio = {
	"@context": "https://schema.org",
	...proveedor,
	logo: `${SITIO}/logo/icono-512.png`,
	image: `${SITIO}/logo/icono-512.png`,
	slogan: "Analizamos lo que tienes. Automatizamos lo que repites",
	description:
		"Ayudamos a emprendimientos emergentes a dejar de perder horas en tareas repetitivas, mediante automatización y análisis a la medida, sin jerga técnica.",
	areaServed: zona,
	...(negocio.correo && { email: negocio.correo }),
	...(negocio.nit && { taxID: negocio.nit }),
};

/** Cada página de servicio */
export function esquemaServicio({ nombre, descripcion, ruta }: { nombre: string; descripcion: string; ruta: string }) {
	return {
		"@context": "https://schema.org",
		"@type": "Service",
		name: nombre,
		serviceType: nombre,
		description: descripcion,
		url: new URL(ruta, SITIO).href,
		provider: proveedor,
		areaServed: zona,
	};
}
