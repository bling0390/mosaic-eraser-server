module.exports = {
  apps: [{
    name: 'mosaic eraser server',
    script: './dist/app.js',
    exec_mode: 'fork',
    env: {
      NODE_ENV: 'development',
      SERVE_PATH: '/root/mosaic-eraser-server/result/',
      PORT: 8080,
      DOMAIN: 'localhost'
    },
    env_production: {
      NODE_ENV: 'production',
      SERVE_PATH: '/root/mosaic-eraser-server/result/',
      PORT: 3389,
      DOMAIN: 'miami.keepfighting.xyz'
    }
  }]
};