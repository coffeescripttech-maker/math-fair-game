/** @type {import('next').NextConfig} */
const nextConfig = {
    output: "export",
    distDir: "dist",

    // TypeScript build errors are no longer ignored.
    // ESLint is not installed in this project, so lint checks are skipped during builds.
    eslint: {
        ignoreDuringBuilds: true,
    },

    // Exclude game-modal-ui folder from build (it's a separate demo project)
    webpack: (config) => {
        config.watchOptions = {
            ...config.watchOptions,
            ignored: ["**/src/game-modal-ui/**"],
        };
        return config;
    },
};

export default nextConfig;

