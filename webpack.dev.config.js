var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');

//__dirname是node.js中的一个全局变量，它指向当前执行脚本所在的目录
var path = require('path');
var ROOT_PATH = path.resolve(__dirname);
var APP_PATH = path.resolve(ROOT_PATH, 'src'); //__dirname 中的src目录，以此类推
var APP_FILE = path.resolve(APP_PATH, 'app'); //根目录文件app.js地址

module.exports = {//注意这里是exports不是export
    devtool: 'eval-source-map',//生成Source Maps,这里选择eval-source-map
    entry: {
        app: APP_FILE
    },
    output: {//输出目录
        path: ROOT_PATH + "/build",//打包后的js文件存放的地方
        filename: "bundle.js"//打包后的js文件名
    },

    module: {
        //loaders加载器
        loaders: [
            {
                test: /\.(js|jsx)$/,//一个匹配loaders所处理的文件的拓展名的正则表达式，这里用来匹配js和jsx文件（必须）
                exclude: /node_modules/,//屏蔽不需要处理的文件（文件夹）（可选）
                loader: 'babel'//loader的名称（必须）
            }, {
                test: /\.css$/,
                exclude: /^node_modules$/,
                loader: "style-loader!css-loader?modules!postcss-loader"
            }, {
                test: /\.less$/,
                exclude: /^node_modules$/,
                loaders: ['style-loader', 'css-loader', 'less-loader']
            }, {
                test: /\.(eot|woff|svg|ttf|woff2|gif|appcache)(\?|$)/,
                exclude: /^node_modules$/,
                loader: 'file-loader?name=[name].[ext]'
            }, {
                test: /\.(png|jpg|gif)$/,
                exclude: /node_modules/,
                loader: 'url-loader?limit=8192&name=images/[hash:8].[name].[ext]',
                //注意后面那个limit的参数，当你图片大小小于这个限制的时候，会自动启用base64编码图
            },
            {
                test: /\.json$/,
                loader: 'json-loader'
            }
        ]
    },

    //webpack-dev-server配置
    devServer: {
        contentBase: './build',//默认webpack-dev-server会为根文件夹提供本地服务器，如果想为另外一个目录下的文件提供本地服务器，应该在这里设置其所在目录（本例设置到"build"目录）
        colors: true,//在cmd终端中输出彩色日志
        historyApiFallback: true,//在开发单页应用时非常有用，它依赖于HTML5 history API，如果设置为true，所有的跳转将指向index.html
        inline: true,//设置为true，当源文件改变时会自动刷新页面
        port: 8088,//设置默认监听端口，如果省略，默认为"8080"
        process: true,//显示合并代码进度
    },

    plugins: [
        new webpack.DefinePlugin({
            IS_PRODUCTION: false
        }),
        new HtmlWebpackPlugin({
            template: ROOT_PATH + "/src/index.html"
        }),
        new CopyWebpackPlugin([{
            from: 'src/mock-data',
            to: 'mock-data'
        }])
    ],

    resolve: {
        extensions: ['', '.js', '.jsx', '.css', 'less'] //后缀名自动补全
    }
};