// Photo albums for the photos section, shown as folders. Album names are places Mudit
// has lived or been (his list). Each album has its own folder in public/photos/ (bay-area,
// chicago, dubai, phoenix, new-york, hong-kong, delhi), e.g. src: "/photos/chicago/1.webp".
// Photos are WebP, 1600px on the long side, metadata (GPS) stripped; the originals are in
// photo-originals/ (not committed). An entry without src shows as a placeholder. Each album
// shows its first three photos.
export type Photo = { src?: string; alt: string };
export type Album = { name: string; photos: Photo[] };

export const albums: Album[] = [
  {
    name: "Bay Area",
    photos: [
      { src: "/photos/bay-area/1.webp", alt: "Glass towers against a blue sky" },
      { src: "/photos/bay-area/2.webp", alt: "Red tail lights on a street at night, through a window" },
      { src: "/photos/bay-area/3.webp", alt: "Green hills beside the freeway" },
      { src: "/photos/bay-area/4.webp", alt: "A lighthouse on a cliff above the ocean at sunset" },
      { src: "/photos/bay-area/5.webp", alt: "The Golden Gate Bridge lit up in fog" },
    ],
  },
  {
    name: "Chicago",
    photos: [
      { src: "/photos/chicago/1.webp", alt: "The city and the lake shore from high up" },
      { src: "/photos/chicago/2.webp", alt: "The skyline at dusk under heavy clouds" },
      { src: "/photos/chicago/3.webp", alt: "A ferris wheel lit in rainbow colours at night" },
    ],
  },
  {
    name: "Dubai",
    photos: [
      { src: "/photos/dubai/1.webp", alt: "The Dubai Frame under clouds" },
      { src: "/photos/dubai/2.webp", alt: "Rows of coloured lights in a dark room" },
      { src: "/photos/dubai/3.webp", alt: "The city at night from high up" },
      { src: "/photos/dubai/4.webp", alt: "Burj Khalifa lit up for new year" },
    ],
  },
  {
    name: "Phoenix",
    photos: [
      { src: "/photos/phoenix/1.webp", alt: "Rippled clouds over the desert at sunset" },
      { src: "/photos/phoenix/2.webp", alt: "Orange flowers in bloom" },
      { src: "/photos/phoenix/3.webp", alt: "A glass office building at an empty crossing" },
      { src: "/photos/phoenix/4.webp", alt: "Tall grass and palm trees against a blue sky" },
    ],
  },
  {
    name: "New York",
    photos: [
      { src: "/photos/new-york/1.webp", alt: "A glass building lit blue at night" },
      { src: "/photos/new-york/2.webp", alt: "A wet street lined with old brick buildings" },
      { src: "/photos/new-york/3.webp", alt: "Looking up between towers in the financial district" },
      { src: "/photos/new-york/4.webp", alt: "The Statue of Liberty" },
      { src: "/photos/new-york/5.webp", alt: "Midtown at night from above" },
      { src: "/photos/new-york/6.webp", alt: "The Vessel at dusk" },
    ],
  },
  {
    name: "Hong Kong",
    photos: [
      { src: "/photos/hong-kong/1.webp", alt: "A golden pavilion over a garden pond" },
      { src: "/photos/hong-kong/2.webp", alt: "Red lanterns hung close together" },
      { src: "/photos/hong-kong/3.webp", alt: "An old apartment block against a grey sky" },
      { src: "/photos/hong-kong/4.webp", alt: "A market street under red and yellow lanterns" },
    ],
  },
  {
    name: "Delhi",
    photos: [
      { src: "/photos/delhi/1.webp", alt: "Old carvings on a stone wall" },
      { src: "/photos/delhi/2.webp", alt: "A flyover seen through a window" },
      { src: "/photos/delhi/3.webp", alt: "The Red Fort against a blue sky" },
      { src: "/photos/delhi/4.webp", alt: "Prayer flags over a crowded street" },
    ],
  },
];
