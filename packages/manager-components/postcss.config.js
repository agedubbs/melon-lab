const postcssPresetEnv = require('postcss-preset-env');
const variables = require('./src/design/variables');
const medias = require('./src/design/medias');

module.exports = {
  plugins: [
    postcssPresetEnv({
      stage: 3,
      browsers: '> 0.5%, last 2 versions, Firefox ESR, not dead',
      features: {
        'nesting-rules': true,
        'custom-properties': {
          preserve: false,
          variables: variables
        },
        'custom-media-queries': {
          extensions: medias
        }
      },
    }),
  ],
};
