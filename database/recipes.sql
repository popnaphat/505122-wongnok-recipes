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

 Date: 11/04/2024 20:56:12
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for recipes
-- ----------------------------
DROP TABLE IF EXISTS `recipes`;
CREATE TABLE `recipes`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `ingredients` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `description` text CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `duration` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `Difficulty` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `image_path` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `created_at` timestamp(0) NULL DEFAULT CURRENT_TIMESTAMP,
  `created_by` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = MyISAM AUTO_INCREMENT = 17 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of recipes
-- ----------------------------
INSERT INTO `recipes` VALUES (2, 'กุ้งเผา', 'กุ้งแม่น้ำ', 'กุ้งเผายุธยาดดดssssasssssกกกหกssdกกกก', '31-60 mins', 'Hard', 'https://images.pexels.com/photos/1031780/pexels-photo-1031780.jpeg', '2024-04-07 16:57:00', 'admin@admin');
INSERT INTO `recipes` VALUES (3, 'ยำรวมมิตรaaa', 'ไส้กรอก ปูอัก แมงกะพรุน ผักต่าง ๆ น้ำยำรสจัดasกกกก', '1.เตรียมวัตถุดิบ\\\\n2.ทำน้ำยำ\\\\n3.คลุกเคล้าส่วนผสม', '11-30 mins', 'Medium', 'https://images.pexels.com/photos/1234535/pexels-photo-1234535.jpeg', '2024-04-07 16:57:00', 'naphat.ana@gmail.com');
INSERT INTO `recipes` VALUES (4, 'ต้มใบม่วง', 'เนื้อหมูซี่โครง, ใบชะมวง', 'ดูกหมูใบมวงa', '11-30 mins', 'Hard', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQYzqLXONR0a7bCQw42hyPs5Ziw4wJDyj6Wwu8Pm2u9NQ&s', '2024-04-08 22:06:31', 'admin@admin');
INSERT INTO `recipes` VALUES (7, 'ข้าวกะเพรากุ้งa', 'กกก', 'หหหห', '11-30 mins', 'Medium', 'https://img.freepik.com/free-photo/thai-food-shrimp-squid-fried-cooked-with-long-beans-rice_1150-26166.jpg', '2024-04-10 22:02:12', 'naphat.ana@gmail.com');
INSERT INTO `recipes` VALUES (8, 'เขียวหวานไก่a', 'พพพพ', 'ฟฟฟฟ', '11-30 mins', 'Hard', 'https://img.freepik.com/free-photo/rice-noodles-chicken-green-curry-coconut-milk-thai-food_1150-25328.jpg', '2024-04-10 22:05:09', 'naphat.ana@gmail.com');
INSERT INTO `recipes` VALUES (9, 'สปาเกตตี้ขี้เมาทะเล', 'เส้นสปาเกตตี้,กุ้ง,หมึก,ซอสปรุงรส,ซอยหอยนางรม', 'ลวกเส้น,ผัดเส้น,เติมtoping', '31-60 mins', 'Medium', 'https://img.freepik.com/free-photo/stir-fried-instant-noodles-with-seafood-variety-vegetable_1150-27323.jpg', '2024-04-10 22:48:41', 'naphat.ana@gmail.com');
INSERT INTO `recipes` VALUES (10, 'sasd', 'asdasd', 'zxcas', '5-10 mins', 'Hard', 'https://img.freepik.com/free-photo/stir-fried-instant-noodles-with-seafood-variety-vegetable_1150-27323.jpg', '2024-04-10 22:54:31', 'naphat.ana@gmail.com');
INSERT INTO `recipes` VALUES (11, 'ฟหกฟ', 'ไๆำๆกหฟก', 'หฟดแปอปท', '31-60 mins', 'Hard', 'https://img.freepik.com/free-photo/rice-noodles-chicken-green-curry-coconut-milk-thai-food_1150-25328.jpg', '2024-04-10 22:57:21', 'naphat.ana@gmail.com');
INSERT INTO `recipes` VALUES (12, '3333', 'ssss', 'aaaaa', '60+ mins', 'Hard', 'https://img.freepik.com/free-photo/rice-noodles-chicken-green-curry-coconut-milk-thai-food_1150-25328.jpg', '2024-04-10 22:58:27', 'naphat.ana@gmail.com');
INSERT INTO `recipes` VALUES (13, 'ggg', 'gggggggg', 'gggg', '11-30 mins', 'Medium', 'https://img.freepik.com/free-photo/rice-noodles-chicken-green-curry-coconut-milk-thai-food_1150-25328.jpg', '2024-04-10 22:59:44', 'naphat.ana@gmail.com');
INSERT INTO `recipes` VALUES (14, 'ปลาเก๋าลวกจิ้ม', 'ปลาเก๋า,น้ำจิ้มซีฟู้ด', 'นึ่งหรือลวกปลาเก๋า,ทำน้ำจิ้มซีฟู้ด', '31-60 mins', 'Easy', 'https://img.freepik.com/free-photo/boiled-fish-with-spicy-dipping-sauce-vegetable_1150-27783.jpg', '2024-04-10 23:01:40', 'naphat.ana@gmail.com');
INSERT INTO `recipes` VALUES (15, 'เผ็ดๆ', 'asds', 'asdasd', '60+ mins', 'Hard', 'https://img.freepik.com/free-photo/stir-fried-instant-noodles-with-seafood-variety-vegetable_1150-27323.jpg', '2024-04-10 23:31:28', 'admin@admin');

SET FOREIGN_KEY_CHECKS = 1;
