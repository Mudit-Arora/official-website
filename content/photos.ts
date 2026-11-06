// Photo albums for the photos section, shown as folders. Album names are places Mudit
// has lived or been (his list). Files live in public/photos/; an entry without src is a
// placeholder until Mudit sends his own. Each album shows its first three photos.
export type Photo = { src?: string; alt: string };
export type Album = { name: string; photos: Photo[] };

export const albums: Album[] = [
  { name: "Bay Area", photos: [{ alt: "{{Bay Area 1}}" }, { alt: "{{Bay Area 2}}" }, { alt: "{{Bay Area 3}}" }] },
  { name: "Chicago", photos: [{ alt: "{{Chicago 1}}" }, { alt: "{{Chicago 2}}" }, { alt: "{{Chicago 3}}" }] },
  { name: "Dubai", photos: [{ alt: "{{Dubai 1}}" }, { alt: "{{Dubai 2}}" }, { alt: "{{Dubai 3}}" }] },
  { name: "Phoenix", photos: [{ alt: "{{Phoenix 1}}" }, { alt: "{{Phoenix 2}}" }, { alt: "{{Phoenix 3}}" }] },
  { name: "New York", photos: [{ alt: "{{New York 1}}" }, { alt: "{{New York 2}}" }, { alt: "{{New York 3}}" }] },
  { name: "Hong Kong", photos: [{ alt: "{{Hong Kong 1}}" }, { alt: "{{Hong Kong 2}}" }, { alt: "{{Hong Kong 3}}" }] },
  { name: "Delhi", photos: [{ alt: "{{Delhi 1}}" }, { alt: "{{Delhi 2}}" }, { alt: "{{Delhi 3}}" }] },
];
