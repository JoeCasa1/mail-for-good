import { DefinePlugin, HotModuleReplacementPlugin, NoEmitOnErrorsPlugin, LoaderOptionsPlugin, ProvidePlugin } from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import { resolve as _resolve } from 'path';

export const resolve = {
  extensions: ['*', '.js', '.jsx', '.json']
};
export const devtool = 'eval-source-map';
export const entry = [
  // must be first entry to properly set public path
  './client/webpack-public-path',
  'react-hot-loader/patch',
  'webpack-hot-middleware/client?reload=true',
  _resolve(__dirname, 'client/index.js') // Defining path seems necessary for this to work consistently on Windows machines.
];
export const target = 'web';
export const output = {
  path: _resolve(__dirname, 'dist'),
  publicPath: '/',
  filename: 'bundle.js'
};
export const plugins = [
  new DefinePlugin({
    'process.env.NODE_ENV': JSON.stringify('development'),
    __DEV__: true
  }),
  new HotModuleReplacementPlugin(),
  new NoEmitOnErrorsPlugin(),
  new HtmlWebpackPlugin({
    template: 'client/index.ejs',
    minify: {
      removeComments: true,
      collapseWhitespace: true
    },
    inject: true
  }),
  new LoaderOptionsPlugin({
    minimize: false,
    debug: true,
    noInfo: true,
    options: {
      sassLoader: {
        includePaths: [_resolve(__dirname, 'client', 'scss')]
      },
      context: '/',
    }
  }),
  new ProvidePlugin({
    jQuery: 'jquery',
    $: 'jquery',
    jquery: 'jquery'
  })
];
export const module = {
  rules: [
    { test: /\.jsx?$/, exclude: /node_modules/, loaders: ['babel-loader'] },
    { test: /\.eot(\?v=\d+.\d+.\d+)?$/, loader: 'file-loader' },
    { test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: 'url-loader?limit=10000&mimetype=application/font-woff' },
    { test: /\.[ot]tf(\?v=\d+.\d+.\d+)?$/, loader: 'url-loader?limit=10000&mimetype=application/octet-stream' },
    { test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: 'url-loader?limit=10000&mimetype=image/svg+xml' },
    { test: /\.(jpe?g|png|gif)$/i, loader: 'file-loader?name=[name].[ext]' },
    { test: /\.ico$/, loader: 'file-loader?name=[name].[ext]' },
    { test: /(\.css|\.scss|\.sass)$/, loaders: ['style-loader', 'css-loader?sourceMap', 'sass-loader?sourceMap'] }
  ]
};
