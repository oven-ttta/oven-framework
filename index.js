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
    console.log('create-oven v0.4.0');
    process.exit(0);
  }

  console.log(`
${c.bold}${c.cyan}  ╔═══════════════════════════════════════╗
  ║                                       ║
  ║   🔥  Create Oven App  v0.4.0         ║
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

    // ============ public/oven.svg ============
    fs.writeFileSync(path.join(projectDir, 'public', 'oven.svg'), `<svg width="100" height="24" viewBox="0 0 100 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <text x="0" y="20" font-family="system-ui, sans-serif" font-size="20" font-weight="bold" fill="currentColor">🔥 Oven</text>
</svg>`);

    // ============ public/github.svg ============
    fs.writeFileSync(path.join(projectDir, 'public', 'github.svg'), `<svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
  <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"/>
</svg>`);

    // ============ package.json ============
    const spin1 = spinner('Creating package.json...');
    const pkg = {
      name: projectName,
      version: '0.1.0',
      private: true,
      scripts: {
        dev: 'oven dev',
        build: 'oven build',
        start: 'oven start',
        ...(useEslint && { lint: 'eslint .' }),
      },
      dependencies: {
        'oven-bun': 'latest',
      },
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

export const metadata${useTypescript ? ': { title: string; description: string }' : ''} = {
  title: "Create Oven App",
  description: "Generated by create-oven",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: string;
}>) {
  return (
    \`<!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>\${metadata.title}</title>
        <meta name="description" content="\${metadata.description}" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link href="https://fonts.googleapis.com/css2?family=Geist:wght@400;500;600;700&family=Geist+Mono&display=swap" rel="stylesheet" />
      </head>
      <body class="antialiased" style="font-family: 'Geist', sans-serif;">
        \${children}
      </body>
    </html>\`
  );
}
` : `import "./globals.css";

export const metadata = {
  title: "Create Oven App",
  description: "Generated by create-oven",
};

export default function RootLayout({ children }) {
  return (
    \`<!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>\${metadata.title}</title>
        <meta name="description" content="\${metadata.description}" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link href="https://fonts.googleapis.com/css2?family=Geist:wght@400;500;600;700&family=Geist+Mono&display=swap" rel="stylesheet" />
      </head>
      <body class="antialiased" style="font-family: 'Geist', sans-serif;">
        \${children}
      </body>
    </html>\`
  );
}
`;
    fs.writeFileSync(path.join(projectDir, 'app', `layout.${ext}`), layoutContent);
    spin6.stop(`Created app/layout.${ext}`);

    // ============ app/page.tsx ============
    const spin7 = spinner(`Creating app/page.${ext}...`);
    const pageContent = useTailwind ? `export default function Home() {
  return (
    \`<div class="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main class="flex min-h-screen w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
        <img
          class="dark:invert"
          src="/oven.svg"
          alt="Oven logo"
          width="100"
          height="24"
        />
        <div class="flex flex-col items-center gap-6 text-center sm:items-start sm:text-left">
          <h1 class="max-w-xs text-3xl font-semibold leading-10 tracking-tight text-black dark:text-zinc-50">
            Get started by editing app/page.${ext}
          </h1>
          <p class="max-w-md text-lg leading-8 text-zinc-600 dark:text-zinc-400">
            Looking for a starting point? Head over to the{" "}
            <a
              href="https://github.com/oven-ttta/oven-framework"
              class="font-medium text-zinc-950 dark:text-zinc-50"
            >
              Documentation
            </a>{" "}
            or{" "}
            <a
              href="https://bun.sh/docs"
              class="font-medium text-zinc-950 dark:text-zinc-50"
            >
              Bun Docs
            </a>.
          </p>
        </div>
        <div class="flex flex-col gap-4 text-base font-medium sm:flex-row">
          <a
            class="flex h-12 w-full items-center justify-center gap-2 rounded-full bg-foreground px-5 text-background transition-colors hover:bg-[#383838] dark:hover:bg-[#ccc] md:w-[158px]"
            href="https://github.com/oven-ttta/oven-framework"
            target="_blank"
            rel="noopener noreferrer"
            style="background: #171717; color: white;"
          >
            <img
              class="dark:invert"
              src="/github.svg"
              alt="GitHub"
              width="16"
              height="16"
            />
            GitHub
          </a>
          <a
            class="flex h-12 w-full items-center justify-center rounded-full border border-solid border-black/[.08] px-5 transition-colors hover:border-transparent hover:bg-black/[.04] dark:border-white/[.145] dark:hover:bg-[#1a1a1a] md:w-[158px]"
            href="https://bun.sh/docs"
            target="_blank"
            rel="noopener noreferrer"
          >
            Bun Docs
          </a>
        </div>
      </main>
    </div>\`
  );
}
` : `export default function Home() {
  return (
    \`<div style="display: flex; min-height: 100vh; align-items: center; justify-content: center; background: #fafafa;">
      <main style="display: flex; flex-direction: column; align-items: center; justify-content: space-between; max-width: 48rem; padding: 8rem 4rem; background: white;">
        <div style="font-size: 4rem; margin-bottom: 2rem;">🔥</div>
        <div style="display: flex; flex-direction: column; align-items: center; gap: 1.5rem; text-align: center;">
          <h1 style="font-size: 1.875rem; font-weight: 600; line-height: 2.5rem; color: black;">
            Get started by editing app/page.${ext}
          </h1>
          <p style="max-width: 28rem; font-size: 1.125rem; line-height: 2rem; color: #666;">
            Looking for a starting point? Head over to the
            <a href="https://github.com/oven-ttta/oven-framework" style="font-weight: 500; color: black;">Documentation</a>
            or
            <a href="https://bun.sh/docs" style="font-weight: 500; color: black;">Bun Docs</a>.
          </p>
        </div>
        <div style="display: flex; gap: 1rem; margin-top: 2rem;">
          <a
            href="https://github.com/oven-ttta/oven-framework"
            target="_blank"
            style="display: flex; height: 3rem; align-items: center; justify-content: center; gap: 0.5rem; border-radius: 9999px; background: black; color: white; padding: 0 1.5rem; text-decoration: none;"
          >
            GitHub
          </a>
          <a
            href="https://bun.sh/docs"
            target="_blank"
            style="display: flex; height: 3rem; align-items: center; justify-content: center; border-radius: 9999px; border: 1px solid #e5e5e5; padding: 0 1.5rem; text-decoration: none; color: inherit;"
          >
            Bun Docs
          </a>
        </div>
      </main>
    </div>\`
  );
}
`;
    fs.writeFileSync(path.join(projectDir, 'app', `page.${ext}`), pageContent);
    spin7.stop(`Created app/page.${ext}`);

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
