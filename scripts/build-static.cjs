const { cpSync, mkdirSync } = require('node:fs');
const { join } = require('node:path');
const root = join(__dirname, '..');
mkdirSync(join(root, 'dist', 'client'), { recursive: true });
cpSync(join(root, 'src', 'public'), join(root, 'dist', 'client'), { recursive: true });
