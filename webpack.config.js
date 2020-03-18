const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin');


module.exports = {
    mode:'development',//配置打包环境，‘development’    ‘production’
    entry:'./src/index.js',//入口文件
    output:{//输出文件
        path:path.resolve(__dirname,'dist'),
        filename:'bundle.[hash:8].js',//hash后缀，避免缓存问题
        //publicPath:'/'//通常为CDN地址
    },
    module:{
        rules:[
            {
                test: /\.(le|c)ss$/,//匹配less或者css文件
                use: ['style-loader', 'css-loader', {
                    loader: 'postcss-loader',
                    options: {
                        plugins: function () {
                            return [    //处理浏览器前缀问题
                                require('autoprefixer')({
                                    "overrideBrowserslist": [
                                        ">0.25%",
                                        "not dead"
                                    ]
                                })
                            ]
                        }
                    }
                }, 'less-loader'],
                exclude: /node_modules/ //不对node_modules中文件进行匹配
            },
        ]
    },
    plugins:[
        new HtmlWebpackPlugin({
            template:'./public/index.html',
            filename:'index.html',//打包后文件名
            minify: {
                removeAttributeQuotes: false, //是否删除属性的双引号
                collapseWhitespace: false, //是否折叠空白
            },
            // hash: true //是否加上hash，默认是 false
        }),
        new CleanWebpackPlugin({
            cleanOnceBeforeBuildPatterns:['**/*', '!dll', '!dll/**'] //不删除dll目录下的文件
        }) 
    ]
}