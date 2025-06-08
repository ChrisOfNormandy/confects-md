import { defineConfig, loadEnv, UserConfig } from 'vite';
import { resolve } from 'path';
import { viteConfigAliases } from '@syren-dev-tech/confetti/config';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';

export default ({ mode }: UserConfig) => {
    process.env = mode && {
        ...process.env,
        ...loadEnv(mode, process.cwd())
    } || process.env;

    const { DEV } = process.env;

    return defineConfig({
        build: {
            copyPublicDir: false,
            emptyOutDir: false,
            lib: {
                entry: ['markdown', 'router'].map((exp) => resolve(`./lib/${exp}.ts`)),
                formats: ['es'],
                name: 'confects'
            },
            rollupOptions: {
                external: [
                    'react',
                    'react-dom',
                    'react-router',
                    'react-router-dom'
                ],
                output: {
                    globals: {
                        react: 'React',
                        'react-router': 'ReactRouter',
                        'react-router-dom': 'ReactRouterDOM'
                    }
                }
            }
        },
        esbuild: {
            drop: !DEV && ['console', 'debugger'] || undefined,
            legalComments: 'none'
        },
        plugins: [react(), tsconfigPaths()],
        resolve: {
            alias: {
                ...viteConfigAliases()
            }
        },
        server: {
            port: 3000
        }
    });
};