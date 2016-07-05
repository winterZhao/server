"use strict";
const app = require('koa')();
const router = require('koa-router')();
module.exports = function (app) {
    console.log(3);
    router.get('/',function *(){
        console.log(4);
        yield this.render('index',{title:'hello'})
    });
    router.get('/contact',function *(){
        yield this.render('contacts');
    });
    router.get('/works',function *(){
        yield this.render('works')
    });
    router.get('/articles',function *(){
        yield this.render('articles');
        //let themes = yield p.query('select * from theme');
        //let articles = yield p.query('select * from articles');
        //yield this.render('articles',{themes:themes,articles:articles})
    });
    app.use(router.routes());
};