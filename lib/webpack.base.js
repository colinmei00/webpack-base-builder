const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const autoprefixer = require('autoprefixer');
const postcssPxToViewport = require('postcss-px-to-viewport-8-plugin');
const glob = require('glob');
const path = require('path');

const projectRoot = process.cwd();

const setMPA = () => {
  const entry = {};
  const htmlWebpackPlugins = [];
  const entryFiles = glob.sync(path.join(projectRoot, './src/*/index.js'));
  entryFiles.forEach(item => {
    const match = item.match(/src\/(.*)\/index.js/);
    const pageName = match && match[1];
    entry[pageName] = item;
    htmlWebpackPlugins.push(
      new HtmlWebpackPlugin({
        template: path.join(projectRoot, `src/${pageName}/index.html`),
        filename: `${pageName}.html`,
        chunks: [pageName],
        inject: true,
        minify: {
          html5: true,
          collapseWhitespace: true,
          preserveLineBreaks: false,
          minifyCSS: true,
          minifyJS: true,
          removeComments: false,
        },
      })
    );
  });

  return {
    entry,
    htmlWebpackPlugins,
  };
};

const { entry, htmlWebpackPlugins } = setMPA();

module.exports = {
  entry,
  output: {
    path: path.join(projectRoot, 'dist'),
    filename: '[name]_[chunkhash:8].js',
  },
  resolve: {
    alias: {
      '@': path.resolve(projectRoot, 'src'), // 将 @ 映射到 src 目录
    },
    extensions: ['.js', '.jsx', '.json'], // 可选：添加文件扩展名
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: 'babel-loader',
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
      {
        test: /\.less$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'less-loader',
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [
                  autoprefixer({
                    overrideBrowserslist: ['> 1%', 'last 2 versions', 'ios 7'],
                  }),
                  postcssPxToViewport({
                    viewportWidth: 375, // 设计稿的宽度
                    viewportHeight: 667, // 设计稿的高度（可选）
                    unitPrecision: 3, // 转换后保留的小数位数
                    viewportUnit: 'vw', // 需要转换成的单位
                    selectorBlackList: ['.ignore', '.hairlines'], // 忽略的选择器
                    minPixelValue: 1, // 小于或等于1px不转换
                    mediaQuery: false, // 是否允许在媒体查询中转换px
                  }),
                ],
              },
            },
          },
        ],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'images/[name][ext][contenthash:8]',
        },
        parser: {
          dataUrlCondition: {
            maxSize: 8 * 1024,
          },
        },
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'fonts/[name][ext][contenthash:8]',
        },
      },
    ],
  },
  plugins: [
    ...htmlWebpackPlugins,
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: '[name].[contenthash].css',
    }),
    function errorPlugin() {
      this.hooks.done.tap('done', stats => {
        if (stats.hasErrors() && process.argv.indexOf('--watch') === -1) {
          console.log('build error');
          process.exit(1);
        }
      });
    },
  ],
  stats: {
    all: false,
    errors: true,
    warnings: true,
  },
};
