'use strict';
const router = require('koa-router')();
const category = require('./category');
const increase = require('./increase');
const article = require('./article');

module.exports = function(app){

    router.get('/',category.homeData);

    router.get('/article/:id',article);
    router.get('/admin',function*(){
        this.redirect('/admin/list');
    });
    router.get('/admin/increase',increase.get);
    router.get('/admin/increase/menu',increase.getMenu);
    router.post('/admin/increase',increase.post);
    router.get('/admin/list',increase.edit);


    app.use(router.routes())
       .use(router.allowedMethods());
};