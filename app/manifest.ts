import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "ZJAV_ — Weby na mieru",
    short_name: "ZJAV_",
    description:
      "Rýchle a spoľahlivé weby na mieru. Prototyp zadarmo do 24 hodín, hotový web do 7 dní.",
    start_url: "/",
    display: "standalone",
    background_color: "#06080D",
    theme_color: "#06080D",
    lang: "sk",
    icons: [
      { src: "/icon-light-32x32.png", sizes: "32x32", type: "image/png" },
      { src: "/icon-dark-32x32.png", sizes: "32x32", type: "image/png" },
      { src: "/icon.svg", sizes: "any", type: "image/svg+xml" },
      { src: "/apple-icon.png", sizes: "180x180", type: "image/png" },
    ],
  };
}
