var path = require("path")
var webpack = require('webpack')
var BundleTracker = require('webpack-bundle-tracker')

var config = require('./webpack.base.config.js')

config.output.path = require('path').resolve('./assets/dist')

config.plugins = config.plugins.concat([
    new BundleTracker({filename: './webpack-stats-prod.json'}),
    new webpack.optimize.CommonsChunkPlugin("common", "common.js"),
])

config.module.loaders = [
    { 
        test: /\.jsx?$/, 
        exclude: /node_modules/, 
        //loaders: ["react-hot", "babel?presets[]=react,presets[]=es2015,presets[]=stage-0"],
        loader: 'babel',
        query: {
            presets: ['es2015', 'react', 'stage-0']
        }
    },
    {
        test: /\.scss$/,
        loaders: ["style", "css", "sass"]
    },
    {
        test: /\.css$/,
        loaders: ["style", "css"]
    },
    { 
        test: /\.(png|woff|woff2|eot|ttf|svg)$/, 
        loader: 'url-loader?limit=100000' 
    }
]

module.exports = config