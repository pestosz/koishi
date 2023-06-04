-- phpMyAdmin SQL Dump
-- version 5.0.4
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Czas generowania: 04 Cze 2023, 20:51
-- Wersja serwera: 10.4.17-MariaDB
-- Wersja PHP: 8.0.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Baza danych: `koishi`
--

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `credentials`
--

CREATE TABLE `credentials` (
  `userId` int(11) NOT NULL,
  `name` varchar(40) NOT NULL,
  `password` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Zrzut danych tabeli `credentials`
--

INSERT INTO `credentials` (`userId`, `name`, `password`) VALUES
(1, 'test', '$2b$10$aMd7jXFOxe9R0G5tBkV8TOTpWIkLSy0fUOT6y8WhP1cwkqxlIZ8Ki');

--
-- Indeksy dla zrzutów tabel
--

--
-- Indeksy dla tabeli `credentials`
--
ALTER TABLE `credentials`
  ADD PRIMARY KEY (`userId`);

--
-- AUTO_INCREMENT dla zrzuconych tabel
--

--
-- AUTO_INCREMENT dla tabeli `credentials`
--
ALTER TABLE `credentials`
  MODIFY `userId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
