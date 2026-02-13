module.exports = {
  apps: [{
    name: 'AOPF',
    script: 'npm',
    args: 'start',
    cwd: '/home/deploy/AOPF',
    instances: 'max',
    exec_mode: 'cluster',
    env_production: {
      NODE_ENV: 'production',
      PORT: 3000
    },
    user: 'deploy',
    umask: 0o133,  // Ограниченные права
    max_memory_restart: '1G'
  }]
};
