/**
 * Datos del negocio: una sola fuente para el pie de página, la agenda y los datos estructurados.
 * Los llena el dueño (CLAUDE.md §10 y §11: no se inventan). Mientras un dato esté vacío (""),
 * el sitio muestra su marcador [PENDIENTE] en lugar de un valor falso.
 *
 * No son secretos: se publican en el sitio. Las claves y tokens van en .env (CLAUDE.md §9).
 */
export const negocio = {
	/** Nombre o razón social tal como aparece en el RUT. */
	razonSocial: "",
	/** NIT con dígito de verificación, ej. «900.123.456-7». */
	nit: "",
	/** Correo de contacto (ideal: @analizandoyautomatizando.com). */
	correo: "",
	/**
	 * WhatsApp opcional para agendar mientras no exista la agenda de Cal.com.
	 * Solo dígitos con indicativo de país, sin + ni espacios, ej. «573001234567».
	 */
	whatsapp: "",
};

/**
 * Enlace público del evento de Cal.com, ej. «https://cal.com/tu-usuario/diagnostico».
 * Se lee de la variable PUBLIC_CALCOM_URL (.env en local, variables de Cloudflare en producción).
 */
export const urlAgenda: string = (import.meta.env.PUBLIC_CALCOM_URL ?? "").trim();
