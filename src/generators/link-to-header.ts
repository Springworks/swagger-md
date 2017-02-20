export default function linkToHeader(header: string): string {
  const slug = header.replace(/\s/g, '-').replace(/[^a-z0-9_-]/gi, '').toLowerCase();
  return `[${header}](#${slug})`;
}
