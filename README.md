# Suplementos BR — Tienda Ecommerce

Tienda online para **Suplementos BR**, un comercio de suplementación deportiva y bienestar de
San Miguel de Tucumán. Incluye catálogo, detalle de producto, carrito y cierre de pedido por
WhatsApp.

> **Datos del catálogo.** Los productos, marcas, presentaciones y precios fueron provistos por el
> comercio. La disponibilidad y los precios finales se confirman por WhatsApp.

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
| `/` | Home con hero, categorías, destacados, banner de marca, beneficios y selección de productos |
| `/catalogo` | Catálogo completo con búsqueda, filtros por categoría y orden |
| `/producto/[slug]` | Detalle de producto con compra y consulta por WhatsApp |
| `/carrito` | Carrito persistente y cierre de pedido por WhatsApp |

## Estructura

```
src/
├── app/                        # Rutas (App Router)
│   ├── catalogo/
│   ├── producto/[slug]/
│   └── carrito/
├── assets/productos/           # Fotos reales de los productos
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
- **Imágenes:** las fotos viven en `src/assets/productos` y se importan estáticamente en
  `products.ts`. Si falta una imagen, `ProductVisual` genera un packshot SVG de respaldo.
- **Logo:** el logo es un SVG ilustrativo creado para la tienda.

## Notas

- El carrito se guarda en `localStorage` del navegador.
- No hay pago online: el botón de cierre arma un mensaje con el pedido y abre WhatsApp.
- El número de WhatsApp incluido es un placeholder.
- El catálogo es estático. No hay reseñas ni promociones cargadas: la sección de promos se oculta
  automáticamente cuando ningún producto tiene `promo: true`.
