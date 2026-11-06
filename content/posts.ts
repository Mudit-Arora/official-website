// Posts for the writing list. A post without a slug is a draft and is listed but not linked.
// Published posts live at app/writing/<slug>/.
export type Post = { title: string; slug?: string; date?: string; tag?: string };

// Placeholder draft titles; Mudit will replace these.
export const posts: Post[] = [
  { title: "Building a voice agent for blind users in a weekend", tag: "Blindspot" },
  { title: "What emotion looks like in 28 languages", tag: "SemEval 2025" },
  { title: "Why this site stopped being a résumé" },
];
