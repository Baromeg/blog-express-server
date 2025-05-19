import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    environment: 'node',
    include: ['src/**/*.test.ts', 'src/tests/**/*.e2e.test.ts'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'html'],
    },
    setupFiles: ['./vitest.setup.ts'],
  },
});
