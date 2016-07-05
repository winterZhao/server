"use strict";

var app =require('koa')();
var staticServer = require('koa-static');
var logger = require('koa-logger');
var render = require('koa-ejs');
var onerror = require('koa-onerror');
var path = require('path');
var routes = require('./routers');



onerror(app);
app.use(logger());
app.use(staticServer(path.join(__dirname,'public')));

render(app, {
    root: path.join(__dirname, 'views'),
    layout: false,
    viewExt: 'html',
    cache: false,
    debug: true
});

routes(app);

app.listen(3000,function(){
    console.log('ok');
})