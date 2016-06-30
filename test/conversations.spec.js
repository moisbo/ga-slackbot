'use strict';

const assert = require('assert');
const conversations = require('../app/conversations');
const util = require('../app/util');

describe('conversations', function () {
    it('should get a conversation', function (done) {
        var length = conversations.length;
        assert.equal(typeof conversations.ask, 'function');
        done();
    });
});