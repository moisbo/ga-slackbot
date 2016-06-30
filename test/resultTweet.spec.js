'use strict';

const assert = require('assert');
const tweets = require('./data/tweet1')();

describe('parse tweets', function () {
    it('should parse lang of tweet', function (done) {                     
        var filtered = tweets.statuses.filter(function (status) {
            return status.lang === 'en' && status.retweeted === false;
        });
        assert.equal('en', filtered[0].lang);
        done();
    });
});