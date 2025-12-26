import type { Context, NextFunction, Middleware } from '../types';

export interface CorsOptions {
  origin?: string | string[] | ((origin: string) => boolean);
  methods?: string[];
  allowedHeaders?: string[];
  exposedHeaders?: string[];
  credentials?: boolean;
  maxAge?: number;
}

const defaultOptions: CorsOptions = {
  origin: '*',
  methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: false,
  maxAge: 86400,
};

/**
 * CORS middleware
 */
export function cors(options: CorsOptions = {}): Middleware {
  const opts = { ...defaultOptions, ...options };

  return async (ctx: Context, next: NextFunction): Promise<Response> => {
    const origin = ctx.headers.get('origin') || '';

    // Check if origin is allowed
    let allowedOrigin = '*';

    if (typeof opts.origin === 'string') {
      allowedOrigin = opts.origin;
    } else if (Array.isArray(opts.origin)) {
      allowedOrigin = opts.origin.includes(origin) ? origin : '';
    } else if (typeof opts.origin === 'function') {
      allowedOrigin = opts.origin(origin) ? origin : '';
    }

    // Handle preflight requests
    if (ctx.method === 'OPTIONS') {
      return new Response(null, {
        status: 204,
        headers: {
          'Access-Control-Allow-Origin': allowedOrigin,
          'Access-Control-Allow-Methods': opts.methods!.join(', '),
          'Access-Control-Allow-Headers': opts.allowedHeaders!.join(', '),
          'Access-Control-Max-Age': String(opts.maxAge),
          ...(opts.credentials && { 'Access-Control-Allow-Credentials': 'true' }),
        },
      });
    }

    // Get response from next handler
    const response = await next();

    // Clone response and add CORS headers
    const newHeaders = new Headers(response.headers);
    newHeaders.set('Access-Control-Allow-Origin', allowedOrigin);

    if (opts.exposedHeaders?.length) {
      newHeaders.set('Access-Control-Expose-Headers', opts.exposedHeaders.join(', '));
    }

    if (opts.credentials) {
      newHeaders.set('Access-Control-Allow-Credentials', 'true');
    }

    return new Response(response.body, {
      status: response.status,
      statusText: response.statusText,
      headers: newHeaders,
    });
  };
}
