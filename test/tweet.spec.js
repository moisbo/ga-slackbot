'use strict';

const assert = require('assert');
const tweets = require('../app/tweet');

describe('search some tweets', function () {
    beforeEach(function (done) {
        require('dotenv').config();
        done();
    });

    it('should do a search', function (done) {
        tweets.search('trump', function (search) {
            assert.notEqual(search, {});
            done();
        }); 
    });
})