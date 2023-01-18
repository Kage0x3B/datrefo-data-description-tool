import { sveltekit } from '@sveltejs/kit/vite';
import type { UserConfig } from 'vite';

const config: UserConfig = {
    plugins: [sveltekit()],
    server: {
        host: true,
        port: 10001,
        strictPort: true
    },
    preview: {
        host: true,
        port: 10001,
        strictPort: true
    },
    test: {
        include: ['src/**/*.{test,spec}.{js,ts}']
    }
};

export default config;
