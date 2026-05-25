import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "QuizSX7",
    short_name: "QuizSX7",
    description: "Placement practice for B-Tech students.",
    start_url: "/",
    display: "standalone",
    background_color: "#f8f6f0",
    theme_color: "#0b635e",
    icons: [
      {
        src: "/icon.svg",
        sizes: "any",
        type: "image/svg+xml"
      }
    ]
  };
}
