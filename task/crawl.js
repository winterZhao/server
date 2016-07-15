"use strict";

//promise爬虫写法;
const request = require('request');
const rp= require('request-promise');
const cheerio = require('cheerio');
const async = require('async');
const p = require('../model/connect');

const articalUrl = 'http://www.cnblogs.com/zhaowinter/';
const themeUrl = 'http://www.cnblogs.com/zhaowinter/mvc/blog/sidecolumn.aspx?blogApp=zhaowinter';
const process = require('process');

const getRequestData =
        rp(themeUrl)
        .then(function(body){
            let $ = cheerio.load(body,{decodeEntities:false});
            let theme = $('#sidebar_postcategory').find('a');
            let themeArr = [];
            theme.each(function(index,item){
                let obj ={};
                let $item = $(item);
                obj.title = $item.html();
                obj.link = $item.attr('href');
                themeArr.push(obj);
            });
            return themeArr;
        })
        .then(function (themeArr){
            p.query('delete from theme');
            for (let i=0,r=themeArr.length;i<r;i++){
                let sql = 'insert into theme(title,link) values (?,?)';
                let title = themeArr[i].title;
                let link = themeArr[i].link;
                p.query(sql,[title,link]);
            }

        })
        .then(function(){
            return rp(articalUrl)
        })
        .then(function(body){
            var $ = cheerio.load(body,{decodeEntities:false});
            var articleArr = [];
            $('.day').each(function(index,item){
                var obj= {};
                obj.title = $(item).find('.postTitle2').html();
                obj.link = $(item).find('.postTitle2').attr('href');
                obj.description = $(item).find('.c_b_p_desc').html();
                articleArr.push(obj);
            });
            return articleArr;
        })
        .then(function(articleArr){
            p.query('delete from articles');
            for (var i = 0,r = articleArr.length;i < r ; i++){
                let sql = 'insert into articles(title,link,description) values (?,?,?)';
                let title = articleArr[i].title;
                let link = articleArr[i].link;
                let description = articleArr[i].description;
                p.query(sql,[title,link,description]);
            }
        })
        .then(function(){
                p.query('select * from articles',function(err,data){
                    console.log(data);
                })
        })
        .then(function(){
                setTimeout(function(){
                    process.exit();
                },600)
        })
        .catch(function(err){
            throw err;
        });




//常规爬虫写法;

//request({url:themeUrl},function(err,response,body){
//    if(err) throw err;
//    var $ = cheerio.load(body,{decodeEntities:false});
//    var theme = $('#sidebar_postcategory').find('a');
//    var themeArr = [];
//    theme.each(function(index,item){
//        var obj ={};
//        var $item = $(item);
//        obj.title = $item.html();
//        obj.link = $item.attr('href');
//        themeArr.push(obj);
//    });
//    console.log(themeArr);
//});

//request({url:articalUrl},function(err,response,body){
//    if(err) throw err;
//    var $ = cheerio.load(body,{decodeEntities:false});
//    var articleArr = [];
//    $('.day').each(function(index,item){
//        var $item = $(item);
//        var obj= {};
//        obj.title = $(item).find('.postTitle2').html();
//        obj.link = $(item).find('.postTitle2').attr('href');
//        obj.description = $(item).find('.c_b_p_desc').html();
//        articleArr.push(obj);
//    })
//     console.log(articleArr);
//})

