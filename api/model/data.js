'use strict';

const sequelize = require('./index');
const config = require('../../config');
const NavConfig = config.NAV_CONFIG;

module.exports = function*(){
    for (let i = 0,r = NavConfig.length;i < r;i ++ ) {

        var obj = {};
        obj.gmt_create = new Date();
        obj.gmt_modified = new Date();
        obj.nav = NavConfig[i].name;
        yield  sequelize.NavModel.create(obj);

    }

};


