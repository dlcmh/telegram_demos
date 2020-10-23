export function pluralizedPushups(count = 0): string {
  if (count < 2) return 'pushup';
  return 'pushups';
}
