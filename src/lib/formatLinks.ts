export function formatLinks(links: { code: string; url: string }[]) {
  return links.map(({ code, url }) => `${url}\n(${code})`).join('\n');
}
