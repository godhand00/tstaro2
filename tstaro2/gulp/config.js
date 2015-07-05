var dest = './public';
var src = './src';

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
        resolv: {
            extensionx: [ '', 'js', 'jsx' ]
        }
    }
};