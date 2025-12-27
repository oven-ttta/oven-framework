// Oven Framework - Next.js style for Bun

// Core
export { Oven, createApp } from './core/app';
export { Router } from './core/router';
export { AppRouter, createAppRouter } from './core/app-router';
export { serve } from './core/server';

// Helpers
export { json, html, redirect, text } from './core/route';
export { generateMetaTags, mergeMetadata } from './core/metadata';

// Middleware
export { cors } from './middleware/cors';
export { logger } from './middleware/logger';
export { serveStatic } from './middleware/static';

// Types
export type {
  OvenConfig,
  Context,
  Middleware,
  RouteHandler,
  PageProps,
  LayoutProps,
  Metadata,
  PageModule,
  LayoutModule,
  LoadingModule,
  ErrorModule,
  NotFoundModule,
  RouteModule,
  CookieOptions,
  APIHandler,
  PageMeta,
  LegacyPageModule,
} from './types';
