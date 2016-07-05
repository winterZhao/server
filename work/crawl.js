"use strict";

var request = require('request');
var cheerio = require('cheerio');
var fs = require('fs');


var url = 'https://university.aliexpress.com/course_list.htm';
var obj = {};
request({url:url},function(err,response,body){
    var $ = cheerio.load(body,{decodeEntities: false});  //将 HTML 实体转成字符原型:false;
    var m = $(".category-title").html();
    obj[m] = [];
    $('.category-lister h3').each(function(index,item){
        var category={};
        var title = $(item).attr('title');
        category[title] = [];
        $(item).next().find('.parent-title').each(function(){
            var subCategory={};
            var subTitle = $(this).attr('title');
            subCategory[subTitle] = [];

            $(this).prev().find('a').each(function(ind,per){
                subCategory[subTitle].push($(per).attr('title'));
            });
            category[title].push(subCategory);
        });
        obj[m].push(category);
        fs.writeFile('json/category.json',category,function(err,data){
            if(err)throw err;
            console.log(data);
        })
        console.log(obj);
    });
});


