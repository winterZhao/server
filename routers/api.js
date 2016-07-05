"use strict";
const router = require('koa-router')();
const p  =require('../model/connect');

module.exports = function (app) {
    router.get('/projects',function *(){
        let rows = yield p.query('select * from works');
        yield this.body = rows;
    });
    app.use(router.routes());
};