'use strict';
const router = require('koa-router')();
const cors = require('koa-cors');
const Service = require('../service');

module.exports = function(app){

    app.use(cors({
        origin : 'http://www.zhaoleilei.cn'
    }));

    router.get('/self/list',Service.getList);
    router.get('/self/nav',Service.getNav);
    router.get('/self/menu',Service.getMenu);
    router.get('/self/content',Service.content);


    app.use(router.routes())
       .use(router.allowedMethods());
};



