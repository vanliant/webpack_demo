### webpack配置（1）

---

- ##### 初始化项目

   ```markdown
    npm init -y
   ```

- ##### 安装webpack

   ```
   npm i -D webpack webpack-cli
   ```

   ###### 本文webpack版本号	`"webpack": "^4.42.0"`	`"webpack-cli": "^3.3.11"`

- ##### 根目录新建src/index.js文件

   ```javascript
   //index.js
   document.write('hello world')
   ```

   

- ##### 根目录新建webpack.config.js文件

   ```javascript
   //webpack.config.js
   const path = require('path')
   
   module.exports = {
       mode:'development',//配置打包环境，‘development’    ‘production’
       entry:'./src/index.js',//入口文件
       output:{//输出文件
           path:path.resolve(__dirname,'dist'),
           filename:'bundle.[hash:8].js',//hash后缀，避免缓存问题
           publicPath:'/'//通常为CDN地址
       }
   }
   ```

   

- ##### 输入 `npx webpack`,进行初次打包，生成dist文件夹，其中bundle.js为打包后文件

- ##### 配置html文件，自动引入打包后文件

   - ###### 使用 html-webpack-plugin 插件

   - `npm i -D html-webpack-plugin`

   - ###### 新建 public/index.html文件

      ```javascript
      <!DOCTYPE html>
      <html lang="en">
      <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Document</title>
      </head>
      <body>
          
      </body>
      </html>
      ```

   - ###### 修改webpack.config.js

      ```javascript
      const path = require('path')
      //引入html-webpack-plugin
      const HtmlWebpackPlugin = require('html-webpack-plugin')
      
      module.exports = {
          mode:'development',//配置打包环境，‘development’    ‘production’
          entry:'./src/index.js',//入口文件
          output:{//输出文件
              path:path.resolve(__dirname,'dist'),
              filename:'bundle.[hash:8].js',//hash后缀，避免缓存问题
          },
          plugins:[
              new HtmlWebpackPlugin({//使用html-webpack-plugin
                  template:'./public/index.html',
                  filename:'index.html',//打包后文件名
                  minify: {
                      removeAttributeQuotes: false, //是否删除属性的双引号
                      collapseWhitespace: false, //是否折叠空白
                  },
                  // hash: true //是否加上hash，默认是 false
              })
          ]
      }
      ```

      

   - ###### `npx webpack` 生成新文件index.html、bundle.js

      ```javascript
      //index.html
      <!DOCTYPE html>
      <html lang="en">
      <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width,initial-scale=1">
          <title>Document</title>
      </head>
      <body>
          
      <script type="text/javascript" src="/bundle.cc124ed8.js"></script></body>
      </html>
      ```

- ##### 每次打包均产生新的js文件处理

   - ###### 安装 `clean-webpack-plugin`

      ```javascript
      npm i -D clean-webpack-plugin
      ```

   - ###### webpack.config.js中使用

      ```javascript
      const { CleanWebpackPlugin } = require('clean-webpack-plugin');
      
      new CleanWebpackPlugin({
        cleanOnceBeforeBuildPatterns:['**/*', '!dll', '!dll/**'] //不删除dll目录下的文件
      }) 
      ```

   - ###### 重新打包

- ##### `style-loader` `css-loader` `less-loader` `sass-loader` 的使用

   - ###### webpack不能直接处理css文件，需要借助各种loader进行处理，同时需要postcss-loader处理浏览器的兼容性问题

   - ###### 安装依赖

      ```javascript
      npm i -D style-loader less-loader css-loader postcss-loader autoprefixer less
      ```

      

   - ###### 新建css文件，和less文件进行测试

      ```javascript
      //index.css
      body{
          padding: 0;
          margin: 0;
      }
      
      //index.less
      @color:gray;
      
      body{
          background: @color;
      }
      ```

      

   - ###### 设置webpack.config.js

      ```javascript
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
      ```

      

   - ###### 打包后，css样式引用成功

- 



