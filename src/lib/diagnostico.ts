/**
 * Los 4 pasos del diagnóstico gratuito (textos aprobados de docs/contenido.md › Diagnóstico de datos).
 * Fuente única: la usan la página del diagnóstico y /agendar.
 */
export const pasosDiagnostico: {
	titulo: string;
	detalle?: string;
	texto: string;
	lista?: string[];
}[] = [
	{
		titulo: "Conversación inicial",
		detalle: "Llamada de 30 minutos · gratis",
		texto: "Nos cuentas cómo trabaja tu negocio, qué herramientas usas y qué te quita más tiempo. Sin compromiso.",
	},
	{
		titulo: "Revisión de tus datos",
		texto: "Nos compartes, por un canal seguro, una muestra de tus archivos o acceso de solo lectura a tus sistemas. Analizamos calidad, orden, duplicados, errores y tareas que se repiten a mano.",
	},
	{
		titulo: "Informe de diagnóstico",
		texto: "Recibes un documento claro con:",
		lista: [
			"El estado de tus datos, explicado sin tecnicismos.",
			"Los 3 a 5 problemas más importantes y lo que cada uno te cuesta.",
			"Las tareas que se pueden automatizar y cuánto tiempo liberarían.",
			"Una ruta recomendada: qué hacer primero, después y al final.",
			"Una propuesta con alcance, tiempos y precio, si decides avanzar.",
		],
	},
	{
		titulo: "Reunión de resultados",
		detalle: "45 minutos",
		texto: "Repasamos juntos el informe, resolvemos tus dudas y decides con calma, sin presión.",
	},
];
