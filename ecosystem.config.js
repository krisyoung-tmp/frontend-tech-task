module.exports = {
    apps: [
        {
            name: 'api',
            script: './scripts/start-api.js',
            instances: 1,
            autorestart: true,
            watch: './packages/api',
            max_memory_restart: '1G',
            env: {
                NODE_ENV: 'development',
            },
        },
        {
            name: 'app',
            script: './scripts/start-app.js',
            instances: 1,
            autorestart: true,
            watch: './packages/app',
            max_memory_restart: '1G',
            env: {
                NODE_ENV: 'development',
            },
        },
    ],
}
