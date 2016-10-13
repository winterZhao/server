'use strict';
const sequelize = require('../model');
const navConfig = require('../../config').NAV_CONFIG;

const get = function* () {
    yield this.render('add.dust',{nav : navConfig });

};

const getMenu = function* () {
    var nav = this.query.nav;
    var result = yield sequelize.MenuModel.findAll({
        where : {
            nav : nav
        }
    });
    this.body ={'success': true,data:result};
};

const post = function* () {
    var body = this.request.body;
    if (body.title){
        body.gmt_create = new Date();
        body.gmt_modified = new Date();

        var msg = {};
        try {
            yield sequelize.ArticleModel.create(body);
            msg = {'success' : true};

        } catch(err){
            if (err.name === 'SequelizeUniqueConstraintError'){
                msg = {
                    'success' : false ,
                    'msg' : '标题重复,请重试!'
                };
            } else {
                msg = {
                    'success' : false ,
                    'msg' : '服务器繁忙,请稍后再试!'
                };
            }
        }

    } else {
        msg = {
            'success' : false ,
            'msg' : '没有标题,请重试'
        };
    }
    this.body = msg;

};

const edit = function*() {
    try {
        var result = yield sequelize.ArticleModel.findAll({
            order : [['id','DESC']],
            limit :20,
            offset : 0,
            attributes : ['id','title','view','nav','menu']
        });
        yield this.render('/edit.dust',{result:result});

    } catch(e){
        this.body = {'error':true,'msg':'数据库查询失败,请重试!'};
    }
};

module.exports = {
    get : get,
    getMenu : getMenu,
    post : post,
    edit : edit
};