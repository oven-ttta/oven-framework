import type { Context, NextFunction, Middleware } from '../types';

export interface LoggerOptions {
  format?: 'dev' | 'combined' | 'common' | 'short';
  skip?: (ctx: Context, res: Response) => boolean;
}

/**
 * Logger middleware
 */
export function logger(options: LoggerOptions = {}): Middleware {
  const { format = 'dev', skip } = options;

  return async (ctx: Context, next: NextFunction): Promise<Response> => {
    const start = performance.now();

    const response = await next();

    // Skip logging if configured
    if (skip && skip(ctx, response)) {
      return response;
    }

    const duration = performance.now() - start;
    const log = formatLog(format, ctx, response, duration);

    console.log(log);

    return response;
  };
}

function formatLog(
  format: string,
  ctx: Context,
  res: Response,
  duration: number
): string {
  const timestamp = new Date().toISOString();
  const status = res.status;
  const method = ctx.method;
  const path = ctx.pathname;
  const ms = duration.toFixed(2);

  // Color codes for terminal
  const colors = {
    reset: '\x1b[0m',
    green: '\x1b[32m',
    yellow: '\x1b[33m',
    red: '\x1b[31m',
    cyan: '\x1b[36m',
    gray: '\x1b[90m',
  };

  const statusColor =
    status >= 500 ? colors.red :
    status >= 400 ? colors.yellow :
    status >= 300 ? colors.cyan :
    colors.green;

  switch (format) {
    case 'dev':
      return `${colors.gray}${method}${colors.reset} ${path} ${statusColor}${status}${colors.reset} ${colors.gray}${ms}ms${colors.reset}`;

    case 'short':
      return `${method} ${path} ${status} ${ms}ms`;

    case 'common':
      return `- - [${timestamp}] "${method} ${path}" ${status}`;

    case 'combined':
      const userAgent = ctx.headers.get('user-agent') || '-';
      const referer = ctx.headers.get('referer') || '-';
      return `- - [${timestamp}] "${method} ${path}" ${status} - "${referer}" "${userAgent}"`;

    default:
      return `${method} ${path} ${status} ${ms}ms`;
  }
}
