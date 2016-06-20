'use strict';

module.exports = function () {
    return  {
        alljs: [
            './app/**/*.js',
            './test/*.js',
            './settings.json'
        ],
        ignoreFiles: [
            'node_modules/**/*',
            'test-data/**/*'
        ],
        start: 'app/index.js'
    };
};