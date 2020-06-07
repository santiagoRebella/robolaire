const path = require('path');

module.exports = {
  devtool: 'inline-source-map',
  entry: './front/index.js',
  output: {
    filename: 'javascripts/main.js',
    path: path.resolve(__dirname, 'public'),
    publicPath: '/',
 
  },
  
  devServer: {
    
    contentBase: path.join(__dirname, 'public'),
    compress: true,
    port: 3001,
    hot: true
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          'style-loader',
          'css-loader',
          'sass-loader',
        ],
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        use: [
          {
            loader: 'file-loader',
          },
        ],
      },
      {
        test: /\.html/,
        loader: 'file-loader?name=[name].[ext]',
      },
    ]
  }
};
