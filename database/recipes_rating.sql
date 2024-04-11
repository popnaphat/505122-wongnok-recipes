/*
 Navicat Premium Data Transfer

 Source Server         : local
 Source Server Type    : MySQL
 Source Server Version : 50726
 Source Host           : localhost:3306
 Source Schema         : checklist

 Target Server Type    : MySQL
 Target Server Version : 50726
 File Encoding         : 65001

 Date: 11/04/2024 20:58:55
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for recipes_rating
-- ----------------------------
DROP TABLE IF EXISTS `recipes_rating`;
CREATE TABLE `recipes_rating`  (
  `recipe_id` int(11) NOT NULL,
  `score` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `rated_by` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `rated_date` timestamp(0) NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE = MyISAM CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of recipes_rating
-- ----------------------------
INSERT INTO `recipes_rating` VALUES (3, '4', 'admin@admin', '2024-04-10 11:54:38');
INSERT INTO `recipes_rating` VALUES (4, '1', 'naphat.ana@gmail.com', '2024-04-09 23:29:57');
INSERT INTO `recipes_rating` VALUES (8, '4', 'admin@admin', '2024-04-10 23:33:11');
INSERT INTO `recipes_rating` VALUES (10, '4', 'admin@admin', '2024-04-11 10:08:36');
INSERT INTO `recipes_rating` VALUES (10, '2', 'g@g', '2024-04-11 16:05:14');

SET FOREIGN_KEY_CHECKS = 1;
