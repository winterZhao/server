'use strict';

const Sequelize = require('sequelize');
const sequelize = require('../../proxy/connect');

const NavModel = sequelize.define('nav',{
    gmt_create: Sequelize.DATEONLY,
    gmt_modified: Sequelize.DATEONLY,
    nav : Sequelize.STRING(40)
},{
    underscored: true,
    timestamps: false,
    createdAt: 'gmt_create',
    updatedAt: 'gmt_modified',
    freezeTableName: true
});

const MenuModel = sequelize.define('menu',{
    gmt_create: Sequelize.DATEONLY,
    gmt_modified: Sequelize.DATEONLY,
    nav : Sequelize.STRING(40),
    menu : Sequelize.STRING(100)
},{
    underscored: true,
    timestamps: false,
    createdAt: 'gmt_create',
    updatedAt: 'gmt_modified',
    freezeTableName: true
});

const ArticleModel = sequelize.define('article',{
    gmt_create: Sequelize.DATEONLY,
    gmt_modified: Sequelize.DATEONLY,
    title : Sequelize.STRING(255),
    view : Sequelize.INTEGER,
    description : Sequelize.TEXT('tiny') ,
    content : Sequelize.TEXT,
    nav : Sequelize.STRING(40),
    menu : Sequelize.STRING(100)
},{
    underscored: true,
    timestamps: false,
    createdAt: 'gmt_create',
    updatedAt: 'gmt_modified',
    freezeTableName: true
}
);

module.exports = {
    NavModel : NavModel,
    MenuModel : MenuModel,
    ArticleModel : ArticleModel
};