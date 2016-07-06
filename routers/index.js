"use strict";
const app = require('koa')();
const router = require('koa-router')();
const p = require ('../model/connect');
module.exports = function (app) {
    router.get('/',function *(){
        yield this.render('index',{title:'首页'})
    });
    router.get('/contact',function *(){
        yield this.render('contacts',{title:'联系我'});
    });
    router.get('/works',function *(){
        yield this.render('works',{title:'作品集'})
    });
    router.get('/articles',function *(){
        let themes = yield p.query('select * from theme');
        let articles = yield p.query('select * from articles');
        yield this.render('articles',{title:'文章集',themes:themes,articles:articles})
    });
    router.get('/projects',function *(){
        let rows = yield p.query('select * from works');
        yield this.body = rows;
    });
    app.use(router.routes());
};