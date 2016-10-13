'use strict';
const nav_config = [
    {
        name : 'NODEJS',
        link : '/nodejs',
        subGroup : [
            {
                name : 'api解读',
                link : '/nodejs/api'
            },{
                name : '后端应用',
                link : '/nodejs/backend'
            },{
                name : '常用包',
                link : '/nodejs/package'
            },{
                name : '模板引擎',
                link : '/nodejs/template'
            }]
    },{
        name : 'JAVASCRIPT',
        link : '/javascript',
        subGroup : [
            {
                name : '基本知识',
                link : '/javascript/base'
            },{
                name : 'JS高级',
                link : '/javascript/advance'
            },{
                name : 'Jquery',
                link : '/javascript/jquery'
            },{
                name : 'React',
                link : '/javascript/React'
            }]
    },{
        name : '数据库',
        link : '/database',
        subGroup : [
            {
                name : 'mysql',
                link : '/database/mysql'
            },{
                name : 'mongodb',
                link : '/database/mongodb'
            },{
                name : 'redis',
                link : '/database/redis'
            },{
                name : 'sequelize',
                link : '/database/sequelize'
            }]
    },{
        name : '其他',
        link : '/other',
        subGroup : [
            {
                name : 'HTML5',
                link : '/other/html5'
            },{
                name : 'CSS3',
                link : '/other/css3'
            },{
                name : 'Nginx',
                link : '/other/nginx'
            }]
    },{
        name : '工具',
        link : '/tool',
        subGroup : [
            {
                name : 'gulp',
                link : '/tool/gulp'
            },{
                name : 'git',
                link : '/tool/git'
            },{
                name : 'markdown',
                link : '/tool/markdown'
            }]
    },{
        name : '应用',
        link : '/apply',
        subGroup : [
            {
                name : '前端组件',
                link : '/apply/subgroup'
            },{
                name : '全栈开发',
                link : '/apply/fullstack'
            },{
                name : '微信开发',
                link : '/apply/weixin'
            },{
                name : '场景开发',
                link : '/apply/scene'
            }
        ]
    }];



module.exports = {
    NAV_CONFIG: nav_config
};