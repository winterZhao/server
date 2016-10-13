'use strict';
const sequelize = require('../model');

const getList = function*(first,offset,require) {
    var list,count;
    list = yield sequelize.ArticleModel.findAll({
        limit: 10,
        offset: offset,
        order : [['id','DESC']],
        where : require
    });
    if (first) {
        count = yield sequelize.ArticleModel.count({
            where : require
        });
    }
    var obj = {};
    obj.data = list;
    obj.count = count;
    return obj;


};

module.exports = {
    getList : getList
};