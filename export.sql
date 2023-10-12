-- MariaDB dump 10.19-11.3.0-MariaDB, for Win64 (AMD64)
--
-- Host: localhost    Database: procesory
-- ------------------------------------------------------
-- Server version	11.3.0-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `oceny`
--

DROP TABLE IF EXISTS `oceny`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `oceny` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `geografia` int(11) DEFAULT NULL,
  `biologia` int(11) DEFAULT NULL,
  `matematyka` int(11) DEFAULT NULL,
  `religia` int(11) DEFAULT NULL,
  `plastyka` int(11) DEFAULT NULL,
  `niemiecki` int(11) DEFAULT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=41 DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `oceny`
--

LOCK TABLES `oceny` WRITE;
/*!40000 ALTER TABLE `oceny` DISABLE KEYS */;
INSERT INTO `oceny` VALUES
(21,'Anna',4,5,3,6,2,4),
(22,'Jan',3,4,5,2,5,3),
(23,'Maria',5,3,4,6,2,5),
(24,'Piotr',2,4,3,5,3,4),
(25,'Katarzyna',4,3,5,4,5,2),
(26,'Tomasz',3,5,4,3,4,3),
(27,'Magdalena',5,2,5,4,3,4),
(28,'Marcin',2,4,3,4,5,3),
(29,'Joanna',4,3,5,2,4,4),
(30,'Michał',3,5,3,4,2,5),
(31,'Agnieszka',4,4,4,3,4,3),
(32,'Paweł',3,3,3,5,5,4),
(33,'Ewa',5,4,2,5,3,5),
(34,'Łukasz',2,5,4,3,4,2),
(35,'Karolina',4,3,4,4,5,3),
(36,'Adam',3,4,5,2,4,4),
(37,'Natalia',5,5,3,4,3,5),
(38,'Mateusz',2,3,4,5,2,4),
(39,'Monika',4,2,5,4,5,3),
(40,'Krzysztof',3,4,3,5,3,2);
/*!40000 ALTER TABLE `oceny` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `procesory`
--

DROP TABLE IF EXISTS `procesory`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `procesory` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `cena` decimal(10,2) NOT NULL,
  `wydajność` int(11) NOT NULL,
  `zużycie_mocy` int(11) NOT NULL,
  `kompatybilnosc_numer` decimal(3,2) DEFAULT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `procesory`
--

LOCK TABLES `procesory` WRITE;
/*!40000 ALTER TABLE `procesory` DISABLE KEYS */;
INSERT INTO `procesory` VALUES
(1,'Procesor Intel i7',399.99,95,75,1.00),
(2,'Procesor AMD Ryzen 5',349.99,92,80,0.50),
(3,'Procesor Intel i5',279.99,88,85,1.00),
(4,'Procesor AMD Ryzen 7',449.99,97,77,1.00),
(5,'Procesor Intel i9',599.99,98,82,0.50),
(6,'Procesor AMD Ryzen 9',549.99,96,78,1.00),
(7,'Procesor Intel Core 2 Duo',129.99,75,95,1.00),
(8,'Procesor AMD Athlon',79.99,65,105,0.50),
(9,'Procesor Intel Pentium',89.99,70,100,1.00),
(10,'Procesor AMD Sempron',59.99,60,110,1.00);
/*!40000 ALTER TABLE `procesory` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `producer`
--

DROP TABLE IF EXISTS `producer`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `producer` (
  `ID` int(11) NOT NULL,
  `producer` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_polish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `producer`
--

LOCK TABLES `producer` WRITE;
/*!40000 ALTER TABLE `producer` DISABLE KEYS */;
INSERT INTO `producer` VALUES
(1,'Daewoo'),
(2,'Toyota'),
(3,'Ford'),
(4,'Honda'),
(5,'Volkswagen'),
(6,'Nissan'),
(7,'Chevrolet'),
(8,'Hyundai'),
(9,'Kia'),
(10,'Mazda'),
(11,'Subaru'),
(12,'Audi'),
(13,'BMW'),
(14,'Mercedes-Benz'),
(15,'Lexus');
/*!40000 ALTER TABLE `producer` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `samochody`
--

DROP TABLE IF EXISTS `samochody`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `samochody` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(30) NOT NULL,
  `cena` float NOT NULL,
  `przebieg` int(11) NOT NULL,
  `klimatyzacja` float NOT NULL,
  `sredni_koszt_naprawy` int(11) NOT NULL,
  `producer_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=41 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_polish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `samochody`
--

LOCK TABLES `samochody` WRITE;
/*!40000 ALTER TABLE `samochody` DISABLE KEYS */;
INSERT INTO `samochody` VALUES
(1,'Daewoo Tico 2016',15000,75200,1,300,1),
(2,'Toyota Corolla',12000,77700,0.5,400,2),
(3,'Ford Focus',18000,23000,1,350,3),
(4,'Honda Civic',20000,131900,0.5,500,4),
(5,'Volkswagen Golf',10000,60400,0,600,5),
(6,'Nissan Sentra',22000,26100,1,280,6),
(7,'Chevrolet Cruze',13000,69800,0.5,420,7),
(8,'Hyundai Elantra',17000,130500,1,320,8),
(9,'Kia Rio',11000,42900,0,520,9),
(10,'Mazda 3',25000,73300,1,250,10),
(11,'Subaru Impreza',14000,97600,0.5,430,11),
(12,'Audi A4',19000,128100,1,370,12),
(13,'BMW 3 Series',23000,77800,1,290,13),
(14,'Mercedes-Benz C-Class',16000,124500,0.5,410,14),
(15,'Lexus ES',28000,119000,1,240,15),
(16,'Volkswagen Jetta',15000,81400,0.5,440,5),
(17,'Ford Fusion',20000,40100,1,360,3),
(18,'Toyota Camry',24000,76300,1,270,2),
(19,'Hyundai Sonata',17000,121500,0.5,450,8),
(20,'Honda Accord',30000,108200,1,230,4),
(26,'Volkswagen Passat B6 2006',17600,36500,1,600,5),
(27,'Volkswagen Passat B6 2007',13200,108000,1,430,5),
(28,'Volkswagen Passat B6 2008',28500,30500,1,510,5),
(29,'Volkswagen Passat B6 2009',22100,78600,0,380,5),
(30,'Volkswagen Passat B6 2010',23100,31300,0,380,5),
(31,'Volkswagen Passat B6 2011',14300,41000,0,610,5),
(32,'Volkswagen Passat B7 2012',29000,101000,1,480,5),
(33,'Volkswagen Passat B7 2013',15300,111900,0,350,5),
(34,'Volkswagen Passat B7 2014',25100,116500,1,600,5),
(35,'Volkswagen Passat B7 2015',22700,106500,0,260,5),
(36,'Daewoo Tico 1996',11600,43200,1,670,1),
(37,'Daewoo Tico 1997',8200,16500,0,210,1),
(38,'Daewoo Tico 1998',8200,72900,1,520,1),
(39,'Daewoo Tico 1999',13500,45000,0,250,1),
(40,'Daewoo Tico 2000',9700,126400,1,560,1);
/*!40000 ALTER TABLE `samochody` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-10-12 21:49:42
