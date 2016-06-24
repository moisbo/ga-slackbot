'use strict';

const assert = require('assert');
const users = require('./data/users')();

describe('parse users', function () {
    it('should parse users', function (done) {
        var user = {
            id: 'U0BTKA7MJ',
            team_id: 'T0BTMTJET',
            name: 'moisbo'
        };
        var moisbo = users.members.filter(function (user) {            
            return  'moisbo' === user.name;
        });
        assert.equal(user.name, moisbo[0].name);
        done();
    });
});