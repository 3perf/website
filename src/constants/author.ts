export type AuthorFields = {
  name: string;
  link: string;
  twitterId: string;
  facebookId: string;
};

export const DEFAULT_AUTHOR: AuthorFields = {
  name: 'Ivan Akulov',
  link: 'https://twitter.com/iamakulov',
  twitterId: 'iamakulov',
  facebookId: '100002052594007',
};

export function resolveAuthor(
  author: Partial<AuthorFields> | null | undefined,
): AuthorFields {
  return { ...DEFAULT_AUTHOR, ...(author ?? {}) };
}
