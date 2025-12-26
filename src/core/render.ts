import type { PageMeta } from '../types';

interface RenderOptions {
  head?: string;
  meta?: PageMeta;
  scripts?: string[];
  styles?: string[];
  bodyAttrs?: Record<string, string>;
  htmlAttrs?: Record<string, string>;
}

/**
 * Render a full HTML page
 */
export function renderHTML(
  content: string,
  options: RenderOptions = {}
): string {
  const {
    head = '',
    meta = {},
    scripts = [],
    styles = [],
    bodyAttrs = {},
    htmlAttrs = { lang: 'en' },
  } = options;

  const htmlAttrsStr = Object.entries(htmlAttrs)
    .map(([k, v]) => `${k}="${escapeHtml(v)}"`)
    .join(' ');

  const bodyAttrsStr = Object.entries(bodyAttrs)
    .map(([k, v]) => `${k}="${escapeHtml(v)}"`)
    .join(' ');

  const metaTags = generateMetaTags(meta);
  const styleTags = styles.map((s) => `<link rel="stylesheet" href="${escapeHtml(s)}">`).join('\n    ');
  const scriptTags = scripts.map((s) => `<script src="${escapeHtml(s)}"></script>`).join('\n    ');

  return `<!DOCTYPE html>
<html ${htmlAttrsStr}>
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    ${metaTags}
    ${styleTags}
    ${head}
  </head>
  <body ${bodyAttrsStr}>
    ${content}
    ${scriptTags}
  </body>
</html>`;
}

/**
 * Generate meta tags from PageMeta
 */
function generateMetaTags(meta: PageMeta): string {
  const tags: string[] = [];

  if (meta.title) {
    tags.push(`<title>${escapeHtml(meta.title)}</title>`);
  }

  if (meta.description) {
    tags.push(`<meta name="description" content="${escapeHtml(meta.description)}">`);
  }

  // Handle Open Graph tags
  for (const [key, value] of Object.entries(meta)) {
    if (key.startsWith('og:') && typeof value === 'string') {
      tags.push(`<meta property="${escapeHtml(key)}" content="${escapeHtml(value)}">`);
    }
  }

  return tags.join('\n    ');
}

/**
 * Escape HTML special characters
 */
export function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

/**
 * Simple template literal tag for HTML
 * Automatically escapes interpolated values
 */
export function html(
  strings: TemplateStringsArray,
  ...values: unknown[]
): string {
  return strings.reduce((result, str, i) => {
    const value = values[i - 1];
    const escaped = value === undefined ? '' :
      typeof value === 'string' ? escapeHtml(value) :
      String(value);
    return result + escaped + str;
  });
}

/**
 * Raw HTML (no escaping)
 */
export function raw(content: string): { __html: string } {
  return { __html: content };
}

/**
 * Component-like function helper
 */
export type Component<P = Record<string, unknown>> = (props: P) => string;

/**
 * Create a component
 */
export function defineComponent<P = Record<string, unknown>>(
  render: (props: P) => string
): Component<P> {
  return render;
}
