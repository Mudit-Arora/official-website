// Photos for the folder in the photos section, in order; the first five are shown and the
// first one sits in the middle of the fan. Files live in public/photos/.
// An entry without src is a placeholder until Mudit sends his own.
export type Photo = { src?: string; alt: string };

export const photos: Photo[] = [
  { src: "/photos/profile-pic.webp", alt: "Mudit at the San Francisco waterfront" },
  { alt: "{{photo 2}}" },
  { alt: "{{photo 3}}" },
  { alt: "{{photo 4}}" },
  { alt: "{{photo 5}}" },
];
