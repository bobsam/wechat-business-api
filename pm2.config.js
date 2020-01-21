module.exports = {
  /**
 * Application configuration section
 * http://pm2.keymetrics.io/docs/usage/application-declaration/
 */
  apps: [
    // server
    {
      name: 'wechat-business-api',
      script: __dirname + '/app.js',
      instances: 2,
      exec_mode: 'cluster',
      env: {
        "NODE_ENV": 'production'
      }
    }
  ]
};
