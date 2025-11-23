export const qk = {
  lps: ['lps'] as const,
  lp: (id: string|number) => ['lp', id] as const,
  comments: (lpId: string|number) => ['lp', lpId, 'comments'] as const,
  me: ['me'] as const,
};
