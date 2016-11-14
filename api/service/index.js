'use strict';

const sequelize = require('../model');
const Common = require('./common');

const getNav = function*() {
    var result = yield sequelize.NavModel.findAll({});
    this.body = result;
};

const getList = function*() {
    var nav = this.query.category;
    var menu = this.query.menu;
    var search = this.query.search;
    var first = this.query.first;
    var page = this.query.page;
    var offset = (page-1)*10;
    var obj = {};

    if (search){
        obj = yield Common.getList(first,offset,{'title':{ $like : '%' + search +'%'}});
    }
    if (menu){
        obj = yield Common.getList(first,offset,{'menu' : menu});
    }
    if (nav) {
        if (nav ==='首页'){
            obj = yield Common.getList(first,offset,{});

        } else {
            obj = yield Common.getList(first,offset,{'nav' : nav});

        }
    }

    this.body = obj;
};

const getMenu = function*() {
    var nav = this.query.nav;
    var menuList = yield sequelize.MenuModel.findAll({
        where : {
            nav : nav
        }
    });
    this.body = menuList;
};

const content = function*() {
    var id = this.query.id;
    var result;
    try {
        result = yield sequelize.ArticleModel.findOne({
            where : {
                id : id
            }
        });
    } catch(e) {
        result = {'error':true,msg:'查询数据库失败，请重试!'};
    }

    this.body = result;
};

module.exports = {
    getNav : getNav,
    getMenu : getMenu,
    getList : getList,
    content : content
};