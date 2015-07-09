var path = require('path');

var dest = './public';
var src = './src';
var relativeSrcPath = path.relative('.', src);

module.exports = {
    dest: dest,

    js: {
        src: src + '/jsx/**',
        dest: dest + '/javascripts',
        uglify: false   
    },

    webpack: {
        entry: src + '/jsx/app.jsx',
        output: {
            filename: 'app.js'
        },
        devtool: 'inline-source-map',
        module: {
            loaders: [
                { test: /\.jsx$/, loader: 'babel-loader' }
            ]
        },
        resolve: {
            extensionx: [ '', 'js', 'jsx' ]
        }
    },

    stylus: {
        src: [  // もし外部のcssフレームワーク使うなら配列の先頭で読み込むと良い
            src + '/styl/**/!(_)*'  // ファイル名の先頭がアンスコはビルド対象外にする
        ],
        dest: dest + '/stylesheets',
        output: 'style.css',  // 出力ファイル名
        autoprefixer: {
            browsers: ['last 2 versions']
        },
        minify: false
    },

    watch: {
        js: relativeSrcPath + '/jsx/**',
        styl: relativeSrcPath + '/styl/**'
    }
};