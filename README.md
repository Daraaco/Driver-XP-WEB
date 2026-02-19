# Driver XP Web

Sitio web de Driver XP (landing comercial + dashboard de acceso para empresas y admin) en React + Vite + Tailwind.

## Inicio rapido

```bash
npm install
npm run dev
```

Build de produccion:

```bash
npm run build
npm run preview
```

## Estructura del proyecto

- `src/App.jsx`: flujo principal de navegacion por estado (`activePage`).
- `src/components/`: componentes compartidos del sitio (navbar, loader, etc.).
- `src/components/ui/`: componentes UI reutilizables (button, dialog, toast).
- `src/pages/`: paginas principales del sitio (Home, About, Services, Contact, DriverXP).
- `src/features/dashboard/`: feature completa del dashboard (componentes + pagina de entrada).
- `src/content/siteContent.js`: contenido editable de textos/datos del sitio.
- `src/lib/dashboardStore.js`: capa de datos del dashboard (Supabase o fallback localStorage).
- `src/lib/supabaseClient.js`: cliente Supabase.
- `supabase/`: SQL para tablas y storage.

## Navegacion

No hay `react-router`. La app usa estado interno:

- `activePage = "home" | "about" | "driverxp" | "driverxp-dashboard" | "services" | "contact"`
- Navbar cambia la pagina con `setActivePage(...)`.

Boton superior para dashboard (publico):

- Texto: `Acceso empresa`
- Accion: abre `driverxp-dashboard` en login de empresa.

Acceso admin oculto por URL:

- Configura `VITE_ADMIN_ACCESS_KEY` en `.env`.
- Entra a `/#/<VITE_ADMIN_ACCESS_KEY>` para abrir el login admin.
- Ejemplo: `/#/driverxp-admin-2026`

## Dashboard y datos

El dashboard funciona en 2 modos:

1. Con Supabase (si existen `VITE_SUPABASE_URL` y `VITE_SUPABASE_ANON_KEY`).
2. Modo demo con `localStorage` (si no hay credenciales).

Configuracion:

1. Copia `.env.example` a `.env`.
2. Ejecuta `supabase/schema.sql`.
3. Ejecuta `supabase/storage.sql`.
4. Reinicia servidor (`npm run dev`).

## Documentacion completa

La guia detallada de mantenimiento, cambios seguros y puntos donde se puede romper el proyecto esta en:

- `docs/WEB_MAINTENANCE.md`

## Validacion recomendada

```bash
npm run lint
npm run build
```
