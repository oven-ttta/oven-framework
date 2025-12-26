#!/usr/bin/env bun

/**
 * Oven CLI - Next.js-style framework powered by Bun
 */

const COMMANDS = {
  dev: 'Start development server with hot reload',
  build: 'Build the application for production',
  start: 'Start production server',
  create: 'Create a new Oven project',
  help: 'Show this help message',
};

async function main() {
  const args = process.argv.slice(2);
  const command = args[0];

  switch (command) {
    case 'dev':
      await runDev();
      break;
    case 'build':
      await runBuild();
      break;
    case 'start':
      await runStart();
      break;
    case 'create':
      await runCreate(args[1]);
      break;
    case 'help':
    case '--help':
    case '-h':
      showHelp();
      break;
    case '--version':
    case '-v':
      showVersion();
      break;
    default:
      if (command) {
        console.error(`Unknown command: ${command}`);
      }
      showHelp();
      process.exit(1);
  }
}

function showHelp() {
  console.log(`
  🔥 Oven - Next.js-style framework powered by Bun

  Usage: oven <command> [options]

  Commands:
${Object.entries(COMMANDS)
    .map(([cmd, desc]) => `    ${cmd.padEnd(12)} ${desc}`)
    .join('\n')}

  Options:
    -h, --help     Show this help message
    -v, --version  Show version number

  Examples:
    oven dev           Start development server
    oven build         Build for production
    oven start         Start production server
    oven create myapp  Create a new project
  `);
}

function showVersion() {
  console.log('oven v0.1.0');
}

async function runDev() {
  console.log('🔥 Starting Oven development server...\n');

  const port = parseInt(process.env.PORT || '3000');

  // Load config
  let config = {};
  try {
    const configModule = await import(process.cwd() + '/oven.config.ts');
    config = configModule.default || configModule;
  } catch {
    try {
      const configModule = await import(process.cwd() + '/oven.config.js');
      config = configModule.default || configModule;
    } catch {
      // No config file found, use defaults
    }
  }

  const { Oven } = await import('../src/core/app.ts');

  const app = new Oven({
    ...config,
    dev: true,
    appDir: config.appDir || 'app',
    publicDir: config.publicDir || 'public',
  });

  await app.listen(port);
}

async function runBuild() {
  console.log('📦 Building Oven application for production...\n');

  const startTime = Date.now();

  try {
    const result = await Bun.build({
      entrypoints: ['./app'],
      outdir: './.oven',
      target: 'bun',
      minify: true,
      sourcemap: 'external',
    });

    if (result.success) {
      const duration = Date.now() - startTime;
      console.log(`✅ Build completed in ${duration}ms`);
      console.log(`📁 Output: ./.oven`);
    } else {
      console.error('❌ Build failed:');
      for (const log of result.logs) {
        console.error(log);
      }
      process.exit(1);
    }
  } catch (error) {
    console.error('❌ Build error:', error);
    process.exit(1);
  }
}

async function runStart() {
  console.log('🚀 Starting Oven production server...\n');

  const port = parseInt(process.env.PORT || '3000');

  let config = {};
  try {
    const configModule = await import(process.cwd() + '/oven.config.ts');
    config = configModule.default || configModule;
  } catch {}

  const { Oven } = await import('../src/core/app.ts');

  const app = new Oven({
    ...config,
    dev: false,
    appDir: config.appDir || 'app',
  });

  await app.listen(port);
}

async function runCreate(projectName) {
  if (!projectName) {
    console.error('Please provide a project name: oven create <project-name>');
    process.exit(1);
  }

  console.log(`\n🔥 Creating new Oven project: ${projectName}\n`);

  const fs = require('fs');
  const path = require('path');

  const projectDir = path.join(process.cwd(), projectName);

  if (fs.existsSync(projectDir)) {
    console.error(`Directory ${projectName} already exists!`);
    process.exit(1);
  }

  fs.mkdirSync(projectDir, { recursive: true });

  // Create project structure
  const dirs = [
    'app',
    'app/api/hello',
    'app/about',
    'public',
    'components',
    'lib',
  ];

  for (const dir of dirs) {
    fs.mkdirSync(path.join(projectDir, dir), { recursive: true });
  }

  // package.json
  const pkg = {
    name: projectName,
    version: '0.1.0',
    type: 'module',
    scripts: {
      dev: 'oven dev',
      build: 'oven build',
      start: 'oven start',
    },
    dependencies: {
      oven: 'latest',
    },
    devDependencies: {
      '@types/bun': 'latest',
      typescript: '^5.3.0',
    },
  };
  fs.writeFileSync(
    path.join(projectDir, 'package.json'),
    JSON.stringify(pkg, null, 2)
  );

  // tsconfig.json
  const tsconfig = {
    compilerOptions: {
      target: 'ESNext',
      module: 'ESNext',
      moduleResolution: 'bundler',
      strict: true,
      esModuleInterop: true,
      skipLibCheck: true,
      forceConsistentCasingInFileNames: true,
      jsx: 'preserve',
      lib: ['ESNext', 'DOM'],
      types: ['bun-types'],
    },
    include: ['**/*.ts', '**/*.tsx'],
    exclude: ['node_modules'],
  };
  fs.writeFileSync(
    path.join(projectDir, 'tsconfig.json'),
    JSON.stringify(tsconfig, null, 2)
  );

  // oven.config.ts
  const configFile = `import type { OvenConfig } from 'oven';

const config: OvenConfig = {
  port: 3000,
  appDir: 'app',
  publicDir: 'public',
};

export default config;
`;
  fs.writeFileSync(path.join(projectDir, 'oven.config.ts'), configFile);

  // app/layout.tsx
  const rootLayout = `import type { LayoutProps, Metadata } from 'oven';

export const metadata: Metadata = {
  title: {
    default: '${projectName}',
    template: '%s | ${projectName}',
  },
  description: 'Built with Oven - A Next.js-style framework for Bun',
};

export default function RootLayout({ children }: LayoutProps) {
  return \`
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
          * { margin: 0; padding: 0; box-sizing: border-box; }
          body { font-family: system-ui, -apple-system, sans-serif; }
        </style>
      </head>
      <body>
        <nav style="background: #ff6b35; padding: 1rem 2rem;">
          <a href="/" style="color: white; text-decoration: none; font-weight: bold; font-size: 1.25rem;">
            🔥 ${projectName}
          </a>
        </nav>
        <main>\${children}</main>
      </body>
    </html>
  \`;
}
`;
  fs.writeFileSync(path.join(projectDir, 'app', 'layout.tsx'), rootLayout);

  // app/page.tsx
  const homePage = `import type { PageProps, Metadata } from 'oven';

export const metadata: Metadata = {
  title: 'Home',
};

export default function HomePage({ searchParams }: PageProps) {
  return \`
    <div style="max-width: 800px; margin: 0 auto; padding: 4rem 2rem; text-align: center;">
      <h1 style="font-size: 3rem; margin-bottom: 1rem;">
        Welcome to ${projectName} 🔥
      </h1>
      <p style="color: #666; font-size: 1.2rem; margin-bottom: 2rem;">
        Get started by editing <code>app/page.tsx</code>
      </p>

      <div style="display: flex; gap: 1rem; justify-content: center;">
        <a href="/about" style="
          background: #ff6b35;
          color: white;
          padding: 0.75rem 1.5rem;
          border-radius: 8px;
          text-decoration: none;
        ">
          About Page
        </a>
        <a href="/api/hello" style="
          background: #333;
          color: white;
          padding: 0.75rem 1.5rem;
          border-radius: 8px;
          text-decoration: none;
        ">
          API Example
        </a>
      </div>
    </div>
  \`;
}
`;
  fs.writeFileSync(path.join(projectDir, 'app', 'page.tsx'), homePage);

  // app/about/page.tsx
  const aboutPage = `import type { PageProps, Metadata } from 'oven';

export const metadata: Metadata = {
  title: 'About',
  description: 'About ${projectName}',
};

export default function AboutPage({ params }: PageProps) {
  return \`
    <div style="max-width: 800px; margin: 0 auto; padding: 4rem 2rem;">
      <h1 style="font-size: 2.5rem; margin-bottom: 1rem;">About</h1>
      <p style="color: #666; line-height: 1.8;">
        This is the about page of your Oven application.
        Built with Bun for maximum performance.
      </p>
      <a href="/" style="color: #ff6b35; margin-top: 2rem; display: inline-block;">
        ← Back to Home
      </a>
    </div>
  \`;
}
`;
  fs.writeFileSync(path.join(projectDir, 'app', 'about', 'page.tsx'), aboutPage);

  // app/api/hello/route.ts
  const apiRoute = `// API Route: /api/hello

export async function GET(request: Request) {
  return Response.json({
    message: 'Hello from ${projectName}!',
    timestamp: new Date().toISOString(),
  });
}

export async function POST(request: Request) {
  const body = await request.json().catch(() => ({}));
  return Response.json({
    message: 'Data received!',
    data: body,
  });
}
`;
  fs.writeFileSync(path.join(projectDir, 'app', 'api', 'hello', 'route.ts'), apiRoute);

  // .gitignore
  const gitignore = `node_modules
.oven
dist
*.log
.DS_Store
`;
  fs.writeFileSync(path.join(projectDir, '.gitignore'), gitignore);

  console.log(`✅ Project created successfully!

  Next steps:

    cd ${projectName}
    bun install
    bun run dev

  Open http://localhost:3000 in your browser.

  Project structure:

    ${projectName}/
    ├── app/
    │   ├── layout.tsx      # Root layout
    │   ├── page.tsx        # Home page (/)
    │   ├── about/
    │   │   └── page.tsx    # About page (/about)
    │   └── api/
    │       └── hello/
    │           └── route.ts # API route (/api/hello)
    ├── public/             # Static files
    ├── components/         # React components
    ├── lib/                # Utilities
    └── oven.config.ts      # Oven configuration

  Happy cooking! 🔥
  `);
}

main().catch(console.error);
