// Oven Framework Types - Next.js App Router Style

export interface OvenConfig {
  /** Port to run the server on */
  port?: number;
  /** App directory (default: 'app') */
  appDir?: string;
  /** Directory for static files */
  publicDir?: string;
  /** Enable development mode */
  dev?: boolean;
  /** Base path for the application */
  basePath?: string;
}

export interface Context {
  /** The original Request object */
  req: Request;
  /** URL parameters from dynamic routes */
  params: Record<string, string>;
  /** Query string parameters (searchParams) */
  searchParams: Record<string, string>;
  /** Request headers */
  headers: Headers;
  /** URL pathname */
  pathname: string;
  /** HTTP method */
  method: string;
  /** Get a cookie value */
  cookies: {
    get: (name: string) => string | undefined;
    set: (name: string, value: string, options?: CookieOptions) => void;
    delete: (name: string) => void;
  };
  /** JSON body (if parsed) */
  body?: unknown;
}

export interface CookieOptions {
  maxAge?: number;
  expires?: Date;
  path?: string;
  domain?: string;
  secure?: boolean;
  httpOnly?: boolean;
  sameSite?: 'Strict' | 'Lax' | 'None';
}

export type NextFunction = () => Promise<Response> | Response;

export type Middleware = (
  ctx: Context,
  next: NextFunction
) => Promise<Response> | Response;

export type RouteHandler = (ctx: Context) => Promise<Response> | Response;

export interface Route {
  path: string;
  pattern: RegExp;
  paramNames: string[];
  handler: RouteHandler;
  method?: string;
}

// Next.js-like Page Component
export interface PageProps {
  params: Record<string, string>;
  searchParams: Record<string, string>;
}

// Next.js-like Layout Component
export interface LayoutProps {
  children: string;
  params: Record<string, string>;
}

// Next.js-like Metadata
export interface Metadata {
  title?: string | { default: string; template?: string };
  description?: string;
  keywords?: string[];
  authors?: { name: string; url?: string }[];
  creator?: string;
  publisher?: string;
  robots?: string | { index?: boolean; follow?: boolean };
  openGraph?: {
    title?: string;
    description?: string;
    url?: string;
    siteName?: string;
    images?: { url: string; width?: number; height?: number; alt?: string }[];
    locale?: string;
    type?: string;
  };
  twitter?: {
    card?: 'summary' | 'summary_large_image' | 'app' | 'player';
    title?: string;
    description?: string;
    images?: string[];
    creator?: string;
  };
  icons?: {
    icon?: string | { url: string; sizes?: string }[];
    apple?: string | { url: string; sizes?: string }[];
  };
  manifest?: string;
  viewport?: string | { width?: string; initialScale?: number };
  themeColor?: string;
  [key: string]: unknown;
}

// Page Module exports
export interface PageModule {
  default: (props: PageProps) => string | Promise<string>;
  metadata?: Metadata;
  generateMetadata?: (props: PageProps) => Promise<Metadata> | Metadata;
  generateStaticParams?: () => Promise<Record<string, string>[]>;
}

// Layout Module exports
export interface LayoutModule {
  default: (props: LayoutProps) => string | Promise<string>;
  metadata?: Metadata;
}

// Loading Module
export interface LoadingModule {
  default: () => string;
}

// Error Module
export interface ErrorModule {
  default: (props: { error: Error; reset: () => void }) => string;
}

// Not Found Module
export interface NotFoundModule {
  default: () => string;
}

// Route Handler (API) Module - Next.js style
export interface RouteModule {
  GET?: (request: Request, context: { params: Record<string, string> }) => Response | Promise<Response>;
  POST?: (request: Request, context: { params: Record<string, string> }) => Response | Promise<Response>;
  PUT?: (request: Request, context: { params: Record<string, string> }) => Response | Promise<Response>;
  PATCH?: (request: Request, context: { params: Record<string, string> }) => Response | Promise<Response>;
  DELETE?: (request: Request, context: { params: Record<string, string> }) => Response | Promise<Response>;
  HEAD?: (request: Request, context: { params: Record<string, string> }) => Response | Promise<Response>;
  OPTIONS?: (request: Request, context: { params: Record<string, string> }) => Response | Promise<Response>;
}

export interface BuildManifest {
  pages: Record<string, string>;
  assets: Record<string, string>;
}

// Server Actions
export type ServerAction = (...args: unknown[]) => Promise<unknown>;

// Revalidation
export type RevalidateType = number | false;
