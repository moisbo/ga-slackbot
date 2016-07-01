'use strict';

const assert = require('assert');
const tweets = require('../app/tweet');

describe('search some tweets', function () {
    beforeEach(function (done) {
        require('dotenv').config();
        done();
    });

    it('should do a search', function (done) {
        this.timeout(10000);
        tweets
            .search('Trump')
            .then( (tweets) => {
                console.log(tweets);                  
                assert.notEqual(undefined, tweets);
                done();
            })
            .catch(done);
    });
});

describe('search some trends', function () {
    beforeEach(function (done) {
        require('dotenv').config();
        done();
    });

    it('should do a search', function (done) {
        this.timeout(10000);
        tweets
            .trends('1')
            .then( (tweets) => {
                console.log(tweets);                  
                assert.notEqual(undefined, tweets);
                done();
            })
            .catch(done);
    });
});