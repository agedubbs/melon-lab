require('dotenv-extended').config();

const path = require('path');
const fs = require('fs');
const externals = require('webpack-node-externals');

// Retrieve the absolute path of the linked package.
const resolveWorkspace = (name, directory) => {
  const [, package] = name.split('/');
  return path.resolve(__dirname, '..', package, directory);
};

const resolveWorkspaces = pairs => {
  const workspaces = pairs.reduce((carry, [name, directory]) => {
    return {
      ...carry,
      [name]: resolveWorkspace(name, directory),
    };
  }, {});

  return workspaces;
};

module.exports = {
  webpack: (config, options, webpack) => {
    config.output.path = path.resolve(process.cwd(), 'dist');
    config.entry = { server: './src/server/index.ts' };

    config.resolve.extensions.push('.ts');
    config.resolve.alias = resolveWorkspaces([
      ['@melonproject/melon.js', 'lib'],
    ]);

    config.module.rules.map(rule => {
      if (rule.loader && rule.loader.match('babel-loader')) {
        // @TODO: Backpack uses their own version of babel-loader instead
        // of correctly resolving our version as a peer dependency. Hence, we
        // need to override this here so we can use Babel 7+.
        // @see https://github.com/jaredpalmer/backpack/issues/106
        rule.loader = 'babel-loader';
      }

      return rule;
    });

    config.module.rules.push({
      test: /\.ts$/,
      exclude: /node_modules/,
      use: [
        {
          loader: 'babel-loader',
          options: {
            babelrc: true,
            cacheDirectory: true,
          },
        },
        {
          loader: 'ts-loader',
          options: {
            configFile: path.resolve(__dirname, 'tsconfig.json'),
            transpileOnly: true,
          },
        },
      ],
    });

    config.externals = externals({
      modulesDir: path.resolve(process.cwd(), '..', '..', 'node_modules'),
      whitelist: [/^@melonproject\//],
    });

    if (process.platform === 'win32' || process.env.NODE_ENV === 'production') {
      // TODO: The source-map support added with the banner plugin has the wrong paths in windows.
      config.plugins = config.plugins.filter(
        plugin => !(plugin instanceof webpack.BannerPlugin),
      );
    }

    return config;
  },
};
