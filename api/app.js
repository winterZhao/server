'use strict';
const koa = require('koa');
const Route = require('./router');
const bodyParser = require('koa-body-parser');
const Logger = require('koa-logger');

const app = koa();


app.use(Logger());
app.use(bodyParser());


Route(app);
app.listen('202');