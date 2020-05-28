var webpack=require('webpack');  
var path=require("path");    
var srcPath=path.resolve(__dirname,"src");    
var distPath=path.resolve(__dirname,"build"); 
const HtmlWebPackPlugin = require("html-webpack-plugin");
var ManifestPlugin = require('webpack-manifest-plugin');
var InterpolateHtmlPlugin = require('react-dev-utils/InterpolateHtmlPlugin');
const CompressionPlugin = require('compression-webpack-plugin');

var publicUrl = './public';
var config={  
    devtool:'source-map',  
    entry:[  
        srcPath+"/index.js"  
    ],  
    output:{    
        path:distPath,    
        publicPath: '/',  
        filename:"bundle.js",        
    },  
    plugins: [
        new HtmlWebPackPlugin({
            template: "public/index.html",            
            favicon: 'public/favicon.ico'
          }),
          new ManifestPlugin(),
          new InterpolateHtmlPlugin(HtmlWebPackPlugin, {
            PUBLIC_URL: publicUrl,
            // You can pass any key-value pairs, this was just an example.
            // WHATEVER: 42 will replace %WHATEVER% with 42 in index.html.
          }),
          new CompressionPlugin({  
            filename: '[path].gz[query]',
            test: /\.js(\?.*)?$/i,
            algorithm: 'gzip',
            threshold: 10240,
            minRatio: 0.8,
            cache: true
          })
          
      ],  
    resolve: {   
        extensions: [ '.js', '.jsx']    
    },  
   module:{  
       rules:[  
        {    
            test:/\.js?$/,    
            exclude: /node_modules/,    
            include: /src/,    
            loader:"babel-loader",                         
        },  
        {    
            test:/\.jsx?$/,    
            exclude: /node_modules/,    
            include: /src/,    
            loader:"babel-loader",   
                
        },
        {
            test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
            loader: require.resolve('url-loader'),
            options: {
              limit: 10000,
              name: 'static/media/[name].[hash:8].[ext]',
            },
          },
        {
            test: /\.css$/,
            use: [
              'style-loader',
              {
                loader: 'css-loader',
                options: {
                  importLoaders: 1,
                  modules: true
                }
              }
            ],
            include: /\.module\.css$/
          },
          {
            test: /\.css$/,
            use: [
              'style-loader',
              'css-loader'
            ],
            exclude: /\.module\.css$/
          },
          {
            test: /\.html$/,
            use: [
              {
                loader: "html-loader"
              }
            ]
          },          
          {
            test: /\.svg$/,
            use: ['@svgr/webpack', 'url-loader'],
          },
          {
            test: /\.ico$/,
            loader: "url-loader",
            query: { mimetype: "image/x-icon" }
          }          
       ]  
   },  
   devServer:{  
       hot:true,  
       port:4500  
   }  
}  
  
module.exports=config; 