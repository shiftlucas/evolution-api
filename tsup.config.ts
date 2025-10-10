import { cpSync } from 'node:fs';

import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src'],
  outDir: 'dist',
  splitting: false,
  sourcemap: true,
  clean: true,
  minify: true,
  format: ['esm'],
  onSuccess: async () => {
    cpSync('src/utils/translations', 'dist/translations', { recursive: true });
  },
  loader: {
    '.json': 'file',
    '.yml': 'file',
  },
  alias: {
    '@api': 'src/api',
    '@cache': 'src/cache',
    '@config': 'src/config',
    '@exceptions': 'src/exceptions',
    '@libs': 'src/libs',
    '@utils': 'src/utils',
    '@validate': 'src/validate'
  },
  esbuildOptions(options) {
    // Corrige requires em libs antigas
    options.banner = {
      js: `import { createRequire } from 'module'; const require = createRequire(import.meta.url);`,
    };
  },
});
