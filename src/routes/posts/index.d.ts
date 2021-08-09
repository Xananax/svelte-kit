interface Metadata {
  date: string;
  date_unix: number;
  title: string;
  excerpt: string;
}

interface Post {
  slug: string;
  content: string;
  metadata: Metadata;
}

interface PostLocals<T = string> extends Record<string, T> {
  slug: string;
}
