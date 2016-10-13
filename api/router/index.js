'use strict';
const router = require('koa-router')();
const cors = require('koa-cors');
const Service = require('../service');

module.exports = function(app){

    app.use(cors({
        origin : 'http://www.zhaoleilei.cn'
    }));

    router.get('/list',Service.getList);
    router.get('/nav',Service.getNav);
    router.get('/menu',Service.getMenu);
    router.get('/content',Service.content);


    app.use(router.routes())
       .use(router.allowedMethods());
};



