'use strict';

module.exports = function () {
    return  {
        alljs: [
            './app/**/*.js',
            './*.js',
            './settings.json'
        ],
        ignoreFiles: [
            'node_modules/**/*',
            'test-data/**/*'
        ],
        start: 'app/index.js'
    };
};