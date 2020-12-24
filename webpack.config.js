const path = require('path')

module.exports = {
  entry: {    // having 2 entry points, you can make it object instead of array. set the key for each entry point
    index: ['babel-polyfill', './src/index.js'],   // polyfill needs to be before application load
    edit: ['babel-polyfill', './src/edit.js'],
    generator: ['babel-polyfill', './src/generator.js']
  },      
  output: {     // output file location
    path: path.resolve(__dirname, 'public/scripts'), // __dirname represents the path from harddrive to project root directory. and use path object form the library
    filename: '[name]-bundle.js' // output file name consists of 2 different entry index.js and edit.js, so put "[name]-" before the bundle.js here, and then you also put [js file name]-bundle.js on each html file 
  },
  module: {                       // setup module -> webpack will process only js files with babel using babel-loader
    rules: [{
      test: /\.js$/,              // all the files with .js  \escape, $ to indicate the previous letter is the end of the string
      exclude: /node_modules/,      // not include node_modules
      use: {
        loader: 'babel-loader',
        options: {
          presets: ['env'],      //  js files will be modified to be used for any browsers
          plugins: ['transform-object-rest-spread']   // spread operator for object
        }
      }
    }]
  },
  devServer: {
    contentBase: path.resolve(__dirname, 'public'),    // which folder to be run up at server (live-server)
    publicPath: '/scripts/'   // from public folder where the assests are gonna be saved
  },
  devtool: 'source-map'     // devtool can show js source detail on console before compiled into bundle.js
}

