import { createRequire } from 'module';
import { setTimeout } from 'timers/promises';
const require = createRequire(import.meta.url);

// Patch sync fs
const gfs = require('graceful-fs');
const fs = require('fs');
gfs.gracefulify(fs);

// Patch async fs/promises (what PostCSS uses)
import fsp from 'fs/promises';

const _open = fsp.open.bind(fsp);
const _readFile = fsp.readFile.bind(fsp);

async function retry(fn, ...args) {
  for (let i = 0; i < 30; i++) {
    try {
      return await fn(...args);
    } catch(e) {
      if (e.code === 'EMFILE') {
        await setTimeout(200);
      } else {
        throw e;
      }
    }
  }
}

fsp.open = (...args) => retry(_open, ...args);
fsp.readFile = (...args) => retry(_readFile, ...args);

process.argv = [process.argv[0], process.argv[1], 'build'];
await import('./node_modules/vite/bin/vite.js');
