'use strict';
const router = require('koa-router')();
const cors = require('koa-cors');
const Service = require('../service');

const Guan = require('../service/guan.js');

module.exports = function(app){

    app.use(cors({
        origin : '*'
    }));

    router.get('/self/list',Service.getList);
    router.get('/self/nav',Service.getNav);
    router.get('/self/menu',Service.getMenu);
    router.get('/self/content',Service.content);

    router.post('/guan/write',Guan.postArticle);
    router.get('/guan/list',Guan.getList);
    router.get('/guan/article/:id',Guan.getContent);


    app.use(router.routes())
       .use(router.allowedMethods());
};



