-- --------------------------------------------------------
-- Hôte :                        127.0.0.1
-- Version du serveur:           5.7.9-log - MySQL Community Server (GPL)
-- SE du serveur:                Win64
-- HeidiSQL Version:             9.3.0.5007
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;

-- Export de la structure de la base pour reactapp
CREATE DATABASE IF NOT EXISTS `reactapp` /*!40100 DEFAULT CHARACTER SET utf8 */;
USE `reactapp`;


-- Export de la structure de table reactapp. animes
CREATE TABLE IF NOT EXISTS `animes` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `slug` varchar(255) NOT NULL,
  `title` varchar(255) NOT NULL,
  `year` year(4) NOT NULL,
  `image` varchar(255) NOT NULL,
  `synopsys` text NOT NULL,
  `status` varchar(50) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `slug` (`slug`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Export de données de la table reactapp.animes : ~0 rows (environ)
DELETE FROM `animes`;
/*!40000 ALTER TABLE `animes` DISABLE KEYS */;
/*!40000 ALTER TABLE `animes` ENABLE KEYS */;


-- Export de la structure de table reactapp. animes_users
CREATE TABLE IF NOT EXISTS `animes_users` (
  `user_id` int(11) NOT NULL,
  `anime_id` int(11) NOT NULL,
  PRIMARY KEY (`user_id`,`anime_id`),
  KEY `FK__animes` (`anime_id`),
  CONSTRAINT `FK__animes` FOREIGN KEY (`anime_id`) REFERENCES `animes` (`id`) ON DELETE CASCADE,
  CONSTRAINT `FK__users` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Export de données de la table reactapp.animes_users : ~0 rows (environ)
DELETE FROM `animes_users`;
/*!40000 ALTER TABLE `animes_users` DISABLE KEYS */;
/*!40000 ALTER TABLE `animes_users` ENABLE KEYS */;


-- Export de la structure de table reactapp. episodes
CREATE TABLE IF NOT EXISTS `episodes` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `anime_id` int(11) NOT NULL,
  `number` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_episodes_animes` (`anime_id`),
  CONSTRAINT `FK_episodes_animes` FOREIGN KEY (`anime_id`) REFERENCES `animes` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Export de données de la table reactapp.episodes : ~0 rows (environ)
DELETE FROM `episodes`;
/*!40000 ALTER TABLE `episodes` DISABLE KEYS */;
/*!40000 ALTER TABLE `episodes` ENABLE KEYS */;


-- Export de la structure de table reactapp. episodes_users
CREATE TABLE IF NOT EXISTS `episodes_users` (
  `user_id` int(11) NOT NULL,
  `episode_id` int(11) NOT NULL,
  PRIMARY KEY (`user_id`,`episode_id`),
  KEY `FK__episodes` (`episode_id`),
  CONSTRAINT `FK__episodes` FOREIGN KEY (`episode_id`) REFERENCES `episodes` (`id`) ON DELETE CASCADE,
  CONSTRAINT `FK__users2` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Export de données de la table reactapp.episodes_users : ~0 rows (environ)
DELETE FROM `episodes_users`;
/*!40000 ALTER TABLE `episodes_users` DISABLE KEYS */;
/*!40000 ALTER TABLE `episodes_users` ENABLE KEYS */;


-- Export de la structure de table reactapp. users
CREATE TABLE IF NOT EXISTS `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `mail` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

-- Export de données de la table reactapp.users : ~2 rows (environ)
DELETE FROM `users`;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` (`id`, `mail`, `password`) VALUES
	(1, 'test@test.fr', 'lol'),
	(2, 'kilbiller13@gmail.com', '$2a$10$7vjmZOsXC7wppER4kFPuuuxBx5Oz6qx/.zDXbYSt.9bwHL8epYALC');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
