// eslint-disable-next-line @typescript-eslint/no-var-requires
const HtmlWebPackPlugin = require('html-webpack-plugin');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const ESLintPlugin = require('eslint-webpack-plugin');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const TerserPlugin = require('terser-webpack-plugin');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { settings } = require('./src/settings');


const configs = {
  production: {
    mode: 'production',
  },
  development: {
    mode: 'development',
  }
}


if (process.env.NODE_ENV === undefined) {
  throw new Error('NODE_ENV must be defined');
}

if (! Object.keys(configs).includes(process.env.NODE_ENV.toLowerCase())) {
  throw new Error('Invalid NODE_ENV');
}

const envConfig = configs[process.env.NODE_ENV];

const htmlPlugin = new HtmlWebPackPlugin({
  template: './src/index.html',
  filename: './index.html',
});

const eslintPlugin = new ESLintPlugin({
  fix: true,
  extensions: ['tsx', 'ts'],
});

const minimizer = new TerserPlugin({
  terserOptions: {
    compress: {},
    format: {
      comments: false,
    },
  },
  extractComments: false,
});

module.exports = {
  ...envConfig,
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.sass$/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
      {
        test: /\.(png|jpeg|jpg)/,
        type: 'asset/inline',
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.css'],
  },
  optimization: {
    minimize: true,
    minimizer: [minimizer],
    concatenateModules: true,
  },
  devServer: {
    historyApiFallback: true,
  },
  plugins: [htmlPlugin],
  output: {
    publicPath: settings.browserBaseURL,
    filename: 'scripts-bundled.js',
    path: path.resolve(__dirname, 'build'),
  },
};
