import { posts } from "#site/content";

export type Post = (typeof posts)[number];

export function getPublishedPosts(): Post[] {
  return posts
    .filter((post) => post.published)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getPostBySlug(slug: string): Post | undefined {
  return posts.find((post) => post.slug === slug && post.published);
}

export function getPostsByTag(tag: string): Post[] {
  return getPublishedPosts().filter((post) =>
    post.tags.map((t) => t.toLowerCase()).includes(tag.toLowerCase())
  );
}

export function getAllTags(): Record<string, number> {
  const tags: Record<string, number> = {};
  getPublishedPosts().forEach((post) => {
    post.tags.forEach((tag) => {
      const lower = tag.toLowerCase();
      tags[lower] = (tags[lower] || 0) + 1;
    });
  });
  return tags;
}

export function getAdjacentPosts(slug: string) {
  const allPosts = getPublishedPosts();
  const index = allPosts.findIndex((post) => post.slug === slug);
  return {
    prev: index < allPosts.length - 1 ? allPosts[index + 1] : null,
    next: index > 0 ? allPosts[index - 1] : null,
  };
}
