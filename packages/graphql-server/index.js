require('babel-register')({
  presets: [['env', {
    targets: {
      node: 'current',
    },
  }]],
});

require('./server.js');
