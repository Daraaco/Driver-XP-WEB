# Web Maintenance Guide

## 1. Stack y arquitectura

- Frontend: React 19 + Vite.
- Estilos: TailwindCSS + utilidades custom en `src/index.css`.
- Animaciones: `framer-motion`.
- UI base de dashboard: `src/components/ui/*` (Radix + helpers).
- Datos dashboard: `src/lib/dashboardStore.js`.
- Backend opcional: Supabase (DB + Storage).

## 2. Estructura de carpetas (como esta organizado)

- `src/assets`: imagenes y video locales.
- `src/components`: componentes compartidos del sitio.
- `src/components/ui`: componentes UI reutilizables para dialogs/toasts/botones.
- `src/content`: contenido editable central.
- `src/features/dashboard/components`: componentes propios del dashboard.
- `src/features/dashboard/pages`: pagina de entrada del dashboard.
- `src/lib`: utilidades globales y clientes externos.
- `src/pages`: paginas del sitio principal (landing).

## 3. Flujo de navegacion (sin router)

Archivo: `src/App.jsx`

- Estado principal: `activePage`.
- `renderPage()` decide que modulo renderizar.
- Navbar solo llama `setActivePage(...)`.

Riesgo comun:

- Si agregas un valor nuevo en Navbar y no agregas su `case` en `renderPage()`, la vista no cambia correctamente.

## 4. Como cambiar contenido (texto/copy)

Primera fuente:

- `src/content/siteContent.js`

Ahi puedes editar:

- Titulos y textos comerciales.
- Datos de contacto/redes.

Segunda fuente (copy hardcodeado):

- `src/pages/Home.jsx`
- `src/pages/About.jsx`
- `src/pages/DriverXP.jsx`
- `src/pages/Services.jsx`
- `src/pages/Contact.jsx`

Riesgo comun:

- Cambiar texto en `siteContent.js` esperando que actualice una seccion que tiene copy hardcodeado en pagina.

## 5. Como cambiar imagenes y video

- Logo header: `src/assets/driverxp-header.png`.
- Fondo: `src/assets/fondo1.jpg`.
- Poster: `src/assets/poster3.jpg`.
- Video principal: `src/assets/video-driver.mp4`.

Puedes:

1. Reemplazar archivo manteniendo el nombre.
2. O importar otro archivo y actualizar el import en el componente.

Riesgo comun:

- Video muy pesado aumenta tiempo de build/carga inicial.

## 6. Dashboard (funcionamiento interno)

Entrada dashboard:

- `src/features/dashboard/pages/DriverXPDashboard.jsx`

Componentes principales:

- `Dashboard.jsx`: selector de acceso (admin o empresa) y sesiones.
- `AdminPanel.jsx`: CRUD de empresas y documentos.
- `CompanyLogin.jsx`: login de empresa.
- `CompanyDashboard.jsx`: vista de documentos para empresa.
- Dialogs: `AddCompanyDialog.jsx`, `EditCompanyDialog.jsx`, `UploadPDFDialog.jsx`.
- `PDFViewer.jsx`: visualizador modal.

Sesiones de dashboard:

- `adminSession` en `localStorage`.
- `companySession` en `localStorage`.

## 7. Datos: Supabase vs localStorage

Archivo clave:

- `src/lib/dashboardStore.js`

Regla:

- Si hay variables Supabase, usa Supabase.
- Si no, usa localStorage.

Funciones clave:

- `fetchCompanies()`
- `createCompany()`
- `updateCompany()`
- `deleteCompany()`
- `createDocument()`
- `deleteDocument()`
- `authenticateCompany()`

Riesgos comunes:

- Cambiar nombre de columnas en Supabase sin actualizar `dashboardStore.js`.
- No crear bucket `company-pdfs` y fallar uploads.
- RLS/policies bloqueando lecturas o inserts.

## 8. Configuracion Supabase paso a paso

1. Crear `.env` con base en `.env.example`.
2. Setear:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
   - `VITE_ADMIN_PASSWORD` (opcional)
3. Ejecutar SQL:
   - `supabase/schema.sql`
   - `supabase/storage.sql`
4. Reiniciar `npm run dev`.

## 9. UI y estilos (donde tocar sin romper)

- Config Tailwind: `tailwind.config.js`.
- Variables CSS base: `src/index.css` (`:root` con tokens).
- Utilidades custom:
  - `.bg-background-dark`
  - `.glass-panel`
  - `.card-hover`
  - `.custom-scrollbar`

Riesgos comunes:

- Eliminar variables CSS que usan componentes UI de Radix.
- Romper alias de Tailwind classes al limpiar `content` en config.

## 10. Alias y paths

Alias configurado:

- `@` -> `src`

Archivo:

- `vite.config.js`

Riesgo comun:

- Quitar alias o cambiarlo sin actualizar imports `@/...`.

## 11. Checklist antes de merge/deploy

1. `npm run lint`
2. `npm run build`
3. Probar navegacion:
   - Home, About, DriverXP, Services, Contact.
   - Boton `Inicio de sesion` abre dashboard.
4. Probar dashboard:
   - Login admin.
   - Crear/editar/eliminar empresa.
   - Subir PDF y visualizar/descargar.
   - Login empresa y acceso a documentos.
5. Si hay Supabase:
   - Confirmar lecturas/escrituras reales en tablas.
   - Confirmar upload en bucket `company-pdfs`.

## 12. Lugares donde mas se rompe

- `src/App.jsx`: keys de navegacion desalineadas con Navbar.
- `src/lib/dashboardStore.js`: cambios de esquema SQL no reflejados.
- `src/components/ui/*`: imports de utilidades o tokens CSS faltantes.
- `tailwind.config.js` y `src/index.css`: tokens quitados accidentalmente.
- Variables `.env` incompletas o mal nombradas.

## 13. Convenciones recomendadas para futuros cambios

- Mantener features nuevas bajo `src/features/<feature-name>/`.
- Mantener `src/components/` solo para componentes realmente compartidos.
- Si agregas integracion externa, centralizarla en `src/lib/`.
- Toda funcionalidad nueva debe quedar documentada en este archivo y en `README.md`.
