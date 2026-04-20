const { gracefulify } = require('graceful-fs');
const { existsSync } = require('fs');
gracefulify(require('fs'));
process.argv = [...process.argv.slice(0, 2), 'build'];
require('./node_modules/vite/bin/vite.js');
