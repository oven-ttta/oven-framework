import type { Context, NextFunction, Middleware } from '../types';

export interface StaticOptions {
  /** Root directory for static files */
  root: string;
  /** URL prefix for static files */
  prefix?: string;
  /** Index file name */
  index?: string;
  /** Max age for cache control (in seconds) */
  maxAge?: number;
  /** Enable directory listing */
  listing?: boolean;
}

/**
 * Static file serving middleware
 */
export function serveStatic(options: StaticOptions): Middleware {
  const {
    root,
    prefix = '',
    index = 'index.html',
    maxAge = 86400,
    listing = false,
  } = options;

  return async (ctx: Context, next: NextFunction): Promise<Response> => {
    // Only handle GET and HEAD requests
    if (ctx.method !== 'GET' && ctx.method !== 'HEAD') {
      return next();
    }

    let path = ctx.path;

    // Check if path matches prefix
    if (prefix && !path.startsWith(prefix)) {
      return next();
    }

    // Remove prefix from path
    if (prefix) {
      path = path.slice(prefix.length) || '/';
    }

    // Security: prevent directory traversal
    if (path.includes('..')) {
      return new Response('Forbidden', { status: 403 });
    }

    // Build file path
    let filePath = `${root}${path}`;

    try {
      const file = Bun.file(filePath);
      let exists = await file.exists();

      // Try index file for directories
      if (!exists && path.endsWith('/')) {
        filePath = `${root}${path}${index}`;
        const indexFile = Bun.file(filePath);
        exists = await indexFile.exists();

        if (exists) {
          return new Response(indexFile, {
            headers: {
              'Content-Type': indexFile.type,
              'Cache-Control': `public, max-age=${maxAge}`,
            },
          });
        }
      }

      if (exists) {
        // Check if it's a directory
        const stat = await Bun.file(filePath).exists();

        return new Response(file, {
          headers: {
            'Content-Type': file.type,
            'Cache-Control': `public, max-age=${maxAge}`,
            'ETag': `"${file.size}-${file.lastModified}"`,
          },
        });
      }
    } catch {
      // File doesn't exist or can't be read
    }

    // Pass to next handler
    return next();
  };
}

/**
 * Get MIME type from file extension
 */
function getMimeType(path: string): string {
  const ext = path.split('.').pop()?.toLowerCase();

  const mimeTypes: Record<string, string> = {
    html: 'text/html',
    css: 'text/css',
    js: 'application/javascript',
    json: 'application/json',
    png: 'image/png',
    jpg: 'image/jpeg',
    jpeg: 'image/jpeg',
    gif: 'image/gif',
    svg: 'image/svg+xml',
    ico: 'image/x-icon',
    woff: 'font/woff',
    woff2: 'font/woff2',
    ttf: 'font/ttf',
    eot: 'application/vnd.ms-fontobject',
    pdf: 'application/pdf',
    txt: 'text/plain',
    xml: 'application/xml',
  };

  return mimeTypes[ext || ''] || 'application/octet-stream';
}
