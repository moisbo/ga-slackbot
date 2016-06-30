'use strict';

const assert = require('assert');
const util = require('../app/util');

describe('test util library', function () {
    it('should test yes', function (done) {
        assert.equal(util.yes('yes'), true);
        done();
    });
    it('should test no', function (done) {
        assert.equal(util.yes('no'), false);
        done();
    });
});