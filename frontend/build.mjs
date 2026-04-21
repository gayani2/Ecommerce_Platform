import { createRequire } from 'module';
const require = createRequire(import.meta.url);

const gfs = require('graceful-fs');
gfs.gracefulify(require('fs'));

process.argv = [process.argv[0], process.argv[1], 'build'];

await import('./node_modules/vite/bin/vite.js');
