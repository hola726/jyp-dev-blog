import Fuse from "fuse.js";
import type { Post } from "./posts";

export function createSearchIndex(posts: Post[]) {
  return new Fuse(posts, {
    keys: [
      { name: "title", weight: 3 },
      { name: "description", weight: 2 },
      { name: "tags", weight: 1 },
    ],
    threshold: 0.3,
    includeScore: true,
  });
}
