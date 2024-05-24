-- MySQL dump 10.13  Distrib 8.0.31, for Win64 (x86_64)
--
-- Host: localhost    Database: tv_shop
-- ------------------------------------------------------
-- Server version	8.0.31

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `order_items`
--

DROP TABLE IF EXISTS `order_items`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `order_items` (
  `idorder` int NOT NULL,
  `idproduct` int NOT NULL,
  `nameproduct` varchar(45) DEFAULT NULL,
  `price` float DEFAULT NULL,
  `productnumber` int DEFAULT NULL,
  PRIMARY KEY (`idorder`,`idproduct`),
  KEY `fk_product_item` (`idproduct`),
  CONSTRAINT `fk_order_item` FOREIGN KEY (`idorder`) REFERENCES `orders` (`idorder`),
  CONSTRAINT `fk_product_item` FOREIGN KEY (`idproduct`) REFERENCES `product` (`idproduct`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `order_items`
--

LOCK TABLES `order_items` WRITE;
/*!40000 ALTER TABLE `order_items` DISABLE KEYS */;
INSERT INTO `order_items` VALUES (1243,2719,'Converse All Star chuck Taylor 1970s',1800000,3),(7789,4688,'Asics Gel Lyte 3 OG white smoke grey',2700000,1),(8427,5434,'Yves Saint Laurent Sneaker',25000000,1);
/*!40000 ALTER TABLE `order_items` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `orders`
--

DROP TABLE IF EXISTS `orders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `orders` (
  `idorder` int NOT NULL,
  `iduser` int NOT NULL,
  `username` varchar(20) DEFAULT NULL,
  `address` varchar(200) DEFAULT NULL,
  `phonenumber` varchar(20) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `sex` varchar(10) DEFAULT NULL,
  `method` varchar(30) DEFAULT NULL,
  `note` text,
  `totalprice` varchar(20) DEFAULT NULL,
  `date` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `status` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`idorder`),
  KEY `fk_orders` (`iduser`),
  CONSTRAINT `fk_orders` FOREIGN KEY (`iduser`) REFERENCES `user` (`iduser`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orders`
--

LOCK TABLES `orders` WRITE;
/*!40000 ALTER TABLE `orders` DISABLE KEYS */;
INSERT INTO `orders` VALUES (1243,6295,'hehe1234','Số 008, ngõ 274, đường Bế Văn Đàn, phường Quyết Tiến, TP Lai Châu','0325252312','hehe1234@gmail.com','nam','Tiền mặt','không có gì','5400000','2023-08-13 14:27:43','Đang xử lý'),(7789,6295,'hehe1234','Số 008, ngõ 274, đường Bế Văn Đàn, phường Quyết Tiến, TP Lai Châu','0325252312','hehe1234@gmail.com','nam','Tiền mặt','','2430000','2023-08-03 16:26:21','Đang xử lý'),(8427,9593,'hotboizno1','Số 008, ngõ 274, đường Bế Văn Đàn, phường Quyết Tiến, TP Lai Châu','0337083333','andrezz@gmail.com','nam','Tiền mặt','','25000000','2023-08-13 14:28:37','Đang xử lý');
/*!40000 ALTER TABLE `orders` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `product`
--

DROP TABLE IF EXISTS `product`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `product` (
  `idproduct` int NOT NULL,
  `nameproduct` varchar(45) COLLATE utf8mb4_general_ci NOT NULL,
  `image` varchar(200) COLLATE utf8mb4_general_ci NOT NULL,
  `priceproduct` bigint DEFAULT NULL,
  `condproduct` float NOT NULL,
  PRIMARY KEY (`idproduct`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product`
--

LOCK TABLES `product` WRITE;
/*!40000 ALTER TABLE `product` DISABLE KEYS */;
INSERT INTO `product` VALUES (1141,'Vans old skool OG','https://res.cloudinary.com/djz9u9dcc/image/upload/v1691291308/products/VansoldskoolOG.png',1800000,8),(1909,'Alexander McQueens','https://res.cloudinary.com/djz9u9dcc/image/upload/v1687667818/products/Last_Year_s_Cult_Trainer_Brand_Has_Created_the_Coolest_Style_for_2020_q9nsb0.jpg',19000000,9.5),(2719,'Converse All Star chuck Taylor 1970s','https://res.cloudinary.com/djz9u9dcc/image/upload/v1687668379/products/Converse_Chuck_Taylor_All_Star_70_Ox_-_Black_-_Black___3_5_uk4ebw.jpg',1800000,9.5),(4022,'converse x commes des garcons','https://res.cloudinary.com/djz9u9dcc/image/upload/v1687668556/products/Converse_x_Comme_Des_Garcons_PLAY_All_Star_Chuck_70_Hi_-_Black_-_Black___9_jswmbc.jpg',3500000,9.5),(4688,'Asics Gel Lyte 3 OG white smoke grey','https://res.cloudinary.com/djz9u9dcc/image/upload/v1687668700/products/Gel_Lyte_3_Og_white_Smoke_Grey_oyf2b2.jpg',2700000,9.5),(5367,'Nike Blazer Low','https://res.cloudinary.com/djz9u9dcc/image/upload/v1685954222/products/Gi%C3%A0y%20th%E1%BB%83%20thao%20hehe%201.jpg',2700000,9.5),(5434,'Yves Saint Laurent Sneaker','https://res.cloudinary.com/djz9u9dcc/image/upload/v1687668127/products/Saint_Laurent_Low_Top_Sneaker_Logo_Embr_In_Panna-panna___ModeSens_nlqmcy.jpg',25000000,9.5),(5709,'Adidas superstar og white','https://res.cloudinary.com/djz9u9dcc/image/upload/v1687668973/products/adidas_SUPERSTAR_SHOES_-_White___adidas_UK_oyl8ci.jpg',4200000,9.5),(6354,'Common Project','https://res.cloudinary.com/djz9u9dcc/image/upload/v1686036556/products/Common%20Project.jpg',16000000,9.5),(8202,'Vans Authentic Classic','https://res.cloudinary.com/djz9u9dcc/image/upload/v1691291328/products/VansAuthenticClassic.jpg',1800000,9),(8982,'Adidas Stan Smith','https://res.cloudinary.com/djz9u9dcc/image/upload/v1686039842/products/Adidas%20Stan%20Smith.jpg',2200000,9.5),(10289,'Nike Dunk Low Triple white','https://res.cloudinary.com/djz9u9dcc/image/upload/v1686036786/products/Nike%20Dunk%20Low%20Triple%20white.png',3400000,9.5);
/*!40000 ALTER TABLE `product` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `promote`
--

DROP TABLE IF EXISTS `promote`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `promote` (
  `iduser` int NOT NULL,
  `givecode` varchar(10) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL,
  `state` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`iduser`),
  CONSTRAINT `fk_pro` FOREIGN KEY (`iduser`) REFERENCES `user` (`iduser`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `promote`
--

LOCK TABLES `promote` WRITE;
/*!40000 ALTER TABLE `promote` DISABLE KEYS */;
INSERT INTO `promote` VALUES (2272,'HjO4iM6','het'),(2348,'PRKZd5I','het'),(3016,'dbjHDbF','het'),(4103,'gu6yd39','het'),(5541,'q0EB9RX','con'),(5678,'Dhjj4eg','con'),(6295,'rnIq6Xs','het'),(6547,'xyOhsu1','con'),(8002,'4JTAzoQ','het'),(8081,'FrbOE8O','con'),(8984,'dWItdJy','con'),(9120,'pb8RQyb','con'),(9593,'02DM3FG','het'),(9909,'gbe45Yo','het'),(10602,'tZR08Ov','con');
/*!40000 ALTER TABLE `promote` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `iduser` int NOT NULL,
  `nameuser` varchar(45) COLLATE utf8mb4_general_ci NOT NULL,
  `password` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `role` varchar(11) COLLATE utf8mb4_general_ci NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `avatar` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `sdt` varchar(20) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL,
  PRIMARY KEY (`iduser`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (2272,'Thanh Vinh','$2b$10$LSNBya6tHjZtf.0yAb4CYutyPynYEVJ0AwZZi.Rjd/ZTNua6LuZHa','user','vuthanhvinh438@gmail.com','https://res.cloudinary.com/djz9u9dcc/image/upload/v1686663741/users/TV-Shop-logo_wm428i.png','0337083194'),(2348,'hông bé ơi','$2b$10$2RqrVdBqFtsQD40qBuolTObFE1BBdfi0cM0PXBmlpiftDENZHp1ue','user','hongbeoi@gmail.com','','0325252312'),(3016,'Truong Tuan','$2b$10$WMo3rjaxN7Oc./9.6OUzKOwADUS3.v8iHLHh6.RfaFqLOVsPdbeiS','user','truongtuan@gmail.com','','0386869999'),(4103,'test tí','$2b$10$anPurvlHCSyIBy2wA6zfsO/ECyW7yNj8zOpLxVNIOAKoYvBQEuz6a','user','test@gmail.com','','0325252312'),(5541,'2021607945','$2b$10$JlSZkzhBaB9sfsSUbobMAevzaBwAPi3CWCOhHhpH2l3UF95X9aHPG','user','gaming@gmail.com','','0337083194'),(5678,'vkiu','$2b$10$GdHkcVA6aZU5.pFKQ5q7d.shkt06WThxVDj55UsnpiwvNUJjRQBna','user','vkiuvippro@gmail.com','','0337083194'),(6295,'hehe1234','$2b$10$YK3y44KRo6xCJ6xYB8db4.Xo6LjbHNdCOArvTia3BZYbfis50oxRK','user','hehe1234@gmail.com','','0325252312'),(6547,'luv bae','$2b$10$RViJX1Ide7eGQcUxYB7LbewmfhIjMJJRDe0ikuslYgDu//1sm/O16','user','bae@gmail.com','','0337083194'),(8002,'Beo thúi','$2b$10$sJxyBY5SNfRJiwj8hFLUwuW/RQcAnsUFHFPozHzYt/qhcCpmfsiVG','user','beothui@gmail.com','','0325252312'),(8081,'vippro1205','$2b$10$9Ez/sAx4dZh17bHpN34mlOT2JHr11QfeLBk1jTDcxY2lt41A9bOlG','user','vippro1205@gmail.com','','0337083194'),(8984,'tuandepchai','$2b$10$s04v4qCibI4.qdShqv0yBuKfdDRRDqAYW9La4U2B4W.6vcCihR82C','user','tuan@gmail.com','','0987654321'),(9120,'vinhnek','$2b$10$3QNnd/KaqrcAgTEkav4hPePN8nNllAyqUQ1KYt/JX9SYZd48U5oN6','user','vinhnek@gmail.com','','0325252312'),(9593,'hotboizno1','$2b$10$gQUSnHUrXEYHDHJM9.9GRuZZhW2YOGJqEU992zZfJ.Da9LZFWgoVO','user','andrezz@gmail.com','','0337083333'),(9909,'haui','$2b$10$fdJsm1KhfTCeJOuYmVOfr.aInwop6XSEVq6Ayr3slPOMfIDTUsXzi','user','hello1212@gmail.com','','0325252312'),(10602,'hehe','$2b$10$Lir//Av0RRw/GagPOjy1SeV0Ptkl1Ee7xiF..S8nqu8fLOqK0RHPq','user','hehe@gmail.com','','12345');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-08-17 23:14:17
