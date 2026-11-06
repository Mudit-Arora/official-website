// Published posts, newest first. Each one lives at app/writing/<slug>/.
// While this is empty, the writing section shows "Coming soon!".
export type Post = { title: string; slug: string; date: string; tag?: string };

export const posts: Post[] = [];
