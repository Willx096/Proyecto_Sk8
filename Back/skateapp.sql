CREATE DATABASE  IF NOT EXISTS `skateapp` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `skateapp`;
-- MySQL dump 10.13  Distrib 8.0.32, for Win64 (x86_64)
--
-- Host: localhost    Database: skateapp
-- ------------------------------------------------------
-- Server version	8.0.32

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
-- Table structure for table `eventos`
--

DROP TABLE IF EXISTS `eventos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `eventos` (
  `id` int NOT NULL AUTO_INCREMENT,
  `titulo` varchar(100) NOT NULL,
  `descripcion` varchar(3000) NOT NULL,
  `fecha` date NOT NULL,
  `hora` time NOT NULL,
  `latitud` decimal(11,7) NOT NULL,
  `longitud` decimal(11,7) NOT NULL,
  `nivel` varchar(45) NOT NULL,
  `participantes` int NOT NULL,
  `id_usuario` int NOT NULL,
  `direccion` varchar(250) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_Eventos_Id_Usuario_idx` (`id_usuario`),
  CONSTRAINT `FK_Eventos_Id_Usuario` FOREIGN KEY (`id_usuario`) REFERENCES `usuarios` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `eventos`
--

LOCK TABLES `eventos` WRITE;
/*!40000 ALTER TABLE `eventos` DISABLE KEYS */;
INSERT INTO `eventos` VALUES (1,'Tarde de skate','Iremos a Muse de arte contemporáneo (MACBA) a patinar por la tarde y enseñare a todo aquel que quiera aprender.','2023-05-01','18:30:00',41.3830950,2.1667590,'Todos',4,8,'Plaça dels Àngels, Museo de Arte Contemporáneo de Barcelona, 1, Barcelona, 08001'),(2,'DownHill (bunkers)','Subiremos a los bunkers por la noche y bajaremos patinando hasta la plaza Lesseps y luego si apetece ir a tomar algo.','2023-05-12','21:00:00',41.4193923,2.1616919,'Avanzado',3,8,'Túnel de la Rovira, Barcelona, 08001'),(3,'Mañana practicando','Hola soy nuevo y estoy aprendiendo alguien se anima a venir por la mañana a Arco de Triunfo y enseñarme algunos trucos? ','2023-05-08','10:30:00',41.3910442,2.1806486,'Principiante',2,2,'Passeig de Lluís Companys, Barcelona, 08001'),(4,'Dia de skate ','Hoya soy jordina y estoy empezando vivo cerca de las corts y he visto que hay un skateparck alguien quien se anima a venir y enseñarme?','2023-04-30','11:00:00',41.3771920,2.1092615,'Principiante',5,6,'Carrer del General Batet, Parc esportiu urbà Áurea Cuadrado, Barcelona, 08001'),(5,'Domingo chill','Alguien viene después de comer a patinar un rato al skteparck del forum?!','2023-05-07','16:30:00',41.4074165,2.2204860,'Intermedio',6,7,'Avinguda del Litoral, Skatepark Forum, Barcelona, 08001'),(6,'Dia de skate y playa','Iremos a patinar a skateparck de mar bella y luego pasaremos el resto del día en la playa. ??','2023-05-16','11:00:00',41.3980596,2.2102553,'Todos',7,10,'Passeig Marítim de la Mar Bella, Skatepark Mar Bella, Barcelona, 08001'),(7,'Noche de skate y cena','Iremos al skateparck de Paralelo o tres Xemeneies y luego iremos a algún sitio a cenar algo. Nos vemos allí ?','2023-05-04','20:00:00',41.3735791,2.1715698,'Intermedio',5,3,'Carrer de Vila i Vilà, Poliesportiu les tres xemeneies, 34, Barcelona, 08004'),(8,'Waves','Quien se viene a la tarde a las Olas de Rambla de Prim? Puedes bajarte en la L4 en la Pau o en la parada del Besòs.??','2023-05-10','19:30:00',41.4199530,2.2077123,'Avanzado',4,5,'Rambla de Prim, Barcelona, 08001'),(9,'Skate y playa en Picnic','Quien se viene a al Picnic DIY? es un skateparck al lado de la playa luego podemos ir a darnos un baño!???','2023-06-15','16:20:00',41.3953186,2.2042416,'Todos',7,6,'Carrer Carmen Amaya, 18, Barcelona, 08001'),(10,'Aprendiendo?','Buenas yo también he empezado hace poco tiempo pero si alguien que no sabe mucho le apetece puedo enseñarle lo que se.?','2023-05-27','18:20:00',41.3856859,2.1641092,'Principiante',3,6,'Plaça de la Universitat, Barcelona, 08001');
/*!40000 ALTER TABLE `eventos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `fotoseventos`
--

DROP TABLE IF EXISTS `fotoseventos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `fotoseventos` (
  `id` int NOT NULL AUTO_INCREMENT,
  `fotos` varchar(250) DEFAULT NULL,
  `id_evento` int NOT NULL,
  `id_usuario` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_FotosEventos_Id_Usuario_idx` (`id_usuario`),
  KEY `FK_FotosEventos_Id_Eventos_idx` (`id_evento`),
  CONSTRAINT `FK_FotosEventos_Id_Participacion` FOREIGN KEY (`id`) REFERENCES `participaciones` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `fotoseventos`
--

LOCK TABLES `fotoseventos` WRITE;
/*!40000 ALTER TABLE `fotoseventos` DISABLE KEYS */;
INSERT INTO `fotoseventos` VALUES (1,'1684509375411-download.jpg',6,2);
/*!40000 ALTER TABLE `fotoseventos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `participaciones`
--

DROP TABLE IF EXISTS `participaciones`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `participaciones` (
  `id` int NOT NULL AUTO_INCREMENT,
  `id_usuario` int NOT NULL,
  `id_evento` int NOT NULL,
  `valoracion` varchar(200) DEFAULT NULL,
  `puntuacion` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_Participaciones_id_usuario_idx` (`id_usuario`),
  KEY `FK_Participaciones_id_evento_idx` (`id_evento`),
  CONSTRAINT `FK_Participaciones_id_evento` FOREIGN KEY (`id_evento`) REFERENCES `eventos` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FK_Participaciones_id_usuario` FOREIGN KEY (`id_usuario`) REFERENCES `usuarios` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=28 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `participaciones`
--

LOCK TABLES `participaciones` WRITE;
/*!40000 ALTER TABLE `participaciones` DISABLE KEYS */;
INSERT INTO `participaciones` VALUES (1,4,2,NULL,NULL),(2,5,2,NULL,NULL),(3,10,2,NULL,NULL),(4,2,1,NULL,NULL),(5,10,1,NULL,NULL),(6,9,1,NULL,NULL),(7,3,1,NULL,NULL),(8,6,3,NULL,NULL),(9,2,4,NULL,NULL),(10,7,3,NULL,NULL),(11,7,4,NULL,NULL),(12,2,6,'Me lo pase muy bien y la gente fue super maja enseñadme.?',4),(13,6,6,NULL,NULL),(14,3,6,NULL,NULL),(15,9,6,NULL,NULL),(16,7,6,NULL,NULL),(17,8,6,NULL,NULL),(18,8,5,NULL,NULL),(19,9,4,NULL,NULL),(20,8,8,NULL,NULL),(21,4,8,NULL,NULL),(22,4,5,NULL,NULL),(23,4,4,NULL,NULL),(25,7,7,NULL,NULL),(26,4,7,NULL,NULL),(27,5,7,NULL,NULL);
/*!40000 ALTER TABLE `participaciones` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usuarios`
--

DROP TABLE IF EXISTS `usuarios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `usuarios` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(150) NOT NULL,
  `apellido` varchar(150) NOT NULL,
  `email` varchar(200) NOT NULL,
  `fecha_nacimiento` date NOT NULL,
  `nivel` varchar(45) NOT NULL,
  `pswd` varchar(150) NOT NULL,
  `experiencia` varchar(150) NOT NULL,
  `foto` varchar(200) DEFAULT NULL,
  `descripcion` varchar(200) NOT NULL,
  `nickname` varchar(150) NOT NULL,
  `contacto` varchar(150) DEFAULT NULL,
  `admin` int NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  UNIQUE KEY `email_UNIQUE` (`email`),
  UNIQUE KEY `nickname_UNIQUE` (`nickname`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuarios`
--

LOCK TABLES `usuarios` WRITE;
/*!40000 ALTER TABLE `usuarios` DISABLE KEYS */;
INSERT INTO `usuarios` VALUES (1,'Juana','García Torres','juana@gmail.com','1996-07-16','','$2b$10$WAf3cxutY03.Mq8d8VTYIeyfcPiimqtVH0RWsuLekWwzNm9F2NPsS','0','noFoto.jpg','Acabo de empezar a skatear. ¡Que emoción! :D','juana','JUANITA',0),(2,'Tomás','López','tomas@gmail.com','1998-01-01','Principiante','$2b$10$Q7Vtzqvge4RWWRLFU7Bvt.SnfqQHMKE9MC.H7xs/9cz9rtjH4s0.i','Menos de un mes','noFoto.jpg','Soy un chico curioso que ha decidido empezar en esta gran afición que es el skate.','Tomas34','Tomas_3',0),(3,'Pau','Perez','pau@gmail.com','1999-07-14','Intermedio','$2b$10$FPK5r/HTRjJjAR6w8Rp.WeXJxf6HqrP4.FoRjQYjzEetul9IPAPA2','Unos meses','noFoto.jpg','Empecé hace unos meses ha practicar con el skate y busco mejorar para poder algún día tener un nivel que me permita hacer trucos que impresionen.','Pau22','Pauete',0),(4,'Anna','Polo','anna@gmail.com','2000-09-11','Avanzado','$2b$10$XK.wt/KkFNHf/Gr1mIAv6eEoUVrzaEL70jmZgx6etO4asVOjZwbCO','1 año','noFoto.jpg','Hola!! Tengo muchas ganas de hacer skate junto a otras personas!! :)','Annetta2','Annetta_32',0),(5,'Marc','Ballbé','marc@gmail.com','1996-07-03','Avanzado','$2b$10$CznSTCS/z3yfWpRAM0JBS.ZrTKH2A7060HcuHiu4DqeKIkIE7h/R.','1 año','noFoto.jpg','Hola!! Soy Marc!! Me encanta skatear.','Marc22','Marc36',0),(6,'Jordina','Villanueva','jordina@gmail.com','1992-02-08','Principiante','$2b$10$KTnARKiQqgRAipArAajGOefsW1fioshZSLAqYHzAQmddIdUE6H.Cu','Unos meses','noFoto.jpg','Hola!! Me gusta mucha ir en skate.','Jordin4','Jordina_33',0),(7,'Fran','Torres','fran@gmail.com','1995-03-12','Intermedio','$2b$10$m6E9L40y5758.xBPFiN8veCNFwM3QxmV3FZ8G2wbvJbBph4llQKbe','Más de 1 año','noFoto.jpg','Hola!!! Skate for life','FranTorres','Fran_3',0),(8,'Christian','Gómez','chris@gmail.com','1997-12-25','Avanzado','$2b$10$m43aoZYzNf2mbW4xdflG5eTF6S0kT/4VEAbHpgupJPbxsKd.QmOCK','Muchos años','noFoto.jpg','Hola soy Christian llevo algunos años patinando y me gusta mucho hacer skate y enseñar a gente que quiere aprender','crispy34','637296439',0),(9,'Vicki','Masip','vicki@gmail.com','1997-03-22','Principiante','$2b$10$3tEQdsy1Iit8YJkwWunYeOyzzqoMjlGBQmMF2u6VVYqGBy7ivE4He','Unos meses','noFoto.jpg','holi:))) Estoy aquí para conocer gente y aprender mas sobre el skate!','Vicki26','Masip22',0),(10,'Clara','Rodriguez','clara@gmail.com','1990-02-26','Avanzado','$2b$10$h0/UQ6ku.c6Nvr5DUOPuh.gIla3soeYNm/FellSxwNpkwPBAtFRLK','Muchos años','noFoto.jpg','Hola soy clara y me he mudado hace poco a Barcelona y estoy buscando gente para ir a hacer skate!','Clarita','Clara26',0);
/*!40000 ALTER TABLE `usuarios` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-05-19 17:50:02
