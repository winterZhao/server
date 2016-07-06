# Host: localhost  (Version: 5.5.40)
# Date: 2016-06-21 18:06:28
# Generator: MySQL-Front 5.3  (Build 4.120)

/*!40101 SET NAMES utf8 */;

#
# Structure for table "works"
#

DROP TABLE IF EXISTS `works`;
CREATE TABLE `works` (
  `id` int(2) NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL DEFAULT '',
  `description` varchar(255) DEFAULT NULL,
  `picurl` varchar(255) NOT NULL DEFAULT '' COMMENT '图片大小为400*300',
  `demourl` varchar(255) DEFAULT NULL,
  `viewurl` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

#
# Data for table "works"
#

/*!40000 ALTER TABLE `works` DISABLE KEYS */;
INSERT INTO `works` VALUES (1,'hello world','这是一个测试项目','/images/a.jpg','https://github.com/winterZhao/notes/wiki/notes','winterzhao.github.io');
/*!40000 ALTER TABLE `works` ENABLE KEYS */;
