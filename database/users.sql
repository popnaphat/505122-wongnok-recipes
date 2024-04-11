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

 Date: 11/04/2024 20:59:08
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for users
-- ----------------------------
DROP TABLE IF EXISTS `users`;
CREATE TABLE `users`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `email` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `password` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `created_at` timestamp(0) NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `email`(`email`) USING BTREE
) ENGINE = MyISAM AUTO_INCREMENT = 5 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of users
-- ----------------------------
INSERT INTO `users` VALUES (1, 'naphat.ana@gmail.com', '$2y$10$QsCulrnIokqCG0fEzcLbyOhMI73CPfACt5DRpCBoMFkp1S5tIxqiW', '2024-04-08 20:06:30');
INSERT INTO `users` VALUES (2, 'g@g', '$2y$10$YHpXuHtQQE1Voij7acXzyO2mQ0m4BJebijAV8q3jws.2OTOLp1PsW', '2024-04-11 10:51:39');
INSERT INTO `users` VALUES (3, 'admin@admin', '$2y$10$MpVS0jxLL9suO/CgOu209uOUf.vTANZR8Px4iH6I3Oq9EDFp.zOim', '2024-04-08 21:39:53');
INSERT INTO `users` VALUES (4, 'a@a', '$2y$10$ddU2xQA/PWB.gfSIFh54I.K3D0HK/cfrim/3t4D3RTfpYtx1QgSS6', '2024-04-11 20:08:55');

SET FOREIGN_KEY_CHECKS = 1;
