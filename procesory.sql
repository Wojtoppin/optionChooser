-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Paź 11, 2023 at 08:29 PM
-- Wersja serwera: 10.4.28-MariaDB
-- Wersja PHP: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `procesory`
--

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `producer`
--

CREATE TABLE `producer` (
  `ID` int(11) NOT NULL,
  `producer` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_polish_ci;

--
-- Dumping data for table `producer`
--

INSERT INTO `producer` (`ID`, `producer`) VALUES
(1, 'Daewoo'),
(2, 'Toyota'),
(3, 'Ford'),
(4, 'Honda'),
(5, 'Volkswagen'),
(6, 'Nissan'),
(7, 'Chevrolet'),
(8, 'Hyundai'),
(9, 'Kia'),
(10, 'Mazda'),
(11, 'Subaru'),
(12, 'Audi'),
(13, 'BMW'),
(14, 'Mercedes-Benz'),
(15, 'Lexus');

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `samochody`
--

CREATE TABLE `samochody` (
  `ID` int(11) NOT NULL,
  `name` varchar(30) NOT NULL,
  `cena` float NOT NULL,
  `przebieg` int(11) NOT NULL,
  `klimatyzacja` float NOT NULL,
  `sredni_koszt_naprawy` int(11) NOT NULL,
  `producer_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_polish_ci;

--
-- Dumping data for table `samochody`
--

INSERT INTO `samochody` (`ID`, `name`, `cena`, `przebieg`, `klimatyzacja`, `sredni_koszt_naprawy`, `producer_id`) VALUES
(1, 'Daewoo Tico', 15000, 50000, 1, 300, 1),
(2, 'Toyota Corolla', 12000, 60000, 0.5, 400, 2),
(3, 'Ford Focus', 18000, 75000, 1, 350, 3),
(4, 'Honda Civic', 20000, 80000, 0.5, 500, 4),
(5, 'Volkswagen Golf', 10000, 40000, 0, 600, 5),
(6, 'Nissan Sentra', 22000, 90000, 1, 280, 6),
(7, 'Chevrolet Cruze', 13000, 55000, 0.5, 420, 7),
(8, 'Hyundai Elantra', 17000, 70000, 1, 320, 8),
(9, 'Kia Rio', 11000, 45000, 0, 520, 9),
(10, 'Mazda 3', 25000, 100000, 1, 250, 10),
(11, 'Subaru Impreza', 14000, 58000, 0.5, 430, 11),
(12, 'Audi A4', 19000, 77000, 1, 370, 12),
(13, 'BMW 3 Series', 23000, 95000, 1, 290, 13),
(14, 'Mercedes-Benz C-Class', 16000, 68000, 0.5, 410, 14),
(15, 'Lexus ES', 28000, 110000, 1, 240, 15),
(16, 'Volkswagen Jetta', 15000, 62000, 0.5, 440, 5),
(17, 'Ford Fusion', 20000, 82000, 1, 360, 3),
(18, 'Toyota Camry', 24000, 98000, 1, 270, 2),
(19, 'Hyundai Sonata', 17000, 71000, 0.5, 450, 8),
(20, 'Honda Accord', 30000, 120000, 1, 230, 4),
(21, 'test', 35050, 225000, 0, 460, NULL),
(22, 'RobotRepos', 550, 300, 1, 200, NULL),
(23, 'Kebab Salema', 17000, 22550, 1, 580, NULL),
(24, 'test', 50, 50, 1, 20, NULL),
(25, 'ford mondeo', 60000, 120000, 1, 460, 3);

--
-- Indeksy dla zrzutów tabel
--

--
-- Indeksy dla tabeli `producer`
--
ALTER TABLE `producer`
  ADD PRIMARY KEY (`ID`);

--
-- Indeksy dla tabeli `samochody`
--
ALTER TABLE `samochody`
  ADD PRIMARY KEY (`ID`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `producer`
--
ALTER TABLE `producer`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT for table `samochody`
--
ALTER TABLE `samochody`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
