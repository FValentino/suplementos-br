export const SITE = {
  name: "Suplementos BR",
  tagline: "Suplementación deportiva y bienestar",
  instagramHandle: "@suplementos.br1",
  instagramUrl: "https://instagram.com/suplementos.br1",
  location: "San Miguel de Tucumán, Argentina",
  whatsappNumber: "5493815550123",
  whatsappDisplay: "+54 9 381 555-0123",
  email: "hola@suplementosbr.demo",
  copyrightYear: 2026,
} as const;

export const NAV_LINKS = [
  { label: "Inicio", href: "/" },
  { label: "Catálogo", href: "/catalogo" },
  { label: "Promos", href: "/catalogo?promo=1" },
  { label: "Categorías", href: "/#categorias" },
] as const;
