#!/usr/bin/env node

/**
 * create-oven - Create a new Oven project
 * Like create-next-app but for Bun
 */

import fs from 'fs';
import path from 'path';
import readline from 'readline';
import { execSync } from 'child_process';

// Colors
const c = {
  reset: '\x1b[0m',
  bold: '\x1b[1m',
  dim: '\x1b[2m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m',
};

function createPrompt() {
  return readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
}

async function askYesNo(rl, question, defaultValue = true) {
  const hint = defaultValue ? '(Y/n)' : '(y/N)';
  return new Promise((resolve) => {
    rl.question(`${c.cyan}?${c.reset} ${question} ${c.dim}${hint}${c.reset} `, (answer) => {
      if (!answer.trim()) resolve(defaultValue);
      else resolve(answer.toLowerCase().startsWith('y'));
    });
  });
}

function spinner(text) {
  const frames = ['⠋', '⠙', '⠹', '⠸', '⠼', '⠴', '⠦', '⠧', '⠇', '⠏'];
  let i = 0;
  const interval = setInterval(() => {
    process.stdout.write(`\r${c.cyan}${frames[i]}${c.reset} ${text}`);
    i = (i + 1) % frames.length;
  }, 80);
  return {
    stop: (finalText) => {
      clearInterval(interval);
      process.stdout.write(`\r${c.green}✓${c.reset} ${finalText || text}\n`);
    },
    fail: (finalText) => {
      clearInterval(interval);
      process.stdout.write(`\r${c.red}✗${c.reset} ${finalText || text}\n`);
    },
  };
}

async function main() {
  const args = process.argv.slice(2);

  if (args.includes('--help') || args.includes('-h')) {
    console.log(`
  ${c.bold}${c.cyan}create-oven${c.reset} - Create a new Oven project

  ${c.yellow}Usage:${c.reset}
    npx create-oven [project-name] [options]

  ${c.yellow}Options:${c.reset}
    --ts, --typescript    Use TypeScript (default)
    --js, --javascript    Use JavaScript
    --tailwind            Use Tailwind CSS (default)
    --eslint              Use ESLint (default)
    --no-tailwind         Don't use Tailwind CSS
    --no-eslint           Don't use ESLint
    --no-install          Skip installing dependencies
    -y, --yes             Use defaults without prompts
    -h, --help            Show this help
    -v, --version         Show version

  ${c.yellow}Examples:${c.reset}
    npx create-oven my-app
    npx create-oven my-app --js --no-tailwind
    `);
    process.exit(0);
  }

  if (args.includes('--version') || args.includes('-v')) {
    console.log('create-oven v0.3.0');
    process.exit(0);
  }

  console.log(`
${c.bold}${c.cyan}  ╔═══════════════════════════════════════╗
  ║                                       ║
  ║   🔥  Create Oven App  v0.3.0         ║
  ║                                       ║
  ║   Next.js-style framework for Bun     ║
  ║                                       ║
  ╚═══════════════════════════════════════╝${c.reset}
`);

  const rl = createPrompt();

  try {
    const hasFlag = (flag) => args.includes(flag);
    const skipPrompts = hasFlag('--yes') || hasFlag('-y');
    const noInstall = hasFlag('--no-install');

    // Get project name
    let projectName = args.find(arg => !arg.startsWith('-'));
    if (!projectName) {
      projectName = await new Promise((resolve) => {
        rl.question(`${c.cyan}?${c.reset} What is your project named? ${c.dim}(my-app)${c.reset} `, (answer) => {
          resolve(answer.trim() || 'my-app');
        });
      });
    }

    const projectDir = path.join(process.cwd(), projectName);

    if (fs.existsSync(projectDir)) {
      console.log(`\n${c.red}✗${c.reset} Directory "${projectName}" already exists!`);
      rl.close();
      process.exit(1);
    }

    console.log();

    // Options
    const useTypescript = hasFlag('--js') || hasFlag('--javascript') ? false :
      hasFlag('--ts') || hasFlag('--typescript') ? true :
      skipPrompts ? true :
      await askYesNo(rl, 'Would you like to use TypeScript?', true);

    const useTailwind = hasFlag('--no-tailwind') ? false :
      hasFlag('--tailwind') ? true :
      skipPrompts ? true :
      await askYesNo(rl, 'Would you like to use Tailwind CSS?', true);

    const useEslint = hasFlag('--no-eslint') ? false :
      hasFlag('--eslint') ? true :
      skipPrompts ? true :
      await askYesNo(rl, 'Would you like to use ESLint?', true);

    rl.close();

    console.log();
    console.log(`Creating a new Oven app in ${c.green}${projectDir}${c.reset}.`);
    console.log();

    const ext = useTypescript ? 'tsx' : 'js';

    // Create directories
    fs.mkdirSync(path.join(projectDir, 'app'), { recursive: true });
    fs.mkdirSync(path.join(projectDir, 'public'), { recursive: true });

    // ============ package.json ============
    const spin1 = spinner('Creating package.json...');
    const pkg = {
      name: projectName,
      version: '0.1.0',
      private: true,
      scripts: {
        dev: 'bun run --hot server.tsx',
        build: 'bun build ./server.tsx --outdir ./dist --target bun',
        start: 'bun run dist/server.js',
        ...(useEslint && { lint: 'eslint .' }),
      },
      dependencies: {},
      devDependencies: {
        ...(useTypescript && { '@types/bun': 'latest', 'typescript': '^5' }),
        ...(useTailwind && { '@tailwindcss/postcss': '^4', 'tailwindcss': '^4' }),
        ...(useEslint && { 'eslint': '^9' }),
      },
    };
    fs.writeFileSync(path.join(projectDir, 'package.json'), JSON.stringify(pkg, null, 2));
    spin1.stop('Created package.json');

    // ============ tsconfig.json ============
    if (useTypescript) {
      const spin2 = spinner('Creating tsconfig.json...');
      const tsconfig = {
        compilerOptions: {
          target: 'ES2017',
          lib: ['dom', 'dom.iterable', 'esnext'],
          allowJs: true,
          skipLibCheck: true,
          strict: true,
          noEmit: true,
          esModuleInterop: true,
          module: 'esnext',
          moduleResolution: 'bundler',
          resolveJsonModule: true,
          isolatedModules: true,
          jsx: 'preserve',
          incremental: true,
          types: ['bun-types'],
          paths: { '@/*': ['./*'] },
        },
        include: ['**/*.ts', '**/*.tsx'],
        exclude: ['node_modules', 'dist'],
      };
      fs.writeFileSync(path.join(projectDir, 'tsconfig.json'), JSON.stringify(tsconfig, null, 2));
      spin2.stop('Created tsconfig.json');
    }

    // ============ postcss.config.mjs ============
    if (useTailwind) {
      const spin3 = spinner('Creating postcss.config.mjs...');
      fs.writeFileSync(path.join(projectDir, 'postcss.config.mjs'), `const config = {
  plugins: {
    "@tailwindcss/postcss": {},
  },
};

export default config;
`);
      spin3.stop('Created postcss.config.mjs');
    }

    // ============ eslint.config.mjs ============
    if (useEslint) {
      const spin4 = spinner('Creating eslint.config.mjs...');
      fs.writeFileSync(path.join(projectDir, 'eslint.config.mjs'), `import js from "@eslint/js";

export default [
  js.configs.recommended,
  {
    rules: {
      "no-unused-vars": "warn",
    },
  },
];
`);
      spin4.stop('Created eslint.config.mjs');
    }

    // ============ app/globals.css ============
    const spin5 = spinner('Creating app/globals.css...');
    const globalsCss = useTailwind ? `@import "tailwindcss";

:root {
  --background: #ffffff;
  --foreground: #171717;
}

@media (prefers-color-scheme: dark) {
  :root {
    --background: #0a0a0a;
    --foreground: #ededed;
  }
}

body {
  background: var(--background);
  color: var(--foreground);
  font-family: Arial, Helvetica, sans-serif;
}
` : `* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

:root {
  --background: #ffffff;
  --foreground: #171717;
}

body {
  background: var(--background);
  color: var(--foreground);
  font-family: Arial, Helvetica, sans-serif;
}
`;
    fs.writeFileSync(path.join(projectDir, 'app', 'globals.css'), globalsCss);
    spin5.stop('Created app/globals.css');

    // ============ app/layout.tsx ============
    const spin6 = spinner(`Creating app/layout.${ext}...`);
    const layoutContent = useTypescript ? `import "./globals.css";

export const metadata = {
  title: "Create Oven App",
  description: "Generated by create-oven",
};

export default function RootLayout({
  children,
}: {
  children: string;
}) {
  return \`
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>\${metadata.title}</title>
        <meta name="description" content="\${metadata.description}">
        <link rel="icon" href="/favicon.ico">
      </head>
      <body>
        \${children}
      </body>
    </html>
  \`;
}
` : `import "./globals.css";

export const metadata = {
  title: "Create Oven App",
  description: "Generated by create-oven",
};

export default function RootLayout({ children }) {
  return \`
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>\${metadata.title}</title>
        <meta name="description" content="\${metadata.description}">
        <link rel="icon" href="/favicon.ico">
      </head>
      <body>
        \${children}
      </body>
    </html>
  \`;
}
`;
    fs.writeFileSync(path.join(projectDir, 'app', `layout.${ext}`), layoutContent);
    spin6.stop(`Created app/layout.${ext}`);

    // ============ app/page.tsx ============
    const spin7 = spinner(`Creating app/page.${ext}...`);
    const tailwindClasses = useTailwind;
    const pageContent = `export default function Home() {
  return \`
    <div ${tailwindClasses ? 'class="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black"' : 'style="display: flex; min-height: 100vh; align-items: center; justify-content: center; background: #fafafa;"'}>
      <main ${tailwindClasses ? 'class="flex min-h-screen w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black"' : 'style="display: flex; flex-direction: column; align-items: center; justify-content: center; max-width: 48rem; padding: 8rem 4rem; background: white;"'}>
        <div ${tailwindClasses ? 'class="text-6xl mb-8"' : 'style="font-size: 4rem; margin-bottom: 2rem;"'}>🔥</div>

        <div ${tailwindClasses ? 'class="flex flex-col items-center gap-6 text-center"' : 'style="display: flex; flex-direction: column; align-items: center; gap: 1.5rem; text-align: center;"'}>
          <h1 ${tailwindClasses ? 'class="text-3xl font-semibold leading-10 tracking-tight text-black dark:text-zinc-50"' : 'style="font-size: 1.875rem; font-weight: 600; line-height: 2.5rem; color: black;"'}>
            Welcome to Oven
          </h1>
          <p ${tailwindClasses ? 'class="max-w-md text-lg leading-8 text-zinc-600 dark:text-zinc-400"' : 'style="max-width: 28rem; font-size: 1.125rem; line-height: 2rem; color: #666;"'}>
            Get started by editing <code ${tailwindClasses ? 'class="bg-zinc-100 dark:bg-zinc-800 px-2 py-1 rounded"' : 'style="background: #f5f5f5; padding: 0.25rem 0.5rem; border-radius: 4px;"'}>app/page.${ext}</code>
          </p>
        </div>

        <div ${tailwindClasses ? 'class="flex flex-col gap-4 text-base font-medium sm:flex-row mt-8"' : 'style="display: flex; gap: 1rem; margin-top: 2rem;"'}>
          <a
            ${tailwindClasses ? 'class="flex h-12 items-center justify-center gap-2 rounded-full bg-black text-white px-6 hover:bg-zinc-800 transition-colors"' : 'style="display: flex; height: 3rem; align-items: center; justify-content: center; gap: 0.5rem; border-radius: 9999px; background: black; color: white; padding: 0 1.5rem; text-decoration: none;"'}
            href="https://github.com/oven-ttta/oven-framework"
            target="_blank"
          >
            GitHub
          </a>
          <a
            ${tailwindClasses ? 'class="flex h-12 items-center justify-center rounded-full border border-zinc-200 dark:border-zinc-700 px-6 hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-colors"' : 'style="display: flex; height: 3rem; align-items: center; justify-content: center; border-radius: 9999px; border: 1px solid #e5e5e5; padding: 0 1.5rem; text-decoration: none; color: inherit;"'}
            href="https://bun.sh/docs"
            target="_blank"
          >
            Bun Docs
          </a>
        </div>
      </main>
    </div>
  \`;
}
`;
    fs.writeFileSync(path.join(projectDir, 'app', `page.${ext}`), pageContent);
    spin7.stop(`Created app/page.${ext}`);

    // ============ server.tsx ============
    const spin8 = spinner(`Creating server.${ext}...`);
    const serverContent = `/**
 * Oven Server
 * Powered by Bun
 */

const PORT = parseInt(process.env.PORT || "3000");

// Simple router
const routes = new Map${useTypescript ? '<string, (req: Request) => Promise<Response>>' : ''}();

async function scanRoutes() {
  const appDir = "./app";

  // Scan for page files
  const glob = new Bun.Glob("**/page.{tsx,jsx,ts,js}");

  for await (const file of glob.scan({ cwd: appDir })) {
    const routePath = "/" + file
      .replace(/\\/page\\.(tsx|jsx|ts|js)$/, "")
      .replace(/^page\\.(tsx|jsx|ts|js)$/, "")
      .replace(/\\/$/, "") || "/";

    routes.set(routePath === "" ? "/" : routePath, async (req${useTypescript ? ': Request' : ''}) => {
      const module = await import(\`\${appDir}/\${file}\`);
      const content = await module.default();

      // Wrap with layout
      let html = content;
      try {
        const layout = await import(\`\${appDir}/layout.tsx\`);
        html = await layout.default({ children: content });
      } catch {}

      return new Response(html, {
        headers: { "Content-Type": "text/html; charset=utf-8" },
      });
    });
  }
}

async function main() {
  await scanRoutes();

  Bun.serve({
    port: PORT,
    async fetch(req${useTypescript ? ': Request' : ''}) {
      const url = new URL(req.url);
      let pathname = url.pathname;

      if (pathname !== "/" && pathname.endsWith("/")) {
        pathname = pathname.slice(0, -1);
      }

      // Check routes
      const handler = routes.get(pathname);
      if (handler) {
        return handler(req);
      }

      // Static files
      const publicPath = "./public" + pathname;
      const file = Bun.file(publicPath);
      if (await file.exists()) {
        return new Response(file);
      }

      return new Response("Not Found", { status: 404 });
    },
  });

  console.log(\`
  ${c.green}▲${c.reset} Ready in \${Date.now() - start}ms

  ${c.dim}➜${c.reset}  Local:   ${c.cyan}http://localhost:\${PORT}${c.reset}
  \`);
}

const start = Date.now();
main();
`;
    fs.writeFileSync(path.join(projectDir, `server.${ext}`), serverContent);
    spin8.stop(`Created server.${ext}`);

    // ============ .gitignore ============
    const spin9 = spinner('Creating .gitignore...');
    fs.writeFileSync(path.join(projectDir, '.gitignore'), `# Dependencies
node_modules
.pnpm-store

# Build
dist
.oven

# Env
.env
.env.local
.env.*.local

# Logs
*.log

# OS
.DS_Store

# IDE
.vscode
.idea
`);
    spin9.stop('Created .gitignore');

    // ============ README.md ============
    const spin10 = spinner('Creating README.md...');
    fs.writeFileSync(path.join(projectDir, 'README.md'), `# ${projectName}

This is an [Oven](https://github.com/oven-ttta/oven-framework) project bootstrapped with \`create-oven\`.

## Getting Started

First, run the development server:

\`\`\`bash
bun run dev
\`\`\`

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying \`app/page.${ext}\`. The page auto-updates as you edit the file.

## Learn More

- [Oven GitHub](https://github.com/oven-ttta/oven-framework)
- [Bun Documentation](https://bun.sh/docs)
`);
    spin10.stop('Created README.md');

    // ============ Install dependencies ============
    if (!noInstall) {
      console.log();
      const spin11 = spinner('Installing dependencies...');
      try {
        execSync('bun install', { cwd: projectDir, stdio: 'pipe' });
        spin11.stop('Installed dependencies');
      } catch {
        try {
          execSync('npm install', { cwd: projectDir, stdio: 'pipe' });
          spin11.stop('Installed dependencies');
        } catch {
          spin11.fail('Failed to install. Run "bun install" manually.');
        }
      }
    }

    // Success
    console.log(`
${c.green}Success!${c.reset} Created ${c.cyan}${projectName}${c.reset} at ${projectDir}

Inside that directory, you can run:

  ${c.cyan}bun run dev${c.reset}
    Starts the development server.

  ${c.cyan}bun run build${c.reset}
    Builds the app for production.

  ${c.cyan}bun run start${c.reset}
    Runs the built app.

We suggest that you begin by typing:

  ${c.cyan}cd${c.reset} ${projectName}
  ${c.cyan}bun run dev${c.reset}
`);

  } catch (err) {
    console.error(`\n${c.red}Error: ${err.message}${c.reset}`);
    rl.close();
    process.exit(1);
  }
}

main();
