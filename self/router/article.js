'use strict';
const sequelize = require('../model');

const article = function*() {
    var reg = /\d+/g;
    var id = this.request.url.match(reg)[0];


    var result = sequelize.ArticleModel.findById(id)
            .then(function(result){
                return result.increment('view',{by:1});
            })
            .then(function(result){
                var date = new Date(result.gmt_modified);
                result.gmt_modified = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
                return result;
            });

    yield  this.render('article.dust',{result:result});
};



module.exports = article;