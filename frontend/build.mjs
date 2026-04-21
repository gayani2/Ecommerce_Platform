import { createRequire } from 'module';
const require = createRequire(import.meta.url);

const gfs = require('graceful-fs');
const fs = require('fs');
gfs.gracefulify(fs);

// Patch readFileSync to retry on EMFILE
const originalReadFileSync = fs.readFileSync;
fs.readFileSync = function(...args) {
  let retries = 20;
  while (retries > 0) {
    try {
      return originalReadFileSync.apply(this, args);
    } catch(e) {
      if (e.code === 'EMFILE' && retries > 1) {
        retries--;
        const start = Date.now();
        while (Date.now() - start < 200) {}
      } else {
        throw e;
      }
    }
  }
};

process.argv = [process.argv[0], process.argv[1], 'build'];
await import('./node_modules/vite/bin/vite.js');
