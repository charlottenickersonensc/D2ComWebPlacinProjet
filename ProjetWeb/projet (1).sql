-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1:3306
-- Généré le : lun. 12 mai 2025 à 12:24
-- Version du serveur : 8.3.0
-- Version de PHP : 8.2.18

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `projet`
--

-- --------------------------------------------------------

--
-- Structure de la table `classes`
--

DROP TABLE IF EXISTS `classes`;
CREATE TABLE IF NOT EXISTS `classes` (
  `id_classe` int NOT NULL AUTO_INCREMENT,
  `nom` varchar(50) COLLATE utf8mb4_general_ci NOT NULL,
  PRIMARY KEY (`id_classe`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `classes`
--

INSERT INTO `classes` (`id_classe`, `nom`) VALUES
(1, 'GR1'),
(2, 'GR2'),
(3, 'GR3'),
(4, 'GR4');

-- --------------------------------------------------------

--
-- Structure de la table `eleves_classe`
--

DROP TABLE IF EXISTS `eleves_classe`;
CREATE TABLE IF NOT EXISTS `eleves_classe` (
  `id_user` int NOT NULL,
  `id_classe` int NOT NULL,
  PRIMARY KEY (`id_user`,`id_classe`),
  KEY `id_classe` (`id_classe`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `eleves_classe`
--

INSERT INTO `eleves_classe` (`id_user`, `id_classe`) VALUES
(6, 1),
(12, 1),
(13, 1),
(14, 1),
(15, 1),
(17, 1),
(19, 1),
(24, 2),
(25, 2),
(26, 2),
(27, 3),
(28, 3),
(29, 3);

-- --------------------------------------------------------

--
-- Structure de la table `matieres`
--

DROP TABLE IF EXISTS `matieres`;
CREATE TABLE IF NOT EXISTS `matieres` (
  `id_matiere` int NOT NULL AUTO_INCREMENT,
  `nom` varchar(50) COLLATE utf8mb4_general_ci NOT NULL,
  PRIMARY KEY (`id_matiere`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `matieres`
--

INSERT INTO `matieres` (`id_matiere`, `nom`) VALUES
(1, 'Math'),
(2, 'Physique'),
(3, 'SI'),
(4, 'Anglais'),
(5, 'AR');

-- --------------------------------------------------------

--
-- Structure de la table `notes`
--

DROP TABLE IF EXISTS `notes`;
CREATE TABLE IF NOT EXISTS `notes` (
  `id_user` int NOT NULL,
  `id_matiere` int NOT NULL,
  `note` double NOT NULL,
  `date` date NOT NULL,
  `commentaire` varchar(1000) COLLATE utf8mb4_general_ci NOT NULL,
  PRIMARY KEY (`id_user`,`id_matiere`),
  KEY `id_matiere` (`id_matiere`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `notes`
--

INSERT INTO `notes` (`id_user`, `id_matiere`, `note`, `date`, `commentaire`) VALUES
(6, 2, 19, '2025-05-10', 'Excellent'),
(13, 2, 11, '2025-05-10', 'Passable'),
(14, 2, 14, '2025-05-10', 'Bien'),
(15, 2, 10, '2025-05-11', 'Passable'),
(19, 1, 15, '2025-05-06', 'Très bien '),
(19, 2, 15, '2025-05-10', 'Très bien\r\n'),
(19, 4, 17, '2025-05-06', 'Très bien'),
(24, 2, 16, '2025-05-10', 'Très bien'),
(27, 1, 15, '2025-05-10', 'Bien\r\n'),
(28, 1, 17, '2025-05-00', 'Très bien');

-- --------------------------------------------------------

--
-- Structure de la table `prof_classes_matieres`
--

DROP TABLE IF EXISTS `prof_classes_matieres`;
CREATE TABLE IF NOT EXISTS `prof_classes_matieres` (
  `id` int NOT NULL AUTO_INCREMENT,
  `id_user` int NOT NULL,
  `id_classe` int NOT NULL,
  `id_matiere` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `prof_classes_matieres_ibfk_1` (`id_user`),
  KEY `id_classe` (`id_classe`),
  KEY `id_matiere` (`id_matiere`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `prof_classes_matieres`
--

INSERT INTO `prof_classes_matieres` (`id`, `id_user`, `id_classe`, `id_matiere`) VALUES
(1, 20, 2, 5),
(2, 21, 1, 5),
(3, 22, 1, 1),
(4, 22, 2, 1),
(9, 30, 1, 2),
(10, 30, 2, 2),
(11, 30, 3, 2),
(12, 30, 4, 2),
(13, 30, 3, 1),
(14, 30, 4, 1);

-- --------------------------------------------------------

--
-- Structure de la table `users`
--

DROP TABLE IF EXISTS `users`;
CREATE TABLE IF NOT EXISTS `users` (
  `id_user` int NOT NULL AUTO_INCREMENT,
  `nom` varchar(50) COLLATE utf8mb4_general_ci NOT NULL,
  `prenom` varchar(50) COLLATE utf8mb4_general_ci NOT NULL,
  `email` varchar(250) COLLATE utf8mb4_general_ci NOT NULL,
  `mdp` varchar(250) COLLATE utf8mb4_general_ci NOT NULL,
  `role` enum('prof','student','','') COLLATE utf8mb4_general_ci NOT NULL,
  PRIMARY KEY (`id_user`)
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `users`
--

INSERT INTO `users` (`id_user`, `nom`, `prenom`, `email`, `mdp`, `role`) VALUES
(6, 'Zeini', 'Sidi', 'sidi@gmail.com', '12345', 'student'),
(12, 'Mbak', 'Mariem', 'mariem@gmail.com', 'mariem', 'student'),
(13, 'Taleb', 'Fatimetou', 'fatimetou@gmail.com', 'fatimetou', 'student'),
(14, 'Saleh', 'Zeineb', 'zeineb@gmail.com', 'zeineb', 'student'),
(15, 'Eli', 'Khadijetou', 'khadijetou@gmail.com', 'khadijetou', 'student'),
(17, 'Ibrahim', 'Yacoub', 'yacoub@gmail.com', 'yacoub', 'prof'),
(18, 'Youbbe', 'Elmehdi', 'elmehdi@gmail.com', 'elmehdi', 'prof'),
(19, 'Saab', 'Alyaa', 'alyaa@gmail.com', 'alyaa', 'student'),
(20, 'Zeid', 'Yahya', 'yahya@gmail.com', 'yahya', 'prof'),
(21, 'Jemes', 'Messi', 'messi@gmail.com', 'messi', 'prof'),
(22, 'Ali', 'Mohamed', 'mohamed@gmail.com', 'mohamed', 'prof'),
(24, 'Seddoum', 'Omar', 'omar@gmail.com', 'omar', 'student'),
(25, 'Abdellahi', 'Eyoub', 'eyoub@gmail.com', 'eyoub', 'student'),
(26, 'Nahwi', 'Horma', 'horma@gmail.com', 'horma', 'student'),
(27, 'Harith', 'Zeidan', 'zeidan@gmail.com', 'zeidan', 'student'),
(28, 'Junior', 'Ronaldo', 'ronaldo@gmail.com', 'ronaldo', 'student'),
(29, 'Dembele', 'Osman', 'osman@gmail.com', 'osman', 'student'),
(30, 'Bebah', 'Hamdi', 'hamdi@gmail.com', 'hamdi', 'prof');

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `eleves_classe`
--
ALTER TABLE `eleves_classe`
  ADD CONSTRAINT `eleves_classe_ibfk_1` FOREIGN KEY (`id_user`) REFERENCES `users` (`id_user`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `eleves_classe_ibfk_2` FOREIGN KEY (`id_classe`) REFERENCES `classes` (`id_classe`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Contraintes pour la table `notes`
--
ALTER TABLE `notes`
  ADD CONSTRAINT `notes_ibfk_1` FOREIGN KEY (`id_user`) REFERENCES `users` (`id_user`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `notes_ibfk_2` FOREIGN KEY (`id_matiere`) REFERENCES `matieres` (`id_matiere`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Contraintes pour la table `prof_classes_matieres`
--
ALTER TABLE `prof_classes_matieres`
  ADD CONSTRAINT `prof_classes_matieres_ibfk_1` FOREIGN KEY (`id_user`) REFERENCES `users` (`id_user`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `prof_classes_matieres_ibfk_2` FOREIGN KEY (`id_classe`) REFERENCES `classes` (`id_classe`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `prof_classes_matieres_ibfk_3` FOREIGN KEY (`id_matiere`) REFERENCES `matieres` (`id_matiere`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
