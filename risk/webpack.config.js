/**
 * Created by Administrator on 2016/12/23.
 */
//__dirname,当前脚本所执行的目录
var webpack,
    autoprefixer,
    assert,
    updateVersion,
    event,
    isDev,
    path,
    version;
webpack = require('webpack');
autoprefixer = require('autoprefixer');
assert = require('assert');

event = process.env.npm_lifecycle_event;
isDev = event.indexOf('dev') !== -1;
path = 'risk';
assert(path, 'path undefined');

module.exports = {
    //页面入口文件配置
    devtool: isDev ? 'cheap-module-eval-source-map' : 'source-map', //配置生成Source Maps，选择合适的选项eval-source-map
    entry: {
        "bundle": `./${path}/app/js/view.js`
    }, //入口
    output: {
        path: `/users/liuzeyu/views/${path}/`, //输出
        filename: `[name].${path}.js`
    },
    module: {
        rules: [{
            test: /\.json$/,
            exclude: /node_modules/,
            use: "json-loader"
        }, {
            test: /\.js$/,
            exclude: [/node_modules/, /views/],
            include: [/app/, /commonjs/],
            use: [{ loader: 'babel-loader' }] //在webpack的module部分的loaders里进行配置即可
        }, {
            test: /\.css$/,
            include: /app/,
            use: ['style-loader', 'css-loader', "postcss-loader"]
        }, {
            test: /.(png)|(jpg)|(gif)$/,
            use: "url-loader?limit=8129&name=./img/[hash:8].[name].[ext]" //注意图片路径
        }, {
            test: /\.(woff|woff2|svg|eot|ttf)\??.*$/,
            use: "file-loader?name=/fonts/[name].[ext]"
        }]
    },

    plugins: [
            new webpack.LoaderOptionsPlugin({
                // test: /\.xxx$/, // may apply this only for some modules
                options: {
                    postcss: function() {
                        return [autoprefixer({ browsers: ['last 2 versions'] })]
                    }
                },
                devServer: {
                    contentBase: "./views",
                    port: "3000",
                    host: "0.0.0.0",
                    quiet: true,
                    colors: true,
                    historyApiFallback: true,
                    inline: true,
                    hot: true
                }
            }),
            new webpack.HotModuleReplacementPlugin(), //热加载插件
            new webpack.DefinePlugin({ //更改node_env
                'process.env': {
                    'NODE_ENV': JSON.stringify('production')
                }
            }),
            new webpack.optimize.UglifyJsPlugin({
                compress: {
                    warnings: false
                }
            }) //压缩文件
        ]
        /*devServer: {
          contentBase: "./views",//本地服务器所加载的页面所在的目录
          colors: true,//终端中输出结果为彩色
          historyApiFallback: true,//不跳转
          inline: true//实时刷新
        }*/

};