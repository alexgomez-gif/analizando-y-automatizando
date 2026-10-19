# scrollcraft (motor de scroll de terceros)

- **Origen:** skill `scroll-craft` del plugin `nateherk-design` 0.3.1 (https://github.com/nateherkai/scroll-craft).
- **Licencia:** MIT, © 2026 Nate Herk. Ver `LICENSE` (debe acompañar siempre a estos archivos).
- **No se editan** `scrollcraft.js` ni `scrollcraft.css`: son el mecanismo. Los efectos propios del sitio van en
  nuestros componentes, leyendo `--sc-p` y nuestros propios atributos `data-sc-*`.
- **Cómo se integra** (ver `src/styles/global.css`):
  - Su CSS vive en la capa `scrollcraft`, la de menor prioridad: los estilos de marca siempre ganan.
  - Sus tokens (`--sc-*`) apuntan a los tokens de marca, así que los dos temas funcionan solos.
  - Lo que contradice `docs/marca.md` no se adopta (marca.md manda; decisión del 2026-10-18).
- **Reglas globales del motor** (verificadas con capturas el 2026-10-19):
  - Neutralizada: `letter-spacing: -0.005em` en `body` (cambiaba todo el texto del sitio).
  - Aceptadas: sin negritas falsas, cifras tabulares en tablas, scroll suave (se apaga con «reducir movimiento»),
    selección y barra de desplazamiento con los colores de marca.
- `src/vendor` está excluido de `astro check` (código de terceros que no editamos).
