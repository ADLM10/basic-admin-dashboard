export function getDateTime(): string {
  const now = new Date();
  return now.toISOString();
}
