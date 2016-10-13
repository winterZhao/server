'use strict';

const Config = require('../../config');
const navConfig  = Config.NAV_CONFIG;

const homeData = function*() {
    yield this.render('index.dust',{nav:navConfig});
};

const searchData = function*() {
    yield this.render('search.dust');
};

module.exports = {
    homeData : homeData,
    searchData : searchData
};