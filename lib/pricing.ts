// Single source of truth for pricing numbers, kept in a plain (non "use
// client") module so it can be imported directly by Server Component
// metadata/JSON-LD as well as by the client-rendered pricing UI in
// cennik-packages.tsx, without crossing the client/server boundary through
// a module that also exports live component references (icons).

export const packagePricing = [
  { id: "start", name: "ŠTART_", price: 490 },
  { id: "predaj", name: "PREDAJ_", price: 790 },
  { id: "vykon", name: "VÝKON_", price: 990 },
] as const;

export const eshopPricing = {
  name: "E-SHOP_",
  price: 2490,
} as const;

export const carePricing = {
  web: 39,
  eshop: 89,
} as const;
