#!/usr/bin/env bun

/**
 * Oven CLI
 * Next.js-style framework for Bun
 */

import { spawn } from 'child_process';
import { existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const args = process.argv.slice(2);
const command = args[0];

const c = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  cyan: '\x1b[36m',
  dim: '\x1b[2m',
  red: '\x1b[31m',
};

async function dev() {
  console.log(`${c.cyan}▲${c.reset} Starting Oven dev server...`);

  const serverPath = join(__dirname, '..', 'lib', 'server.js');

  const proc = spawn('bun', ['run', '--hot', serverPath], {
    stdio: 'inherit',
    env: { ...process.env, NODE_ENV: 'development' },
  });

  proc.on('error', (err) => {
    console.error(`${c.red}Error:${c.reset}`, err.message);
  });
}

async function build() {
  console.log(`${c.cyan}▲${c.reset} Building for production...`);

  const serverPath = join(__dirname, '..', 'lib', 'server.js');

  const proc = spawn('bun', ['build', serverPath, '--outdir', './dist', '--target', 'bun'], {
    stdio: 'inherit',
  });

  proc.on('close', (code) => {
    if (code === 0) {
      console.log(`${c.green}✓${c.reset} Build complete!`);
    }
  });
}

async function start() {
  console.log(`${c.cyan}▲${c.reset} Starting production server...`);

  const distPath = './dist/server.js';

  if (!existsSync(distPath)) {
    console.error(`${c.red}Error:${c.reset} Build not found. Run 'oven build' first.`);
    process.exit(1);
  }

  const proc = spawn('bun', ['run', distPath], {
    stdio: 'inherit',
    env: { ...process.env, NODE_ENV: 'production' },
  });
}

function showHelp() {
  console.log(`
${c.cyan}Oven${c.reset} - Next.js-style framework for Bun

${c.dim}Usage:${c.reset}
  oven <command>

${c.dim}Commands:${c.reset}
  dev     Start development server
  build   Build for production
  start   Start production server

${c.dim}Examples:${c.reset}
  oven dev
  oven build
  oven start
  `);
}

switch (command) {
  case 'dev':
    dev();
    break;
  case 'build':
    build();
    break;
  case 'start':
    start();
    break;
  case '--help':
  case '-h':
    showHelp();
    break;
  default:
    if (command) {
      console.error(`${c.red}Unknown command:${c.reset} ${command}`);
    }
    showHelp();
    process.exit(1);
}
