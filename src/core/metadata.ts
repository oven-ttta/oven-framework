import type { Metadata } from '../types';

/**
 * Generate HTML meta tags from Metadata object
 */
export function generateMetaTags(metadata: Metadata): string {
  const tags: string[] = [];

  // Description
  if (metadata.description) {
    tags.push(`<meta name="description" content="${escapeAttr(metadata.description)}">`);
  }

  // Keywords
  if (metadata.keywords?.length) {
    tags.push(`<meta name="keywords" content="${escapeAttr(metadata.keywords.join(', '))}">`);
  }

  // Author
  if (metadata.authors?.length) {
    tags.push(`<meta name="author" content="${escapeAttr(metadata.authors.map(a => a.name).join(', '))}">`);
  }

  // Creator
  if (metadata.creator) {
    tags.push(`<meta name="creator" content="${escapeAttr(metadata.creator)}">`);
  }

  // Publisher
  if (metadata.publisher) {
    tags.push(`<meta name="publisher" content="${escapeAttr(metadata.publisher)}">`);
  }

  // Robots
  if (metadata.robots) {
    if (typeof metadata.robots === 'string') {
      tags.push(`<meta name="robots" content="${escapeAttr(metadata.robots)}">`);
    } else {
      const directives: string[] = [];
      if (metadata.robots.index !== undefined) {
        directives.push(metadata.robots.index ? 'index' : 'noindex');
      }
      if (metadata.robots.follow !== undefined) {
        directives.push(metadata.robots.follow ? 'follow' : 'nofollow');
      }
      if (directives.length) {
        tags.push(`<meta name="robots" content="${directives.join(', ')}">`);
      }
    }
  }

  // Viewport
  if (metadata.viewport) {
    if (typeof metadata.viewport === 'string') {
      tags.push(`<meta name="viewport" content="${escapeAttr(metadata.viewport)}">`);
    } else {
      const parts: string[] = [];
      if (metadata.viewport.width) parts.push(`width=${metadata.viewport.width}`);
      if (metadata.viewport.initialScale) parts.push(`initial-scale=${metadata.viewport.initialScale}`);
      if (parts.length) {
        tags.push(`<meta name="viewport" content="${parts.join(', ')}">`);
      }
    }
  }

  // Theme Color
  if (metadata.themeColor) {
    tags.push(`<meta name="theme-color" content="${escapeAttr(metadata.themeColor)}">`);
  }

  // Open Graph
  if (metadata.openGraph) {
    const og = metadata.openGraph;
    if (og.title) tags.push(`<meta property="og:title" content="${escapeAttr(og.title)}">`);
    if (og.description) tags.push(`<meta property="og:description" content="${escapeAttr(og.description)}">`);
    if (og.url) tags.push(`<meta property="og:url" content="${escapeAttr(og.url)}">`);
    if (og.siteName) tags.push(`<meta property="og:site_name" content="${escapeAttr(og.siteName)}">`);
    if (og.type) tags.push(`<meta property="og:type" content="${escapeAttr(og.type)}">`);
    if (og.locale) tags.push(`<meta property="og:locale" content="${escapeAttr(og.locale)}">`);

    if (og.images?.length) {
      for (const img of og.images) {
        tags.push(`<meta property="og:image" content="${escapeAttr(img.url)}">`);
        if (img.width) tags.push(`<meta property="og:image:width" content="${img.width}">`);
        if (img.height) tags.push(`<meta property="og:image:height" content="${img.height}">`);
        if (img.alt) tags.push(`<meta property="og:image:alt" content="${escapeAttr(img.alt)}">`);
      }
    }
  }

  // Twitter Card
  if (metadata.twitter) {
    const tw = metadata.twitter;
    if (tw.card) tags.push(`<meta name="twitter:card" content="${escapeAttr(tw.card)}">`);
    if (tw.title) tags.push(`<meta name="twitter:title" content="${escapeAttr(tw.title)}">`);
    if (tw.description) tags.push(`<meta name="twitter:description" content="${escapeAttr(tw.description)}">`);
    if (tw.creator) tags.push(`<meta name="twitter:creator" content="${escapeAttr(tw.creator)}">`);

    if (tw.images?.length) {
      for (const img of tw.images) {
        tags.push(`<meta name="twitter:image" content="${escapeAttr(img)}">`);
      }
    }
  }

  // Icons
  if (metadata.icons) {
    if (typeof metadata.icons.icon === 'string') {
      tags.push(`<link rel="icon" href="${escapeAttr(metadata.icons.icon)}">`);
    } else if (Array.isArray(metadata.icons.icon)) {
      for (const icon of metadata.icons.icon) {
        const sizes = icon.sizes ? ` sizes="${icon.sizes}"` : '';
        tags.push(`<link rel="icon" href="${escapeAttr(icon.url)}"${sizes}>`);
      }
    }

    if (typeof metadata.icons.apple === 'string') {
      tags.push(`<link rel="apple-touch-icon" href="${escapeAttr(metadata.icons.apple)}">`);
    } else if (Array.isArray(metadata.icons.apple)) {
      for (const icon of metadata.icons.apple) {
        const sizes = icon.sizes ? ` sizes="${icon.sizes}"` : '';
        tags.push(`<link rel="apple-touch-icon" href="${escapeAttr(icon.url)}"${sizes}>`);
      }
    }
  }

  // Manifest
  if (metadata.manifest) {
    tags.push(`<link rel="manifest" href="${escapeAttr(metadata.manifest)}">`);
  }

  return tags.join('\n    ');
}

/**
 * Merge metadata objects (child overrides parent)
 */
export function mergeMetadata(parent: Metadata, child: Metadata): Metadata {
  return {
    ...parent,
    ...child,
    openGraph: child.openGraph ? { ...parent.openGraph, ...child.openGraph } : parent.openGraph,
    twitter: child.twitter ? { ...parent.twitter, ...child.twitter } : parent.twitter,
    icons: child.icons ? { ...parent.icons, ...child.icons } : parent.icons,
  };
}

/**
 * Escape HTML attribute value
 */
function escapeAttr(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}
