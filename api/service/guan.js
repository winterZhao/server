'use strict';

const sequelize = require('../model');
const Common = require('./common');


const postArticle = function* () {
    var body = this.request.body;
    if (body.title){
        body.gmt_create = new Date();
        body.gmt_modified = new Date();

        var msg = {};
        try {
            yield sequelize.GuanModel.create(body);
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
    this.body = JSON.stringify(msg);
};


const getList = function*() {
    var callback = this.request.query.callback;
    var obj = {};
    try {
        var list = yield sequelize.GuanModel.findAll({});

        obj.data = list;
        obj.success = true;
    } catch(e) {
        obj.success = false;
    }

    this.body = callback + '(' + JSON.stringify(obj) + ')';
};



const content = function*() {
    var id = this.query.id;
    var result;
    try {
        result = yield sequelize.GuanModel.findOne({
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
    postArticle: postArticle,
    getList : getList,
    getContent : content
};