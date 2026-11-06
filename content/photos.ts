// Photos for the strip, in order. Files live in public/photos/.
// An entry without src is a placeholder until Mudit sends his own (6 to 8 in total).
export type Photo = { src?: string; alt: string };

export const photos: Photo[] = [
  { alt: "{{photo 1}}" },
  { src: "/photos/profile-pic.webp", alt: "Mudit at the San Francisco waterfront" },
  { alt: "{{photo 3}}" },
  { alt: "{{photo 4}}" },
  { alt: "{{photo 5}}" },
  { alt: "{{photo 6}}" },
];
