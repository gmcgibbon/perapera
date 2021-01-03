const environment = process.env.NODE_ENV || 'development';
const isDevelopment = environment === 'development';

const webpack = {
  mode: process.env.WEBPACK_MODE || environment,
  devtool: process.env.WEBPACK_DEVTOOL || isDevelopment ? 'source-map' : undefined,
  output: {
    publicPath: process.env.WEBPACK_OUTPUT_PUBLIC_PATH || isDevelopment ? '/' : './',
  },
}

module.exports = {
  environment,
  webpack,
};
