'use strict';

const Sequelize = require('sequelize');
const sequelize = require('../../proxy/connect');
const NavConfig = require('../../config').NAV_CONFIG;
const co = require('co');

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
    nav_id : Sequelize.INTEGER,
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


NavModel.drop();
MenuModel.drop();
NavModel.sync();
MenuModel.sync();
ArticleModel.sync();

co(function*(){
    for (let i = 0,r = NavConfig.length;i < r;i ++ ) {
        var cur = NavConfig[i];
        var obj = {};
        obj.gmt_create = new Date();
        obj.gmt_modified = new Date();
        obj.nav = cur.name;
        var result = yield NavModel.create(obj);
        for (let j = 0,k = cur.subGroup.length; j < k;j ++ ){
            var tur = cur.subGroup[j];
            var obj2 = {};
            obj2.gmt_create = new Date();
            obj2.gmt_modified = new Date();
            obj2.nav = obj.nav;
            obj2.menu = tur.name;
            yield MenuModel.create(obj2);
        }
    }
});


module.exports = {
    NavModel : NavModel,
    MenuModel : MenuModel,
    ArticleModel : ArticleModel
};