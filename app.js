"use strict";

const app =require('koa')();
const staticServer = require('koa-static');
const logger = require('koa-logger');
const render = require('koa-ejs');
const onerror = require('koa-onerror');
const path = require('path');
const routes = require('./routers');

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

let fork = require('child_process').fork;
let cronJob = require('cron').CronJob;
let job = new cronJob('* */30 * * * *',function(){
   fork ('./task/crawl.js');

},null,true);


app.listen(3000,function(){
    console.log('ok');
});

