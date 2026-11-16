# Suplementos BR — Demo Ecommerce

Demo comercial de tienda online para **Suplementos BR**, un comercio de suplementación
deportiva y bienestar de San Miguel de Tucumán. El objetivo es mostrar cómo se vería una
tienda propia: catálogo, detalle de producto, carrito y cierre de pedido por WhatsApp.

> **Contenido de demostración.** Productos, marcas, precios, stock, reseñas y promociones son
> ficticios. No representan información real del comercio.

## Stack

- Next.js 16 (App Router)
- TypeScript
- Tailwind CSS 4
- React 19
- Sin base de datos ni pasarela de pago

## Empezar

```bash
pnpm install
pnpm dev
```

Abrí [http://localhost:3000](http://localhost:3000).

Otros comandos:

```bash
pnpm build   # build de producción
pnpm lint    # eslint
```

## Páginas

| Ruta | Descripción |
| --- | --- |
| `/` | Home con hero, categorías, destacados, promos, banner de marca, beneficios y más vendidos |
| `/catalogo` | Catálogo completo con búsqueda, filtros por categoría, ofertas y orden |
| `/producto/[slug]` | Detalle de producto con compra y consulta por WhatsApp |
| `/carrito` | Carrito persistente y cierre de pedido por WhatsApp |

## Estructura

```
src/
├── app/                        # Rutas (App Router)
│   ├── catalogo/
│   ├── producto/[slug]/
│   └── carrito/
├── features/
│   ├── catalog/                # Datos, tipos y componentes de producto
│   ├── cart/                   # Contexto del carrito, líneas y checkout por WhatsApp
│   ├── home/                   # Secciones de la home
│   ├── layout/                 # Header, footer, top bar y botón flotante
│   └── shared/                 # Configuración del sitio, íconos y logo
```

## Personalización para el cliente

- **WhatsApp:** reemplazar `whatsappNumber` y `whatsappDisplay` en
  `src/features/shared/config/site.ts` por el número real.
- **Instagram y ubicación:** también en `src/features/shared/config/site.ts`.
- **Productos y precios:** `src/features/catalog/data/products.ts`.
- **Categorías:** `src/features/catalog/data/categories.ts`.
- **Logo e imágenes:** el logo y los packshots son SVG ilustrativos creados para la demo.
  Se pueden reemplazar por las imágenes reales del comercio manteniendo la misma estética.

## Notas de la demo

- El carrito se guarda en `localStorage` del navegador.
- No hay pago online: el botón de cierre arma un mensaje con el pedido y abre WhatsApp.
- El número de WhatsApp incluido es un placeholder.
