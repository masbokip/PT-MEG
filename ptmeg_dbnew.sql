-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 27, 2025 at 03:34 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET FOREIGN_KEY_CHECKS=0;
SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `ptmeg_dbnew`
--
CREATE DATABASE IF NOT EXISTS `ptmeg_dbnew` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `ptmeg_dbnew`;

-- --------------------------------------------------------

--
-- Table structure for table `beli`
--

DROP TABLE IF EXISTS `beli`;
CREATE TABLE `beli` (
  `id_beli` varchar(255) NOT NULL,
  `id_user` varchar(255) NOT NULL,
  `nama_depan` varchar(255) NOT NULL,
  `nama_belakang` varchar(255) NOT NULL,
  `alamat_lengkap` text NOT NULL,
  `no_hp` varchar(20) NOT NULL,
  `courier` varchar(20) NOT NULL,
  `resi` varchar(255) DEFAULT NULL,
  `ongkir` int(10) DEFAULT NULL,
  `pajak` int(10) DEFAULT NULL,
  `subtotal` int(10) DEFAULT NULL,
  `total_beli` int(11) NOT NULL,
  `potongan` int(10) DEFAULT NULL,
  `email` varchar(255) NOT NULL,
  `status_pembayaran` int(11) NOT NULL,
  `status_pengiriman` int(11) NOT NULL,
  `created_at` date NOT NULL,
  `status` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `beli`
--

INSERT INTO `beli` (`id_beli`, `id_user`, `nama_depan`, `nama_belakang`, `alamat_lengkap`, `no_hp`, `courier`, `resi`, `ongkir`, `pajak`, `subtotal`, `total_beli`, `potongan`, `email`, `status_pembayaran`, `status_pengiriman`, `created_at`, `status`) VALUES
('01d3f43', 'CUST047', 'Fajar', 'Fajar', 'Plumpang, Kelurahan Tugu Selatan, Kecamatan Koja, Provinsi DKI Jakarta,Kota Jakarta Utara ,Kode Pos 10123', '0888888888888', 'jne', 'TUNGGU KONFIRMASI PESANAN', NULL, NULL, NULL, 232744, NULL, 'jangandibacabrok@gmail.com', 1, 1, '2025-01-03', 1),
('022f801', 'CUST003', 'Jono', 'Kasino', 'L-9, Kelurahan Sidoarjo, Kecamatan Waru, Provinsi Jawa Timur,Kota Sidoarjo ,Kode Pos 61256', '085583302510', 'jnt', 'RESI SEDANG DIPROSES', NULL, NULL, NULL, 70840, NULL, 'Jonokasino@gmail.com', 2, 3, '2025-01-04', 1),
('0400c28', 'CUST001', 'Radit', 'Setyo', 'Jl. Dr. Ir. H. Soekarno No.396, Kedung Baruk, Kec. Rungkut, Surabaya, Jawa Timur 60298, Kelurahan Kedung Baruk, Kecamatan Rungkut, Provinsi Jawa Timur,Kota Surabaya ,Kode Pos 6028', '0838555485', 'jne', 'RESI SEDANG DIPROSES', NULL, NULL, NULL, 36000, NULL, 'raditsetyo@gmail.com', 2, 3, '2025-01-04', 1),
('0490a1c', 'CUST024', 'Hotel', 'Sinar', 'Jl. Raya Bandara Juanda No.36-40, Kelurahan Sedati Indah, Kecamatan Sedati, Provinsi Jawa Timur,Kota Sidoarjo ,Kode Pos 61256', '08566612355', 'pos', 'RESI SEDANG DIPROSES', NULL, NULL, NULL, 68734, NULL, 'hotelsinar.juanda@gmail.com', 2, 3, '2025-01-04', 1),
('0618b64', 'CUST006', 'Yoonara', 'Andrea', 'Jl. Brigjend Katamso No.34B, Mekar Raya Binangun, Janti, Kec. Waru, Kabupaten Sidoarjo, Jawa Timur, Kelurahan Waru, Kecamatan Waru, Provinsi Jawa Timur,Kota Sidoarjo ,Kode Pos 61256', '081956789054', 'jne', 'RESI SEDANG DIPROSES', NULL, NULL, NULL, 139680, NULL, 'y00n@gmail.com', 2, 3, '2025-01-03', 1),
('06f4249', 'CUST007', 'Sheila ', 'Permata', 'Jl. Taman Siswa No.712, Sorosutan, Kec. Umbulharjo, Kota Yogyakarta, Daerah Istimewa Yogyakarta, Kelurahan Sorosutan, Kecamatan Umbulharjo, Provinsi DI Yogyakarta,Kota Yogyakarta ,Kode Pos 55151', '08196784567', 'pos', 'RESI SEDANG DIPROSES', NULL, NULL, NULL, 55067, NULL, 'sheyyy@gmail.com', 2, 3, '2025-01-03', 1),
('08c67e1', 'CUST025', 'Fore', 'Delta Sari', 'Jl. Delta Sari Indah No.7, RW.16, Koreksari, Kureksari, Kec. Waru, Kabupaten Sidoarjo, Jawa Timur 61256, Kelurahan Kureksari, Kecamatan Waru, Provinsi Jawa Timur,Kota Sidoarjo ,Kode Pos 61256', '08881021357', 'jnt', 'RESI SEDANG DIPROSES', NULL, NULL, NULL, 170744, NULL, 'foredeltasari@gmail.com', 2, 3, '2025-01-04', 1),
('08fd92d', 'CUST005', 'Zaranita', 'Amelya', 'Jl. Letjen Sutoyo, Kasian, Bungurasih, Kec. Waru, Kabupaten Sidoarjo, Jawa Timur , Kelurahan Bungurasih, Kecamatan Waru, Provinsi Jawa Timur,Kota Sidoarjo ,Kode Pos 61256', '087851457789', 'jne', 'RESI SEDANG DIPROSES', NULL, NULL, NULL, 107680, NULL, 'zaranitaamelya@gmail.com', 2, 3, '2025-01-03', 1),
('0a477c2', 'CUST027', 'gema', 'fajar', 'jalan raya lubuk minturun, Kelurahan lubuk minturun, Kecamatan koto tangah, Provinsi Sumatera Barat,Kota Padang ,Kode Pos 25172', '085162658554', 'jne', 'RESI SEDANG DIPROSES', NULL, NULL, NULL, 336048, NULL, 'gemafajar011@gmail.com', 2, 3, '2025-01-03', 1),
('0a9127c', 'CUST002', 'Dewa', 'Felix', 'DSI L-7, Kelurahan Kureksari, Kecamatan Waru, Provinsi Jawa Timur,Kota Sidoarjo ,Kode Pos 61256', '081908353003', 'jne', 'RESI SEDANG DIPROSES', NULL, NULL, NULL, 203744, NULL, 'dewafelix321@gmail.com', 2, 3, '2025-01-08', 1),
('0c592bd', 'CUST052', 'Mas', 'Dewa', 'dsakdjsakjd, Kelurahan Kurersari, Kecamatan , Provinsi undefined,Kota undefined ,Kode Pos 61256', '081908353003', 'jne', 'TUNGGU KONFIRMASI PESANAN', 40000, 37320, 311000, 388320, 0, 'masdewa@gmail.com', 2, 2, '2025-04-17', 1),
('0cbca83', 'CUST006', 'Yoonara', 'Andrea', 'Jl. Brigjend Katamso No.34B, Mekar Raya Binangun, Janti, Kec. Waru, Kabupaten Sidoarjo, Jawa Timur, Kelurahan Waru, Kecamatan Waru, Provinsi Jawa Timur,Kota Sidoarjo ,Kode Pos 61256', '081956789054', 'jne', 'RESI SEDANG DIPROSES', NULL, NULL, NULL, 19200, NULL, 'y00n@gmail.com', 2, 3, '2025-01-03', 1),
('0d71944', 'CUST002', 'king', 'sulaiman', 'Jl. Delta Sari Indah No.7, RW.16,, Kelurahan Kureksari, Kecamatan Waru, Provinsi Jawa Timur,Kota Sidoarjo ,Kode Pos 61256', '0856555419', 'sicepat', '02012025', NULL, NULL, NULL, 106792, NULL, 'manusiaadaaja@gmail.com', 2, 4, '2025-01-01', 1),
('0e94fc2', 'CUST019', 'Toko Sinar', 'Gledek', 'Delta Sari Raya 007, Kelurahan Kureksari, Kecamatan Waru, Provinsi Jawa Timur,Kota Sidoarjo ,Kode Pos 61256', '0878555879', 'pos', 'RESI SEDANG DIPROSES', NULL, NULL, NULL, 158200, NULL, 'akudewa@gmail.com', 2, 3, '2025-01-04', 1),
('0ec054b', 'CUST002', 'Dewa', 'Felix', 'DSI L-7, Kelurahan Kureksari, Kecamatan Waru, Provinsi Jawa Timur,Kota Sidoarjo ,Kode Pos 61256', '081908353003', 'ninja', 'RESI SEDANG DIPROSES', NULL, NULL, NULL, 115416, NULL, 'dewafelix321@gmail.com', 2, 4, '2025-01-05', 1),
('0f8818c', 'CUST007', 'Sheila ', 'Permata', 'Jl. Taman Siswa No.712, Sorosutan, Kec. Umbulharjo, Kota Yogyakarta, Daerah Istimewa Yogyakarta, Kelurahan Sorosutan, Kecamatan Umbulharjo, Provinsi DI Yogyakarta,Kota Yogyakarta ,Kode Pos 55151', '08196784567', 'jnt', 'DANA TELAH DIREFUND', NULL, NULL, NULL, 37864, NULL, 'sheyyy@gmail.com', 3, 5, '2025-01-03', 1),
('11e0c84', 'CUST024', 'Hotel', 'Sinar', 'Jl. Raya Bandara Juanda No.36-40, Kelurahan Sedati Indah, Kecamatan Sedati, Provinsi Jawa Timur,Kota Sidoarjo ,Kode Pos 61256', '08566612355', 'pos', 'RESI SEDANG DIPROSES', NULL, NULL, NULL, 18200, NULL, 'hotelsinar.juanda@gmail.com', 2, 3, '2025-01-04', 1),
('1308ce9', 'CUST033', 'Nicolaus', 'Fristo', 'Sonopakis Lor No.269 RT.02 Ngestiharjo, Kasihan, Bantul, Yogyakarta 55182, Kelurahan ngestiharjo, Kecamatan kasihan, Provinsi undefined,Kota undefined ,Kode Pos 55182', '081296962028', 'jne', 'TUNGGU KONFIRMASI PESANAN', NULL, NULL, NULL, 305872, NULL, 'nicolaus.fristo@gmail.com', 1, 1, '2025-01-03', 1),
('13162c3', 'CUST007', 'Sheila ', 'Permata', 'Jl. Taman Siswa No.712, Sorosutan, Kec. Umbulharjo, Kota Yogyakarta, Daerah Istimewa Yogyakarta, Kelurahan Sorosutan, Kecamatan Umbulharjo, Provinsi DI Yogyakarta,Kota Gunung Kidul ,Kode Pos 55151', '08196784567', 'tiki', 'RESI SEDANG DIPROSES', NULL, NULL, NULL, 62067, NULL, 'sheyyy@gmail.com', 2, 3, '2025-01-05', 1),
('15d72f5', 'CUST005', 'Zaranita', 'Amelya', 'Jl. Letjen Sutoyo, Kasian, Bungurasih, Kec. Waru, Kabupaten Sidoarjo, Jawa Timur , Kelurahan Bungurasih, Kecamatan Waru, Provinsi Jawa Timur,Kota Sidoarjo ,Kode Pos 61256', '087851457789', 'jne', 'RESI SEDANG DIPROSES', NULL, NULL, NULL, 153128, NULL, 'zaranitaamelya@gmail.com', 2, 3, '2025-01-03', 1),
('1ac4cfa', 'CUST004', 'Pindi', 'Margaret', 'Jl. Jend.S.Parman IV, Krajan Kulon, Waru, Kec. Waru, Kabupaten Sidoarjo, Jawa Timur, Kelurahan Waru, Kecamatan Waru, Provinsi Jawa Timur,Kota Sidoarjo ,Kode Pos 61256', '0853745678', 'ninja', 'RESI SEDANG DIPROSES', NULL, NULL, NULL, 170744, NULL, 'pindimargaret@gmail.com', 2, 3, '2025-01-03', 1),
('1c0122a', 'CUST002', 'Jono', 'Felix', 'DSI L-7, Kelurahan Kureksari, Kecamatan Waru, Provinsi Jawa Timur,Kota Sidoarjo ,Kode Pos 61256', '081908353003', 'jne', 'RESI SEDANG DIPROSES', NULL, NULL, NULL, 61280, NULL, 'dewafelix321@gmail.com', 2, 4, '2025-01-02', 1),
('1c025bd', 'CUST003', 'Jono', 'Kasino', 'L-9, Kelurahan Sidoarjo, Kecamatan Waru, Provinsi Jawa Timur,Kota Sidoarjo ,Kode Pos 61256', '085583302510', 'jnt', 'RESI SEDANG DIPROSES', NULL, NULL, NULL, 70840, NULL, 'Jonokasino@gmail.com', 2, 3, '2025-01-04', 1),
('1c2b48f', 'CUST001', 'Radit', 'Setyo', 'Jl. Dr. Ir. H. Soekarno No.396, Kedung Baruk, Kec. Rungkut, Surabaya, Jawa Timur 60298, Kelurahan Kedung Baruk, Kecamatan Rungkut, Provinsi Jawa Timur,Kota Surabaya ,Kode Pos 6028', '0838555485', 'jnt', 'RESI SEDANG DIPROSES', NULL, NULL, NULL, 86400, NULL, 'raditsetyo@gmail.com', 2, 3, '2025-01-03', 1),
('1d07dc1', 'CUST006', 'Yoonara', 'Andrea', 'Jl. Brigjend Katamso No.34B, Mekar Raya Binangun, Janti, Kec. Waru, Kabupaten Sidoarjo, Jawa Timur, Kelurahan Waru, Kecamatan Waru, Provinsi Jawa Timur,Kota Sidoarjo ,Kode Pos 61256', '081956789054', 'jne', 'DANA TELAH DIREFUND', NULL, NULL, NULL, 118400, NULL, 'y00n@gmail.com', 3, 5, '2025-01-03', 1),
('1de8c96', 'CUST025', 'Fore', 'Delta Sari', 'Jl. Delta Sari Indah No.7, RW.16, Koreksari, Kureksari, Kec. Waru, Kabupaten Sidoarjo, Jawa Timur 61256, Kelurahan Kureksari, Kecamatan Waru, Provinsi Jawa Timur,Kota Sidoarjo ,Kode Pos 61256', '08881021357', 'jnt', 'RESI SEDANG DIPROSES', NULL, NULL, NULL, 273000, NULL, 'foredeltasari@gmail.com', 2, 3, '2025-01-04', 1),
('209cb4b', 'CUST019', 'Toko Sinar', 'Gledek', 'Delta Sari Raya 007, Kelurahan Kureksari, Kecamatan Waru, Provinsi Jawa Timur,Kota Sidoarjo ,Kode Pos 61256', '0878555879', 'jnt', 'RESI SEDANG DIPROSES', NULL, NULL, NULL, 123256, NULL, 'akudewa@gmail.com', 2, 3, '2025-01-04', 1),
('2128e25', 'CUST025', 'Fore', 'Delta Sari', 'Jl. Delta Sari Indah No.7, RW.16, Koreksari, Kureksari, Kec. Waru, Kabupaten Sidoarjo, Jawa Timur 61256, Kelurahan Kureksari, Kecamatan Waru, Provinsi Jawa Timur,Kota Sidoarjo ,Kode Pos 61256', '08881021357', 'jnt', 'RESI SEDANG DIPROSES', NULL, NULL, NULL, 45752, NULL, 'foredeltasari@gmail.com', 2, 3, '2025-01-04', 1),
('2383c04', 'CUST001', 'Radit', 'Setyo', 'Jl. Dr. Ir. H. Soekarno No.396, Kedung Baruk, Kec. Rungkut, Surabaya, Jawa Timur 60298, Kelurahan Kedung Baruk, Kecamatan Rungkut, Provinsi Jawa Timur,Kota Surabaya ,Kode Pos 6028', '0838555485', 'anteraja', 'RESI SEDANG DIPROSES', NULL, NULL, NULL, 27308, NULL, 'raditsetyo@gmail.com', 2, 3, '2025-01-04', 1),
('23b9840', 'CUST002', 'Dewa', 'Felix', 'Jl. Sulawesi, Ngagel, Kec. Wonokromo, Surabaya, Jawa Timur 60281, Kelurahan Ngagel, Kecamatan Wonokromo, Provinsi Jawa Timur,Kota Surabaya ,Kode Pos 60281', '081908353003', 'jnt', 'DANA TELAH DIREFUND', NULL, NULL, NULL, 140384, NULL, 'dewafelix321@gmail.com', 3, 5, '2025-01-01', 1),
('23cdf2a', 'CUST007', 'Sheila ', 'Permata', 'Jl. Taman Siswa No.712, Sorosutan, Kec. Umbulharjo, Kota Yogyakarta, Daerah Istimewa Yogyakarta, Kelurahan Sorosutan, Kecamatan Umbulharjo, Provinsi DI Yogyakarta,Kota Yogyakarta ,Kode Pos 55151', '08196784567', 'wahana', 'RESI SEDANG DIPROSES', NULL, NULL, NULL, 203744, NULL, 'sheyyy@gmail.com', 2, 3, '2025-01-05', 1),
('26ca2fd', 'CUST005', 'Zaranita', 'Amelya', 'Jl. Letjen Sutoyo, Kasian, Bungurasih, Kec. Waru, Kabupaten Sidoarjo, Jawa Timur , Kelurahan Bungurasih, Kecamatan Waru, Provinsi Jawa Timur,Kota Sidoarjo ,Kode Pos 61256', '087851457789', 'jne', 'RESI SEDANG DIPROSES', NULL, NULL, NULL, 107680, NULL, 'zaranitaamelya@gmail.com', 2, 3, '2025-01-03', 1),
('26ed1d8', 'CUST028', 'sonia', 'chandra', 'Permata Alam Permai A2-14, Kelurahan Gemurung, Kecamatan Gedangan, Provinsi undefined,Kota undefined ,Kode Pos 61254', '081249215329', 'jne', 'RESI SEDANG DIPROSES', NULL, NULL, NULL, 280000, NULL, 'sonia.chandra2118@gmail.com', 2, 3, '2025-01-03', 1),
('29ef58f', 'CUST007', 'Sheila ', 'Permata', 'Jl. Taman Siswa No.712, Sorosutan, Kec. Umbulharjo, Kota Yogyakarta, Daerah Istimewa Yogyakarta, Kelurahan Sorosutan, Kecamatan Umbulharjo, Provinsi DI Yogyakarta,Kota Yogyakarta ,Kode Pos 55151', '08196784567', 'sicepat', 'RESI SEDANG DIPROSES', NULL, NULL, NULL, 177644, NULL, 'sheyyy@gmail.com', 2, 3, '2025-01-03', 1),
('2c27d89', 'CUST004', 'Pindi', 'Margaret', 'Jl. Jend.S.Parman IV, Krajan Kulon, Waru, Kec. Waru, Kabupaten Sidoarjo, Jawa Timur, Kelurahan Waru, Kecamatan Waru, Provinsi Jawa Timur,Kota Sidoarjo ,Kode Pos 61256', '0853745678', 'pos', 'RESI SEDANG DIPROSES', NULL, NULL, NULL, 904000, NULL, 'pindimargaret@gmail.com', 2, 3, '2025-01-03', 1),
('2c6e0f2', 'CUST052', 'Mas', 'Dewa', 'dsakdjsakjd, Kelurahan Kurersari, Kecamatan undefined, Provinsi undefined,Kota undefined ,Kode Pos 61256', '081908353003', 'jne', 'TUNGGU KONFIRMASI PESANAN', 40000, 12456, 103800, 156256, 0, 'masdewa@gmail.com', 2, 2, '2025-04-17', 1),
('2d5fdd3', 'CUST010', 'Adivan', 'Reziandra', 'Jl. Mondorakan No.5 B, Bodon, Jagalan, Kec. Kotagede, Kabupaten Bantul, Daerah Istimewa Yogyakarta , Kelurahan Jagalan, Kecamatan Kotagede, Provinsi DI Yogyakarta,Kota Bantul ,Kode Pos 55171', '0856555419', 'tiki', 'RESI SEDANG DIPROSES', NULL, NULL, NULL, 183744, NULL, 'ziann@gmail.com', 2, 3, '2025-01-03', 1),
('2e26d33', 'CUST024', 'Hotel', 'Sinar', 'Jl. Raya Bandara Juanda No.36-40, Kelurahan Sedati Indah, Kecamatan Sedati, Provinsi Jawa Timur,Kota Sidoarjo ,Kode Pos 61256', '08566612355', 'jnt', 'RESI SEDANG DIPROSES', NULL, NULL, NULL, 170744, NULL, 'hotelsinar.juanda@gmail.com', 2, 3, '2025-01-04', 1),
('2edfb41', 'CUST002', 'Dewa', 'Felix', 'DSI L-7, Kelurahan Kureksari, Kecamatan Waru, Provinsi Jawa Timur,Kota Sidoarjo ,Kode Pos 61256', '081908353003', 'jne', 'RESI SEDANG DIPROSES', NULL, NULL, NULL, 168800, NULL, 'dewafelix321@gmail.com', 2, 4, '2025-01-05', 1),
('2f9fee7', 'CUST025', 'Fore', 'Delta Sari', 'Jl. Delta Sari Indah No.7, RW.16, Koreksari, Kureksari, Kec. Waru, Kabupaten Sidoarjo, Jawa Timur 61256, Kelurahan Kureksari, Kecamatan Waru, Provinsi Jawa Timur,Kota Sidoarjo ,Kode Pos 61256', '08881021357', 'jnt', 'RESI SEDANG DIPROSES', NULL, NULL, NULL, 123256, NULL, 'foredeltasari@gmail.com', 2, 3, '2025-01-04', 1),
('2fc66dd', 'CUST024', 'Hotel', 'Sinar', 'Jl. Raya Bandara Juanda No.36-40, Kelurahan Sedati Indah, Kecamatan Sedati, Provinsi Jawa Timur,Kota Sidoarjo ,Kode Pos 61256', '08566612355', 'jnt', 'RESI SEDANG DIPROSES', NULL, NULL, NULL, 170744, NULL, 'hotelsinar.juanda@gmail.com', 2, 3, '2025-01-04', 1),
('32634af', 'CUST003', 'Jono', 'Kasino', 'L-9, Kelurahan Sidoarjo, Kecamatan Waru, Provinsi Jawa Timur,Kota Situbondo ,Kode Pos 61256', '085583302510', 'jnt', 'RESI SEDANG DIPROSES', NULL, NULL, NULL, 29800, NULL, 'Jonokasino@gmail.com', 2, 3, '2025-01-04', 1),
('32d7655', 'CUST019', 'aku', 'dewa', 'Delta Sari Raya 007, Kelurahan Kureksari, Kecamatan Waru, Provinsi DI Yogyakarta,Kota Sleman ,Kode Pos 61256', '0878555879', 'jnt', 'RESI SEDANG DIPROSES', NULL, NULL, NULL, 37184, NULL, 'akudewa@gmail.com', 2, 3, '2025-01-03', 1),
('33e3004', 'CUST002', 'Dewa', 'Felix', 'DSI L-7, Kelurahan Kureksari, Kecamatan Waru, Provinsi Jawa Timur,Kota Kediri ,Kode Pos 61256', '081908353003', 'jne', 'DANA TELAH DIREFUND', NULL, NULL, NULL, 336488, NULL, 'dewafelix321@gmail.com', 3, 5, '2025-01-03', 1),
('351e134', 'CUST006', 'Yoonara', 'Andrea', 'Jl. Brigjend Katamso No.34B, Mekar Raya Binangun, Janti, Kec. Waru, Kabupaten Sidoarjo, Jawa Timur, Kelurahan Waru, Kecamatan Waru, Provinsi Jawa Timur,Kota Sidoarjo ,Kode Pos 61256', '081956789054', 'tiki', 'RESI SEDANG DIPROSES', NULL, NULL, NULL, 72840, NULL, 'y00n@gmail.com', 2, 3, '2025-01-03', 1),
('397d0b2', 'CUST002', 'Dewa', 'Felix', 'DSI L-7, Kelurahan Kureksari, Kecamatan Waru, Provinsi Jawa Timur,Kota Sidoarjo ,Kode Pos 61256', '081908353003', 'pos', 'RESI SEDANG DIPROSES', NULL, NULL, NULL, 85400, NULL, 'dewafelix321@gmail.com', 2, 4, '2025-01-05', 1),
('3a96c59', 'CUST006', 'Yoonara', 'Andrea', 'Jl. Brigjend Katamso No.34B, Mekar Raya Binangun, Janti, Kec. Waru, Kabupaten Sidoarjo, Jawa Timur, Kelurahan Waru, Kecamatan Waru, Provinsi Jawa Timur,Kota Sidoarjo ,Kode Pos 61256', '081956789054', 'pos', 'TUNGGU KONFIRMASI PESANAN', NULL, NULL, NULL, 149384, NULL, 'y00n@gmail.com', 1, 1, '2025-01-03', 1),
('3aff14c', 'CUST005', 'Zaranita', 'Amelya', 'Jl. Letjen Sutoyo, Kasian, Bungurasih, Kec. Waru, Kabupaten Sidoarjo, Jawa Timur , Kelurahan Bungurasih, Kecamatan Waru, Provinsi Jawa Timur,Kota Sidoarjo ,Kode Pos 61256', '087851457789', 'jne', 'RESI SEDANG DIPROSES', NULL, NULL, NULL, 140384, NULL, 'zaranitaamelya@gmail.com', 2, 3, '2025-01-03', 1),
('3b1b10d', 'CUST007', 'Sheila ', 'Permata', 'Jl. Taman Siswa No.712, Sorosutan, Kec. Umbulharjo, Kota Yogyakarta, Daerah Istimewa Yogyakarta, Kelurahan Sorosutan, Kecamatan Umbulharjo, Provinsi DI Yogyakarta,Kota Yogyakarta ,Kode Pos 55151', '08196784567', 'sicepat', 'RESI SEDANG DIPROSES', NULL, NULL, NULL, 18783, NULL, 'sheyyy@gmail.com', 2, 3, '2025-01-03', 1),
('3e0821b', 'CUST002', 'Dewa', 'Felix', 'DSI L-7, Kelurahan Kureksari, Kecamatan Waru, Provinsi Jawa Timur,Kota Sidoarjo ,Kode Pos 61256', '081908353003', 'pos', 'RESI SEDANG DIPROSES', NULL, NULL, NULL, 39256, NULL, 'dewafelix321@gmail.com', 2, 4, '2025-01-05', 1),
('3ebf7e9', 'CUST007', 'Sheila ', 'Permata', 'Jl. Taman Siswa No.712, Sorosutan, Kec. Umbulharjo, Kota Yogyakarta, Daerah Istimewa Yogyakarta, Kelurahan Sorosutan, Kecamatan Umbulharjo, Provinsi Jawa Timur,Kota Sidoarjo ,Kode Pos 55151', '08196784567', 'jnt', 'RESI SEDANG DIPROSES', NULL, NULL, NULL, 85400, NULL, 'sheyyy@gmail.com', 2, 3, '2025-01-03', 1),
('3f0ab8c', 'CUST028', 'sonia', 'chandra', 'Permata Alam Permai A2-14, Kelurahan Gemurung, Kecamatan Gedangan, Provinsi undefined,Kota undefined ,Kode Pos 61254', '081249215329', 'jne', 'TUNGGU KONFIRMASI PESANAN', NULL, NULL, NULL, 280000, NULL, 'sonia.chandra2118@gmail.com', 1, 1, '2025-01-03', 1),
('413fdc8', 'CUST025', 'Fore', 'Delta Sari', 'Jl. Delta Sari Indah No.7, RW.16, Koreksari, Kureksari, Kec. Waru, Kabupaten Sidoarjo, Jawa Timur 61256, Kelurahan Kureksari, Kecamatan Waru, Provinsi Jawa Timur,Kota Sidoarjo ,Kode Pos 61256', '08881021357', 'jne', 'RESI SEDANG DIPROSES', NULL, NULL, NULL, 239360, NULL, 'foredeltasari@gmail.com', 2, 3, '2025-01-04', 1),
('42d3cf7', 'CUST002', 'Dewa', 'Felix', 'DSI L-7, Kelurahan Kureksari, Kecamatan Waru, Provinsi Jawa Timur,Kota Sidoarjo ,Kode Pos 61256', '081908353003', 'pos', 'RESI SEDANG DIPROSES', NULL, NULL, NULL, 139384, NULL, 'dewafelix321@gmail.com', 2, 4, '2025-01-05', 1),
('44384b1', 'CUST009', 'Andrian', 'Pradipta', ' Jl. Pleret, Ngrpik, Baturetno, Kec. Banguntapan, Kabupaten Bantul, Daerah Istimewa Yogyakarta, Kelurahan Baturetno, Kecamatan Banguntapan, Provinsi DI Yogyakarta,Kota Bantul ,Kode Pos 55791', '0838555485', 'pos', 'RESI SEDANG DIPROSES', NULL, NULL, NULL, 35320, NULL, 'driann@gmail.com', 2, 3, '2025-01-03', 1),
('44624ab', 'CUST056', 'Felix ', 'Dewa', 'DSI L-7, Kelurahan Kureksari, Kecamatan Waru, Provinsi undefined,Kota undefined ,Kode Pos 61256', '0838555485', 'jnt', 'TUNGGU KONFIRMASI PESANAN', 355000, 37320, 311000, 703320, 0, 'dewafelix123@gmail.com', 2, 2, '2025-04-18', 1),
('4594d39', 'CUST025', 'Fore', 'Delta Sari', 'Jl. Delta Sari Indah No.7, RW.16, Koreksari, Kureksari, Kec. Waru, Kabupaten Sidoarjo, Jawa Timur 61256, Kelurahan Kureksari, Kecamatan Waru, Provinsi Jawa Timur,Kota Sidoarjo ,Kode Pos 61256', '08881021357', 'jnt', 'RESI SEDANG DIPROSES', NULL, NULL, NULL, 170744, NULL, 'foredeltasari@gmail.com', 2, 3, '2025-01-04', 1),
('46e1f35', 'CUST052', 'Mas', 'Dewa', 'dsakdjsakjd, Kelurahan Kurersari, Kecamatan , Provinsi ,Kota  ,Kode Pos 61256', '081908353003', 'jne', 'TUNGGU KONFIRMASI PESANAN', 40000, 10680, 89000, 139680, 0, 'masdewa@gmail.com', 2, 2, '2025-04-17', 1),
('4751206', 'CUST005', 'Zaranita', 'Amelya', 'Jl. Letjen Sutoyo, Kasian, Bungurasih, Kec. Waru, Kabupaten Sidoarjo, Jawa Timur , Kelurahan Bungurasih, Kecamatan Waru, Provinsi Jawa Timur,Kota Sidoarjo ,Kode Pos 61256', '087851457789', 'jne', 'RESI SEDANG DIPROSES', NULL, NULL, NULL, 118400, NULL, 'zaranitaamelya@gmail.com', 2, 3, '2025-01-03', 1),
('47bbca6', 'CUST007', 'Sheila ', 'Permata', 'Jl. Taman Siswa No.712, Sorosutan, Kec. Umbulharjo, Kota Yogyakarta, Daerah Istimewa Yogyakarta, Kelurahan Sorosutan, Kecamatan Umbulharjo, Provinsi DI Yogyakarta,Kota Yogyakarta ,Kode Pos 55151', '08196784567', 'tiki', 'RESI SEDANG DIPROSES', NULL, NULL, NULL, 967480, NULL, 'sheyyy@gmail.com', 2, 3, '2025-01-03', 1),
('49e998a', 'CUST006', 'Yoonara', 'Andrea', 'Jl. Brigjend Katamso No.34B, Mekar Raya Binangun, Janti, Kec. Waru, Kabupaten Sidoarjo, Jawa Timur, Kelurahan Waru, Kecamatan Waru, Provinsi Jawa Timur,Kota Sidoarjo ,Kode Pos 61256', '081956789054', 'jne', 'RESI SEDANG DIPROSES', NULL, NULL, NULL, 93120, NULL, 'y00n@gmail.com', 2, 3, '2025-01-03', 1),
('49fc653', 'CUST024', 'Hotel', 'Sinar', 'Jl. Raya Bandara Juanda No.36-40, Kelurahan Sedati Indah, Kecamatan Sedati, Provinsi Jawa Timur,Kota Sidoarjo ,Kode Pos 61256', '08566612355', 'jnt', 'RESI SEDANG DIPROSES', NULL, NULL, NULL, 192080, NULL, 'hotelsinar.juanda@gmail.com', 2, 3, '2025-01-04', 1),
('4a79f1e', 'CUST026', 'fani', 'c', 'jl, Kelurahan semambung, Kecamatan gdg, Provinsi undefined,Kota undefined ,Kode Pos 262626', '000000000000', 'anteraja', 'TUNGGU KONFIRMASI PESANAN', NULL, NULL, NULL, 233744, NULL, 'namelesssteph@gmail.com', 1, 1, '2025-01-03', 1),
('4a98d8d', 'CUST002', 'Dewa', 'Felix', 'DSI L-7, Kelurahan Kureksari, Kecamatan Waru, Provinsi Jawa Timur,Kota Sidoarjo ,Kode Pos 61256', '081908353003', 'tiki', 'DANA TELAH DIREFUND', NULL, NULL, NULL, 310128, NULL, 'dewafelix321@gmail.com', 3, 5, '2025-01-04', 1),
('4ad6f97', 'CUST002', 'Gita', 'Rahayu', 'Delta Sari Indah W-29, Kelurahan Kureksari, Kecamatan Waru, Provinsi undefined, Kode Pos 61256', '08190989092', 'jne', '02012015', NULL, NULL, NULL, 263484, NULL, 'rumahmakansederhanasby@gmail.com', 2, 4, '2024-12-30', 1),
('4b3ec87', 'CUST002', 'Mas', 'Bokip', 'EH-6, Jalan Majapahit, Kaliwates Kidul, Kaliwates, Kec. Kaliwates, Kabupaten Jember, Jawa Timur 68131, Kelurahan Kaliwates Kidul, Kecamatan Kaliwates, Provinsi undefined, Kode Pos 68130', '081908353003', 'sicepat', 'RESI SEDANG DIPROSES', NULL, NULL, NULL, 147998, NULL, 'masbokip@gmail.com', 2, 4, '2024-12-27', 1),
('4b5225f', 'CUST002', 'Dewa', 'Felix', 'DSI L-7, Kelurahan Kureksari, Kecamatan Waru, Provinsi Jawa Timur,Kota Malang ,Kode Pos 61256', '081908353003', 'jne', 'DANA TELAH DIREFUND', NULL, NULL, NULL, 382488, NULL, 'dewafelix321@gmail.com', 3, 5, '2025-01-03', 1),
('4ce0c2a', 'CUST001', 'Radit', 'Setyo', 'Jl. Dr. Ir. H. Soekarno No.396, Kedung Baruk, Kec. Rungkut, Surabaya, Jawa Timur 60298, Kelurahan Kedung Baruk, Kecamatan Rungkut, Provinsi Jawa Timur,Kota Surabaya ,Kode Pos 6028', '0838555485', 'jnt', 'RESI SEDANG DIPROSES', NULL, NULL, NULL, 37993, NULL, 'raditsetyo@gmail.com', 2, 3, '2025-01-04', 1),
('4e7486b', 'CUST003', 'Jono', 'Kasino', 'L-9, Kelurahan Sidoarjo, Kecamatan Waru, Provinsi Jawa Timur,Kota Sidoarjo ,Kode Pos 61256', '085583302510', 'jne', 'RESI SEDANG DIPROSES', NULL, NULL, NULL, 68000, NULL, 'Jonokasino@gmail.com', 2, 3, '2025-01-04', 1),
('4e93f43', 'CUST023', 'Ratih', 'Setiawan', 'Jl. Stasion, Baros, Kec. Cimahi Tengah, Kota Cimahi, Jawa Barat 40521, Kelurahan Baros, Kecamatan Cimahi Tengah, Provinsi Jawa Barat,Kota Cimahi ,Kode Pos 40521', '081855999232', 'jne', '120040042107018', NULL, NULL, NULL, 44184, NULL, 'ratihstw@gmail.com', 2, 3, '2025-01-03', 1),
('4f5a45e', 'CUST002', 'Jono', 'Felix', 'DSI L-7, Kelurahan Kureksari, Kecamatan Waru, Provinsi Jawa Timur,Kota Surabaya ,Kode Pos 61256', '081908353003', 'jne', 'RESI SEDANG DIPROSES', NULL, NULL, NULL, 148384, NULL, 'dewafelix321@gmail.com', 2, 4, '2025-01-02', 1),
('512c3c5', 'CUST001', 'Radit', 'Setyo', 'Jl. Dr. Ir. H. Soekarno No.396, Kedung Baruk, Kec. Rungkut, Surabaya, Jawa Timur 60298, Kelurahan Kedung Baruk, Kecamatan Rungkut, Provinsi Jawa Timur,Kota Surabaya ,Kode Pos 6028', '0838555485', 'jne', 'RESI SEDANG DIPROSES', NULL, NULL, NULL, 87272, NULL, 'raditsetyo@gmail.com', 2, 3, '2025-01-04', 1),
('534fe83', 'CUST002', 'Jono', 'Felix', 'DSI L-7, Kelurahan Kureksari, Kecamatan Waru, Provinsi Jawa Timur,Kota Surabaya ,Kode Pos 61256', '081908353003', 'jne', 'RESI SEDANG DIPROSES', NULL, NULL, NULL, 46752, NULL, 'dewafelix321@gmail.com', 2, 4, '2025-01-02', 1),
('54b829f', 'CUST025', 'Fore', 'Delta Sari', 'Jl. Delta Sari Indah No.7, RW.16, Koreksari, Kureksari, Kec. Waru, Kabupaten Sidoarjo, Jawa Timur 61256, Kelurahan Kureksari, Kecamatan Waru, Provinsi Jawa Timur,Kota Sidoarjo ,Kode Pos 61256', '08881021357', 'jnt', 'RESI SEDANG DIPROSES', NULL, NULL, NULL, 85400, NULL, 'foredeltasari@gmail.com', 2, 3, '2025-01-04', 1),
('54ff76a', 'CUST008', 'Ranti', 'Maulina', 'Jl. Wahid Hasyim No.21, Dabag, Condongcatur, Kec. Depok, Kabupaten Sleman, Daerah Istimewa Yogyakarta, Kelurahan Condongcatur, Kecamatan Depok, Provinsi DI Yogyakarta,Kota Sleman ,Kode Pos 55283', '0853555547', 'tiki', 'RESI SEDANG DIPROSES', NULL, NULL, NULL, 83840, NULL, 'rantii@gmail.com', 2, 3, '2025-01-03', 1),
('55301b9', 'CUST003', 'Jono', 'Kasino', 'L-9, Kelurahan Sidoarjo, Kecamatan Waru, Provinsi Jawa Timur,Kota Sidoarjo ,Kode Pos 61256', '085583302510', 'sicepat', 'RESI SEDANG DIPROSES', NULL, NULL, NULL, 690200, NULL, 'Jonokasino@gmail.com', 2, 3, '2025-01-04', 1),
('567b452', 'CUST055', 'Coba', 'Lagi', 'DSI L-7, Kelurahan Waru, Kecamatan Kureksari, Provinsi Jawa Timur,Kota Sidoarjo ,Kode Pos 61254', '081908353003', 'jne', 'TUNGGU KONFIRMASI PESANAN', 40000, 12456, 103800, 156256, 0, 'cobalagi@gmail.com', 2, 2, '2025-04-17', 1),
('58126a8', 'CUST006', 'Yoonara', 'Andrea', 'Jl. Brigjend Katamso No.34B, Mekar Raya Binangun, Janti, Kec. Waru, Kabupaten Sidoarjo, Jawa Timur, Kelurahan Waru, Kecamatan Waru, Provinsi Jawa Timur,Kota Sidoarjo ,Kode Pos 61256', '081956789054', 'jne', 'RESI SEDANG DIPROSES', NULL, NULL, NULL, 172384, NULL, 'y00n@gmail.com', 2, 3, '2025-01-03', 1),
('581f62f', 'CUST024', 'Hotel', 'Sinar', 'Jl. Raya Bandara Juanda No.36-40, Kelurahan Sedati Indah, Kecamatan Sedati, Provinsi Jawa Timur,Kota Sidoarjo ,Kode Pos 61256', '08566612355', 'ninja', 'RESI SEDANG DIPROSES', NULL, NULL, NULL, 139384, NULL, 'hotelsinar.juanda@gmail.com', 2, 3, '2025-01-04', 1),
('5ad5975', 'CUST019', 'Toko Sinar', 'Gledek', 'Delta Sari Raya 007, Kelurahan Kureksari, Kecamatan Waru, Provinsi Jawa Timur,Kota Sidoarjo ,Kode Pos 61256', '0878555879', 'sicepat', 'RESI SEDANG DIPROSES', NULL, NULL, NULL, 195776, NULL, 'akudewa@gmail.com', 2, 3, '2025-01-05', 1),
('5b28cd2', 'CUST002', 'Dewa', 'Felix', 'DSI L-7, Kelurahan Kureksari, Kecamatan Waru, Provinsi Jawa Timur,Kota Sidoarjo ,Kode Pos 61256', '081908353003', 'sicepat', 'RESI SEDANG DIPROSES', NULL, NULL, NULL, 35000, NULL, 'dewafelix321@gmail.com', 2, 4, '2025-01-05', 1),
('5eb7ca3', 'CUST024', 'Hotel', 'Sinar', 'Jl. Raya Bandara Juanda No.36-40, Kelurahan Sedati Indah, Kecamatan Sedati, Provinsi Jawa Timur,Kota Sidoarjo ,Kode Pos 61256', '08566612355', 'jnt', 'RESI SEDANG DIPROSES', NULL, NULL, NULL, 23128, NULL, 'hotelsinar.juanda@gmail.com', 2, 3, '2025-01-04', 1),
('606dfe0', 'CUST006', 'Yoonara', 'Andrea', 'Jl. Brigjend Katamso No.34B, Mekar Raya Binangun, Janti, Kec. Waru, Kabupaten Sidoarjo, Jawa Timur, Kelurahan Waru, Kecamatan Waru, Provinsi Jawa Timur,Kota Sidoarjo ,Kode Pos 61256', '081956789054', 'ninja', 'RESI SEDANG DIPROSES', NULL, NULL, NULL, 23128, NULL, 'y00n@gmail.com', 2, 3, '2025-01-03', 1),
('60d9fe5', 'CUST025', 'Fore', 'Delta Sari', 'Jl. Delta Sari Indah No.7, RW.16, Koreksari, Kureksari, Kec. Waru, Kabupaten Sidoarjo, Jawa Timur 61256, Kelurahan Kureksari, Kecamatan Waru, Provinsi Jawa Timur,Kota Sidoarjo ,Kode Pos 61256', '08881021357', 'jnt', 'RESI SEDANG DIPROSES', NULL, NULL, NULL, 139384, NULL, 'foredeltasari@gmail.com', 2, 3, '2025-01-05', 1),
('615181d', 'CUST003', 'Jono', 'Kasino', 'L-9, Kelurahan Sidoarjo, Kecamatan Waru, Provinsi Jawa Timur,Kota Sidoarjo ,Kode Pos 61256', '085583302510', 'jne', 'RESI SEDANG DIPROSES', NULL, NULL, NULL, 180000, NULL, 'Jonokasino@gmail.com', 2, 3, '2025-01-04', 1),
('64345fd', 'CUST019', 'Toko Sinar', 'Gledek', 'Delta Sari Raya 007, Kelurahan Kureksari, Kecamatan Waru, Provinsi Jawa Timur,Kota Sidoarjo ,Kode Pos 61256', '0878555879', 'jnt', 'RESI SEDANG DIPROSES', NULL, NULL, NULL, 170744, NULL, 'akudewa@gmail.com', 2, 3, '2025-01-04', 1),
('670162d', 'CUST007', 'Sheila ', 'Permata', 'Jl. Taman Siswa No.712, Sorosutan, Kec. Umbulharjo, Kota Yogyakarta, Daerah Istimewa Yogyakarta, Kelurahan Sorosutan, Kecamatan Umbulharjo, Provinsi DI Yogyakarta,Kota Yogyakarta ,Kode Pos 55151', '08196784567', 'wahana', 'RESI SEDANG DIPROSES', NULL, NULL, NULL, 157200, NULL, 'sheyyy@gmail.com', 2, 3, '2025-01-03', 1),
('69a815c', 'CUST025', 'Fore', 'Delta Sari', 'Jl. Delta Sari Indah No.7, RW.16, Koreksari, Kureksari, Kec. Waru, Kabupaten Sidoarjo, Jawa Timur 61256, Kelurahan Kureksari, Kecamatan Waru, Provinsi Jawa Timur,Kota Sidoarjo ,Kode Pos 61256', '08881021357', 'jne', 'RESI SEDANG DIPROSES', NULL, NULL, NULL, 143857, NULL, 'foredeltasari@gmail.com', 2, 3, '2025-01-04', 1),
('6a8b892', 'CUST006', 'Yoonara', 'Andrea', 'Jl. Brigjend Katamso No.34B, Mekar Raya Binangun, Janti, Kec. Waru, Kabupaten Sidoarjo, Jawa Timur, Kelurahan Waru, Kecamatan Waru, Provinsi Jawa Timur,Kota Sidoarjo ,Kode Pos 61256', '081956789054', 'tiki', 'RESI SEDANG DIPROSES', NULL, NULL, NULL, 29400, NULL, 'y00n@gmail.com', 2, 3, '2025-01-03', 1),
('6a936ee', 'CUST025', 'Fore', 'Delta Sari', 'Jl. Delta Sari Indah No.7, RW.16, Koreksari, Kureksari, Kec. Waru, Kabupaten Sidoarjo, Jawa Timur 61256, Kelurahan Kureksari, Kecamatan Waru, Provinsi Jawa Timur,Kota Sidoarjo ,Kode Pos 61256', '08881021357', 'tiki', 'RESI SEDANG DIPROSES', NULL, NULL, NULL, 170744, NULL, 'foredeltasari@gmail.com', 2, 3, '2025-01-04', 1),
('6bfef7b', 'CUST025', 'Fore', 'Delta Sari', 'Jl. Delta Sari Indah No.7, RW.16, Koreksari, Kureksari, Kec. Waru, Kabupaten Sidoarjo, Jawa Timur 61256, Kelurahan Kureksari, Kecamatan Waru, Provinsi Jawa Timur,Kota Sidoarjo ,Kode Pos 61256', '08881021357', 'jnt', 'RESI SEDANG DIPROSES', NULL, NULL, NULL, 123256, NULL, 'foredeltasari@gmail.com', 2, 3, '2025-01-04', 1),
('6cd6ceb', 'CUST019', 'Toko Sinar', 'Gledek', 'Delta Sari Raya 007, Kelurahan Kureksari, Kecamatan Waru, Provinsi Jawa Timur,Kota Sidoarjo ,Kode Pos 61256', '0878555879', 'wahana', 'RESI SEDANG DIPROSES', NULL, NULL, NULL, 121256, NULL, 'akudewa@gmail.com', 2, 3, '2025-01-04', 1),
('6cd7261', 'CUST002', 'Jono', 'Felix', 'DSI L-7, Kelurahan Kureksari, Kecamatan Waru, Provinsi Jawa Timur,Kota Sidoarjo ,Kode Pos 61256', '081908353003', 'jne', 'RESI SEDANG DIPROSES', NULL, NULL, NULL, 73264, NULL, 'dewafelix321@gmail.com', 2, 4, '2025-01-02', 1),
('6de7957', 'CUST025', 'Fore', 'Delta Sari', 'Jl. Delta Sari Indah No.7, RW.16, Koreksari, Kureksari, Kec. Waru, Kabupaten Sidoarjo, Jawa Timur 61256, Kelurahan Kureksari, Kecamatan Waru, Provinsi Jawa Timur,Kota Sidoarjo ,Kode Pos 61256', '08881021357', 'sicepat', 'RESI SEDANG DIPROSES', NULL, NULL, NULL, 187443, NULL, 'foredeltasari@gmail.com', 2, 3, '2025-01-04', 1),
('7098c8e', 'CUST002', 'Hotel News', 'Waru', 'Jl. Pd. Maspion No.1 Blok S, Pepe, Pepelegi, Waru, Sidoarjo Regency, East Java 61256, Kelurahan Pepelegi, Kecamatan Waru, Provinsi undefined, Kode Pos 6125', '082122008784', 'jne', 'DANA TELAH DIREFUND', NULL, NULL, NULL, 118400, NULL, 'hotelnews@gmail.com', 3, 5, '2024-12-30', 1),
('71191d1', 'CUST006', 'Yoonara', 'Andrea', 'Jl. Brigjend Katamso No.34B, Mekar Raya Binangun, Janti, Kec. Waru, Kabupaten Sidoarjo, Jawa Timur, Kelurahan Waru, Kecamatan Waru, Provinsi Jawa Timur,Kota Sidoarjo ,Kode Pos 61256', '081956789054', 'pos', 'RESI SEDANG DIPROSES', NULL, NULL, NULL, 139384, NULL, 'y00n@gmail.com', 2, 3, '2025-01-03', 1),
('712f5a0', 'CUST002', 'Dewa', 'Felix', 'DSI L-7, Kelurahan Kureksari, Kecamatan Waru, Provinsi Jawa Timur,Kota Surabaya ,Kode Pos 61256', '081908353003', 'jne', 'RESI SEDANG DIPROSES', NULL, NULL, NULL, 140384, NULL, 'dewafelix321@gmail.com', 2, 4, '2025-01-03', 1),
('73bff41', 'CUST002', 'Dewa', 'Felix', 'DSI L-7, Kelurahan Kureksari, Kecamatan Waru, Provinsi Jawa Timur,Kota Sidoarjo ,Kode Pos 61256', '081908353003', 'tiki', 'RESI SEDANG DIPROSES', NULL, NULL, NULL, 139384, NULL, 'dewafelix321@gmail.com', 2, 4, '2025-01-04', 1),
('73c0e99', 'CUST006', 'Yoonara', 'Andrea', 'Jl. Brigjend Katamso No.34B, Mekar Raya Binangun, Janti, Kec. Waru, Kabupaten Sidoarjo, Jawa Timur, Kelurahan Waru, Kecamatan Waru, Provinsi Jawa Timur,Kota Sidoarjo ,Kode Pos 61256', '081956789054', 'jnt', 'RESI SEDANG DIPROSES', NULL, NULL, NULL, 70840, NULL, 'y00n@gmail.com', 2, 3, '2025-01-03', 1),
('7428fa7', 'CUST006', 'Yoonara', 'Andrea', 'Jl. Brigjend Katamso No.34B, Mekar Raya Binangun, Janti, Kec. Waru, Kabupaten Sidoarjo, Jawa Timur, Kelurahan Waru, Kecamatan Waru, Provinsi Jawa Timur,Kota Sidoarjo ,Kode Pos 61256', '081956789054', 'jne', 'RESI SEDANG DIPROSES', NULL, NULL, NULL, 29280, NULL, 'y00n@gmail.com', 2, 3, '2025-01-03', 1),
('7570c9f', 'CUST006', 'Yoonara', 'Andrea', 'Jl. Brigjend Katamso No.34B, Mekar Raya Binangun, Janti, Kec. Waru, Kabupaten Sidoarjo, Jawa Timur, Kelurahan Waru, Kecamatan Waru, Provinsi Jawa Timur,Kota Sidoarjo ,Kode Pos 61256', '081956789054', 'jnt', 'DANA TELAH DIREFUND', NULL, NULL, NULL, 123256, NULL, 'y00n@gmail.com', 3, 5, '2025-01-03', 1),
('7811d0e', 'CUST052', 'Mas', 'Dewa', 'dsakdjsakjd, Kelurahan Kurersari, Kecamatan 16, Provinsi 11,Kota 409 ,Kode Pos 61256', '081908353003', 'jne', 'TUNGGU KONFIRMASI PESANAN', 40000, 14184, 118200, 172384, 0, 'masdewa@gmail.com', 2, 2, '2025-04-17', 1),
('784dd0b', 'CUST009', 'Andrian', 'Pradipta', ' Jl. Pleret, Ngrpik, Baturetno, Kec. Banguntapan, Kabupaten Bantul, Daerah Istimewa Yogyakarta, Kelurahan Baturetno, Kecamatan Banguntapan, Provinsi DI Yogyakarta,Kota Bantul ,Kode Pos 55791', '0838555485', 'ninja', 'DANA TELAH DIREFUND', NULL, NULL, NULL, 46585, NULL, 'driann@gmail.com', 3, 5, '2025-01-03', 1),
('79bb03d', 'CUST003', 'Jono', 'Kasino', 'L-9, Kelurahan Sidoarjo, Kecamatan Waru, Provinsi Jawa Timur,Kota Sidoarjo ,Kode Pos 61256', '085583302510', 'pos', 'RESI SEDANG DIPROSES', NULL, NULL, NULL, 31864, NULL, 'Jonokasino@gmail.com', 2, 3, '2025-01-04', 1),
('79be58c', 'CUST002', 'Dewa', 'Felix', 'DSI L-7, Kelurahan Kureksari, Kecamatan Waru, Provinsi Jawa Timur,Kota Madiun ,Kode Pos 61256', '081908353003', 'tiki', 'TUNGGU KONFIRMASI PESANAN', 8000, 14184, 118200, 135384, 5000, 'dewafelix321@gmail.com', 1, 1, '2025-02-04', 1),
('7b29ef9', 'CUST002', 'Dewa', 'Felix', 'DSI L-7, Kelurahan Kureksari, Kecamatan Waru, Provinsi Jawa Timur,Kota Sidoarjo ,Kode Pos 61256', '081908353003', 'anteraja', 'TUNGGU KONFIRMASI PESANAN', NULL, NULL, NULL, 261144, NULL, 'dewafelix321@gmail.com', 2, 2, '2025-01-08', 1),
('7bd15df', 'CUST002', 'Dewa', 'Felix', 'DSI L-7, Kelurahan Kureksari, Kecamatan Waru, Provinsi Jawa Timur,Kota Surabaya ,Kode Pos 61256', '081908353003', 'jne', 'DANA TELAH DIREFUND', NULL, NULL, NULL, 335488, NULL, 'dewafelix321@gmail.com', 3, 5, '2025-01-03', 1),
('7c62635', 'CUST002', 'Dewa', 'Felix', 'DSI L-7, Kelurahan Kureksari, Kecamatan Waru, Provinsi Jawa Timur,Kota Surabaya ,Kode Pos 61256', '081908353003', 'jne', 'DANA TELAH DIREFUND', NULL, NULL, NULL, 272768, NULL, 'dewafelix321@gmail.com', 3, 5, '2025-01-03', 1),
('7cf52da', 'CUST007', 'Sheila ', 'Permata', 'Jl. Taman Siswa No.712, Sorosutan, Kec. Umbulharjo, Kota Yogyakarta, Daerah Istimewa Yogyakarta, Kelurahan Sorosutan, Kecamatan Umbulharjo, Provinsi DI Yogyakarta,Kota Yogyakarta ,Kode Pos 55151', '08196784567', 'jne', 'RESI SEDANG DIPROSES', NULL, NULL, NULL, 385432, NULL, 'sheyyy@gmail.com', 2, 3, '2025-01-05', 1),
('7dbd37e', 'CUST001', 'Radit', 'Setyo', 'Jl. Dr. Ir. H. Soekarno No.396, Kedung Baruk, Kec. Rungkut, Surabaya, Jawa Timur 60298, Kelurahan Kedung Baruk, Kecamatan Rungkut, Provinsi Jawa Timur,Kota Surabaya ,Kode Pos 6028', '0838555485', 'jnt', 'RESI SEDANG DIPROSES', NULL, NULL, NULL, 120000, NULL, 'raditsetyo@gmail.com', 2, 3, '2025-01-04', 1),
('7e7a477', 'CUST003', 'Jono', 'Kasino', 'L-9, Kelurahan Sidoarjo, Kecamatan Waru, Provinsi Jawa Timur,Kota Sidoarjo ,Kode Pos 61256', '085583302510', 'jnt', 'RESI SEDANG DIPROSES', NULL, NULL, NULL, 40264, NULL, 'Jonokasino@gmail.com', 2, 3, '2025-01-04', 1),
('80568e6', 'CUST009', 'Andrian', 'Pradipta', ' Jl. Pleret, Ngrpik, Baturetno, Kec. Banguntapan, Kabupaten Bantul, Daerah Istimewa Yogyakarta, Kelurahan Baturetno, Kecamatan Banguntapan, Provinsi DI Yogyakarta,Kota Bantul ,Kode Pos 55791', '0838555485', 'tiki', 'DANA TELAH DIREFUND', NULL, NULL, NULL, 42585, NULL, 'driann@gmail.com', 3, 5, '2025-01-03', 1),
('8093bff', 'CUST009', 'Andrian', 'Pradipta', ' Jl. Pleret, Ngrpik, Baturetno, Kec. Banguntapan, Kabupaten Bantul, Daerah Istimewa Yogyakarta, Kelurahan Baturetno, Kecamatan Banguntapan, Provinsi DI Yogyakarta,Kota Bantul ,Kode Pos 55791', '0838555485', 'pos', 'RESI SEDANG DIPROSES', NULL, NULL, NULL, 122680, NULL, 'driann@gmail.com', 2, 3, '2025-01-03', 1),
('80d1b32', 'CUST006', 'Yoonara', 'Andrea', 'Jl. Brigjend Katamso No.34B, Mekar Raya Binangun, Janti, Kec. Waru, Kabupaten Sidoarjo, Jawa Timur, Kelurahan Waru, Kecamatan Waru, Provinsi Jawa Timur,Kota Sidoarjo ,Kode Pos 61256', '081956789054', 'pos', 'RESI SEDANG DIPROSES', NULL, NULL, NULL, 149384, NULL, 'y00n@gmail.com', 2, 3, '2025-01-03', 1),
('82db31b', 'CUST001', 'Radit', 'Setyo', 'Jl. Dr. Ir. H. Soekarno No.396, Kedung Baruk, Kec. Rungkut, Surabaya, Jawa Timur 60298, Kelurahan Kedung Baruk, Kecamatan Rungkut, Provinsi Jawa Timur,Kota Surabaya ,Kode Pos 6028', '0838555485', 'jne', 'RESI SEDANG DIPROSES', NULL, NULL, NULL, 84272, NULL, 'raditsetyo@gmail.com', 2, 3, '2025-01-04', 1),
('82e52be', 'CUST002', 'Jono', 'Felix', 'DSI L-7, Kelurahan Kureksari, Kecamatan Waru, Provinsi Jawa Timur,Kota Surabaya ,Kode Pos 61256', '081908353003', 'jne', 'DANA TELAH DIREFUND', NULL, NULL, NULL, 19200, NULL, 'dewafelix321@gmail.com', 3, 5, '2025-01-02', 1),
('8575e36', 'CUST002', 'Dewa', 'Felix', 'DSI L-7, Kelurahan Kureksari, Kecamatan Waru, Provinsi Jawa Timur,Kota Sidoarjo ,Kode Pos 61256', '081908353003', 'pos', 'RESI SEDANG DIPROSES', NULL, NULL, NULL, 106680, NULL, 'dewafelix321@gmail.com', 2, 4, '2025-01-05', 1),
('857aa38', 'CUST048', 'Albert', 'Bayu Sani', 'Delta Tama 6/12, Kelurahan Ngingas, Kecamatan Waru, Provinsi Jawa Timur,Kota Sidoarjo ,Kode Pos 61256', '082233554887', 'jnt', 'RESI SEDANG DIPROSES', NULL, NULL, NULL, 14952, NULL, 'sanialbertbayu612@gmail.com', 2, 3, '2025-01-04', 1),
('89013d1', 'CUST001', 'Radit', 'Setyo', 'Jl. Dr. Ir. H. Soekarno No.396, Kedung Baruk, Kec. Rungkut, Surabaya, Jawa Timur 60298, Kelurahan Kedung Baruk, Kecamatan Rungkut, Provinsi Jawa Timur,Kota Surabaya ,Kode Pos 6028', '0838555485', 'jne', 'RESI SEDANG DIPROSES', NULL, NULL, NULL, 31184, NULL, 'raditsetyo@gmail.com', 2, 3, '2025-01-04', 1),
('8a47244', 'CUST001', 'Radit', 'Setyo', 'Jl. Dr. Ir. H. Soekarno No.396, Kedung Baruk, Kec. Rungkut, Surabaya, Jawa Timur 60298, Kelurahan Kedung Baruk, Kecamatan Rungkut, Provinsi Jawa Timur,Kota Sidoarjo ,Kode Pos 6028', '0838555485', 'sicepat', 'RESI SEDANG DIPROSES', NULL, NULL, NULL, 238000, NULL, 'raditsetyo@gmail.com', 2, 3, '2025-01-04', 1),
('8b2ad6e', 'CUST019', 'Toko Sinar', 'Gledek', 'Delta Sari Raya 007, Kelurahan Kureksari, Kecamatan Waru, Provinsi Jawa Timur,Kota Sidoarjo ,Kode Pos 61256', '0878555879', 'pos', 'RESI SEDANG DIPROSES', NULL, NULL, NULL, 258496, NULL, 'akudewa@gmail.com', 2, 3, '2025-01-04', 1),
('8dccd1b', 'CUST001', 'Radit', 'Setyo', 'Jl. Dr. Ir. H. Soekarno No.396, Kedung Baruk, Kec. Rungkut, Surabaya, Jawa Timur 60298, Kelurahan Kedung Baruk, Kecamatan Rungkut, Provinsi Jawa Timur,Kota Surabaya ,Kode Pos 6028', '0838555485', 'sicepat', 'RESI SEDANG DIPROSES', NULL, NULL, NULL, 125936, NULL, 'raditsetyo@gmail.com', 2, 3, '2025-01-03', 1),
('8e68d5b', 'CUST024', 'Hotel', 'Sinar', 'Jl. Raya Bandara Juanda No.36-40, Kelurahan Sedati Indah, Kecamatan Sedati, Provinsi Jawa Timur,Kota Sidoarjo ,Kode Pos 61256', '08566612355', 'anteraja', 'RESI SEDANG DIPROSES', NULL, NULL, NULL, 20700, NULL, 'hotelsinar.juanda@gmail.com', 2, 3, '2025-01-04', 1),
('8ecf658', 'CUST007', 'Sheila ', 'Permata', 'Jl. Taman Siswa No.712, Sorosutan, Kec. Umbulharjo, Kota Yogyakarta, Daerah Istimewa Yogyakarta, Kelurahan Sorosutan, Kecamatan Umbulharjo, Provinsi DI Yogyakarta,Kota Yogyakarta ,Kode Pos 55151', '08196784567', 'jne', 'RESI SEDANG DIPROSES', NULL, NULL, NULL, 148384, NULL, 'sheyyy@gmail.com', 2, 3, '2025-01-05', 1),
('8f79871', 'CUST002', 'Dewa', 'Felix', 'DSI L-7, Kelurahan Kureksari, Kecamatan Waru, Provinsi Jawa Timur,Kota Sidoarjo ,Kode Pos 61256', '081908353003', 'jne', 'RESI SEDANG DIPROSES', NULL, NULL, NULL, 236224, NULL, 'dewafelix321@gmail.com', 2, 4, '2025-01-05', 1),
('90c3045', 'CUST007', 'Sheila ', 'Permata', 'Jl. Taman Siswa No.712, Sorosutan, Kec. Umbulharjo, Kota Yogyakarta, Daerah Istimewa Yogyakarta, Kelurahan Sorosutan, Kecamatan Umbulharjo, Provinsi DI Yogyakarta,Kota Yogyakarta ,Kode Pos 55151', '08196784567', 'anteraja', 'RESI SEDANG DIPROSES', NULL, NULL, NULL, 75328, NULL, 'sheyyy@gmail.com', 2, 3, '2025-01-05', 1),
('917c3d9', 'CUST003', 'Jono', 'Kasino', 'L-9, Kelurahan Sidoarjo, Kecamatan Waru, Provinsi Jawa Timur,Kota Probolinggo ,Kode Pos 61256', '085583302510', 'jnt', 'RESI SEDANG DIPROSES', NULL, NULL, NULL, 188200, NULL, 'Jonokasino@gmail.com', 2, 3, '2025-01-04', 1),
('9197946', 'CUST002', 'Dewa', 'Mantap', 'L7', '081908353003', 'jne', 'otw', NULL, NULL, NULL, 321600, NULL, 'dewafelix321@gmail.com', 2, 4, '2024-12-26', 1),
('933def2', 'CUST004', 'Pindi', 'Margaret', 'Jl. Jend.S.Parman IV, Krajan Kulon, Waru, Kec. Waru, Kabupaten Sidoarjo, Jawa Timur, Kelurahan Waru, Kecamatan Waru, Provinsi Jawa Timur,Kota Sidoarjo ,Kode Pos 61256', '0853745678', 'pos', 'RESI SEDANG DIPROSES', NULL, NULL, NULL, 797200, NULL, 'pindimargaret@gmail.com', 2, 3, '2025-01-03', 1),
('9369c0e', 'CUST004', 'Pindi', 'Margaret', 'Jl. Jend.S.Parman IV, Krajan Kulon, Waru, Kec. Waru, Kabupaten Sidoarjo, Jawa Timur, Kelurahan Waru, Kecamatan Waru, Provinsi Jawa Timur,Kota Sidoarjo ,Kode Pos 61256', '0853745678', 'jne', 'RESI SEDANG DIPROSES', NULL, NULL, NULL, 140384, NULL, 'pindimargaret@gmail.com', 2, 3, '2025-01-03', 1),
('9392946', 'CUST024', 'Hotel', 'Sinar', 'Jl. Raya Bandara Juanda No.36-40, Kelurahan Sedati Indah, Kecamatan Sedati, Provinsi Jawa Timur,Kota Sidoarjo ,Kode Pos 61256', '08566612355', 'jnt', 'RESI SEDANG DIPROSES', NULL, NULL, NULL, 35000, NULL, 'hotelsinar.juanda@gmail.com', 2, 3, '2025-01-04', 1),
('94327f8', 'CUST019', 'aku', 'dewa', 'Delta Sari Raya 007, Kelurahan Kureksari, Kecamatan Waru, Provinsi Jawa Timur,Kota Sidoarjo ,Kode Pos 61256', '0878555879', 'jne', 'RESI SEDANG DIPROSES', NULL, NULL, NULL, 61280, NULL, 'akudewa@gmail.com', 2, 3, '2025-01-02', 1),
('9577d83', 'CUST002', 'Dewa', 'Felix', 'DSI L-7, Kelurahan Kureksari, Kecamatan Waru, Provinsi Jawa Timur,Kota Sidoarjo ,Kode Pos 61256', '081908353003', 'wahana', 'RESI SEDANG DIPROSES', NULL, NULL, NULL, 121256, NULL, 'dewafelix321@gmail.com', 2, 4, '2025-01-05', 1),
('a005909', 'CUST025', 'Fore', 'Delta Sari', 'Jl. Delta Sari Indah No.7, RW.16, Koreksari, Kureksari, Kec. Waru, Kabupaten Sidoarjo, Jawa Timur 61256, Kelurahan Kureksari, Kecamatan Waru, Provinsi Jawa Timur,Kota Sidoarjo ,Kode Pos 61256', '08881021357', 'jnt', 'RESI SEDANG DIPROSES', NULL, NULL, NULL, 35000, NULL, 'foredeltasari@gmail.com', 2, 3, '2025-01-04', 1),
('a039d5e', 'CUST005', 'Zaranita', 'Amelya', 'Jl. Letjen Sutoyo, Kasian, Bungurasih, Kec. Waru, Kabupaten Sidoarjo, Jawa Timur , Kelurahan Bungurasih, Kecamatan Waru, Provinsi Jawa Timur,Kota Sidoarjo ,Kode Pos 61256', '087851457789', 'wahana', 'RESI SEDANG DIPROSES', NULL, NULL, NULL, 193744, NULL, 'zaranitaamelya@gmail.com', 2, 3, '2025-01-03', 1),
('a1ded34', 'CUST003', 'Jono', 'Kasino', 'L-9, Kelurahan Sidoarjo, Kecamatan Waru, Provinsi Jawa Timur,Kota Sidoarjo ,Kode Pos 61256', '085583302510', 'sicepat', 'RESI SEDANG DIPROSES', NULL, NULL, NULL, 276136, NULL, 'Jonokasino@gmail.com', 2, 3, '2025-01-04', 1),
('a3ab33f', 'CUST025', 'Fore', 'Delta Sari', 'Jl. Delta Sari Indah No.7, RW.16, Koreksari, Kureksari, Kec. Waru, Kabupaten Sidoarjo, Jawa Timur 61256, Kelurahan Kureksari, Kecamatan Waru, Provinsi Jawa Timur,Kota Ngawi ,Kode Pos 61256', '08881021357', 'sicepat', 'RESI SEDANG DIPROSES', NULL, NULL, NULL, 141384, NULL, 'foredeltasari@gmail.com', 2, 3, '2025-01-04', 1),
('a5cc0d1', 'CUST025', 'Fore', 'Delta Sari', 'Jl. Delta Sari Indah No.7, RW.16, Koreksari, Kureksari, Kec. Waru, Kabupaten Sidoarjo, Jawa Timur 61256, Kelurahan Kureksari, Kecamatan Waru, Provinsi Jawa Timur,Kota Sidoarjo ,Kode Pos 61256', '08881021357', 'pos', 'RESI SEDANG DIPROSES', NULL, NULL, NULL, 170744, NULL, 'foredeltasari@gmail.com', 2, 3, '2025-01-04', 1),
('a742670', 'CUST007', 'Sheila ', 'Permata', 'Jl. Taman Siswa No.712, Sorosutan, Kec. Umbulharjo, Kota Yogyakarta, Daerah Istimewa Yogyakarta, Kelurahan Sorosutan, Kecamatan Umbulharjo, Provinsi DI Yogyakarta,Kota Yogyakarta ,Kode Pos 55151', '08196784567', 'jne', 'RESI SEDANG DIPROSES', NULL, NULL, NULL, 79840, NULL, 'sheyyy@gmail.com', 2, 3, '2025-01-03', 1),
('a8a3c34', 'CUST009', 'Andrian', 'Pradipta', ' Jl. Pleret, Ngrpik, Baturetno, Kec. Banguntapan, Kabupaten Bantul, Daerah Istimewa Yogyakarta, Kelurahan Baturetno, Kecamatan Banguntapan, Provinsi DI Yogyakarta,Kota Bantul ,Kode Pos 55791', '0838555485', 'jne', 'RESI SEDANG DIPROSES', NULL, NULL, NULL, 23840, NULL, 'driann@gmail.com', 2, 3, '2025-01-03', 1),
('a8d217c', 'CUST036', 'Iis', 'Dwi', 'Jl. SMA No. 37, RT 07 RW 02, Kelurahan Samba danum, Kecamatan Katingan tengah, Provinsi Kalimantan Tengah,Kota Katingan ,Kode Pos 74454', '081348871881', 'jnt', 'TUNGGU KONFIRMASI PESANAN', NULL, NULL, NULL, 236872, NULL, 'dwyeidl@gmail.com', 1, 1, '2025-01-03', 1),
('a8f590a', 'CUST019', 'Toko Sinar', 'Gledek', 'Delta Sari Raya 007, Kelurahan Kureksari, Kecamatan Waru, Provinsi Jawa Timur,Kota Sidoarjo ,Kode Pos 61256', '0878555879', 'anteraja', 'RESI SEDANG DIPROSES', NULL, NULL, NULL, 87900, NULL, 'akudewa@gmail.com', 2, 3, '2025-01-04', 1),
('a9d3f5a', 'CUST007', 'Sheila ', 'Permata', 'Jl. Taman Siswa No.712, Sorosutan, Kec. Umbulharjo, Kota Yogyakarta, Daerah Istimewa Yogyakarta, Kelurahan Sorosutan, Kecamatan Umbulharjo, Provinsi DI Yogyakarta,Kota Yogyakarta ,Kode Pos 55151', '08196784567', 'tiki', 'RESI SEDANG DIPROSES', NULL, NULL, NULL, 708400, NULL, 'sheyyy@gmail.com', 2, 3, '2025-01-03', 1),
('aa5ef69', 'CUST002', 'raden', 'gatot', 'Darmo, Kec. Wonokromo, Surabaya, Jawa Timur 60241, Kelurahan Darmo, Kecamatan Wonokromo, Provinsi Jawa Timur,Kota Surabaya ,Kode Pos 60241', '0838555485', 'jnt', 'RESI SEDANG DIPROSES', NULL, NULL, NULL, 140384, NULL, 'raden@gmail.com', 2, 4, '2025-01-01', 1),
('ab61495', 'CUST006', 'Yoonara', 'Andrea', 'Jl. Brigjend Katamso No.34B, Mekar Raya Binangun, Janti, Kec. Waru, Kabupaten Sidoarjo, Jawa Timur, Kelurahan Waru, Kecamatan Waru, Provinsi Jawa Timur,Kota Sidoarjo ,Kode Pos 61256', '081956789054', 'jne', 'RESI SEDANG DIPROSES', NULL, NULL, NULL, 203744, NULL, 'y00n@gmail.com', 2, 3, '2025-01-03', 1),
('abb4299', 'CUST005', 'Zaranita', 'Amelya', 'Jl. Letjen Sutoyo, Kasian, Bungurasih, Kec. Waru, Kabupaten Sidoarjo, Jawa Timur , Kelurahan Bungurasih, Kecamatan Waru, Provinsi Jawa Timur,Kota Sidoarjo ,Kode Pos 61256', '087851457789', 'pos', 'RESI SEDANG DIPROSES', NULL, NULL, NULL, 110180, NULL, 'zaranitaamelya@gmail.com', 2, 3, '2025-01-03', 1),
('acdfb2d', 'CUST002', 'Jono', 'Kasino', 'Jl. Dr. Ir. H. Soekarno No.396, Kelurahan Kedung Baruk, Kecamatan Rungkut, Provinsi undefined, Kode Pos 60298', '081580696966', 'jne', 'MXGAC00785351916', NULL, NULL, NULL, 243200, NULL, 'jonokasino@gmail.com', 2, 4, '2024-12-29', 1),
('ae338b6', 'CUST052', 'Mas', 'Dewa', 'dsakdjsakjd, Kelurahan Kurersari, Kecamatan 16, Provinsi 11,Kota 409 ,Kode Pos 61256', '081908353003', 'jne', 'TUNGGU KONFIRMASI PESANAN', 40000, 14184, 118200, 172384, 0, 'masdewa@gmail.com', 1, 1, '2025-04-17', 1),
('af39e38', 'CUST002', 'Felix ', 'Dewa', 'Jl. Sulawesi, Ngagel, Kec. Wonokromo, Surabaya, Jawa Timur 60281, Kelurahan Ngagel, Kecamatan Wonokromo, Provinsi [object Object],[object Object],[object Object],[object Object],[object Object],[object Object],[object Object],[object Object],[object Object],[object Object],[object Object],[object Object],[object Object],[object Object],[object Object],[object Object],[object Object],[object Object],[object Object],[object Object],[object Object],[object Object],[object Object],[object Object],[object Object],[object Object],[object Object],[object Object],[object Object],[object Object],[object Object],[object Object],[object Object],[object Object],Kota [object Object],[object Object],[object Object],[object Object],[object Object],[object Object],[object Object],[object Object],[object Object],[object Object],[object Object],[object Object],[object Object],[object Object],[object Object],[object Object],[object Object],[object Object],[object Object],[object Object],[object Object],[object Object],[object Object],[object Object],[object Object],[object Object],[object Object],[object Object],[object Object],[object Object],[object Object],[object Object],[object Object],[object Object],[object Object],[object Object],[object Object],[object Object] ,Kode Pos 60281', '081908353003', 'jnt', 'DANA TELAH DIREFUND', NULL, NULL, NULL, 140384, NULL, 'dewafelix321@gmail.com', 3, 5, '2025-01-01', 1),
('aff1d6a', 'CUST004', 'Pindi', 'Margaret', 'Jl. Jend.S.Parman IV, Krajan Kulon, Waru, Kec. Waru, Kabupaten Sidoarjo, Jawa Timur, Kelurahan Waru, Kecamatan Waru, Provinsi Jawa Timur,Kota Sidoarjo ,Kode Pos 61256', '0853745678', 'sicepat', 'RESI SEDANG DIPROSES', NULL, NULL, NULL, 254000, NULL, 'pindimargaret@gmail.com', 2, 3, '2025-01-03', 1),
('b012f8f', 'CUST052', 'Mas', 'Dewa', 'dsakdjsakjd, Kelurahan 16, Kecamatan Kurersari, Provinsi 11,Kota 409 ,Kode Pos 61256', '081908353003', 'jne', 'TUNGGU KONFIRMASI PESANAN', 40000, 6840, 57000, 103840, 0, 'masdewa@gmail.com', 2, 2, '2025-04-17', 1),
('b1f41a8', 'CUST002', 'Dewa', 'Felix', 'DSI L-7, Kelurahan Kureksari, Kecamatan Waru, Provinsi Jawa Timur,Kota Sidoarjo ,Kode Pos 61256', '081908353003', 'jne', 'RESI SEDANG DIPROSES', NULL, NULL, NULL, 203744, NULL, 'dewafelix321@gmail.com', 2, 3, '2025-01-08', 1),
('b27e92d', 'CUST019', 'Toko Sinar', 'Gledek', 'Delta Sari Raya 007, Kelurahan Kureksari, Kecamatan Waru, Provinsi Jawa Timur,Kota Sidoarjo ,Kode Pos 61256', '0878555879', 'pos', 'RESI SEDANG DIPROSES', NULL, NULL, NULL, 85400, NULL, 'akudewa@gmail.com', 2, 3, '2025-01-05', 1),
('b3eec98', 'CUST004', 'Pindi', 'Margaret', 'Jl. Jend.S.Parman IV, Krajan Kulon, Waru, Kec. Waru, Kabupaten Sidoarjo, Jawa Timur, Kelurahan Waru, Kecamatan Waru, Provinsi Jawa Timur,Kota Sidoarjo ,Kode Pos 61256', '0853745678', 'tiki', 'RESI SEDANG DIPROSES', NULL, NULL, NULL, 706800, NULL, 'pindimargaret@gmail.com', 2, 3, '2025-01-03', 1);
INSERT INTO `beli` (`id_beli`, `id_user`, `nama_depan`, `nama_belakang`, `alamat_lengkap`, `no_hp`, `courier`, `resi`, `ongkir`, `pajak`, `subtotal`, `total_beli`, `potongan`, `email`, `status_pembayaran`, `status_pengiriman`, `created_at`, `status`) VALUES
('b42eb37', 'CUST001', 'Radit', 'Setyo', 'Jl. Dr. Ir. H. Soekarno No.396, Kedung Baruk, Kec. Rungkut, Surabaya, Jawa Timur 60298, Kelurahan Kedung Baruk, Kecamatan Rungkut, Provinsi Jawa Timur,Kota Surabaya ,Kode Pos 6028', '0838555485', 'jne', 'RESI SEDANG DIPROSES', NULL, NULL, NULL, 142400, NULL, 'raditsetyo@gmail.com', 2, 3, '2025-01-04', 1),
('b582c34', 'CUST002', 'Dewa', 'Felix', 'DSI L-7, Kelurahan Kureksari, Kecamatan Waru, Provinsi undefined, Kode Pos 61253', '08198350335', 'jne', 'RESI SEDANG DIPROSES', NULL, NULL, NULL, 73811, NULL, 'dewafelix321@gmail.com', 2, 4, '2024-12-27', 1),
('b5f6dc0', 'CUST007', 'Sheila ', 'Permata', 'Jl. Taman Siswa No.712, Sorosutan, Kec. Umbulharjo, Kota Yogyakarta, Daerah Istimewa Yogyakarta, Kelurahan Sorosutan, Kecamatan Umbulharjo, Provinsi DI Yogyakarta,Kota Yogyakarta ,Kode Pos 55151', '08196784567', 'wahana', 'RESI SEDANG DIPROSES', NULL, NULL, NULL, 82067, NULL, 'sheyyy@gmail.com', 2, 3, '2025-01-05', 1),
('b604e4a', 'CUST019', 'aku', 'dewa', 'Delta Sari Raya 007, Kelurahan Kureksari, Kecamatan Waru, Provinsi Jawa Timur,Kota Sidoarjo ,Kode Pos 61256', '0878555879', 'jne', 'RESI SEDANG DIPROSES', NULL, NULL, NULL, 185521, NULL, 'akudewa@gmail.com', 2, 3, '2025-01-03', 1),
('b63fc4a', 'CUST001', 'Radit', 'Setyo', 'Jl. Dr. Ir. H. Soekarno No.396, Kedung Baruk, Kec. Rungkut, Surabaya, Jawa Timur 60298, Kelurahan Kedung Baruk, Kecamatan Rungkut, Provinsi Jawa Timur,Kota Surabaya ,Kode Pos 6028', '0838555485', 'sicepat', 'RESI SEDANG DIPROSES', NULL, NULL, NULL, 695200, NULL, 'raditsetyo@gmail.com', 2, 3, '2025-01-04', 1),
('b91bb69', 'CUST007', 'Sheila ', 'Permata', 'Jl. Taman Siswa No.712, Sorosutan, Kec. Umbulharjo, Kota Yogyakarta, Daerah Istimewa Yogyakarta, Kelurahan Sorosutan, Kecamatan Umbulharjo, Provinsi DI Yogyakarta,Kota Yogyakarta ,Kode Pos 55151', '08196784567', 'jnt', 'RESI SEDANG DIPROSES', NULL, NULL, NULL, 80896, NULL, 'sheyyy@gmail.com', 2, 3, '2025-01-05', 1),
('bb38ff8', 'CUST007', 'Sheila ', 'Permata', 'Jl. Taman Siswa No.712, Sorosutan, Kec. Umbulharjo, Kota Yogyakarta, Daerah Istimewa Yogyakarta, Kelurahan Sorosutan, Kecamatan Umbulharjo, Provinsi DI Yogyakarta,Kota Yogyakarta ,Kode Pos 55151', '08196784567', 'jnt', 'RESI SEDANG DIPROSES', NULL, NULL, NULL, 21960, NULL, 'sheyyy@gmail.com', 2, 3, '2025-01-05', 1),
('bcdb1ad', 'CUST006', 'Yoonara', 'Andrea', 'Jl. Brigjend Katamso No.34B, Mekar Raya Binangun, Janti, Kec. Waru, Kabupaten Sidoarjo, Jawa Timur, Kelurahan Waru, Kecamatan Waru, Provinsi Jawa Timur,Kota Sidoarjo ,Kode Pos 61256', '081956789054', 'jne', 'RESI SEDANG DIPROSES', NULL, NULL, NULL, 107680, NULL, 'y00n@gmail.com', 2, 3, '2025-01-03', 1),
('be8a471', 'CUST006', 'Yoonara', 'Andrea', 'Jl. Brigjend Katamso No.34B, Mekar Raya Binangun, Janti, Kec. Waru, Kabupaten Sidoarjo, Jawa Timur, Kelurahan Waru, Kecamatan Waru, Provinsi Jawa Timur,Kota Sidoarjo ,Kode Pos 61256', '081956789054', 'jne', 'RESI SEDANG DIPROSES', NULL, NULL, NULL, 124000, NULL, 'y00n@gmail.com', 2, 3, '2025-01-03', 1),
('bfa4a83', 'CUST003', 'Jono', 'Kasino', 'L-9, Kelurahan Sidoarjo, Kecamatan Waru, Provinsi Jawa Timur,Kota Sidoarjo ,Kode Pos 61256', '085583302510', 'jnt', 'RESI SEDANG DIPROSES', NULL, NULL, NULL, 38640, NULL, 'Jonokasino@gmail.com', 2, 3, '2025-01-04', 1),
('c00491f', 'CUST042', 'Vania', 'Aracelly', 'Jl. Wonorejo Pernai Selatan V No.26 Perumahan Nirwana Eksekutif CC-375, Kelurahan Wonorejo, Kecamatan Rungkut, Provinsi Jawa Timur,Kota Surabaya ,Kode Pos 60296', '081231399958', 'jnt', 'TUNGGU KONFIRMASI PESANAN', NULL, NULL, NULL, 116256, NULL, 'vincensiavaniaa@gmail.com', 1, 1, '2025-01-03', 1),
('c13b8d9', 'CUST002', 'Dewa', 'Felix', 'DSI L-7, Kelurahan Kureksari, Kecamatan Waru, Provinsi Jawa Timur,Kota Sidoarjo ,Kode Pos 61256', '081908353003', 'ninja', 'RESI SEDANG DIPROSES', NULL, NULL, NULL, 170744, NULL, 'dewafelix321@gmail.com', 2, 4, '2025-01-05', 1),
('c1d8e29', 'CUST029', 'Adrian', 'Adrian', 'Delta Sari Indah Blok M no. 4, Kureksari, Waru, Sidoarjo, Kelurahan Kureksari, Kecamatan Waru, Provinsi Jawa Timur,Kota Sidoarjo ,Kode Pos 61256', '08113109893', 'jne', 'RESI SEDANG DIPROSES', NULL, NULL, NULL, 92000, NULL, 'nikolaus.adrian2@gmail.com', 2, 3, '2025-01-03', 1),
('c1eade7', 'CUST024', 'Hotel', 'Sinar', 'Jl. Raya Bandara Juanda No.36-40, Kelurahan Sedati Indah, Kecamatan Sedati, Provinsi Jawa Timur,Kota Sidoarjo ,Kode Pos 61256', '08566612355', 'ninja', 'RESI SEDANG DIPROSES', NULL, NULL, NULL, 123256, NULL, 'hotelsinar.juanda@gmail.com', 2, 3, '2025-01-04', 1),
('c3b8a03', 'CUST036', 'Iis', 'Dwi', 'Jl. SMA No. 37, RT 07 RW 02, Kelurahan Samba danum, Kecamatan Katingan tengah, Provinsi Kalimantan Tengah,Kota Katingan ,Kode Pos 74454', '081348871881', 'jnt', 'TUNGGU KONFIRMASI PESANAN', NULL, NULL, NULL, 236872, NULL, 'dwyeidl@gmail.com', 1, 1, '2025-01-03', 1),
('c60e697', 'CUST006', 'Yoonara', 'Andrea', 'Jl. Brigjend Katamso No.34B, Mekar Raya Binangun, Janti, Kec. Waru, Kabupaten Sidoarjo, Jawa Timur, Kelurahan Waru, Kecamatan Waru, Provinsi Jawa Timur,Kota Sidoarjo ,Kode Pos 61256', '081956789054', 'jnt', 'RESI SEDANG DIPROSES', NULL, NULL, NULL, 85400, NULL, 'y00n@gmail.com', 2, 3, '2025-01-03', 1),
('c8ea742', 'CUST005', 'Zaranita', 'Amelya', 'Jl. Letjen Sutoyo, Kasian, Bungurasih, Kec. Waru, Kabupaten Sidoarjo, Jawa Timur , Kelurahan Bungurasih, Kecamatan Waru, Provinsi Jawa Timur,Kota Sidoarjo ,Kode Pos 61256', '087851457789', 'ninja', 'RESI SEDANG DIPROSES', NULL, NULL, NULL, 26275, NULL, 'zaranitaamelya@gmail.com', 2, 3, '2025-01-03', 1),
('ca7de77', 'CUST003', 'Jono', 'Kasino', 'L-9, Kelurahan Sidoarjo, Kecamatan Waru, Provinsi Jawa Timur,Kota Sidoarjo ,Kode Pos 61256', '085583302510', 'jnt', 'TUNGGU KONFIRMASI PESANAN', NULL, NULL, NULL, 39480, NULL, 'Jonokasino@gmail.com', 1, 1, '2025-01-04', 1),
('ca84727', 'CUST052', 'Mas', 'Dewa', 'dsakdjsakjd, Kelurahan 16, Kecamatan Kurersari, Provinsi 11,Kota 409 ,Kode Pos 61256dsakdjsakjd, Kelurahan Kurersari, Kecamatan undefined, Provinsi undefined,Kota undefined ,Kode Pos 61256', '081908353003', 'jne', 'TUNGGU KONFIRMASI PESANAN', 40000, 14184, 118200, 172384, 0, 'masdewa@gmail.com', 2, 2, '2025-04-17', 1),
('caba503', 'CUST005', 'Zaranita', 'Amelya', 'Jl. Letjen Sutoyo, Kasian, Bungurasih, Kec. Waru, Kabupaten Sidoarjo, Jawa Timur , Kelurahan Bungurasih, Kecamatan Waru, Provinsi Jawa Timur,Kota Sidoarjo ,Kode Pos 61256', '087851457789', 'jne', 'RESI SEDANG DIPROSES', NULL, NULL, NULL, 117760, NULL, 'zaranitaamelya@gmail.com', 2, 3, '2025-01-03', 1),
('cbc8b64', 'CUST024', 'Hotel', 'Sinar', 'Jl. Raya Bandara Juanda No.36-40, Kelurahan Sedati Indah, Kecamatan Sedati, Provinsi Jawa Timur,Kota Sidoarjo ,Kode Pos 61256', '08566612355', 'jnt', 'RESI SEDANG DIPROSES', NULL, NULL, NULL, 70840, NULL, 'hotelsinar.juanda@gmail.com', 2, 3, '2025-01-04', 1),
('cc24a06', 'CUST024', 'Hotel', 'Sinar', 'Jl. Raya Bandara Juanda No.36-40, Kelurahan Sedati Indah, Kecamatan Sedati, Provinsi Jawa Timur,Kota Sidoarjo ,Kode Pos 61256', '08566612355', 'sicepat', 'RESI SEDANG DIPROSES', NULL, NULL, NULL, 163800, NULL, 'hotelsinar.juanda@gmail.com', 2, 3, '2025-01-04', 1),
('cecc346', 'CUST001', 'Radit', 'Setyo', 'Jl. Dr. Ir. H. Soekarno No.396, Kedung Baruk, Kec. Rungkut, Surabaya, Jawa Timur 60298, Kelurahan Kedung Baruk, Kecamatan Rungkut, Provinsi Jawa Timur,Kota Surabaya ,Kode Pos 6028', '0838555485', 'jnt', 'RESI SEDANG DIPROSES', NULL, NULL, NULL, 35585, NULL, 'raditsetyo@gmail.com', 2, 3, '2025-01-04', 1),
('cf88816', 'CUST007', 'Sheila ', 'Permata', 'Jl. Taman Siswa No.712, Sorosutan, Kec. Umbulharjo, Kota Yogyakarta, Daerah Istimewa Yogyakarta, Kelurahan Sorosutan, Kecamatan Umbulharjo, Provinsi DI Yogyakarta,Kota Yogyakarta ,Kode Pos 55151', '08196784567', 'jne', 'RESI SEDANG DIPROSES', NULL, NULL, NULL, 52400, NULL, 'sheyyy@gmail.com', 2, 3, '2025-01-05', 1),
('cfda4d5', 'CUST006', 'Yoonara', 'Andrea', 'Jl. Brigjend Katamso No.34B, Mekar Raya Binangun, Janti, Kec. Waru, Kabupaten Sidoarjo, Jawa Timur, Kelurahan Waru, Kecamatan Waru, Provinsi Jawa Timur,Kota Sidoarjo ,Kode Pos 61256', '081956789054', 'pos', 'RESI SEDANG DIPROSES', NULL, NULL, NULL, 174244, NULL, 'y00n@gmail.com', 2, 3, '2025-01-03', 1),
('d20bd2e', 'CUST002', 'Dewa', 'Felix', 'DSI L-7, Kelurahan Kureksari, Kecamatan Waru, Provinsi Jawa Timur,Kota Surabaya ,Kode Pos 61256', '081908353003', 'jne', 'DANA TELAH DIREFUND', NULL, NULL, NULL, 335488, NULL, 'dewafelix321@gmail.com', 3, 5, '2025-01-03', 1),
('d216f84', 'CUST036', 'Iis', 'Dwi', 'Jl. SMA No. 37, RT 07 RW 02, Kelurahan Samba danum, Kecamatan Katingan tengah, Provinsi Kalimantan Tengah,Kota Katingan ,Kode Pos 74454', '081348871881', 'jnt', 'TUNGGU KONFIRMASI PESANAN', NULL, NULL, NULL, 236872, NULL, 'dwyeidl@gmail.com', 1, 1, '2025-01-03', 1),
('d4e9f1c', 'CUST004', 'Pindi', 'Margaret', 'Jl. Jend.S.Parman IV, Krajan Kulon, Waru, Kec. Waru, Kabupaten Sidoarjo, Jawa Timur, Kelurahan Waru, Kecamatan Waru, Provinsi Jawa Timur,Kota Sidoarjo ,Kode Pos 61256', '0853745678', 'tiki', 'RESI SEDANG DIPROSES', NULL, NULL, NULL, 808800, NULL, 'pindimargaret@gmail.com', 2, 3, '2025-01-03', 1),
('d63fe6f', 'CUST009', 'Andrian', 'Pradipta', ' Jl. Pleret, Ngrpik, Baturetno, Kec. Banguntapan, Kabupaten Bantul, Daerah Istimewa Yogyakarta, Kelurahan Baturetno, Kecamatan Banguntapan, Provinsi DI Yogyakarta,Kota Bantul ,Kode Pos 55791', '0838555485', 'anteraja', 'RESI SEDANG DIPROSES', NULL, NULL, NULL, 64467, NULL, 'driann@gmail.com', 2, 3, '2025-01-03', 1),
('d8cef90', 'CUST052', 'Mas', 'Dewa', 'dsakdjsakjd, Kelurahan Kurersari, Kecamatan , Provinsi ,Kota  ,Kode Pos 61256', '081908353003', 'jne', 'TUNGGU KONFIRMASI PESANAN', 40000, 10680, 89000, 139680, 0, 'masdewa@gmail.com', 1, 1, '2025-04-17', 1),
('da408ce', 'CUST009', 'Andrian', 'Pradipta', ' Jl. Pleret, Ngrpik, Baturetno, Kec. Banguntapan, Kabupaten Bantul, Daerah Istimewa Yogyakarta, Kelurahan Baturetno, Kecamatan Banguntapan, Provinsi DI Yogyakarta,Kota Bantul ,Kode Pos 55791', '0838555485', 'jnt', '120040042107018', NULL, NULL, NULL, 92400, NULL, 'driann@gmail.com', 2, 3, '2025-01-03', 1),
('da4ee11', 'CUST047', 'Fajar', 'Fajar', 'Plumpang, Kelurahan Tugu Selatan, Kecamatan Koja, Provinsi DKI Jakarta,Kota Jakarta Utara ,Kode Pos 10123', '0888888888888', 'jne', 'RESI SEDANG DIPROSES', NULL, NULL, NULL, 80840, NULL, 'jangandibacabrok@gmail.com', 2, 3, '2025-01-03', 1),
('dac485c', 'CUST002', 'Kasino', 'Indro', 'Jl. Pucang Anom Tim. No.25, Kertajaya, Kec. Gubeng, Surabaya, Jawa Timur, Kelurahan Pucang Anom, Kecamatan Gubeng, Provinsi undefined, Kode Pos 60283', '081908353003', 'jne', 'DANA TELAH DIREFUND', NULL, NULL, NULL, 158987, NULL, 'masbokip@gmail.com', 3, 5, '2024-12-28', 1),
('db1dcf5', 'CUST025', 'Fore', 'Delta Sari', 'Jl. Delta Sari Indah No.7, RW.16, Koreksari, Kureksari, Kec. Waru, Kabupaten Sidoarjo, Jawa Timur 61256, Kelurahan Kureksari, Kecamatan Waru, Provinsi Jawa Timur,Kota Sidoarjo ,Kode Pos 61256', '08881021357', 'jne', 'RESI SEDANG DIPROSES', NULL, NULL, NULL, 336128, NULL, 'foredeltasari@gmail.com', 2, 3, '2025-01-05', 1),
('db5d347', 'CUST002', 'Dewa', 'Felix', 'DSI L-7, Kelurahan Kureksari, Kecamatan Waru, Provinsi Jawa Timur,Kota Sidoarjo ,Kode Pos 61256', '081908353003', 'jnt', 'RESI SEDANG DIPROSES', NULL, NULL, NULL, 158200, NULL, 'dewafelix321@gmail.com', 2, 4, '2025-01-05', 1),
('dd52c2d', 'CUST007', 'Sheila ', 'Permata', 'Jl. Taman Siswa No.712, Sorosutan, Kec. Umbulharjo, Kota Yogyakarta, Daerah Istimewa Yogyakarta, Kelurahan Sorosutan, Kecamatan Umbulharjo, Provinsi DI Yogyakarta,Kota Yogyakarta ,Kode Pos 55151', '08196784567', 'pos', 'RESI SEDANG DIPROSES', NULL, NULL, NULL, 37404, NULL, 'sheyyy@gmail.com', 2, 3, '2025-01-05', 1),
('de4dcf0', 'CUST002', 'Dewa', 'Felix', 'DSI L-7, Kelurahan Kureksari, Kecamatan Waru, Provinsi Jawa Timur,Kota Sidoarjo ,Kode Pos 61256', '081908353003', 'pos', 'TUNGGU KONFIRMASI PESANAN', NULL, NULL, NULL, 133684, NULL, 'dewafelix321@gmail.com', 2, 2, '2025-02-04', 1),
('e3263e1', 'CUST002', 'Dewa', 'Felix', 'DSI L-7, Kelurahan Kureksari, Kecamatan Waru, Provinsi Jawa Timur,Kota Sidoarjo ,Kode Pos 61256', '081908353003', 'pos', 'RESI SEDANG DIPROSES', NULL, NULL, NULL, 170744, NULL, 'dewafelix321@gmail.com', 2, 4, '2025-01-05', 1),
('e43ca3f', 'CUST002', 'Dewa', 'Felix', 'DSI L-7, Kelurahan Kureksari, Kecamatan Waru, Provinsi Jawa Timur,Kota Sidoarjo ,Kode Pos 61256', '081908353003', 'ninja', 'RESI SEDANG DIPROSES', NULL, NULL, NULL, 147000, NULL, 'dewafelix321@gmail.com', 2, 4, '2025-01-05', 1),
('e5d65bd', 'CUST001', 'Radit', 'Setyo', 'Jl. Dr. Ir. H. Soekarno No.396, Kedung Baruk, Kec. Rungkut, Surabaya, Jawa Timur 60298, Kelurahan Kedung Baruk, Kecamatan Rungkut, Provinsi Jawa Timur,Kota Surabaya ,Kode Pos 6028', '0838555485', 'pos', 'RESI SEDANG DIPROSES', NULL, NULL, NULL, 56481, NULL, 'raditsetyo@gmail.com', 2, 3, '2025-01-04', 1),
('e67d454', 'CUST002', 'Dewa', 'Felix', 'DSI L-7, Kelurahan Kureksari, Kecamatan Waru, Provinsi Jawa Timur,Kota Sidoarjo ,Kode Pos 61256', '081908353003', 'ninja', 'RESI SEDANG DIPROSES', NULL, NULL, NULL, 618128, NULL, 'dewafelix321@gmail.com', 2, 3, '2025-01-07', 1),
('eb9567d', 'CUST024', 'Hotel', 'Sinar', 'Jl. Raya Bandara Juanda No.36-40, Kelurahan Sedati Indah, Kecamatan Sedati, Provinsi Jawa Timur,Kota Sidoarjo ,Kode Pos 61256', '08566612355', 'jnt', 'RESI SEDANG DIPROSES', NULL, NULL, NULL, 1801520, NULL, 'hotelsinar.juanda@gmail.com', 2, 3, '2025-01-04', 1),
('f025ddb', 'CUST036', 'Iis', 'Dwi', 'Jl. SMA No. 37, RT 07 RW 02, Kelurahan Samba danum, Kecamatan Katingan tengah, Provinsi Kalimantan Tengah,Kota Katingan ,Kode Pos 74454', '081348871881', 'jnt', 'TUNGGU KONFIRMASI PESANAN', NULL, NULL, NULL, 236872, NULL, 'dwyeidl@gmail.com', 1, 1, '2025-01-03', 1),
('f0b690e', 'CUST052', 'Mas', 'Dewa', 'dsakdjsakjd, Kelurahan Kurersari, Kecamatan , Provinsi ,Kota  ,Kode Pos 61256', '081908353003', 'jne', 'TUNGGU KONFIRMASI PESANAN', 40000, 15000, 125000, 180000, 0, 'masdewa@gmail.com', 1, 1, '2025-04-17', 1),
('f0d1985', 'CUST001', 'Radit', 'Setyo', 'Jl. Dr. Ir. H. Soekarno No.396, Kedung Baruk, Kec. Rungkut, Surabaya, Jawa Timur 60298, Kelurahan Kedung Baruk, Kecamatan Rungkut, Provinsi Jawa Timur,Kota Surabaya ,Kode Pos 6028', '0838555485', 'wahana', 'RESI SEDANG DIPROSES', NULL, NULL, NULL, 99080, NULL, 'raditsetyo@gmail.com', 2, 3, '2025-01-04', 1),
('f258978', 'CUST005', 'Zaranita', 'Amelya', 'Jl. Letjen Sutoyo, Kasian, Bungurasih, Kec. Waru, Kabupaten Sidoarjo, Jawa Timur , Kelurahan Bungurasih, Kecamatan Waru, Provinsi Jawa Timur,Kota Sidoarjo ,Kode Pos 61256', '087851457789', 'sicepat', 'DANA TELAH DIREFUND', NULL, NULL, NULL, 68752, NULL, 'zaranitaamelya@gmail.com', 3, 5, '2025-01-03', 1),
('f366093', 'CUST007', 'Sheila ', 'Permata', 'Jl. Taman Siswa No.712, Sorosutan, Kec. Umbulharjo, Kota Yogyakarta, Daerah Istimewa Yogyakarta, Kelurahan Sorosutan, Kecamatan Umbulharjo, Provinsi DI Yogyakarta,Kota Yogyakarta ,Kode Pos 55151', '08196784567', 'sicepat', 'RESI SEDANG DIPROSES', NULL, NULL, NULL, 138400, NULL, 'sheyyy@gmail.com', 2, 3, '2025-01-03', 1),
('f40bc61', 'CUST002', 'Dewa', 'Felix', 'DSI L-7, Kelurahan Kureksari, Kecamatan Waru, Provinsi Jawa Timur,Kota Sidoarjo ,Kode Pos 61256', '081908353003', 'jne', 'RESI SEDANG DIPROSES', NULL, NULL, NULL, 76400, NULL, 'dewafelix321@gmail.com', 2, 4, '2025-01-05', 1),
('f4413ff', 'CUST002', 'Jono', 'Felix', 'DSI L-7, Kelurahan Kureksari, Kecamatan Waru, Provinsi Jawa Timur,Kota Lamongan ,Kode Pos 61256', '081908353003', 'jnt', 'RESI SEDANG DIPROSES', NULL, NULL, NULL, 421152, NULL, 'dewafelix321@gmail.com', 2, 4, '2025-01-02', 1),
('f605629', 'CUST024', 'Hotel', 'Sinar', 'Jl. Raya Bandara Juanda No.36-40, Kelurahan Sedati Indah, Kecamatan Sedati, Provinsi Jawa Timur,Kota Sidoarjo ,Kode Pos 61256', '08566612355', 'ninja', 'RESI SEDANG DIPROSES', NULL, NULL, NULL, 158200, NULL, 'hotelsinar.juanda@gmail.com', 2, 3, '2025-01-04', 1),
('f752f9d', 'CUST056', 'Felix ', 'Dewa', 'DSI L-7, Kelurahan Waru, Kecamatan Kureksari, Provinsi Jawa Timur,Kota Sidoarjo ,Kode Pos 61256', '0838555485', 'jnt', 'TUNGGU KONFIRMASI PESANAN', 28000, 30240, 252000, 310240, 0, 'dewafelix123@gmail.com', 2, 2, '2025-04-18', 1),
('f77f6fe', 'CUST003', 'Jono', 'Kasino', 'L-9, Kelurahan Sidoarjo, Kecamatan Waru, Provinsi Jawa Timur,Kota Situbondo ,Kode Pos 61256', '085583302510', 'sicepat', 'RESI SEDANG DIPROSES', NULL, NULL, NULL, 96000, NULL, 'Jonokasino@gmail.com', 2, 3, '2025-01-04', 1),
('f8403e7', 'CUST001', 'Radit', 'Setyo', 'Jl. Dr. Ir. H. Soekarno No.396, Kedung Baruk, Kec. Rungkut, Surabaya, Jawa Timur 60298, Kelurahan Kedung Baruk, Kecamatan Rungkut, Provinsi Jawa Timur,Kota Surabaya ,Kode Pos 6028', '0838555485', 'jne', 'RESI SEDANG DIPROSES', NULL, NULL, NULL, 50560, NULL, 'raditsetyo@gmail.com', 2, 3, '2025-01-04', 1),
('f8a5081', 'CUST004', 'Pindi', 'Margaret', 'Jl. Jend.S.Parman IV, Krajan Kulon, Waru, Kec. Waru, Kabupaten Sidoarjo, Jawa Timur, Kelurahan Waru, Kecamatan Waru, Provinsi Jawa Timur,Kota Sidoarjo ,Kode Pos 61256', '0853745678', 'tiki', 'DANA TELAH DIREFUND', NULL, NULL, NULL, 480883, NULL, 'pindimargaret@gmail.com', 3, 5, '2025-01-03', 1),
('f8d5bac', 'CUST006', 'Yoonara', 'Andrea', 'Jl. Brigjend Katamso No.34B, Mekar Raya Binangun, Janti, Kec. Waru, Kabupaten Sidoarjo, Jawa Timur, Kelurahan Waru, Kecamatan Waru, Provinsi Jawa Timur,Kota Sidoarjo ,Kode Pos 61256', '081956789054', 'anteraja', 'DANA TELAH DIREFUND', NULL, NULL, NULL, 109180, NULL, 'y00n@gmail.com', 3, 5, '2025-01-03', 1),
('fb91a44', 'CUST003', 'Jono', 'Kasino', 'L-9, Kelurahan Sidoarjo, Kecamatan Waru, Provinsi Jawa Timur,Kota Sidoarjo ,Kode Pos 61256', '085583302510', 'wahana', 'RESI SEDANG DIPROSES', NULL, NULL, NULL, 16200, NULL, 'Jonokasino@gmail.com', 2, 3, '2025-01-04', 1),
('fc6fe15', 'CUST003', 'Jono', 'Kasino', 'L-9, Kelurahan Sidoarjo, Kecamatan Waru, Provinsi Jawa Timur,Kota Sidoarjo ,Kode Pos 61256', '085583302510', 'sicepat', 'RESI SEDANG DIPROSES', NULL, NULL, NULL, 19320, NULL, 'Jonokasino@gmail.com', 2, 3, '2025-01-04', 1),
('ff6cdd1', 'CUST025', 'Fore', 'Delta Sari', 'Jl. Delta Sari Indah No.7, RW.16, Koreksari, Kureksari, Kec. Waru, Kabupaten Sidoarjo, Jawa Timur 61256, Kelurahan Kureksari, Kecamatan Waru, Provinsi Jawa Timur,Kota Sidoarjo ,Kode Pos 61256', '08881021357', 'jnt', 'RESI SEDANG DIPROSES', NULL, NULL, NULL, 170744, NULL, 'foredeltasari@gmail.com', 2, 3, '2025-01-05', 1),
('ff84896', 'CUST007', 'Sheila ', 'Permata', 'Jl. Taman Siswa No.712, Sorosutan, Kec. Umbulharjo, Kota Yogyakarta, Daerah Istimewa Yogyakarta, Kelurahan Sorosutan, Kecamatan Umbulharjo, Provinsi DI Yogyakarta,Kota Yogyakarta ,Kode Pos 55151', '08196784567', 'anteraja', 'DANA TELAH DIREFUND', NULL, NULL, NULL, 83840, NULL, 'sheyyy@gmail.com', 3, 5, '2025-01-03', 1),
('ff8a77e', 'CUST025', 'Fore', 'Delta Sari', 'Jl. Delta Sari Indah No.7, RW.16, Koreksari, Kureksari, Kec. Waru, Kabupaten Sidoarjo, Jawa Timur 61256, Kelurahan Kureksari, Kecamatan Waru, Provinsi Jawa Timur,Kota Sidoarjo ,Kode Pos 61256', '08881021357', 'sicepat', 'RESI SEDANG DIPROSES', NULL, NULL, NULL, 177520, NULL, 'foredeltasari@gmail.com', 2, 3, '2025-01-05', 1);

-- --------------------------------------------------------

--
-- Table structure for table `beli_produk`
--

DROP TABLE IF EXISTS `beli_produk`;
CREATE TABLE `beli_produk` (
  `id_beli_produk` varchar(255) NOT NULL,
  `id_beli` varchar(255) NOT NULL,
  `id_produk` varchar(255) NOT NULL,
  `harga` int(11) NOT NULL,
  `jumlah` int(11) NOT NULL,
  `created_at` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `beli_produk`
--

INSERT INTO `beli_produk` (`id_beli_produk`, `id_beli`, `id_produk`, `harga`, `jumlah`, `created_at`) VALUES
('OREDRITM001', '9197946', 'MEG151', 0, 4, '2024-12-26'),
('OREDRITM002', 'b582c34', 'MEG149', 0, 1, '2024-12-27'),
('OREDRITM003', '4b3ec87', 'MEG150', 0, 1, '2024-12-27'),
('OREDRITM004', '4b3ec87', 'MEG149', 0, 1, '2024-12-27'),
('OREDRITM005', 'dac485c', 'MEG151', 0, 1, '2024-12-28'),
('OREDRITM006', 'dac485c', 'MEG150', 0, 1, '2024-12-28'),
('OREDRITM007', 'acdfb2d', 'MEG151', 0, 3, '2024-12-29'),
('OREDRITM008', '4ad6f97', 'MEG150', 0, 1, '2024-12-30'),
('OREDRITM009', '4ad6f97', 'MEG149', 0, 2, '2024-12-30'),
('OREDRITM010', '4ad6f97', 'MEG147', 0, 1, '2024-12-30'),
('OREDRITM011', '7098c8e', 'MEG151', 0, 1, '2024-12-30'),
('OREDRITM012', 'af39e38', 'MEG179', 0, 1, '2025-01-01'),
('OREDRITM013', '23b9840', 'MEG179', 0, 1, '2025-01-01'),
('OREDRITM014', 'aa5ef69', 'MEG179', 0, 1, '2025-01-01'),
('OREDRITM015', '0d71944', 'MEG177', 0, 1, '2025-01-01'),
('OREDRITM016', '4f5a45e', 'MEG179', 0, 1, '2025-01-02'),
('OREDRITM017', 'f4413ff', 'MEG179', 0, 3, '2025-01-02'),
('OREDRITM018', '534fe83', 'MEG167', 0, 1, '2025-01-02'),
('OREDRITM019', '6cd7261', 'MEG165', 0, 1, '2025-01-02'),
('OREDRITM020', '1c0122a', 'MEG161', 0, 1, '2025-01-02'),
('OREDRITM021', '82e52be', 'MEG002', 0, 1, '2025-01-02'),
('OREDRITM022', '94327f8', 'MEG162', 0, 1, '2025-01-02'),
('OREDRITM023', '32d7655', 'MEG155', 0, 1, '2025-01-03'),
('OREDRITM024', 'b604e4a', 'MEG137', 0, 1, '2025-01-03'),
('OREDRITM025', 'b604e4a', 'MEG156', 0, 1, '2025-01-03'),
('OREDRITM026', '4e93f43', 'MEG155', 0, 1, '2025-01-03'),
('OREDRITM027', '4a79f1e', 'MEG180', 0, 1, '2025-01-03'),
('OREDRITM028', '0a477c2', 'MEG178', 0, 1, '2025-01-03'),
('OREDRITM029', '0a477c2', 'MEG177', 0, 1, '2025-01-03'),
('OREDRITM030', '26ed1d8', 'MEG178', 0, 1, '2025-01-03'),
('OREDRITM031', '26ed1d8', 'MEG180', 0, 1, '2025-01-03'),
('OREDRITM032', 'c1d8e29', 'MEG176', 0, 1, '2025-01-03'),
('OREDRITM033', '1308ce9', 'MEG180', 0, 1, '2025-01-03'),
('OREDRITM034', '1308ce9', 'MEG152', 0, 1, '2025-01-03'),
('OREDRITM035', 'f025ddb', 'MEG180', 0, 1, '2025-01-03'),
('OREDRITM036', 'f025ddb', 'MEG159', 0, 1, '2025-01-03'),
('OREDRITM037', '4b5225f', 'MEG180', 0, 2, '2025-01-03'),
('OREDRITM038', '3aff14c', 'MEG179', 0, 1, '2025-01-03'),
('OREDRITM039', '9369c0e', 'MEG179', 0, 1, '2025-01-03'),
('OREDRITM040', 'be8a471', 'MEG176', 0, 1, '2025-01-03'),
('OREDRITM041', 'a742670', 'MEG175', 0, 1, '2025-01-03'),
('OREDRITM042', '54ff76a', 'MEG175', 0, 1, '2025-01-03'),
('OREDRITM043', '7c62635', 'MEG179', 0, 2, '2025-01-03'),
('OREDRITM044', 'da408ce', 'MEG151', 0, 1, '2025-01-03'),
('OREDRITM045', '2d5fdd3', 'MEG180', 0, 1, '2025-01-03'),
('OREDRITM046', '712f5a0', 'MEG179', 0, 1, '2025-01-03'),
('OREDRITM047', 'caba503', 'MEG173', 0, 1, '2025-01-03'),
('OREDRITM048', '4751206', 'MEG176', 0, 1, '2025-01-03'),
('OREDRITM049', '08fd92d', 'MEG177', 0, 1, '2025-01-03'),
('OREDRITM050', '26ca2fd', 'MEG177', 0, 1, '2025-01-03'),
('OREDRITM051', '15d72f5', 'MEG152', 0, 1, '2025-01-03'),
('OREDRITM052', 'abb4299', 'MEG177', 0, 1, '2025-01-03'),
('OREDRITM053', 'c8ea742', 'MEG147', 0, 1, '2025-01-03'),
('OREDRITM054', 'f258978', 'MEG167', 0, 1, '2025-01-03'),
('OREDRITM055', 'a039d5e', 'MEG180', 0, 1, '2025-01-03'),
('OREDRITM056', '3a96c59', 'MEG179', 0, 1, '2025-01-03'),
('OREDRITM057', '58126a8', 'MEG179', 0, 1, '2025-01-03'),
('OREDRITM058', '0cbca83', 'MEG123', 0, 1, '2025-01-03'),
('OREDRITM059', '1d07dc1', 'MEG176', 0, 1, '2025-01-03'),
('OREDRITM060', '606dfe0', 'MEG159', 0, 1, '2025-01-03'),
('OREDRITM061', '49e998a', 'MEG172', 0, 1, '2025-01-03'),
('OREDRITM062', '6a8b892', 'MEG117', 0, 1, '2025-01-03'),
('OREDRITM063', 'ab61495', 'MEG180', 0, 1, '2025-01-03'),
('OREDRITM064', '80d1b32', 'MEG179', 0, 1, '2025-01-03'),
('OREDRITM065', '73c0e99', 'MEG175', 0, 1, '2025-01-03'),
('OREDRITM066', 'f8d5bac', 'MEG177', 0, 1, '2025-01-03'),
('OREDRITM067', '0618b64', 'MEG177', 0, 1, '2025-01-03'),
('OREDRITM068', '1c2b48f', 'MEG176', 0, 1, '2025-01-03'),
('OREDRITM069', '8dccd1b', 'MEG157', 0, 1, '2025-01-03'),
('OREDRITM070', 'c00491f', 'MEG178', 0, 1, '2025-01-03'),
('OREDRITM071', '7428fa7', 'MEG161', 0, 1, '2025-01-03'),
('OREDRITM072', '351e134', 'MEG175', 0, 1, '2025-01-03'),
('OREDRITM073', 'bcdb1ad', 'MEG177', 0, 1, '2025-01-03'),
('OREDRITM074', 'cfda4d5', 'MEG180', 0, 1, '2025-01-03'),
('OREDRITM075', '71191d1', 'MEG179', 0, 1, '2025-01-03'),
('OREDRITM076', '7570c9f', 'MEG178', 0, 1, '2025-01-03'),
('OREDRITM077', 'c60e697', 'MEG176', 0, 1, '2025-01-03'),
('OREDRITM078', 'a9d3f5a', 'MEG151', 0, 1, '2025-01-03'),
('OREDRITM079', '670162d', 'MEG158', 0, 1, '2025-01-03'),
('OREDRITM080', 'ff84896', 'MEG175', 0, 1, '2025-01-03'),
('OREDRITM081', 'f366093', 'MEG176', 0, 1, '2025-01-03'),
('OREDRITM082', '06f4249', 'MEG125', 0, 1, '2025-01-03'),
('OREDRITM083', '0f8818c', 'MEG122', 0, 1, '2025-01-03'),
('OREDRITM084', '3ebf7e9', 'MEG176', 0, 1, '2025-01-03'),
('OREDRITM085', '29ef58f', 'MEG180', 0, 1, '2025-01-03'),
('OREDRITM086', '47bbca6', 'MEG140', 0, 1, '2025-01-03'),
('OREDRITM087', '3b1b10d', 'MEG135', 0, 1, '2025-01-03'),
('OREDRITM088', '80568e6', 'MEG138', 0, 1, '2025-01-03'),
('OREDRITM089', '8093bff', 'MEG177', 0, 1, '2025-01-03'),
('OREDRITM090', '01d3f43', 'MEG180', 0, 1, '2025-01-03'),
('OREDRITM091', '784dd0b', 'MEG137', 0, 1, '2025-01-03'),
('OREDRITM092', 'd63fe6f', 'MEG125', 0, 1, '2025-01-03'),
('OREDRITM093', 'a8a3c34', 'MEG106', 0, 1, '2025-01-03'),
('OREDRITM094', '44384b1', 'MEG119', 0, 1, '2025-01-03'),
('OREDRITM095', 'da4ee11', 'MEG175', 0, 1, '2025-01-03'),
('OREDRITM096', 'd4e9f1c', 'MEG086', 0, 1, '2025-01-03'),
('OREDRITM097', '2c27d89', 'MEG083', 0, 1, '2025-01-03'),
('OREDRITM098', '933def2', 'MEG082', 0, 1, '2025-01-03'),
('OREDRITM099', 'b3eec98', 'MEG086', 0, 1, '2025-01-03'),
('OREDRITM100', 'f8a5081', 'MEG135', 0, 1, '2025-01-03'),
('OREDRITM101', '1ac4cfa', 'MEG180', 0, 1, '2025-01-03'),
('OREDRITM102', 'aff1d6a', 'MEG078', 0, 1, '2025-01-03'),
('OREDRITM103', 'f0d1985', 'MEG105', 0, 1, '2025-01-04'),
('OREDRITM104', 'cecc346', 'MEG138', 0, 1, '2025-01-04'),
('OREDRITM105', '4ce0c2a', 'MEG134', 0, 1, '2025-01-04'),
('OREDRITM106', 'b63fc4a', 'MEG087', 0, 1, '2025-01-04'),
('OREDRITM107', 'f8403e7', 'MEG008', 0, 1, '2025-01-04'),
('OREDRITM108', '82db31b', 'MEG139', 0, 1, '2025-01-04'),
('OREDRITM109', 'e5d65bd', 'MEG128', 0, 1, '2025-01-04'),
('OREDRITM110', '8a47244', 'MEG078', 0, 1, '2025-01-04'),
('OREDRITM111', '512c3c5', 'MEG139', 0, 1, '2025-01-04'),
('OREDRITM112', '7dbd37e', 'MEG066', 0, 1, '2025-01-04'),
('OREDRITM113', '89013d1', 'MEG155', 0, 1, '2025-01-04'),
('OREDRITM114', '0400c28', 'MEG164', 0, 1, '2025-01-04'),
('OREDRITM115', '2383c04', 'MEG127', 0, 1, '2025-01-04'),
('OREDRITM116', 'b42eb37', 'MEG048', 0, 1, '2025-01-04'),
('OREDRITM117', '857aa38', 'MEG130', 0, 2, '2025-01-04'),
('OREDRITM118', '73bff41', 'MEG179', 0, 1, '2025-01-04'),
('OREDRITM119', '4a98d8d', 'MEG180', 0, 1, '2025-01-04'),
('OREDRITM120', '4a98d8d', 'MEG179', 0, 1, '2025-01-04'),
('OREDRITM121', '615181d', 'MEG174', 0, 1, '2025-01-04'),
('OREDRITM122', '917c3d9', 'MEG077', 0, 1, '2025-01-04'),
('OREDRITM123', 'f77f6fe', 'MEG085', 0, 1, '2025-01-04'),
('OREDRITM124', 'bfa4a83', 'MEG098', 0, 1, '2025-01-04'),
('OREDRITM125', '1c025bd', 'MEG175', 0, 1, '2025-01-04'),
('OREDRITM126', '022f801', 'MEG175', 0, 1, '2025-01-04'),
('OREDRITM127', '4e7486b', 'MEG164', 0, 1, '2025-01-04'),
('OREDRITM128', '32634af', 'MEG121', 0, 1, '2025-01-04'),
('OREDRITM129', 'a1ded34', 'MEG157', 0, 1, '2025-01-04'),
('OREDRITM130', 'a1ded34', 'MEG158', 0, 1, '2025-01-04'),
('OREDRITM131', '55301b9', 'MEG087', 0, 1, '2025-01-04'),
('OREDRITM132', 'fc6fe15', 'MEG018', 0, 1, '2025-01-04'),
('OREDRITM133', 'ca7de77', 'MEG012', 0, 1, '2025-01-04'),
('OREDRITM134', 'fb91a44', 'MEG006', 0, 1, '2025-01-04'),
('OREDRITM135', '7e7a477', 'MEG165', 0, 1, '2025-01-04'),
('OREDRITM136', '79bb03d', 'MEG122', 0, 1, '2025-01-04'),
('OREDRITM137', '5eb7ca3', 'MEG159', 0, 1, '2025-01-04'),
('OREDRITM138', '8e68d5b', 'MEG006', 0, 1, '2025-01-04'),
('OREDRITM139', '11e0c84', 'MEG123', 0, 1, '2025-01-04'),
('OREDRITM140', 'eb9567d', 'MEG092', 0, 1, '2025-01-04'),
('OREDRITM141', '0490a1c', 'MEG141', 0, 1, '2025-01-04'),
('OREDRITM142', '0490a1c', 'MEG142', 0, 1, '2025-01-04'),
('OREDRITM143', '9392946', 'MEG163', 0, 1, '2025-01-04'),
('OREDRITM144', 'f605629', 'MEG158', 0, 1, '2025-01-04'),
('OREDRITM145', 'cc24a06', 'MEG176', 0, 2, '2025-01-04'),
('OREDRITM146', '49fc653', 'MEG177', 0, 1, '2025-01-04'),
('OREDRITM147', '49fc653', 'MEG176', 0, 1, '2025-01-04'),
('OREDRITM148', '2e26d33', 'MEG180', 0, 1, '2025-01-04'),
('OREDRITM149', '2fc66dd', 'MEG180', 0, 1, '2025-01-04'),
('OREDRITM150', '581f62f', 'MEG179', 0, 1, '2025-01-04'),
('OREDRITM151', 'cbc8b64', 'MEG175', 0, 1, '2025-01-04'),
('OREDRITM152', 'c1eade7', 'MEG178', 0, 1, '2025-01-04'),
('OREDRITM153', '6de7957', 'MEG136', 0, 1, '2025-01-04'),
('OREDRITM154', '6de7957', 'MEG180', 0, 1, '2025-01-04'),
('OREDRITM155', '1de8c96', 'MEG079', 0, 1, '2025-01-04'),
('OREDRITM156', 'a5cc0d1', 'MEG180', 0, 1, '2025-01-04'),
('OREDRITM157', '2128e25', 'MEG167', 0, 1, '2025-01-04'),
('OREDRITM158', 'a3ab33f', 'MEG179', 0, 1, '2025-01-04'),
('OREDRITM159', '413fdc8', 'MEG177', 0, 2, '2025-01-04'),
('OREDRITM160', '4594d39', 'MEG180', 0, 1, '2025-01-04'),
('OREDRITM161', '69a815c', 'MEG138', 0, 1, '2025-01-04'),
('OREDRITM162', '69a815c', 'MEG139', 0, 1, '2025-01-04'),
('OREDRITM163', '6bfef7b', 'MEG178', 0, 1, '2025-01-04'),
('OREDRITM164', 'a005909', 'MEG163', 0, 1, '2025-01-04'),
('OREDRITM165', '08c67e1', 'MEG180', 0, 1, '2025-01-04'),
('OREDRITM166', '6a936ee', 'MEG180', 0, 1, '2025-01-04'),
('OREDRITM167', '2f9fee7', 'MEG178', 0, 1, '2025-01-04'),
('OREDRITM168', '54b829f', 'MEG176', 0, 1, '2025-01-04'),
('OREDRITM169', '0e94fc2', 'MEG158', 0, 1, '2025-01-04'),
('OREDRITM170', '64345fd', 'MEG180', 0, 1, '2025-01-04'),
('OREDRITM171', '8b2ad6e', 'MEG154', 0, 1, '2025-01-04'),
('OREDRITM172', 'a8f590a', 'MEG176', 0, 1, '2025-01-04'),
('OREDRITM173', '6cd6ceb', 'MEG178', 0, 1, '2025-01-04'),
('OREDRITM174', '209cb4b', 'MEG178', 0, 1, '2025-01-04'),
('OREDRITM175', '5ad5975', 'MEG175', 0, 1, '2025-01-05'),
('OREDRITM176', '5ad5975', 'MEG157', 0, 1, '2025-01-05'),
('OREDRITM177', 'b27e92d', 'MEG176', 0, 1, '2025-01-05'),
('OREDRITM178', '8f79871', 'MEG179', 0, 1, '2025-01-05'),
('OREDRITM179', '8f79871', 'MEG175', 0, 1, '2025-01-05'),
('OREDRITM180', '2edfb41', 'MEG086', 0, 1, '2025-01-05'),
('OREDRITM181', 'f40bc61', 'MEG016', 0, 1, '2025-01-05'),
('OREDRITM182', 'db5d347', 'MEG158', 0, 1, '2025-01-05'),
('OREDRITM183', 'e43ca3f', 'MEG174', 0, 1, '2025-01-05'),
('OREDRITM184', '42d3cf7', 'MEG179', 0, 1, '2025-01-05'),
('OREDRITM185', '8575e36', 'MEG177', 0, 1, '2025-01-05'),
('OREDRITM186', '397d0b2', 'MEG176', 0, 1, '2025-01-05'),
('OREDRITM187', 'c13b8d9', 'MEG180', 0, 1, '2025-01-05'),
('OREDRITM188', '9577d83', 'MEG178', 0, 1, '2025-01-05'),
('OREDRITM189', '5b28cd2', 'MEG163', 0, 1, '2025-01-05'),
('OREDRITM190', '0ec054b', 'MEG170', 0, 1, '2025-01-05'),
('OREDRITM191', '0ec054b', 'MEG164', 0, 1, '2025-01-05'),
('OREDRITM192', 'e3263e1', 'MEG180', 0, 1, '2025-01-05'),
('OREDRITM193', '3e0821b', 'MEG159', 0, 1, '2025-01-05'),
('OREDRITM194', '3e0821b', 'MEG160', 0, 1, '2025-01-05'),
('OREDRITM195', '23cdf2a', 'MEG180', 0, 1, '2025-01-05'),
('OREDRITM196', '8ecf658', 'MEG179', 0, 1, '2025-01-05'),
('OREDRITM197', '90c3045', 'MEG169', 0, 1, '2025-01-05'),
('OREDRITM198', '7cf52da', 'MEG156', 0, 1, '2025-01-05'),
('OREDRITM199', '7cf52da', 'MEG154', 0, 1, '2025-01-05'),
('OREDRITM200', 'dd52c2d', 'MEG143', 0, 1, '2025-01-05'),
('OREDRITM201', 'bb38ff8', 'MEG017', 0, 1, '2025-01-05'),
('OREDRITM202', 'cf88816', 'MEG016', 0, 1, '2025-01-05'),
('OREDRITM203', 'b91bb69', 'MEG098', 0, 1, '2025-01-05'),
('OREDRITM204', 'b91bb69', 'MEG094', 0, 1, '2025-01-05'),
('OREDRITM205', '13162c3', 'MEG125', 0, 1, '2025-01-05'),
('OREDRITM206', 'b5f6dc0', 'MEG125', 0, 1, '2025-01-05'),
('OREDRITM207', 'db1dcf5', 'MEG180', 0, 1, '2025-01-05'),
('OREDRITM208', 'db1dcf5', 'MEG179', 0, 1, '2025-01-05'),
('OREDRITM209', 'ff8a77e', 'MEG177', 0, 1, '2025-01-05'),
('OREDRITM210', 'ff8a77e', 'MEG175', 0, 1, '2025-01-05'),
('OREDRITM211', '60d9fe5', 'MEG179', 0, 1, '2025-01-05'),
('OREDRITM212', 'ff6cdd1', 'MEG180', 0, 1, '2025-01-05'),
('OREDRITM213', 'e67d454', 'MEG180', 0, 2, '2025-01-07'),
('OREDRITM214', 'e67d454', 'MEG179', 0, 1, '2025-01-07'),
('OREDRITM215', 'e67d454', 'MEG178', 0, 1, '2025-01-07'),
('OREDRITM216', '0a9127c', 'MEG180', 0, 1, '2025-01-08'),
('OREDRITM217', 'b1f41a8', 'MEG180', 0, 1, '2025-01-08'),
('OREDRITM218', '7b29ef9', 'MEG176', 0, 1, '2025-01-08'),
('OREDRITM219', '7b29ef9', 'MEG180', 0, 1, '2025-01-08'),
('OREDRITM220', 'de4dcf0', 'MEG179', 0, 1, '2025-02-04'),
('OREDRITM221', '79be58c', 'MEG179', 0, 1, '2025-02-04'),
('OREDRITM222', '7811d0e', 'MEG179', 0, 1, '2025-04-17'),
('OREDRITM223', 'ae338b6', 'MEG179', 0, 1, '2025-04-17'),
('OREDRITM224', '2c6e0f2', 'MEG178', 0, 1, '2025-04-17'),
('OREDRITM225', '46e1f35', 'MEG177', 0, 1, '2025-04-17'),
('OREDRITM226', 'd8cef90', 'MEG177', 0, 1, '2025-04-17'),
('OREDRITM227', 'f0b690e', 'MEG174', 0, 1, '2025-04-17'),
('OREDRITM228', 'ca84727', 'MEG179', 0, 1, '2025-04-17'),
('OREDRITM229', 'b012f8f', 'MEG175', 0, 1, '2025-04-17'),
('OREDRITM230', '0c592bd', 'MEG179', 0, 1, '2025-04-17'),
('OREDRITM231', '0c592bd', 'MEG178', 0, 1, '2025-04-17'),
('OREDRITM232', '0c592bd', 'MEG177', 0, 1, '2025-04-17'),
('OREDRITM233', '567b452', 'MEG178', 0, 1, '2025-04-17'),
('OREDRITM234', '44624ab', 'MEG179', 0, 1, '2025-04-18'),
('OREDRITM235', '44624ab', 'MEG178', 0, 1, '2025-04-18'),
('OREDRITM236', '44624ab', 'MEG177', 0, 1, '2025-04-18'),
('OREDRITM237', 'f752f9d', 'MEG176', 0, 1, '2025-04-18'),
('OREDRITM238', 'f752f9d', 'MEG175', 0, 1, '2025-04-18'),
('OREDRITM239', 'f752f9d', 'MEG174', 0, 1, '2025-04-18');

-- --------------------------------------------------------

--
-- Table structure for table `brand`
--

DROP TABLE IF EXISTS `brand`;
CREATE TABLE `brand` (
  `id_brand` varchar(255) NOT NULL,
  `nama_brand` varchar(255) NOT NULL,
  `jumlah_produk` int(11) NOT NULL,
  `foto` varchar(255) NOT NULL,
  `created_at` date NOT NULL,
  `status` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `brand`
--

INSERT INTO `brand` (`id_brand`, `nama_brand`, `jumlah_produk`, `foto`, `created_at`, `status`) VALUES
('BRN002', 'Phillips', 7, 'foto-1734241760590-5795659.png', '2024-12-15', 1),
('BRN003', 'Meval', 21, 'foto-1734241777673-21155578.png', '2024-12-15', 1),
('BRN004', 'Schneider Electric', 0, 'foto-1734241791475-255917582.png', '2024-12-15', 1),
('BRN005', 'Panasonic', 0, 'foto-1734241846730-125617074.png', '2024-12-15', 1),
('BRN006', 'Broco', 46, 'foto-1734241864037-118404090.png', '2024-12-15', 1),
('BRN007', 'Hannochs', 0, 'foto-1734241878595-677039692.png', '2024-12-15', 1),
('BRN008', 'Megaman', 0, 'foto-1734241893122-727684741.png', '2024-12-15', 1),
('BRN009', 'Ecolink', 0, 'foto-1734241913365-301884693.png', '2024-12-15', 1),
('BRN010', 'Visalux', 0, 'foto-1734241926365-943826202.png', '2024-12-15', 1),
('BRN011', 'Hager', 0, 'foto-1734241980254-63433608.png', '2024-12-15', 1),
('BRN012', 'Eterna', 6, 'foto-1734242018118-702720919.png', '2024-12-15', 1),
('BRN013', 'Wilux', 0, 'foto-1734242067978-23368794.png', '2024-12-15', 1),
('BRN014', 'Supreme', 0, 'foto-1734242090188-777415328.png', '2024-12-15', 1),
('BRN015', 'Visicom', 0, 'foto-1734242126352-42546604.png', '2024-12-15', 1),
('BRN016', 'Uticon', 86, 'foto-1734242144789-944332270.jpg', '2024-12-15', 1),
('BRN017', 'Masko', 12, 'foto-1734358359291-245779663.png', '2024-12-16', 1);

-- --------------------------------------------------------

--
-- Table structure for table `cart`
--

DROP TABLE IF EXISTS `cart`;
CREATE TABLE `cart` (
  `id_cart` varchar(255) NOT NULL,
  `id_user` varchar(255) NOT NULL,
  `created_at` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `cart`
--

INSERT INTO `cart` (`id_cart`, `id_user`, `created_at`) VALUES
('CART001', 'CUST050', '2025-02-18'),
('CART002', 'CUST002', '2025-02-27'),
('CART003', 'CUST056', '2025-04-21');

-- --------------------------------------------------------

--
-- Table structure for table `cart_produk`
--

DROP TABLE IF EXISTS `cart_produk`;
CREATE TABLE `cart_produk` (
  `id_cart_produk` varchar(255) NOT NULL,
  `id_cart` varchar(255) NOT NULL,
  `id_produk` varchar(255) NOT NULL,
  `harga` int(11) NOT NULL,
  `jumlah_produk` int(11) NOT NULL,
  `total_cart` int(11) NOT NULL,
  `created_at` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `cart_produk`
--

INSERT INTO `cart_produk` (`id_cart_produk`, `id_cart`, `id_produk`, `harga`, `jumlah_produk`, `total_cart`, `created_at`) VALUES
('CARTPRDK001', 'CART001', 'MEG179', 118200, 1, 118200, '2025-02-18'),
('CARTPRDK002', 'CART002', 'MEG179', 118200, 1, 118200, '2025-02-27'),
('CARTPRDK003', 'CART003', 'MEG178', 103800, 1, 103800, '2025-04-23');

-- --------------------------------------------------------

--
-- Table structure for table `favorite`
--

DROP TABLE IF EXISTS `favorite`;
CREATE TABLE `favorite` (
  `id_favorite` varchar(255) NOT NULL,
  `id_user` varchar(255) NOT NULL,
  `created_at` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `favorite`
--

INSERT INTO `favorite` (`id_favorite`, `id_user`, `created_at`) VALUES
('FAV001', 'CUST040', '2025-01-03'),
('FAV002', 'CUST001', '2025-01-04'),
('FAV003', 'CUST048', '2025-01-04'),
('FAV004', 'CUST002', '2025-01-04');

-- --------------------------------------------------------

--
-- Table structure for table `favorite_produk`
--

DROP TABLE IF EXISTS `favorite_produk`;
CREATE TABLE `favorite_produk` (
  `id_favorite_produk` varchar(255) NOT NULL,
  `id_favorite` varchar(255) NOT NULL,
  `id_produk` varchar(255) NOT NULL,
  `harga` int(11) NOT NULL,
  `jumlah_produk` int(11) NOT NULL,
  `created_at` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `favorite_produk`
--

INSERT INTO `favorite_produk` (`id_favorite_produk`, `id_favorite`, `id_produk`, `harga`, `jumlah_produk`, `created_at`) VALUES
('FAVPDT001', 'FAV001', 'MEG079', 225000, 1, '2025-01-03'),
('FAVPDT002', 'FAV001', 'MEG174', 125000, 1, '2025-01-03'),
('FAVPDT003', 'FAV002', 'MEG121', 15000, 1, '2025-01-04'),
('FAVPDT004', 'FAV004', 'MEG180', 146200, 2, '2025-01-04'),
('FAVPDT005', 'FAV004', 'MEG179', 118200, 4, '2025-02-14');

-- --------------------------------------------------------

--
-- Table structure for table `foto_product`
--

DROP TABLE IF EXISTS `foto_product`;
CREATE TABLE `foto_product` (
  `id_produk` varchar(255) NOT NULL,
  `nama` varchar(255) NOT NULL,
  `number` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `foto_product`
--

INSERT INTO `foto_product` (`id_produk`, `nama`, `number`) VALUES
('MEG001', 'foto-1734243314199-60013566.jpg', 1),
('MEG002', 'foto-1734243847655-20991203.jpg', 1),
('MEG003', 'foto-1734244682775-634455044.jpg', 1),
('MEG004', 'foto-1734244805289-993531746.jpg', 1),
('MEG005', 'foto-1734244929120-972837644.png', 1),
('MEG006', 'foto-1734245040260-443129356.jpg', 1),
('MEG007', 'foto-1734245173000-476624721.jpg', 1),
('MEG008', 'foto-1734245364439-768197792.png', 1),
('MEG009', 'foto-1734245772537-530227258.jpg', 1),
('MEG010', 'foto-1734245880477-906799280.png', 1),
('MEG011', 'foto-1734246024401-2866558.jpg', 1),
('MEG011', 'foto-1734246024401-625389951.jpg', 2),
('MEG012', 'foto-1734247110764-676883303.png', 1),
('MEG013', 'foto-1734247343769-785281044.png', 1),
('MEG014', 'foto-1734247504770-479442015.png', 1),
('MEG015', 'foto-1734247616885-556663899.jpeg', 1),
('MEG016', 'foto-1734247725420-609030776.png', 1),
('MEG017', 'foto-1734247933760-377045078.jpg', 1),
('MEG018', 'foto-1734314549583-816395885.jpg', 1),
('MEG019', 'foto-1734314610174-587687357.jpg', 1),
('MEG020', 'foto-1734314663981-991871325.jpg', 1),
('MEG021', 'foto-1734314734758-509086122.jpg', 1),
('MEG022', 'foto-1734315450048-221412930.jpg', 1),
('MEG023', 'foto-1734316402643-815774371.jpg', 1),
('MEG024', 'foto-1734317495679-502902882.jpg', 1),
('MEG025', 'foto-1734346478270-169088074.jpg', 1),
('MEG026', 'foto-1734346729452-166319933.jpg', 1),
('MEG027', 'foto-1734347089626-645000658.jpg', 1),
('MEG028', 'foto-1734347185823-868387949.jpg', 1),
('MEG029', 'foto-1734347236278-678983431.jpg', 1),
('MEG030', 'foto-1734347284593-944022358.jpg', 1),
('MEG031', 'foto-1734348469958-134635388.png', 1),
('MEG032', 'foto-1734348544194-987408183.png', 1),
('MEG033', 'foto-1734348654415-50970891.png', 1),
('MEG034', 'foto-1734348732541-348767240.png', 1),
('MEG035', 'foto-1734349016046-606263138.jpg', 1),
('MEG036', 'foto-1734349413974-711933190.jpg', 1),
('MEG037', 'foto-1734349936214-392180564.jpg', 1),
('MEG038', 'foto-1734350073052-254235381.jpg', 1),
('MEG039', 'foto-1734350310754-355417907.jpg', 1),
('MEG040', 'foto-1734350390744-966397515.jpg', 1),
('MEG041', 'foto-1734350439434-874494487.jpg', 1),
('MEG042', 'foto-1734351128301-803544467.png', 1),
('MEG043', 'foto-1734351242396-874165123.png', 1),
('MEG044', 'foto-1734351285934-317876966.png', 1),
('MEG045', 'foto-1734351343420-537869814.png', 1),
('MEG046', 'foto-1734351418692-131700393.png', 1),
('MEG047', 'foto-1734351764117-504768272.png', 1),
('MEG048', 'foto-1734351809832-464037.png', 1),
('MEG049', 'foto-1734351855088-291431522.png', 1),
('MEG050', 'foto-1734351908312-91698213.png', 1),
('MEG051', 'foto-1734352021399-110743598.png', 1),
('MEG052', 'foto-1734352086212-254941340.png', 1),
('MEG053', 'foto-1734352140081-311216601.png', 1),
('MEG054', 'foto-1734352189097-688060969.png', 1),
('MEG055', 'foto-1734352556923-95569123.jpg', 1),
('MEG056', 'foto-1734352608364-472587325.jpg', 1),
('MEG056', 'foto-1734352654892-210222880.jpg', 1),
('MEG057', 'foto-1734352738137-541866038.jpg', 1),
('MEG058', 'foto-1734352776967-580117127.jpg', 1),
('MEG059', 'foto-1734352870209-120023608.png', 1),
('MEG060', 'foto-1734352924165-312642676.png', 1),
('MEG061', 'foto-1734352986828-515336848.png', 1),
('MEG062', 'foto-1734353059056-748523763.png', 1),
('MEG063', 'foto-1734353344477-161803136.png', 1),
('MEG064', 'foto-1734353390744-772101918.png', 1),
('MEG065', 'foto-1734353437731-655584847.png', 1),
('MEG066', 'foto-1734353491999-132426293.png', 1),
('MEG067', 'foto-1734353541731-994778928.png', 1),
('MEG068', 'foto-1734353578828-540566722.png', 1),
('MEG069', 'foto-1734353636785-890571545.png', 1),
('MEG070', 'foto-1734353673879-426514985.png', 1),
('MEG071', 'foto-1734354135065-664378541.png', 1),
('MEG072', 'foto-1734354219648-914634368.png', 1),
('MEG073', 'foto-1734354550880-393096635.jpg', 1),
('MEG074', 'foto-1734354594441-452468043.jpg', 1),
('MEG075', 'foto-1734354628198-274459281.jpg', 1),
('MEG076', 'foto-1734354727271-316973972.jpg', 1),
('MEG077', 'foto-1734354967889-982551074.jpg', 1),
('MEG078', 'foto-1734355281441-632423017.png', 1),
('MEG079', 'foto-1734355329912-220709407.png', 1),
('MEG080', 'foto-1734355411510-496754831.jpg', 1),
('MEG081', 'foto-1734355458036-696523662.png', 1),
('MEG082', 'foto-1734355513627-206591722.png', 1),
('MEG083', 'foto-1734355564123-647278206.png', 1),
('MEG084', 'foto-1734355771787-684440358.jpg', 1),
('MEG085', 'foto-1734355810733-236716323.jpg', 1),
('MEG086', 'foto-1734355846994-645592477.jpg', 1),
('MEG087', 'foto-1734356925037-286018939.jpg', 1),
('MEG088', 'foto-1734356968761-332272880.jpg', 1),
('MEG089', 'foto-1734357012920-573640294.jpg', 1),
('MEG090', 'foto-1734357061943-9441229.jpg', 1),
('MEG091', 'foto-1734357179130-2695031.jpg', 1),
('MEG092', 'foto-1734357211644-440568977.jpg', 1),
('MEG093', 'foto-1734358419288-888017497.png', 1),
('MEG094', 'foto-1734358493182-664273318.png', 1),
('MEG095', 'foto-1734358534512-228204900.png', 1),
('MEG096', 'foto-1734358591990-287933451.png', 1),
('MEG097', 'foto-1734358663689-226219212.png', 1),
('MEG098', 'foto-1734358696329-917696548.png', 1),
('MEG099', 'foto-1734358750066-255524227.png', 1),
('MEG100', 'foto-1734358787690-144483395.png', 1),
('MEG101', 'foto-1734358816864-204267659.png', 1),
('MEG102', 'foto-1734358865698-891918058.png', 1),
('MEG103', 'foto-1734358898995-71898551.png', 1),
('MEG104', 'foto-1734358933303-179677589.png', 1),
('MEG105', 'foto-1734358966299-784165021.png', 1),
('MEG106', 'foto-1734520723030-835914603.jpeg', 1),
('MEG107', 'foto-1734520985117-995322270.jpg', 1),
('MEG108', 'foto-1734521039296-153187042.jpg', 1),
('MEG109', 'foto-1734521093862-646279274.jpg', 1),
('MEG110', 'foto-1734521155528-944338375.jpg', 1),
('MEG111', 'foto-1734521269338-323152664.jpg', 1),
('MEG112', 'foto-1734521387923-798992328.png', 1),
('MEG113', 'foto-1734522017842-805933435.jpg', 1),
('MEG114', 'foto-1734522100387-962317416.jpg', 1),
('MEG115', 'foto-1734522222612-299096820.jpg', 1),
('MEG116', 'foto-1734522366916-541112230.jpg', 1),
('MEG117', 'foto-1734522438908-479747622.jpg', 1),
('MEG118', 'foto-1734522508841-684112951.jpg', 1),
('MEG119', 'foto-1734522561807-655080014.jpg', 1),
('MEG120', 'foto-1734523290492-343604900.jpg', 1),
('MEG121', 'foto-1734523675735-834298977.jpg', 1),
('MEG122', 'foto-1734523756787-306502556.jpg', 1),
('MEG123', 'foto-1734524102499-30815795.jpg', 1),
('MEG124', 'foto-1734524246414-705525083.jpg', 1),
('MEG125', 'foto-1734524342706-719291833.jpg', 1),
('MEG126', 'foto-1734524495166-868487505.jpg', 1),
('MEG127', 'foto-1734524553085-492993950.jpg', 1),
('MEG128', 'foto-1734524616315-784200717.jpg', 1),
('MEG129', 'foto-1734524682506-515118385.jpg', 1),
('MEG130', 'foto-1734525159151-229245845.jpg', 1),
('MEG131', 'foto-1734525226110-765407536.jpg', 1),
('MEG132', 'foto-1734525525517-334019145.jpg', 1),
('MEG133', 'foto-1734525617946-824418816.jpg', 1),
('MEG134', 'foto-1734525691701-16679944.jpg', 1),
('MEG135', 'foto-1734525745047-822462919.jpg', 1),
('MEG136', 'foto-1734525791403-88984340.jpg', 1),
('MEG137', 'foto-1734526149968-430366661.jpg', 1),
('MEG138', 'foto-1734526201962-825743436.jpg', 1),
('MEG139', 'foto-1734526629671-718155823.jpg', 1),
('MEG140', 'foto-1734526696845-791749673.jpg', 1),
('MEG141', 'foto-1734526768251-167547744.jpg', 1),
('MEG142', 'foto-1734526963416-279594619.jpg', 1),
('MEG143', 'foto-1734527102288-302192807.jpg', 1),
('MEG144', 'foto-1734527151642-497506235.jpg', 1),
('MEG145', 'foto-1734527628071-565034346.jpg', 1),
('MEG146', 'foto-1734527709190-979264746.jpg', 1),
('MEG147', 'foto-1734527882424-68431435.jpg', 1),
('MEG148', 'foto-1734527983844-409305157.jpg', 1),
('MEG149', 'foto-1734528086495-679245452.jpg', 1),
('MEG150', 'foto-1734528148519-911574265.jpg', 1),
('MEG151', 'foto-1734528371069-386946606.jpg', 1),
('MEG152', 'foto-1734528424209-391737470.jpg', 1),
('MEG152', 'foto-1734841277772-527162420.jpg', 1),
('MEG152', 'foto-1735657328448-269975403.png', 1),
('MEG153', 'foto-1735657432472-636202820.png', 1),
('MEG154', 'foto-1735657487061-467430901.png', 1),
('MEG155', 'foto-1735658115662-514532964.png', 1),
('MEG156', 'foto-1735658221760-962964178.png', 1),
('MEG157', 'foto-1735658318087-437597992.png', 1),
('MEG158', 'foto-1735658379358-447849626.png', 1),
('MEG159', 'foto-1735658729848-46450496.jpg', 1),
('MEG160', 'foto-1735658912405-32857003.jpg', 1),
('MEG161', 'foto-1735659590202-893909189.jpg', 1),
('MEG162', 'foto-1735659636921-439612136.jpg', 1),
('MEG163', 'foto-1735659726113-935704647.jpg', 1),
('MEG164', 'foto-1735659768061-781297367.jpg', 1),
('MEG165', 'foto-1735659860432-924437737.jpg', 1),
('MEG166', 'foto-1735659907474-600327818.jpg', 1),
('MEG167', 'foto-1735660014100-770567857.jpg', 1),
('MEG168', 'foto-1735660067605-694174043.jpg', 1),
('MEG169', 'foto-1735660105797-786505072.jpg', 1),
('MEG170', 'foto-1735660143390-944781010.jpg', 1),
('MEG171', 'foto-1735660211727-307368334.jpg', 1),
('MEG172', 'foto-1735660259094-508610992.jpg', 1),
('MEG173', 'foto-1735660295558-931808726.jpg', 1),
('MEG174', 'foto-1735660332178-105373795.jpg', 1),
('MEG175', 'foto-1735660652962-234634612.jpg', 1),
('MEG176', 'foto-1735660708675-125067476.jpg', 1),
('MEG177', 'foto-1735660759095-376454054.jpg', 1),
('MEG178', 'foto-1735660836053-134510920.jpg', 1),
('MEG179', 'foto-1735660881537-28219494.jpg', 1),
('MEG181', 'foto-1735880607750-207928052.jpeg', 1);

-- --------------------------------------------------------

--
-- Table structure for table `kategori`
--

DROP TABLE IF EXISTS `kategori`;
CREATE TABLE `kategori` (
  `id_kategori` varchar(255) NOT NULL,
  `nama_kategori` varchar(255) NOT NULL,
  `jumlah_produk` int(11) NOT NULL,
  `foto` varchar(255) NOT NULL,
  `created_at` date NOT NULL,
  `status` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `kategori`
--

INSERT INTO `kategori` (`id_kategori`, `nama_kategori`, `jumlah_produk`, `foto`, `created_at`, `status`) VALUES
('KTG001', 'Steker', 8, 'foto-1734242350303-524009167.jpg', '2024-12-15', 1),
('KTG002', 'Steker T', 2, 'foto-1734242416678-761908019.jpg', '2024-12-15', 1),
('KTG003', 'Steker T dengan Saklar', 1, 'foto-1734245235038-608163782.png', '2024-12-15', 1),
('KTG004', 'Steker dengan Saklar', 3, 'foto-1734245661566-869095743.jpg', '2024-12-15', 1),
('KTG005', 'Stopkontak Arde', 2, 'foto-1734245960057-522993555.jpg', '2024-12-15', 1),
('KTG006', 'Stopkontak Arde dengan Saklar', 4, 'foto-1734246080996-737488521.png', '2024-12-15', 1),
('KTG007', 'Stopkontak Portabel', 7, 'foto-1734247831519-626401986.jpg', '2024-12-15', 1),
('KTG008', 'Stopkontak Portabel dengan Pengaman Soket', 13, 'foto-1734317294861-456128313.jpg', '2024-12-16', 1),
('KTG009', 'Stop Kontak dengan Kabel 1,5 Meter', 5, 'foto-1734349774900-836577413.jpg', '2024-12-16', 1),
('KTG010', 'Stop Kontak Kabel 1,5 Meter dengan Saklar dan Pengaman Soket', 23, 'foto-1734350802868-593879901.png', '2024-12-16', 1),
('KTG011', 'Stop Kontak Kabel 3 Meter dengan Saklar dan Pengaman Soket', 8, 'foto-1734351936239-667411085.png', '2024-12-16', 1),
('KTG012', 'Stop Kontak Kabel 4 Meter dengan Pengaman Soket', 4, 'foto-1734354430369-110331459.jpg', '2024-12-16', 1),
('KTG013', 'Kabel Gulung 6 Meter dengan Pengaman Soket', 1, 'foto-1734354869828-380336936.jpg', '2024-12-16', 1),
('KTG014', 'Kabel Gulung 8 Meter dengan Pengaman Soket', 1, 'foto-1734355031854-367342921.png', '2024-12-16', 1),
('KTG015', 'Kabel Gulung 10 Meter dengan Pengaman Soket', 1, 'foto-1734355068102-227187350.png', '2024-12-16', 1),
('KTG016', 'Kabel Gulung 15 Meter dengan Pengaman Soket', 1, 'foto-1734355097555-36723426.png', '2024-12-16', 1),
('KTG017', 'Kabel Gulung 20 Meter dengan Pengaman Soket', 1, 'foto-1734355133926-538146702.png', '2024-12-16', 1),
('KTG018', 'Kabel Gulung 25 Meter dengan Pengaman Soket', 1, 'foto-1734355166523-592967521.png', '2024-12-16', 1),
('KTG019', 'Kabel Gulung 30 Meter dengan Pengaman Soket', 1, 'foto-1734355182660-943505756.png', '2024-12-16', 1),
('KTG020', 'MCB Panel Box 4 Group', 1, 'foto-1734355660332-870765842.jpg', '2024-12-16', 1),
('KTG021', 'MCB Panel Box 8 Group', 1, 'foto-1734355680823-568079938.jpg', '2024-12-16', 1),
('KTG022', 'MCB Panel Box 12 Group', 1, 'foto-1734355696048-884582481.jpg', '2024-12-16', 1),
('KTG023', 'Kabel NYM 50 Meter', 3, 'foto-1734356322539-393773078.jpg', '2024-12-16', 1),
('KTG024', 'Kabel NYM 100 Meter', 3, 'foto-1734356339105-340202879.jpg', '2024-12-16', 1),
('KTG025', 'Kabel NYY 50 Meter', 10, 'foto-1734356354456-102999707.jpeg', '2024-12-16', 1),
('KTG026', 'Kabel NYY 100 Meter', 10, 'foto-1734356385002-649348011.jpeg', '2024-12-16', 1),
('KTG027', 'Kabel NYA 50 Meter', 10, 'foto-1734356453828-646054041.jpg', '2024-12-16', 1),
('KTG028', 'Kabel NYA 100 Meter', 10, 'foto-1734356473543-77369340.jpg', '2024-12-16', 1),
('KTG029', 'Kabel NYAF 100 Meter', 10, 'foto-1734356560180-400835492.jpg', '2024-12-16', 1),
('KTG030', 'Kabel NYAF 50 Meter', 10, 'foto-1734356578668-922422004.jpg', '2024-12-16', 1),
('KTG031', 'Kabel Ties', 12, 'foto-1734358282605-440153361.png', '2024-12-16', 1),
('KTG032', 'Rumah Lampu', 7, 'foto-1734520614437-466788052.jpg', '2024-12-18', 1),
('KTG034', 'Saklar Seri', 3, 'foto-1734522139648-65340419.jpg', '2024-12-18', 1),
('KTG035', 'Saklar Triple', 1, 'foto-1734522155731-651222736.jpg', '2024-12-18', 1),
('KTG036', 'Saklar Engkel', 5, 'foto-1734523493911-327216603.jpg', '2024-12-18', 1),
('KTG037', 'Saklar Engkel Outbow', 2, 'foto-1734523517235-590989836.jpg', '2024-12-18', 1),
('KTG038', 'Saklar Seri Outbow', 2, 'foto-1734523535975-315566132.jpg', '2024-12-18', 1),
('KTG039', 'Stopkontak Arde Outbow', 2, 'foto-1734523979376-913721376.jpg', '2024-12-18', 1),
('KTG040', 'Double Stopkontak Arde Outbow', 1, 'foto-1734524292862-208293262.jpg', '2024-12-18', 1),
('KTG041', 'Stop Kontak Arde', 4, 'foto-1734524429841-364058234.jpg', '2024-12-18', 1),
('KTG042', 'Kontra Steker', 3, 'foto-1734525083852-244463022.jpg', '2024-12-18', 1),
('KTG043', 'Over Steker', 2, 'foto-1734526104476-253148021.jpg', '2024-12-18', 1),
('KTG044', 'Soket Telepon', 2, 'foto-1734526390209-551226996.jpg', '2024-12-18', 1),
('KTG045', 'Soket Televisi', 2, 'foto-1734526408819-752693489.jpg', '2024-12-18', 1),
('KTG046', 'Soket Outlet', 3, 'foto-1734526485465-847852538.jpg', '2024-12-18', 1),
('KTG047', 'Soket Outlet Outbow', 2, 'foto-1734527003593-960372757.jpg', '2024-12-18', 1),
('KTG048', 'Soket Network', 1, 'foto-1734757961835-552234038.jpg', '2024-12-18', 1),
('KTG049', 'PAKET LED BULB', 12, 'foto-1735657226728-143040084.png', '2024-12-31', 1),
('KTG050', 'LED BULB 3W', 2, 'foto-1735658674981-527066769.jpg', '2024-12-31', 1),
('KTG051', 'LED BULB 5W', 2, 'foto-1735659092628-611815646.jpg', '2024-12-31', 1),
('KTG052', 'LED BULB 7W', 2, 'foto-1735659124258-248785099.jpg', '2024-12-31', 1),
('KTG053', 'LED BULB 9W', 2, 'foto-1735659178958-758712099.jpg', '2024-12-31', 1),
('KTG055', 'LED BULB 11W', 1, 'foto-1735659227372-841416028.jpg', '2024-12-31', 1),
('KTG056', 'LED BULB 13W', 1, 'foto-1735659243827-768797427.jpg', '2024-12-31', 1),
('KTG057', 'LED BULB 15W', 1, 'foto-1735659358757-390403442.jpg', '2024-12-31', 1),
('KTG058', 'LED BULB 17W', 1, 'foto-1735659373270-103793471.jpg', '2024-12-31', 1),
('KTG059', 'LED BULB 19W', 1, 'foto-1735659391821-574609508.jpg', '2024-12-31', 1),
('KTG060', 'LED BULB 25W', 1, 'foto-1735659471860-551331880.jpg', '2024-12-31', 1),
('KTG061', 'LED BULB 30W', 1, 'foto-1735659491500-332331454.jpg', '2024-12-31', 1),
('KTG062', 'LED BULB 40W', 1, 'foto-1735659519985-456475577.jpg', '2024-12-31', 1);

-- --------------------------------------------------------

--
-- Table structure for table `pakai_voucher`
--

DROP TABLE IF EXISTS `pakai_voucher`;
CREATE TABLE `pakai_voucher` (
  `id_pakaivoucher` varchar(255) NOT NULL,
  `id_user` varchar(255) NOT NULL,
  `id_voucher` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `produk`
--

DROP TABLE IF EXISTS `produk`;
CREATE TABLE `produk` (
  `id_produk` varchar(255) NOT NULL,
  `nama_produk` varchar(255) NOT NULL,
  `nama_brand` varchar(255) NOT NULL,
  `nama_kategori` varchar(255) NOT NULL,
  `harga` int(11) NOT NULL,
  `stok` int(11) NOT NULL,
  `berat` int(11) NOT NULL,
  `garansi` int(11) NOT NULL,
  `deskripsi` varchar(255) NOT NULL,
  `harga_diskon` int(11) DEFAULT NULL,
  `total_harga` int(11) DEFAULT NULL,
  `mulai_promo` date DEFAULT NULL,
  `selesai_promo` date DEFAULT NULL,
  `status` int(11) NOT NULL,
  `status_promo` int(11) DEFAULT NULL,
  `created_at` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `produk`
--

INSERT INTO `produk` (`id_produk`, `nama_produk`, `nama_brand`, `nama_kategori`, `harga`, `stok`, `berat`, `garansi`, `deskripsi`, `harga_diskon`, `total_harga`, `mulai_promo`, `selesai_promo`, `status`, `status_promo`, `created_at`) VALUES
('MEG001', 'Steker Arde S-28', 'Uticon', 'Steker', 10000, 100, 150, 1, '* Casing terbuat dari bahan polikarbonat yang tahan panas dan berdaya tahan tinggi\r\n* Terminal kontak kuningan\r\n* Instalasi kabel mudah dengan panel yang mudah dilepas dan terminal yang ditandai dengan jelas\r\n* Dilengkapi dengan terminal pembumian untuk k', NULL, 10000, NULL, NULL, 1, NULL, '2024-12-15'),
('MEG002', 'Steker Arde Bulat S-28R', 'Uticon', 'Steker', 10000, 100, 125, 1, '* Casing terbuat dari bahan polikarbonat yang tahan panas dan berdaya tahan tinggi\r\n* Terminal kontak kuningan\r\n* Instalasi kabel mudah dengan panel yang mudah dilepas dan terminal yang ditandai dengan jelas\r\n* Dilengkapi dengan terminal pembumian untuk k', NULL, 10000, NULL, NULL, 1, NULL, '2024-12-15'),
('MEG003', 'Steker Arde Bengkok S-30', 'Uticon', 'Steker', 10000, 100, 150, 1, 'Casing terbuat dari bahan polikarbonat yang tahan panas dan berdaya tahan tinggi\r\nTerminal kontak kuningan\r\nInstalasi kabel mudah dengan panel yang mudah dilepas dan terminal yang ditandai dengan jelas\r\nDilengkapi dengan terminal pembumian untuk keamanan', NULL, 10000, NULL, NULL, 1, NULL, '2024-12-15'),
('MEG004', 'Steker Gepeng S-20N (Hitam)', 'Uticon', 'Steker', 5000, 100, 150, 1, 'Casing terbuat dari bahan polikarbonat yang tahan panas dan berdaya tahan tinggi\r\nTerminal kontak kuningan\r\nInstalasi kabel mudah dengan panel yang mudah dilepas dan terminal yang ditandai dengan jela', NULL, 5000, NULL, NULL, 1, NULL, '2024-12-15'),
('MEG005', 'Steker Gepeng S-20N (Abu-abu)', 'Uticon', 'Steker', 5000, 100, 150, 1, 'Casing terbuat dari bahan polikarbonat yang tahan panas dan berdaya tahan tinggi\r\nTerminal kontak kuningan\r\nInstalasi kabel mudah dengan panel yang mudah dilepas dan terminal yang ditandai dengan jela', NULL, 5000, NULL, NULL, 1, NULL, '2024-12-15'),
('MEG006', 'Kontra Steker Arde CS-28', 'Uticon', 'Kontra Steker', 10000, 98, 125, 1, 'Casing terbuat dari bahan resin tahan panas dan berdaya tahan tinggi\r\nTerminal kontak kuningan\r\nInstalasi kabel mudah dengan panel yang mudah dilepas dan terminal yang ditandai dengan jelas\r\nDilengkapi dengan terminal pembumian untuk keamanan', NULL, 10000, NULL, NULL, 1, NULL, '2024-12-15'),
('MEG007', 'Steker Arde 3 Soket SC-38', 'Uticon', 'Steker T', 22500, 100, 200, 1, 'Casing terbuat dari bahan polikarbonat yang tahan panas dan berdaya tahan tinggi\r\nTerminal kontak kuningan\r\nUkuran ringkas, tepat & portabel - mudah dipakai dan dibawa kemana-mana\r\nDilengkapi dengan terminal pembumian untuk keamanan\r\n', NULL, 22500, NULL, NULL, 1, NULL, '2024-12-15'),
('MEG008', 'Steker Arde 3 Soket dengan Saklar SC-382', 'Uticon', 'Steker T dengan Saklar', 38000, 99, 200, 1, 'Casing terbuat dari bahan polikarbonat yang tahan panas dan berdaya tahan tinggi\r\nTerminal kontak kuningan\r\nUkuran ringkas, tepat & portabel - mudah dipakai dan dibawa kemana-mana\r\nSaklar dengan lampu indikator\r\nDilengkapi dengan terminal pembumian untuk ', NULL, 38000, NULL, NULL, 1, NULL, '2024-12-15'),
('MEG009', 'Steker Arde dengan Saklar Lampu S-228N ', 'Uticon', 'Steker dengan Saklar', 21000, 100, 150, 1, 'Casing terbuat dari bahan polikarbonat yang tahan panas dan berdaya tahan tinggi\r\nTerminal kontak kuningan\r\nInstalasi kabel mudah dengan panel yang mudah dilepas dan terminal yang ditandai dengan jelas\r\nUkuran ringkas, tepat & portabel - mudah dipakai dan', NULL, 21000, NULL, NULL, 1, NULL, '2024-12-15'),
('MEG010', ' Steker Arde dengan Saklar S-2282', 'Uticon', 'Steker dengan Saklar', 24500, 100, 150, 1, 'Casing terbuat dari bahan polikarbonat yang tahan panas dan berdaya tahan tinggi\r\nTerminal kontak kuningan\r\nInstalasi kabel mudah dengan panel yang mudah dilepas dan terminal yang ditandai dengan jelas\r\nUkuran ringkas, tepat & portabel - mudah dipakai dan', NULL, 24500, NULL, NULL, 1, NULL, '2024-12-15'),
('MEG011', 'Stopkontak Arde 2 Soket SC-128', 'Uticon', 'Stopkontak Arde', 17500, 100, 200, 1, 'Casing terbuat dari bahan resin tahan panas dan berdaya tahan tinggi\r\nTerminal kontak kuningan\r\nUkuran ringkas, tepat & portabel - mudah dipakai dan dibawa kemana-mana\r\nDilengkapi dengan terminal pembumian untuk keamanan', NULL, 17500, NULL, NULL, 1, NULL, '2024-12-15'),
('MEG012', 'Stopkontak Arde dengan Saklar ST-118 SWN', 'Uticon', 'Stopkontak Arde dengan Saklar', 29000, 99, 150, 1, 'Casing terbuat dari bahan polikarbonat yang tahan panas dan berdaya tahan tinggi\r\nTerminal kontak kuningan\r\nUkuran ringkas, tepat & portabel - mudah dipakai dan dibawa kemana-mana\r\nSaklar dengan lampu indikator\r\nDilengkapi dengan terminal pembumian untuk ', NULL, 29000, NULL, NULL, 1, NULL, '2024-12-15'),
('MEG013', ' Stopkontak Arde 2 Soket dengan Saklar S-128 SW ', 'Uticon', 'Stopkontak Arde dengan Saklar', 54000, 100, 200, 1, 'Casing terbuat dari bahan polikarbonat yang tahan panas dan berdaya tahan tinggi\r\nTerminal kontak kuningan\r\nDilengkapi lampu indikator pemakaian\r\nUkuran ringkas, tepat & portabel - mudah dipakai dan dibawa kemana-mana\r\nPosisi saklar menurun untuk kenyaman', NULL, 54000, NULL, NULL, 1, NULL, '2024-12-15'),
('MEG014', ' Stopkontak Arde 3 Soket dengan Saklar S-138 SW', 'Uticon', 'Stopkontak Arde dengan Saklar', 76000, 100, 250, 1, 'Casing terbuat dari bahan polikarbonat yang tahan panas dan berdaya tahan tinggi\r\nTerminal kontak kuningan\r\nDilengkapi lampu indikator pemakaian\r\nUkuran ringkas, tepat & portabel - mudah dipakai dan dibawa kemana-mana\r\nPosisi saklar menurun untuk kenyaman', NULL, 76000, NULL, NULL, 1, NULL, '2024-12-15'),
('MEG015', ' Stopkontak Arde 3 in 1 Soket dengan Saklar dan Pengaman Socket S-348 SW', 'Uticon', 'Stopkontak Arde dengan Saklar', 43500, 100, 300, 1, 'Casing terbuat dari bahan polikarbonat yang tahan panas dan berdaya tahan tinggi\r\nTerminal kontak kuningan\r\nDilengkapi lampu indikator pemakaian\r\nUkuran ringkas, tepat & portabel - mudah dipakai dan dibawa kemana-mana\r\nPosisi saklar menurun untuk kenyaman', NULL, 43500, NULL, NULL, 1, NULL, '2024-12-15'),
('MEG016', 'Stopkontak Arde 4 Soket S-448 N', 'Uticon', 'Stopkontak Arde', 32500, 98, 300, 1, 'Casing terbuat dari bahan resin tahan panas dan berdaya tahan tinggi\r\nTerminal kontak kuningan\r\nUkuran ringkas, tepat & portabel - mudah dipakai dan dibawa kemana-mana\r\nDilengkapi dengan terminal pembumian untuk keamanan', NULL, 32500, NULL, NULL, 1, NULL, '2024-12-15'),
('MEG017', 'Stopkontak Arde Portabel ST-118', 'Uticon', 'Stopkontak Portabel', 8000, 99, 100, 1, 'Berbagai metode dan posisi pemasangan untuk disesuaikan dengan kebutuhan anda dan lokasi pemasangan\r\nCasing terbuat dari bahan resin tahan panas dan berdaya tahan tinggi\r\nTerminal kontak kuningan\r\nDilengkapi dengan terminal pembumian untuk keamanan', NULL, 8000, NULL, NULL, 1, NULL, '2024-12-15'),
('MEG018', 'Stopkontak Portabel Arde 2 Soket ST-128  ', 'Uticon', 'Stopkontak Portabel', 11000, 99, 150, 1, 'Berbagai metode dan posisi pemasangan untuk disesuaikan dengan kebutuhan anda dan lokasi pemasangan\r\nCasing terbuat dari bahan resin tahan panas dan berdaya tahan tinggi\r\nTerminal kontak kuningan\r\nDilengkapi dengan terminal pembumian untuk keamanan', NULL, 11000, NULL, NULL, 1, NULL, '2024-12-16'),
('MEG019', ' Stopkontak Portabel Arde 3 Soket ST-138', 'Uticon', 'Stopkontak Portabel', 16000, 100, 200, 1, 'Berbagai metode dan posisi pemasangan untuk disesuaikan dengan kebutuhan anda dan lokasi pemasangan\r\nCasing terbuat dari bahan resin tahan panas dan berdaya tahan tinggi\r\nTerminal kontak kuningan\r\nDilengkapi dengan terminal pembumian untuk keamanan', NULL, 16000, NULL, NULL, 1, NULL, '2024-12-16'),
('MEG020', ' Stopkontak Portabel Arde 4 Soket ST-148', 'Uticon', 'Stopkontak Portabel', 21000, 100, 250, 1, 'Berbagai metode dan posisi pemasangan untuk disesuaikan dengan kebutuhan anda dan lokasi pemasangan\r\nCasing terbuat dari bahan resin tahan panas dan berdaya tahan tinggi\r\nTerminal kontak kuningan\r\nDilengkapi dengan terminal pembumian untuk keamanan', NULL, 21000, NULL, NULL, 1, NULL, '2024-12-16'),
('MEG021', 'Stopkontak Kotak Portabel Arde 4 Soket ST-148S', 'Uticon', 'Stopkontak Portabel', 21000, 100, 250, 1, 'Berbagai metode dan posisi pemasangan untuk disesuaikan dengan kebutuhan anda dan lokasi pemasangan\r\nCasing terbuat dari bahan resin tahan panas dan berdaya tahan tinggi\r\nTerminal kontak kuningan\r\nDilengkapi dengan terminal pembumian untuk keamanan', NULL, 21000, NULL, NULL, 1, NULL, '2024-12-16'),
('MEG022', ' Stopkontak Portabel Arde 5 Soket ST-158', 'Uticon', 'Stopkontak Portabel', 25000, 100, 300, 1, 'Berbagai metode dan posisi pemasangan untuk disesuaikan dengan kebutuhan anda dan lokasi pemasangan\r\nCasing terbuat dari bahan resin tahan panas dan berdaya tahan tinggi\r\nTerminal kontak kuningan\r\nDilengkapi dengan terminal pembumian untuk keamanan', NULL, 25000, NULL, NULL, 1, NULL, '2024-12-16'),
('MEG023', ' Stopkontak Portabel Arde 6 Soket ST-168', 'Uticon', 'Stopkontak Portabel', 30000, 100, 350, 1, 'Berbagai metode dan posisi pemasangan untuk disesuaikan dengan kebutuhan anda dan lokasi pemasangan\r\nCasing terbuat dari bahan resin tahan panas dan berdaya tahan tinggi\r\nTerminal kontak kuningan\r\nDilengkapi dengan terminal pembumian untuk keamanan', NULL, 30000, NULL, NULL, 1, NULL, '2024-12-16'),
('MEG024', 'Stopkontak Portabel Arde dengan Pengaman Soket ST-118 N', 'Uticon', 'Stopkontak Portabel dengan Pengaman Soket', 10000, 100, 100, 1, 'Berbagai metode dan posisi pemasangan untuk disesuaikan dengan kebutuhan anda dan lokasi pemasangan\r\nCasing terbuat dari bahan resin tahan panas dan berdaya tahan tinggi\r\nTerminal kontak kuningan\r\nInstalasi kabel mudah dengan panel yang mudah dilepas dan ', NULL, 10000, NULL, NULL, 1, NULL, '2024-12-16'),
('MEG025', 'Stopkontak Portabel 2 Soket Arde dengan Pengaman Soket ST-128 N', 'Uticon', 'Stopkontak Portabel dengan Pengaman Soket', 25000, 100, 200, 1, 'Berbagai metode dan posisi pemasangan untuk disesuaikan dengan kebutuhan anda dan lokasi pemasangan\nCasing terbuat dari bahan resin tahan panas dan berdaya tahan tinggi\nTerminal kontak kuningan\nInstalasi kabel mudah dengan panel yang mudah dilepas dan ter', NULL, 25000, NULL, NULL, 1, NULL, '2024-12-16'),
('MEG026', 'Stopkontak Portabel 3 Soket Arde dengan Pengaman Soket ST-138 N', 'Uticon', 'Stopkontak Portabel dengan Pengaman Soket', 25000, 100, 250, 1, 'Berbagai metode dan posisi pemasangan untuk disesuaikan dengan kebutuhan anda dan lokasi pemasangan\r\nCasing terbuat dari bahan resin tahan panas dan berdaya tahan tinggi\r\nTerminal kontak kuningan\r\nInstalasi kabel mudah dengan panel yang mudah dilepas dan ', NULL, 25000, NULL, NULL, 1, NULL, '2024-12-16'),
('MEG027', 'Stopkontak Portabel 4 Soket Arde dengan Pengaman Soket ST-148 N', 'Uticon', 'Stopkontak Portabel dengan Pengaman Soket', 30000, 100, 300, 1, 'Berbagai metode dan posisi pemasangan untuk disesuaikan dengan kebutuhan anda dan lokasi pemasangan\r\nCasing terbuat dari bahan resin tahan panas dan berdaya tahan tinggi\r\nTerminal kontak kuningan\r\nInstalasi kabel mudah dengan panel yang mudah dilepas dan ', NULL, 30000, NULL, NULL, 1, NULL, '2024-12-16'),
('MEG028', 'Stopkontak Portabel 5 Soket Arde dengan Pengaman Soket ST-158 N', 'Uticon', 'Stopkontak Portabel dengan Pengaman Soket', 37000, 100, 300, 1, 'Berbagai metode dan posisi pemasangan untuk disesuaikan dengan kebutuhan anda dan lokasi pemasangan\r\nCasing terbuat dari bahan resin tahan panas dan berdaya tahan tinggi\r\nTerminal kontak kuningan\r\nInstalasi kabel mudah dengan panel yang mudah dilepas dan ', NULL, 37000, NULL, NULL, 1, NULL, '2024-12-16'),
('MEG029', 'Stopkontak Portabel 6 Soket Arde dengan Pengaman Soket ST-168 N', 'Uticon', 'Stopkontak Portabel dengan Pengaman Soket', 41000, 100, 400, 1, 'Berbagai metode dan posisi pemasangan untuk disesuaikan dengan kebutuhan anda dan lokasi pemasangan\r\nCasing terbuat dari bahan resin tahan panas dan berdaya tahan tinggi\r\nTerminal kontak kuningan\r\nInstalasi kabel mudah dengan panel yang mudah dilepas dan ', NULL, 41000, NULL, NULL, 1, NULL, '2024-12-16'),
('MEG030', 'Stopkontak Portabel 8 Soket Arde dengan Pengaman Soket ST-188 N', 'Uticon', 'Stopkontak Portabel dengan Pengaman Soket', 62500, 100, 500, 1, 'Berbagai metode dan posisi pemasangan untuk disesuaikan dengan kebutuhan anda dan lokasi pemasangan\r\nCasing terbuat dari bahan resin tahan panas dan berdaya tahan tinggi\r\nTerminal kontak kuningan\r\nInstalasi kabel mudah dengan panel yang mudah dilepas dan ', NULL, 62500, NULL, NULL, 1, NULL, '2024-12-16'),
('MEG031', 'Stopkontak Portabel 3 Soket Arde dengan Pengaman Soket +Saklar + Panel ST-1382 NC', 'Uticon', 'Stopkontak Portabel dengan Pengaman Soket', 38000, 100, 300, 1, 'Berbagai metode dan posisi pemasangan untuk disesuaikan dengan kebutuhan anda dan lokasi pemasangan\r\nCasing terbuat dari bahan resin tahan panas dan berdaya tahan tinggi\r\nTerminal kontak kuningan\r\nInstalasi kabel mudah dengan panel yang mudah dilepas dan ', NULL, 38000, NULL, NULL, 1, NULL, '2024-12-16'),
('MEG032', ' Stopkontak Portabel 4 Soket Arde dengan Pengaman Soket +Saklar + Panel ST-1482 NC', 'Uticon', 'Stopkontak Portabel dengan Pengaman Soket', 42500, 100, 350, 1, 'Berbagai metode dan posisi pemasangan untuk disesuaikan dengan kebutuhan anda dan lokasi pemasangan\r\nCasing terbuat dari bahan resin tahan panas dan berdaya tahan tinggi\r\nTerminal kontak kuningan\r\nInstalasi kabel mudah dengan panel yang mudah dilepas dan ', NULL, 42500, NULL, NULL, 1, NULL, '2024-12-16'),
('MEG033', 'Stopkontak Portabel 5 Soket Arde dengan Pengaman Soket +Saklar + Panel ST-1582 NC', 'Uticon', 'Stopkontak Portabel dengan Pengaman Soket', 48500, 100, 400, 1, 'Berbagai metode dan posisi pemasangan untuk disesuaikan dengan kebutuhan anda dan lokasi pemasangan\r\nCasing terbuat dari bahan resin tahan panas dan berdaya tahan tinggi\r\nTerminal kontak kuningan\r\nInstalasi kabel mudah dengan panel yang mudah dilepas dan ', NULL, 48500, NULL, NULL, 1, NULL, '2024-12-16'),
('MEG034', ' Stopkontak Portabel 6 Soket Arde dengan Pengaman Soket +Saklar + Panel ST-1682 NC', 'Uticon', 'Stopkontak Portabel dengan Pengaman Soket', 55500, 100, 500, 1, 'Berbagai metode dan posisi pemasangan untuk disesuaikan dengan kebutuhan anda dan lokasi pemasangan\r\nCasing terbuat dari bahan resin tahan panas dan berdaya tahan tinggi\r\nTerminal kontak kuningan\r\nInstalasi kabel mudah dengan panel yang mudah dilepas dan ', NULL, 55500, NULL, NULL, 1, NULL, '2024-12-16'),
('MEG035', 'Stopkontak Portabel 4 Soket Arde dengan Pengaman Soket + Saklar Tersndiri + Panel ST-1485 SN', 'Uticon', 'Stopkontak Portabel dengan Pengaman Soket', 96000, 100, 250, 1, 'Berbagai metode dan posisi pemasangan untuk disesuaikan dengan kebutuhan anda dan lokasi pemasangan\r\nCasing terbuat dari bahan polikarbonat yang tahan panas dan berdaya tahan tinggi\r\nTerminal kontak kuningan\r\nInstalasi kabel mudah dengan panel yang mudah ', NULL, 96000, NULL, NULL, 1, NULL, '2024-12-16'),
('MEG036', 'Stopkontak Portabel 6 Soket Arde dengan Pengaman Soket + Saklar Tersndiri + Panel ST-1685 SN', 'Uticon', 'Stopkontak Portabel dengan Pengaman Soket', 135500, 100, 500, 1, 'Berbagai metode dan posisi pemasangan untuk disesuaikan dengan kebutuhan anda dan lokasi pemasangan\r\nCasing terbuat dari bahan polikarbonat yang tahan panas dan berdaya tahan tinggi\r\nTerminal kontak kuningan\r\nInstalasi kabel mudah dengan panel yang mudah ', NULL, 135500, NULL, NULL, 1, NULL, '2024-12-16'),
('MEG037', 'Stop Kontak 3 Soket dengan Kabel 1,5 Meter ST-138 C', 'Uticon', 'Stop Kontak dengan Kabel 1,5 Meter', 43000, 100, 200, 1, 'Spesifikasi:\r\n✅ Safety, Quality, Durability\r\n✅ 16A / 250V\r\n✅ Pemasangan mudah dan lebih praktis\r\n✅ Material berkualitas dan tahan panas\r\n✅ Kabel 1.5 meter\r\n✅ SNI', NULL, 43000, NULL, NULL, 1, NULL, '2024-12-16'),
('MEG038', 'Stop Kontak 4 Soket dengan Kabel 1,5 Meter ST-148 C', 'Uticon', 'Stop Kontak dengan Kabel 1,5 Meter', 48000, 100, 350, 1, 'Spesifikasi:\r\n✅ Safety, Quality, Durability\r\n✅ 16A / 250V\r\n✅ Pemasangan mudah dan lebih praktis\r\n✅ Material berkualitas dan tahan panas\r\n✅ Kabel 1.5 meter\r\n✅ SNI', NULL, 48000, NULL, NULL, 1, NULL, '2024-12-16'),
('MEG039', 'Stop Kontak Kotak 4 Soket dengan Kabel 1,5 Meter ST-148 SC', 'Uticon', 'Stop Kontak dengan Kabel 1,5 Meter', 52000, 100, 350, 1, 'Spesifikasi:\r\n✅ Safety, Quality, Durability\r\n✅ 16A / 250V\r\n✅ Pemasangan mudah dan lebih praktis\r\n✅ Material berkualitas dan tahan panas\r\n✅ Kabel 1.5 meter\r\n✅ SNI', NULL, 52000, NULL, NULL, 1, NULL, '2024-12-16'),
('MEG040', 'Stop Kontak 5 Soket dengan Kabel 1,5 Meter ST-158 C', 'Uticon', 'Stop Kontak dengan Kabel 1,5 Meter', 53000, 100, 400, 1, 'Spesifikasi:\r\n✅ Safety, Quality, Durability\r\n✅ 16A / 250V\r\n✅ Pemasangan mudah dan lebih praktis\r\n✅ Material berkualitas dan tahan panas\r\n✅ Kabel 1.5 meter\r\n✅ SNI', NULL, 53000, NULL, NULL, 1, NULL, '2024-12-16'),
('MEG041', ' Stop Kontak 6 Soket dengan Kabel 1,5 Meter ST-168 C', 'Uticon', 'Stop Kontak dengan Kabel 1,5 Meter', 57000, 100, 500, 1, 'Spesifikasi:\r\n✅ Safety, Quality, Durability\r\n✅ 16A / 250V\r\n✅ Pemasangan mudah dan lebih praktis\r\n✅ Material berkualitas dan tahan panas\r\n✅ Kabel 1.5 meter\r\n✅ SNI', NULL, 57000, NULL, NULL, 1, NULL, '2024-12-16'),
('MEG042', ' Stop Kontak Kabel 1,5 Meter 2 Soket dengan Pengaman Soket dan Saklar ST-1282 SW', 'Uticon', 'Stop Kontak Kabel 1,5 Meter dengan Saklar dan Pengaman Soket', 78000, 100, 250, 1, 'Berbagai metode dan posisi pemasangan untuk disesuaikan dengan kebutuhan anda dan lokasi pemasangan\r\nCasing terbuat dari bahan polikarbonat yang tahan panas dan berdaya tahan tinggi\r\nTerminal kontak kuningan\r\nKabel 1.5M H05VV-F 3x0.75 Sqmm\r\nKabel berkuali', NULL, 78000, NULL, NULL, 1, NULL, '2024-12-16'),
('MEG043', 'Stop Kontak Kabel 1,5 Meter 3 Soket dengan Pengaman Soket dan Saklar ST-1382 SW', 'Uticon', 'Stop Kontak Kabel 1,5 Meter dengan Saklar dan Pengaman Soket', 100000, 100, 350, 1, 'Berbagai metode dan posisi pemasangan untuk disesuaikan dengan kebutuhan anda dan lokasi pemasangan\r\nCasing terbuat dari bahan polikarbonat yang tahan panas dan berdaya tahan tinggi\r\nTerminal kontak kuningan\r\nKabel 1.5M H05VV-F 3x0.75 Sqmm\r\nKabel berkuali', NULL, 100000, NULL, NULL, 1, NULL, '2024-12-16'),
('MEG044', 'Stop Kontak Kabel 1,5 Meter 4 Soket dengan Pengaman Soket dan Saklar ST-1482 SW', 'Uticon', 'Stop Kontak Kabel 1,5 Meter dengan Saklar dan Pengaman Soket', 120000, 100, 400, 1, 'Berbagai metode dan posisi pemasangan untuk disesuaikan dengan kebutuhan anda dan lokasi pemasangan\r\nCasing terbuat dari bahan polikarbonat yang tahan panas dan berdaya tahan tinggi\r\nTerminal kontak kuningan\r\nKabel 1.5M H05VV-F 3x0.75 Sqmm\r\nKabel berkuali', NULL, 120000, NULL, NULL, 1, NULL, '2024-12-16'),
('MEG045', ' Stop Kontak Kabel 1,5 Meter 5 Soket dengan Pengaman Soket dan Saklar ST-1582 SW', 'Uticon', 'Stop Kontak Kabel 1,5 Meter dengan Saklar dan Pengaman Soket', 140000, 100, 400, 1, 'Berbagai metode dan posisi pemasangan untuk disesuaikan dengan kebutuhan anda dan lokasi pemasangan\r\nCasing terbuat dari bahan polikarbonat yang tahan panas dan berdaya tahan tinggi\r\nTerminal kontak kuningan\r\nKabel 1.5M H05VV-F 3x0.75 Sqmm\r\nKabel berkuali', NULL, 140000, NULL, NULL, 1, NULL, '2024-12-16'),
('MEG046', 'Stop Kontak Kabel 1,5 Meter 6 Soket dengan Pengaman Soket dan Saklar ST-1682 SW', 'Uticon', 'Stop Kontak Kabel 1,5 Meter dengan Saklar dan Pengaman Soket', 160000, 100, 450, 1, 'Berbagai metode dan posisi pemasangan untuk disesuaikan dengan kebutuhan anda dan lokasi pemasangan\r\nCasing terbuat dari bahan polikarbonat yang tahan panas dan berdaya tahan tinggi\r\nTerminal kontak kuningan\r\nKabel 1.5M H05VV-F 3x0.75 Sqmm\r\nKabel berkuali', NULL, 160000, NULL, NULL, 1, NULL, '2024-12-16'),
('MEG047', 'Stop Kontak Kabel 1,5 Meter 3 Soket dengan Pengaman Soket dan Saklar ST-8382 SW', 'Uticon', 'Stop Kontak Kabel 1,5 Meter dengan Saklar dan Pengaman Soket', 100000, 100, 350, 1, 'Berbagai metode dan posisi pemasangan untuk disesuaikan dengan kebutuhan anda dan lokasi pemasangan\r\nCasing terbuat dari bahan resin tahan panas dan berdaya tahan tinggi\r\nTerminal kontak kuningan\r\nKabel 1.5M H05VV-F 3x0.75 Sqmm\r\nKabel berkualitas tinggi d', NULL, 100000, NULL, NULL, 1, NULL, '2024-12-16'),
('MEG048', 'Stop Kontak Kabel 1,5 Meter 4 Soket dengan Pengaman Soket dan Saklar ST-8482 SW', 'Uticon', 'Stop Kontak Kabel 1,5 Meter dengan Saklar dan Pengaman Soket', 120000, 99, 350, 1, 'Berbagai metode dan posisi pemasangan untuk disesuaikan dengan kebutuhan anda dan lokasi pemasangan\r\nCasing terbuat dari bahan resin tahan panas dan berdaya tahan tinggi\r\nTerminal kontak kuningan\r\nKabel 1.5M H05VV-F 3x0.75 Sqmm\r\nKabel berkualitas tinggi d', NULL, 120000, NULL, NULL, 1, NULL, '2024-12-16'),
('MEG049', ' Stop Kontak Kabel 1,5 Meter 5 Soket dengan Pengaman Soket dan Saklar ST-8582 SW', 'Uticon', 'Stop Kontak Kabel 1,5 Meter dengan Saklar dan Pengaman Soket', 140000, 100, 400, 1, 'Berbagai metode dan posisi pemasangan untuk disesuaikan dengan kebutuhan anda dan lokasi pemasangan\r\nCasing terbuat dari bahan resin tahan panas dan berdaya tahan tinggi\r\nTerminal kontak kuningan\r\nKabel 1.5M H05VV-F 3x0.75 Sqmm\r\nKabel berkualitas tinggi d', NULL, 140000, NULL, NULL, 1, NULL, '2024-12-16'),
('MEG050', 'Stop Kontak Kabel 1,5 Meter 6 Soket dengan Pengaman Soket dan Saklar ST-8682 SW', 'Uticon', 'Stop Kontak Kabel 1,5 Meter dengan Saklar dan Pengaman Soket', 160000, 100, 500, 1, 'Berbagai metode dan posisi pemasangan untuk disesuaikan dengan kebutuhan anda dan lokasi pemasangan\r\nCasing terbuat dari bahan resin tahan panas dan berdaya tahan tinggi\r\nTerminal kontak kuningan\r\nKabel 1.5M H05VV-F 3x0.75 Sqmm\r\nKabel berkualitas tinggi d', NULL, 160000, NULL, NULL, 1, NULL, '2024-12-16'),
('MEG051', 'Stop Kontak Kabel 3 Meter 3 Soket dengan Pengaman Soket dan Saklar ST-8382 SW', 'Uticon', 'Stop Kontak Kabel 3 Meter dengan Saklar dan Pengaman Soket', 115000, 100, 250, 1, 'Berbagai metode dan posisi pemasangan untuk disesuaikan dengan kebutuhan anda dan lokasi pemasangan\r\nCasing terbuat dari bahan resin tahan panas dan berdaya tahan tinggi\r\nTerminal kontak kuningan\r\nKabel 1.5M H05VV-F 3x0.75 Sqmm\r\nKabel berkualitas tinggi d', NULL, 115000, NULL, NULL, 1, NULL, '2024-12-16'),
('MEG052', 'Stop Kontak Kabel 3 Meter 4 Soket dengan Pengaman Soket dan Saklar ST-8482 SW', 'Uticon', 'Stop Kontak Kabel 3 Meter dengan Saklar dan Pengaman Soket', 133500, 100, 400, 1, 'Berbagai metode dan posisi pemasangan untuk disesuaikan dengan kebutuhan anda dan lokasi pemasangan\r\nCasing terbuat dari bahan resin tahan panas dan berdaya tahan tinggi\r\nTerminal kontak kuningan\r\nKabel 1.5M H05VV-F 3x0.75 Sqmm\r\nKabel berkualitas tinggi d', NULL, 133500, NULL, NULL, 1, NULL, '2024-12-16'),
('MEG053', 'Stop Kontak Kabel 3 Meter 5 Soket dengan Pengaman Soket dan Saklar ST-8582 SW', 'Uticon', 'Stop Kontak Kabel 3 Meter dengan Saklar dan Pengaman Soket', 154000, 100, 400, 1, 'Berbagai metode dan posisi pemasangan untuk disesuaikan dengan kebutuhan anda dan lokasi pemasangan\r\nCasing terbuat dari bahan resin tahan panas dan berdaya tahan tinggi\r\nTerminal kontak kuningan\r\nKabel 1.5M H05VV-F 3x0.75 Sqmm\r\nKabel berkualitas tinggi d', NULL, 154000, NULL, NULL, 1, NULL, '2024-12-16'),
('MEG054', 'Stop Kontak Kabel 3 Meter 6 Soket dengan Pengaman Soket dan Saklar ST-8682 SW', 'Uticon', 'Stop Kontak Kabel 3 Meter dengan Saklar dan Pengaman Soket', 174000, 100, 500, 1, 'Berbagai metode dan posisi pemasangan untuk disesuaikan dengan kebutuhan anda dan lokasi pemasangan\r\nCasing terbuat dari bahan resin tahan panas dan berdaya tahan tinggi\r\nTerminal kontak kuningan\r\nKabel 1.5M H05VV-F 3x0.75 Sqmm\r\nKabel berkualitas tinggi d', NULL, 174000, NULL, NULL, 1, NULL, '2024-12-16'),
('MEG055', ' Stop Kontak Donat / Bola Kabel 1,5 Meter 3 Soket dengan Pengaman Soket dan Saklar ST-1388 (Abu - Abu)', 'Uticon', 'Stop Kontak Kabel 1,5 Meter dengan Saklar dan Pengaman Soket', 65000, 100, 250, 1, 'Berbagai metode dan posisi pemasangan untuk disesuaikan dengan kebutuhan anda dan lokasi pemasangan\r\nCasing terbuat dari bahan resin tahan panas dan berdaya tahan tinggi\r\nTerminal kontak kuningan\r\nKabel 1.5M H05VV-F 3x0.75 Sqmm\r\nKabel berkualitas tinggi d', NULL, 65000, NULL, NULL, 1, NULL, '2024-12-16'),
('MEG056', 'Stop Kontak Donat / Bola Kabel 1,5 Meter 3 Soket dengan Pengaman Soket dan Saklar ST-1388 (Coklat)', 'Uticon', 'Stop Kontak Kabel 1,5 Meter dengan Saklar dan Pengaman Soket', 65000, 100, 250, 1, 'Berbagai metode dan posisi pemasangan untuk disesuaikan dengan kebutuhan anda dan lokasi pemasangan\r\nCasing terbuat dari bahan resin tahan panas dan berdaya tahan tinggi\r\nTerminal kontak kuningan\r\nKabel 1.5M H05VV-F 3x0.75 Sqmm\r\nKabel berkualitas tinggi d', NULL, 65000, NULL, NULL, 1, NULL, '2024-12-16'),
('MEG057', 'Stop Kontak Donat / Bola Kabel 1,5 Meter 4 Soket dengan Pengaman Soket dan Saklar ST-1488 (Abu - Abu)', 'Uticon', 'Stop Kontak Kabel 1,5 Meter dengan Saklar dan Pengaman Soket', 70000, 100, 250, 1, 'Berbagai metode dan posisi pemasangan untuk disesuaikan dengan kebutuhan anda dan lokasi pemasangan\r\nCasing terbuat dari bahan resin tahan panas dan berdaya tahan tinggi\r\nTerminal kontak kuningan\r\nKabel 1.5M H05VV-F 3x0.75 Sqmm\r\nKabel berkualitas tinggi d', NULL, 70000, NULL, NULL, 1, NULL, '2024-12-16'),
('MEG058', 'Stop Kontak Donat / Bola Kabel 1,5 Meter 4 Soket dengan Pengaman Soket dan Saklar ST-1488 (Coklat)', 'Uticon', 'Stop Kontak Kabel 1,5 Meter dengan Saklar dan Pengaman Soket', 70000, 100, 350, 1, 'Berbagai metode dan posisi pemasangan untuk disesuaikan dengan kebutuhan anda dan lokasi pemasangan\r\nCasing terbuat dari bahan resin tahan panas dan berdaya tahan tinggi\r\nTerminal kontak kuningan\r\nKabel 1.5M H05VV-F 3x0.75 Sqmm\r\nKabel berkualitas tinggi d', NULL, 70000, NULL, NULL, 1, NULL, '2024-12-16'),
('MEG059', 'Stop Kontak Kabel 1,5 Meter 3 Soket dengan Pengaman Soket dan Saklar ST-1382', 'Uticon', 'Stop Kontak Kabel 1,5 Meter dengan Saklar dan Pengaman Soket', 67000, 100, 250, 1, 'Berbagai metode dan posisi pemasangan untuk disesuaikan dengan kebutuhan anda dan lokasi pemasangan\r\nCasing terbuat dari bahan resin tahan panas dan berdaya tahan tinggi\r\nTerminal kontak kuningan\r\nKabel 1.5M H05VV-F 3x0.75 Sqmm\r\nKabel berkualitas tinggi d', NULL, 67000, NULL, NULL, 1, NULL, '2024-12-16'),
('MEG060', 'Stop Kontak Kabel 1,5 Meter 4 Soket dengan Pengaman Soket dan Saklar ST-1482', 'Uticon', 'Stop Kontak Kabel 1,5 Meter dengan Saklar dan Pengaman Soket', 70000, 100, 350, 1, 'Berbagai metode dan posisi pemasangan untuk disesuaikan dengan kebutuhan anda dan lokasi pemasangan\r\nCasing terbuat dari bahan resin tahan panas dan berdaya tahan tinggi\r\nTerminal kontak kuningan\r\nKabel 1.5M H05VV-F 3x0.75 Sqmm\r\nKabel berkualitas tinggi d', NULL, 70000, NULL, NULL, 1, NULL, '2024-12-16'),
('MEG061', 'Stop Kontak Kabel 1,5 Meter 5 Soket dengan Pengaman Soket dan Saklar ST-1582', 'Uticon', 'Stop Kontak Kabel 1,5 Meter dengan Saklar dan Pengaman Soket', 80000, 100, 350, 1, 'Berbagai metode dan posisi pemasangan untuk disesuaikan dengan kebutuhan anda dan lokasi pemasangan\r\nCasing terbuat dari bahan resin tahan panas dan berdaya tahan tinggi\r\nTerminal kontak kuningan\r\nKabel 1.5M H05VV-F 3x0.75 Sqmm\r\nKabel berkualitas tinggi d', NULL, 80000, NULL, NULL, 1, NULL, '2024-12-16'),
('MEG062', 'Stop Kontak Kabel 1,5 Meter 6 Soket dengan Pengaman Soket dan Saklar ST-1682', 'Uticon', 'Stop Kontak Kabel 1,5 Meter dengan Saklar dan Pengaman Soket', 85000, 100, 450, 1, 'Berbagai metode dan posisi pemasangan untuk disesuaikan dengan kebutuhan anda dan lokasi pemasangan\r\nCasing terbuat dari bahan resin tahan panas dan berdaya tahan tinggi\r\nTerminal kontak kuningan\r\nKabel 1.5M H05VV-F 3x0.75 Sqmm\r\nKabel berkualitas tinggi d', NULL, 85000, NULL, NULL, 1, NULL, '2024-12-16'),
('MEG063', 'Stop Kontak Kabel 1,5 Meter 3 Soket dengan Pengaman Soket dan Saklar ST-2388 (Putih)', 'Uticon', 'Stop Kontak Kabel 1,5 Meter dengan Saklar dan Pengaman Soket', 72000, 100, 250, 1, 'Berbagai metode dan posisi pemasangan untuk disesuaikan dengan kebutuhan anda dan lokasi pemasangan\r\nCasing terbuat dari bahan resin tahan panas dan berdaya tahan tinggi\r\nTerminal kontak kuningan\r\nKabel 1.5M H05VV-F 3x0.75 Sqmm\r\nKabel berkualitas tinggi d', NULL, 72000, NULL, NULL, 1, NULL, '2024-12-16'),
('MEG064', 'Stop Kontak Kabel 3 Meter 3 Soket dengan Pengaman Soket dan Saklar ST-2388 (Putih)', 'Uticon', 'Stop Kontak Kabel 3 Meter dengan Saklar dan Pengaman Soket', 92500, 100, 250, 1, 'Berbagai metode dan posisi pemasangan untuk disesuaikan dengan kebutuhan anda dan lokasi pemasangan\r\nCasing terbuat dari bahan resin tahan panas dan berdaya tahan tinggi\r\nTerminal kontak kuningan\r\nKabel 1.5M H05VV-F 3x0.75 Sqmm\r\nKabel berkualitas tinggi d', NULL, 92500, NULL, NULL, 1, NULL, '2024-12-16'),
('MEG065', 'Stop Kontak Kabel 1,5 Meter 4 Soket dengan Pengaman Soket dan Saklar ST-2488 (Putih)', 'Uticon', 'Stop Kontak Kabel 1,5 Meter dengan Saklar dan Pengaman Soket', 76500, 100, 350, 1, 'Berbagai metode dan posisi pemasangan untuk disesuaikan dengan kebutuhan anda dan lokasi pemasangan\r\nCasing terbuat dari bahan resin tahan panas dan berdaya tahan tinggi\r\nTerminal kontak kuningan\r\nKabel 1.5M H05VV-F 3x0.75 Sqmm\r\nKabel berkualitas tinggi d', NULL, 76500, NULL, NULL, 1, NULL, '2024-12-16'),
('MEG066', ' Stop Kontak Kabel 3 Meter 4 Soket dengan Pengaman Soket dan Saklar ST-2488 (Putih)', 'Uticon', 'Stop Kontak Kabel 3 Meter dengan Saklar dan Pengaman Soket', 100000, 99, 350, 1, 'Berbagai metode dan posisi pemasangan untuk disesuaikan dengan kebutuhan anda dan lokasi pemasangan\r\nCasing terbuat dari bahan resin tahan panas dan berdaya tahan tinggi\r\nTerminal kontak kuningan\r\nKabel 1.5M H05VV-F 3x0.75 Sqmm\r\nKabel berkualitas tinggi d', NULL, 100000, NULL, NULL, 1, NULL, '2024-12-16'),
('MEG067', 'Stop Kontak Kabel 1,5 Meter 5 Soket dengan Pengaman Soket dan Saklar ST-2588 (Putih)', 'Uticon', 'Stop Kontak Kabel 1,5 Meter dengan Saklar dan Pengaman Soket', 85000, 100, 350, 1, 'Berbagai metode dan posisi pemasangan untuk disesuaikan dengan kebutuhan anda dan lokasi pemasangan\r\nCasing terbuat dari bahan resin tahan panas dan berdaya tahan tinggi\r\nTerminal kontak kuningan\r\nKabel 1.5M H05VV-F 3x0.75 Sqmm\r\nKabel berkualitas tinggi d', NULL, 85000, NULL, NULL, 1, NULL, '2024-12-16'),
('MEG068', ' Stop Kontak Kabel 3 Meter 5 Soket dengan Pengaman Soket dan Saklar ST-2588 (Putih)', 'Uticon', 'Stop Kontak Kabel 3 Meter dengan Saklar dan Pengaman Soket', 105000, 100, 350, 1, 'Berbagai metode dan posisi pemasangan untuk disesuaikan dengan kebutuhan anda dan lokasi pemasangan\r\nCasing terbuat dari bahan resin tahan panas dan berdaya tahan tinggi\r\nTerminal kontak kuningan\r\nKabel 1.5M H05VV-F 3x0.75 Sqmm\r\nKabel berkualitas tinggi d', NULL, 105000, NULL, NULL, 1, NULL, '2024-12-16'),
('MEG069', 'Stop Kontak Kabel 1,5 Meter 6 Soket dengan Pengaman Soket dan Saklar ST-2688 (Putih)', 'Uticon', 'Stop Kontak Kabel 1,5 Meter dengan Saklar dan Pengaman Soket', 92000, 100, 400, 1, 'Berbagai metode dan posisi pemasangan untuk disesuaikan dengan kebutuhan anda dan lokasi pemasangan\r\nCasing terbuat dari bahan resin tahan panas dan berdaya tahan tinggi\r\nTerminal kontak kuningan\r\nKabel 1.5M H05VV-F 3x0.75 Sqmm\r\nKabel berkualitas tinggi d', NULL, 92000, NULL, NULL, 1, NULL, '2024-12-16'),
('MEG070', 'Stop Kontak Kabel 3 Meter 6 Soket dengan Pengaman Soket dan Saklar ST-2688 (Putih)', 'Uticon', 'Stop Kontak Kabel 3 Meter dengan Saklar dan Pengaman Soket', 115000, 100, 500, 1, 'Berbagai metode dan posisi pemasangan untuk disesuaikan dengan kebutuhan anda dan lokasi pemasangan\r\nCasing terbuat dari bahan resin tahan panas dan berdaya tahan tinggi\r\nTerminal kontak kuningan\r\nKabel 1.5M H05VV-F 3x0.75 Sqmm\r\nKabel berkualitas tinggi d', NULL, 115000, NULL, NULL, 1, NULL, '2024-12-16'),
('MEG071', 'Stop Kontak Kotak Kabel 1,5 Meter 4 Soket dengan Pengaman Soket dan Saklar ST-1468', 'Uticon', 'Stop Kontak Kabel 1,5 Meter dengan Saklar dan Pengaman Soket', 70000, 100, 350, 1, 'Berbagai metode dan posisi pemasangan untuk disesuaikan dengan kebutuhan anda dan lokasi pemasangan\r\nCasing terbuat dari bahan resin tahan panas dan berdaya tahan tinggi\r\nTerminal kontak kuningan\r\nKabel 1.5M H05VV-F 3x0.75 Sqmm\r\nKabel berkualitas tinggi d', NULL, 70000, NULL, NULL, 1, NULL, '2024-12-16'),
('MEG072', 'Stop Kontak Kotak Kabel 1,5 Meter 6 Soket dengan Pengaman Soket dan Saklar ST-1668', 'Uticon', 'Stop Kontak Kabel 1,5 Meter dengan Saklar dan Pengaman Soket', 80000, 100, 350, 1, 'Berbagai metode dan posisi pemasangan untuk disesuaikan dengan kebutuhan anda dan lokasi pemasangan\r\nCasing terbuat dari bahan resin tahan panas dan berdaya tahan tinggi\r\nTerminal kontak kuningan\r\nKabel 1.5M H05VV-F 3x0.75 Sqmm\r\nKabel berkualitas tinggi d', NULL, 80000, NULL, NULL, 1, NULL, '2024-12-16'),
('MEG073', 'Stop Kontak UFO Kabel 4 Meter 6 Soket dengan Pengaman Soket ST-148 CR (Merah)', 'Uticon', 'Stop Kontak Kabel 4 Meter dengan Pengaman Soket', 105000, 100, 500, 1, 'Casing terbuat dari bahan resin tahan panas dan berdaya tahan tinggi\r\nTerminal kontak kuningan\r\nKabel 4M H05VV-F 3x0.75 Sqmm\r\nKabel berkualitas tinggi dengan standar Internasional & SNI\r\nDilengkapi lampu indikator pemakaian\r\nDilengkapi perangkat penutup s', NULL, 105000, NULL, NULL, 1, NULL, '2024-12-16'),
('MEG074', ' Stop Kontak UFO Kabel 4 Meter 6 Soket dengan Pengaman Soket ST-148 CR (Gading)', 'Uticon', 'Stop Kontak Kabel 4 Meter dengan Pengaman Soket', 150000, 100, 500, 1, 'Casing terbuat dari bahan resin tahan panas dan berdaya tahan tinggi\r\nTerminal kontak kuningan\r\nKabel 4M H05VV-F 3x0.75 Sqmm\r\nKabel berkualitas tinggi dengan standar Internasional & SNI\r\nDilengkapi lampu indikator pemakaian\r\nDilengkapi perangkat penutup s', NULL, 150000, NULL, NULL, 1, NULL, '2024-12-16'),
('MEG075', ' Stop Kontak UFO Kabel 4 Meter 6 Soket dengan Pengaman Soket ST-148 CR (Hitam)', 'Uticon', 'Stop Kontak Kabel 4 Meter dengan Pengaman Soket', 105000, 100, 500, 1, 'Casing terbuat dari bahan resin tahan panas dan berdaya tahan tinggi\r\nTerminal kontak kuningan\r\nKabel 4M H05VV-F 3x0.75 Sqmm\r\nKabel berkualitas tinggi dengan standar Internasional & SNI\r\nDilengkapi lampu indikator pemakaian\r\nDilengkapi perangkat penutup s', NULL, 105000, NULL, NULL, 1, NULL, '2024-12-16'),
('MEG076', 'Stop Kontak UFO Kabel 4 Meter 6 Soket dengan Pengaman Soket ST-148 CR (Biru)', 'Uticon', 'Stop Kontak Kabel 4 Meter dengan Pengaman Soket', 105000, 100, 500, 1, 'Casing terbuat dari bahan resin tahan panas dan berdaya tahan tinggi\r\nTerminal kontak kuningan\r\nKabel 4M H05VV-F 3x0.75 Sqmm\r\nKabel berkualitas tinggi dengan standar Internasional & SNI\r\nDilengkapi lampu indikator pemakaian\r\nDilengkapi perangkat penutup s', NULL, 105000, NULL, NULL, 1, NULL, '2024-12-16'),
('MEG077', 'Kabel Gulung Mini 6 Meter dengan Pengaman Soket MCR-2806', 'Uticon', 'Kabel Gulung 6 Meter dengan Pengaman Soket', 160000, 99, 600, 1, 'Casing terbuat dari bahan resin tahan panas dan berdaya tahan tinggi\r\nTerminal kontak kuningan\r\nKabel 6M H05VV-F 3x0.75 Sqmm\r\nKabel berkualitas tinggi dengan standar Internasional & SNI\r\nDilengkapi lampu indikator pemakaian\r\nDilengkapi perangkat penutup s', NULL, 160000, NULL, NULL, 1, NULL, '2024-12-16'),
('MEG078', 'Kabel Gulung 8 Meter dengan Pengaman Soket CR-2808', 'Uticon', 'Kabel Gulung 8 Meter dengan Pengaman Soket', 200000, 98, 2000, 1, 'Casing terbuat dari bahan resin tahan panas dan berdaya tahan tinggi\r\nTerminal kontak kuningan\r\nKabel 6M H05VV-F 3x0.75 Sqmm\r\nKabel berkualitas tinggi dengan standar Internasional & SNI\r\nDilengkapi lampu indikator pemakaian\r\nDilengkapi perangkat penutup s', NULL, 200000, NULL, NULL, 1, NULL, '2024-12-16'),
('MEG079', 'Kabel Gulung 10 Meter dengan Pengaman Soket CR-2810', 'Uticon', 'Kabel Gulung 10 Meter dengan Pengaman Soket', 225000, 99, 3000, 1, 'Casing terbuat dari bahan resin tahan panas dan berdaya tahan tinggi\r\nTerminal kontak kuningan\r\nKabel 6M H05VV-F 3x0.75 Sqmm\r\nKabel berkualitas tinggi dengan standar Internasional & SNI\r\nDilengkapi lampu indikator pemakaian\r\nDilengkapi perangkat penutup s', NULL, 225000, NULL, NULL, 1, NULL, '2024-12-16'),
('MEG080', 'Kabel Gulung 15 Meter dengan Pengaman Soket CR-3815', 'Uticon', 'Kabel Gulung 15 Meter dengan Pengaman Soket', 300000, 100, 5000, 1, 'Casing terbuat dari bahan resin tahan panas dan berdaya tahan tinggi\r\nTerminal kontak kuningan\r\nKabel 6M H05VV-F 3x0.75 Sqmm\r\nKabel berkualitas tinggi dengan standar Internasional & SNI\r\nDilengkapi lampu indikator pemakaian\r\nDilengkapi perangkat penutup s', NULL, 300000, NULL, NULL, 1, NULL, '2024-12-16'),
('MEG081', 'Kabel Gulung 20 Meter dengan Pengaman Soket CR-3820', 'Uticon', 'Kabel Gulung 20 Meter dengan Pengaman Soket', 400000, 100, 6000, 1, 'Casing terbuat dari bahan resin tahan panas dan berdaya tahan tinggi\r\nTerminal kontak kuningan\r\nKabel 6M H05VV-F 3x0.75 Sqmm\r\nKabel berkualitas tinggi dengan standar Internasional & SNI\r\nDilengkapi lampu indikator pemakaian\r\nDilengkapi perangkat penutup s', NULL, 400000, NULL, NULL, 1, NULL, '2024-12-16'),
('MEG082', 'Kabel Gulung 25 Meter dengan Pengaman Soket CR-2825', 'Uticon', 'Kabel Gulung 25 Meter dengan Pengaman Soket', 560000, 99, 10000, 1, 'Casing terbuat dari bahan resin tahan panas dan berdaya tahan tinggi\r\nTerminal kontak kuningan\r\nKabel 6M H05VV-F 3x0.75 Sqmm\r\nKabel berkualitas tinggi dengan standar Internasional & SNI\r\nDilengkapi lampu indikator pemakaian\r\nDilengkapi perangkat penutup s', NULL, 560000, NULL, NULL, 1, NULL, '2024-12-16'),
('MEG083', 'Kabel Gulung 30 Meter dengan Pengaman Soket CR-2830', 'Uticon', 'Kabel Gulung 30 Meter dengan Pengaman Soket', 625000, 99, 12000, 1, 'Casing terbuat dari bahan resin tahan panas dan berdaya tahan tinggi\r\nTerminal kontak kuningan\r\nKabel 6M H05VV-F 3x0.75 Sqmm\r\nKabel berkualitas tinggi dengan standar Internasional & SNI\r\nDilengkapi lampu indikator pemakaian\r\nDilengkapi perangkat penutup s', NULL, 625000, NULL, NULL, 1, NULL, '2024-12-16'),
('MEG084', 'MCB Panel Box 4 Group MCB-1804', 'Uticon', 'MCB Panel Box 4 Group', 60000, 100, 300, 1, 'Casing terbuat dari bahan polikarbonat yang tahan panas dan berdaya tahan tinggi\r\nCasing terbuat dari bahan resin tahan panas dan berdaya tahan tinggi\r\nTerminal kontak kuningan\r\nInstalasi kabel mudah dengan panel yang mudah dilepas dan terminal yang ditan', NULL, 60000, NULL, NULL, 1, NULL, '2024-12-16'),
('MEG085', 'MCB Panel Box 8 Group MCB-1808', 'Uticon', 'MCB Panel Box 8 Group', 75000, 99, 350, 1, 'Casing terbuat dari bahan polikarbonat yang tahan panas dan berdaya tahan tinggi\r\nCasing terbuat dari bahan resin tahan panas dan berdaya tahan tinggi\r\nTerminal kontak kuningan\r\nInstalasi kabel mudah dengan panel yang mudah dilepas dan terminal yang ditan', NULL, 75000, NULL, NULL, 1, NULL, '2024-12-16'),
('MEG086', ' MCB Panel Box 12 Group MCB-1804', 'Uticon', 'MCB Panel Box 12 Group', 115000, 97, 500, 1, 'Casing terbuat dari bahan polikarbonat yang tahan panas dan berdaya tahan tinggi\r\nCasing terbuat dari bahan resin tahan panas dan berdaya tahan tinggi\r\nTerminal kontak kuningan\r\nInstalasi kabel mudah dengan panel yang mudah dilepas dan terminal yang ditan', NULL, 115000, NULL, NULL, 1, NULL, '2024-12-16'),
('MEG087', 'Kabel NYM 2x1.5 | 50 Meter ', 'Eterna', 'Kabel NYM 50 Meter', 585000, 98, 5000, 1, 'Kabel NYM 50 Meter 2x1.5', NULL, 585000, NULL, NULL, 1, NULL, '2024-12-16'),
('MEG088', 'Kabel NYM 2x1.5 | 100 Meter', 'Eterna', 'Kabel NYM 100 Meter', 1170000, 100, 10000, 1, 'Kabel NYM 2x1.5 | 100 Meter', NULL, 1170000, NULL, NULL, 1, NULL, '2024-12-16'),
('MEG089', 'Kabel NYM 2x2.5 | 50 Meter', 'Eterna', 'Kabel NYM 50 Meter', 835000, 100, 10000, 1, 'Kabel NYM 2x2.5 | 50 Meter', NULL, 835000, NULL, NULL, 1, NULL, '2024-12-16'),
('MEG090', 'Kabel NYM 2x2.5 | 100 Meter', 'Eterna', 'Kabel NYM 100 Meter', 1670000, 100, 15000, 1, 'Kabel NYM 2x2.5 | 100 Meter', NULL, 1670000, NULL, NULL, 1, NULL, '2024-12-16'),
('MEG091', 'Kabel NYM 2x4 | 100 Meter', 'Eterna', 'Kabel NYM 100 Meter', 2592000, 100, 50000, 1, 'Kabel NYM 2x4 | 100 Meter', NULL, 2592000, NULL, NULL, 1, NULL, '2024-12-16'),
('MEG092', 'Kabel NYM 2x4 | 50 Meter', 'Eterna', 'Kabel NYM 50 Meter', 1296000, 99, 50000, 1, 'Kabel NYM 2x4 | 50 Meter', NULL, 1296000, NULL, NULL, 1, NULL, '2024-12-16'),
('MEG093', 'Kabel Ties 80x2.5 100 PCS | 8025', 'Masko', 'Kabel Ties', 4000, 100, 150, 1, 'Kabel Ties 80x2.5 100 PCS', NULL, 4000, NULL, NULL, 1, NULL, '2024-12-16'),
('MEG094', 'Kabel Ties 100x2.5 100 PCS | 10025', 'Masko', 'Kabel Ties', 3800, 99, 150, 1, 'Kabel Ties 100x2.5 100 PCS | 10025', NULL, 3800, NULL, NULL, 1, NULL, '2024-12-16'),
('MEG095', ' Kabel Ties 150x2.5 100 PCS | 15025', 'Masko', 'Kabel Ties', 6100, 100, 150, 1, ' Kabel Ties 150x2.5 100 PCS | 15025', NULL, 6100, NULL, NULL, 1, NULL, '2024-12-16'),
('MEG096', ' Kabel Ties 200x2.5 100 PCS | 20025', 'Masko', 'Kabel Ties', 10000, 100, 200, 1, ' Kabel Ties 200x2.5 100 PCS | 20025', NULL, 10000, NULL, NULL, 1, NULL, '2024-12-16'),
('MEG097', ' Kabel Ties 200x3.6 100 PCS | 20036', 'Masko', 'Kabel Ties', 16000, 100, 200, 1, ' Kabel Ties 200x3.6 100 PCS | 20036', NULL, 16000, NULL, NULL, 1, NULL, '2024-12-16'),
('MEG098', ' Kabel Ties 250x3.6 100 PCS | 25036', 'Masko', 'Kabel Ties', 22000, 98, 2000, 1, ' Kabel Ties 250x3.6 100 PCS | 25036', NULL, 22000, NULL, NULL, 1, NULL, '2024-12-16'),
('MEG099', ' Kabel Ties 250x4.8 100 PCS | 25048', 'Masko', 'Kabel Ties', 31000, 100, 200, 1, ' Kabel Ties 250x4.8 100 PCS | 25048', NULL, 31000, NULL, NULL, 1, NULL, '2024-12-16'),
('MEG100', ' Kabel Ties 300x3.6 100 PCS | 25048', 'Masko', 'Kabel Ties', 29000, 100, 300, 1, ' Kabel Ties 300x3.6 100 PCS | 25048', NULL, 29000, NULL, NULL, 1, NULL, '2024-12-16'),
('MEG102', ' Kabel Ties 300x4.8 100 PCS | 30048', 'Masko', 'Kabel Ties', 43500, 100, 300, 1, ' Kabel Ties 300x4.8 100 PCS | 30048', NULL, 43500, NULL, NULL, 1, NULL, '2024-12-16'),
('MEG103', ' Kabel Ties 400x4.8 100 PCS | 40048', 'Masko', 'Kabel Ties', 63000, 100, 300, 1, ' Kabel Ties 400x4.8 100 PCS | 40048', NULL, 63000, NULL, NULL, 1, NULL, '2024-12-16'),
('MEG104', ' Kabel Ties 450x4.8 100 PCS | 45048', 'Masko', 'Kabel Ties', 74000, 100, 500, 1, ' Kabel Ties 450x4.8 100 PCS | 45048', NULL, 74000, NULL, NULL, 1, NULL, '2024-12-16'),
('MEG105', ' Kabel Ties 500x4.8 100 PCS | 50048', 'Masko', 'Kabel Ties', 84000, 99, 500, 1, ' Kabel Ties 500x4.8 100 PCS | 50048', NULL, 84000, NULL, NULL, 1, NULL, '2024-12-16'),
('MEG106', 'Rumah Lampu Plafon 210L', 'Broco', 'Rumah Lampu', 7000, 99, 100, 1, '• Fitting Plafon / Ceiling Lamp Holder\r\n• Standard Series Tipe 210L\r\n• 300W 250V\r\n• Warna: Hitam\r\n• Ukuran: 64mm x 64mm x 46mm\r\n• Sertifikat: SNI (Standar Nasional Indonesia)\r\n• Quality ISO 9001', NULL, 7000, NULL, NULL, 1, NULL, '2024-12-18'),
('MEG107', 'Rumah Lampu Gantung 216L', 'Broco', 'Rumah Lampu', 7000, 100, 100, 1, '• Fitting Plafon / Pedant Lamp Holder\r\n• Standard Series Tipe 216L\r\n• 300W 250V\r\n• Ukuran Lampu E-27\r\n• Warna: Hitam\r\n• Sertifikat: SNI (Standar Nasional Indonesia)\r\n• Quality ISO 9001', NULL, 7000, NULL, NULL, 1, NULL, '2024-12-18'),
('MEG108', 'Rumah Lampui Kombinasi 226', 'Broco', 'Rumah Lampu', 12000, 100, 100, 1, '• Fitting Kombinasi / Lamp Holder with Two Socket\r\n• Standard Series Tipe 226\r\n• 6A 250V\r\n• Warna Hitam\r\n• Ukuran: 45 mm x 45 mm x 80 mm\r\n• Sertifikat: SNI (Standar Nasional Indonesia)\r\n• Quality ISO 9001', NULL, 12000, NULL, NULL, 1, NULL, '2024-12-18'),
('MEG109', 'Rumah Lampu Plafon Besar 1210', 'Broco', 'Rumah Lampu', 13000, 100, 250, 1, '• Fitting Plafon / Ceiling Lamp Holder\r\n• Standard Series Tipe 1210\r\n• 300W 250V\r\n• Warna Cream\r\n• Sertifikat: SNI (Standar Nasional Indonesia)\r\n• Quality ISO 9001', NULL, 13000, NULL, NULL, 1, NULL, '2024-12-18'),
('MEG110', 'Rumah Lampu Plafon Besar Original 1210', 'Broco', 'Rumah Lampu', 15000, 100, 250, 1, '• Fitting Plafon / Ceiling Lamp Holder\r\n• Standard Series Tipe 1211\r\n• 300W 250V\r\n• Warna Cream\r\n• Sertifikat: SNI (Standar Nasional Indonesia)\r\n• Quality ISO 9001', NULL, 15000, NULL, NULL, 1, NULL, '2024-12-18'),
('MEG111', 'Rumah Lampu Plafon Bulat 1212 (PUTIH)', 'Broco', 'Rumah Lampu', 13000, 100, 250, 1, '-Fitting Plafon / Ceiling Lamp Holder\r\n-Standard Series Tipe 1212\r\n-300W 250V\r\n-Warna Putih\r\n- Sertifikat: SNI (Standar Nasional Indonesia)\r\n-Quality ISO 9001', NULL, 13000, NULL, NULL, 1, NULL, '2024-12-18'),
('MEG112', 'Rumah Lampu Plafon Bulat 1212 (CREAM)', 'Broco', 'Rumah Lampu', 13000, 100, 250, 1, '-Fitting Plafon / Ceiling Lamp Holder\r\n-Standard Series Tipe 1212\r\n-300W 250V\r\n-Warna Cream\r\n-Sertifikat: SNI (Standar Nasional Indonesia)\r\n-Quality ISO 9001', NULL, 13000, NULL, NULL, 1, NULL, '2024-12-18'),
('MEG113', 'Saklar Engkel NGU Original 6621 U', 'Broco', 'Saklar Engkel', 16000, 100, 200, 1, 'NEW GEE Series merupakan salah satu koleksi dari Broco yang dirancang untuk memenuhi fungsi dan seni dalam satu kesatuan guna mencapai kesempurnaan.\r\n\r\nSaklar adalah komponen listrik yang berfungsi sebagai pemutus dan penyambung arus listrik dari sumber a', NULL, 16000, NULL, NULL, 1, NULL, '2024-12-18'),
('MEG114', 'Saklar Engkel Hotel NGU Cream 5163-11', 'Broco', 'Saklar Engkel', 20000, 100, 200, 1, 'NEW GEE Series merupakan salah satu koleksi dari Broco yang dirancang untuk memenuhi fungsi dan seni dalam satu kesatuan guna mencapai kesempurnaan.\r\n\r\n• Saklar Engkel\r\n• Single change over switch (two way)\r\n• NEW GEE Series Tipe 5163\r\n• 10A 250V\r\n• Warna', NULL, 20000, NULL, NULL, 1, NULL, '2024-12-18'),
('MEG115', 'Saklar Seri NGU Original 6622U', 'Broco', 'Saklar Seri', 22500, 100, 250, 1, 'NEW GEE Series merupakan salah satu koleksi dari Broco yang dirancang untuk memenuhi fungsi dan seni dalam satu kesatuan guna mencapai kesempurnaan.\r\n\r\nSaklar Broco 6622 adalah saklar yang difungsikan untuk memutuskan dan menghubungkan dua buah mata lampu', NULL, 22500, NULL, NULL, 1, NULL, '2024-12-18'),
('MEG116', 'Saklar Seri NGU Original 6611', 'Broco', 'Saklar Engkel', 14000, 100, 250, 1, 'Saklar adalah komponen listrik yang berfungsi sebagai pemutus dan penyambung arus listrik dari sumber arus ke beban listrik pada rangkaian listrik tertutup.\r\n\r\n• Saklar Engkel\r\n• Standard Series Tipe 6611\r\n• 6A 250V\r\n• Warna Cream\r\n• Sertifikat SNI (Stand', NULL, 14000, NULL, NULL, 1, NULL, '2024-12-18'),
('MEG117', 'Saklar Seri NGU Original 6612', 'Broco', 'Saklar Seri', 20000, 99, 250, 1, 'Saklar adalah komponen listrik yang berfungsi sebagai pemutus dan penyambung arus listrik dari sumber arus ke beban listrik pada rangkaian listrik tertutup.\r\n\r\n• Saklar Seri\r\n• Standard Series Tipe 6612\r\n• 6A 250V\r\n• Warna Cream\r\n• Sertifikat SNI (Standar', NULL, 20000, NULL, NULL, 1, NULL, '2024-12-18'),
('MEG118', 'Saklar Triple IB 6613', 'Broco', 'Saklar Triple', 28000, 100, 250, 1, 'Saklar adalah komponen listrik yang berfungsi sebagai pemutus dan penyambung arus listrik dari sumber arus ke beban listrik pada rangkaian listrik tertutup.\r\n\r\n• Saklar Triple Switch\r\n• Standard Series Tipe 6613\r\n• 6A 250V\r\n• Warna Cream\r\n• Sertifikat SNI', NULL, 28000, NULL, NULL, 1, NULL, '2024-12-18'),
('MEG119', 'Saklar Engkel Outbow 630N', 'Broco', 'Saklar Engkel Outbow', 11000, 99, 150, 1, 'BROCO 630N STD Single Switch Outbow 6A 250V Black -\r\n\r\nSaklar 1 Gang 1 Way\r\nOutbow / Bulat\r\nWarna: Hitam', NULL, 11000, NULL, NULL, 1, NULL, '2024-12-18'),
('MEG120', 'Saklar Engkel Outbow Persegi Cream 16210-11', 'Broco', 'Saklar Engkel Outbow', 16010, 100, 200, 1, 'NEW GEE Series merupakan salah satu koleksi dari Broco yang dirancang untuk memenuhi fungsi dan seni dalam satu kesatuan guna mencapai kesempurnaan.\r\n\r\n• Saklar Engkel tipe Outbow\r\n• NEW GEE Series Tipe 16210\r\n• 10AX 250V\r\n• Warna Cream\r\n• Sertifikat SNI ', NULL, 16010, NULL, NULL, 1, NULL, '2024-12-18'),
('MEG121', 'Saklar Seri Outbow 632N', 'Broco', 'Saklar Seri Outbow', 15000, 99, 250, 1, '• Saklar 2 Gang Untuk Pemasangan di Permukaan\r\n• Standard Series Tipe 630N\r\n• 6A 250V\r\n• Warna Hitam\r\n• Sertifikat: SNI (Standar Nasional Indonesia)\r\n• Quality ISO 9001', NULL, 15000, NULL, NULL, 1, NULL, '2024-12-18'),
('MEG122', 'Saklar Seri Outbow Persegi Cream 16220-11', 'Broco', 'Saklar Seri Outbow', 22200, 99, 200, 1, 'NEW GEE Series merupakan salah satu koleksi dari Broco yang dirancang untuk memenuhi fungsi dan seni dalam satu kesatuan guna mencapai kesempurnaan.\r\n\r\n• Saklar Seri tipe Outbow\r\n• NEW GEE Series Tipe 16220\r\n• 10AX 250V\r\n• Warna Cream\r\n• Sertifikat SNI (S', NULL, 22200, NULL, NULL, 1, NULL, '2024-12-18'),
('MEG123', 'Stop Kontak Arde Outbow Hitam 6130', 'Broco', 'Stopkontak Arde Outbow', 10000, 98, 150, 1, '• Stop Kontak Arde Untuk Pemasangan di Permukaan\r\n• Standard Series Tipe 6130\r\n• 16A 250V\r\n• Warna Hitam\r\n• Sertifikat: SNI (Standar Nasional Indonesia)\r\n• Quality ISO 9001', NULL, 10000, NULL, NULL, 1, NULL, '2024-12-18'),
('MEG124', 'Stop Kontak Arde Outbow Persegi Cream 15410-11', 'Broco', 'Stopkontak Arde Outbow', 17750, 100, 150, 1, 'NEW GEE Series merupakan salah satu koleksi dari Broco yang dirancang untuk memenuhi fungsi dan seni dalam satu kesatuan guna mencapai kesempurnaan.\r\n\r\n• Stop Kontak Arde tipe Outbow\r\n• NEW GEE Series Tipe 15410\r\n• 16A 250V\r\n• Warna Cream\r\n• Sertifikat SN', NULL, 17750, NULL, NULL, 1, NULL, '2024-12-18');
INSERT INTO `produk` (`id_produk`, `nama_produk`, `nama_brand`, `nama_kategori`, `harga`, `stok`, `berat`, `garansi`, `deskripsi`, `harga_diskon`, `total_harga`, `mulai_promo`, `selesai_promo`, `status`, `status_promo`, `created_at`) VALUES
('MEG125', 'Double Stop Kontak Arde Outbow Cream 15420-11', 'Broco', 'Double Stopkontak Arde Outbow', 37560, 96, 250, 1, 'NEW GEE Series merupakan salah satu koleksi dari Broco yang dirancang untuk memenuhi fungsi dan seni dalam satu kesatuan guna mencapai kesempurnaan.\r\n\r\n• Stop Kontak Arde Double tipe Outbow\r\n• NEW GEE Series Tipe 15420\r\n• 16A 250V\r\n• Warna Cream\r\n• Sertif', NULL, 37560, NULL, NULL, 1, NULL, '2024-12-18'),
('MEG126', 'Stop Kontak Arde IB New Gee Urea 5511U', 'Broco', 'Stop Kontak Arde', 17220, 100, 150, 1, 'NEW GEE Series merupakan salah satu koleksi dari Broco yang dirancang untuk memenuhi fungsi dan seni dalam satu kesatuan guna mencapai kesempurnaan.\r\n\r\nStop kontak Broco 5511U berfungsi sebagai pusat penghubung antara arus listrik dan peralatan yang memer', NULL, 17220, NULL, NULL, 1, NULL, '2024-12-18'),
('MEG127', 'Stop Kontak Arde IB 6100', 'Broco', 'Stop Kontak Arde', 15900, 99, 250, 1, 'Stop kontak berfungsi sebagai pusat penghubung antara arus listrik dan peralatan yang memerlukan aliran listrik.\r\n\r\n• Stop Kontak Arde\r\n• Standard Series Tipe 6100\r\n• Tidak mudah terbakar dan tidak dapat mengalirkan listrik\r\n• Pin kuningan, anti karat dan', NULL, 15900, NULL, NULL, 1, NULL, '2024-12-18'),
('MEG128', 'Stop Kontak Arde IB Tutup 6122', 'Broco', 'Stop Kontak Arde', 44180, 99, 250, 1, 'Stop kontak berfungsi sebagai pusat penghubung antara arus listrik dan peralatan yang memerlukan aliran listrik.\r\n\r\n• Stop Kontak dengan Cover\r\n• Standard Series Tipe 6122\r\n• Tidak mudah terbakar dan tidak dapat mengalirkan listrik\r\n• Pin kuningan, anti k', NULL, 44180, NULL, NULL, 1, NULL, '2024-12-18'),
('MEG129', 'Stop Kontak Pengaman NG (Child Protection) 5154N-11', 'Broco', 'Stop Kontak Arde', 27000, 100, 200, 1, 'NEW GEE Series merupakan salah satu koleksi dari Broco yang dirancang untuk memenuhi fungsi dan seni dalam satu kesatuan guna mencapai kesempurnaan.\r\n\r\nStop kontak Broco 5511U berfungsi sebagai pusat penghubung antara arus listrik dan peralatan yang memer', NULL, 27000, NULL, NULL, 1, NULL, '2024-12-18'),
('MEG130', 'Steker Biasa 344 L', 'Broco', 'Steker', 3550, 98, 200, 1, '• Two Pole Plug\r\n• Standard Series Tipe Broco 344 L\r\n• 2.5A 250V\r\n• Warna Hitam\r\n• Sertifikat: SNI (Standar Nasional Indonesia)\r\n• Quality ISO 9001', NULL, 3550, NULL, NULL, 1, NULL, '2024-12-18'),
('MEG131', 'Steker Arde New Gee White 13310-55', 'Broco', 'Steker', 13390, 100, 150, 1, '• Steker Arde\r\n• Standard Series Tipe 13310-55\r\n• 16A 250V\r\n• Warna Putih\r\n• Terminal PIN Kuningan\r\n• Sertifikat: SNI (Standar Nasional Indonesia)\r\n• Quality ISO 9001', NULL, 13390, NULL, NULL, 1, NULL, '2024-12-18'),
('MEG132', 'Steker Saklar dengan Lampu 13311-65', 'Broco', 'Steker dengan Saklar', 26390, 100, 150, 1, 'NEW GEE Series merupakan salah satu koleksi dari Broco yang dirancang untuk memenuhi fungsi dan seni dalam satu kesatuan guna mencapai kesempurnaan.\r\n\r\n• Saklar dilengkapi dengan Lampu\r\n• NEW GEE Series Tipe 13311\r\n• 10A 250V\r\n• Warna Putih - Dark Grey\r\n•', NULL, 26390, NULL, NULL, 1, NULL, '2024-12-18'),
('MEG133', 'Steker L Arde New Gee White 13312-55', 'Broco', 'Steker', 13390, 100, 200, 1, '• Steker Arde 2-Pole \"L\" Plug Sideway\r\n• Standard Series Tipe 13312-55\r\n• 16A 250V\r\n• Warna Putih\r\n• Terminal PIN Kuningan\r\n• Sertifikat: SNI (Standar Nasional Indonesia)\r\n• Quality ISO 9001', NULL, 13390, NULL, NULL, 1, NULL, '2024-12-18'),
('MEG134', 'Steker T Arde Persegi 13830-55 (PUTIH)', 'Broco', 'Steker T', 26780, 99, 150, 1, '• Steker T Arde\r\n• Standard Series Tipe 13830\r\n• 10A 250V\r\n• Warna Putih\r\n• Sertifikat: SNI (Standar Nasional Indonesia)\r\n• Quality ISO 9001', NULL, 26780, NULL, NULL, 1, NULL, '2024-12-18'),
('MEG135', 'Kontra Steker Biasa 334N', 'Broco', 'Kontra Steker', 4360, 99, 150, 1, '• Kontra Steker\r\n• Standard Series Tipe 344 N\r\n• 6A 250V\r\n• Warna Hitam\r\n• Sertifikat: SNI (Standar Nasional Indonesia)\r\n• Quality ISO 9001', NULL, 4360, NULL, NULL, 1, NULL, '2024-12-18'),
('MEG136', 'Kontra Steker Arde 13410-55', 'Broco', 'Kontra Steker', 14910, 99, 150, 1, '• Kontra Steker Arde\r\n• Standard Series Tipe 13410-55\r\n• 16A 250V\r\n• Warna Putih\r\n• Terminal PIN Kuningan\r\n• Sertifikat: SNI (Standar Nasional Indonesia)\r\n• Quality ISO 9001', NULL, 14910, NULL, NULL, 1, NULL, '2024-12-18'),
('MEG137', 'Over Steker Bulat 844', 'Broco', 'Over Steker', 24630, 100, 150, 1, 'Broco Steker Over Bulat Hitam 844\r\n\r\nType: 844\r\nWarna: Hitam\r\nUkuran: 32mm x 32mm x 40mm', NULL, 24630, NULL, NULL, 1, NULL, '2024-12-18'),
('MEG138', 'Over Steker Universal 13910-55', 'Broco', 'Over Steker', 24630, 98, 250, 1, '• Over Steker Universal Adaptor Plug\r\n• Standard Series Tipe Broco 13910\r\n• 10A 250V\r\n• Warna Putih\r\n• Sertifikat: SNI (Standar Nasional Indonesia)\r\n• Quality ISO 9001', NULL, 24630, NULL, NULL, 1, NULL, '2024-12-18'),
('MEG139', 'Soket Telepon New Gee Cream 5171-11', 'Broco', 'Soket Telepon', 68100, 97, 250, 1, 'NEW GEE Series merupakan salah satu koleksi dari Broco yang dirancang untuk memenuhi fungsi dan seni dalam satu kesatuan guna mencapai kesempurnaan.\r\n\r\n• Soket Telepon\r\n• NEW GEE Series Tipe 5171\r\n• 10Amp\r\n• 1x RJ-11\r\n• 220-250V\r\n• Dimensi: 80 x 80mm\r\n• W', NULL, 68100, NULL, NULL, 1, NULL, '2024-12-18'),
('MEG140', 'Soket TV New Gee Cream 5181-11', 'Broco', 'Soket Televisi', 60250, 99, 250, 1, 'NEW GEE Series merupakan salah satu koleksi dari Broco yang dirancang untuk memenuhi fungsi dan seni dalam satu kesatuan guna mencapai kesempurnaan.\r\n\r\n• Soket Antena TV\r\n• NEW GEE Series Tipe 5181\r\n• 10Amp\r\n• 75Ohm TV Outlet\r\n• 220-250V\r\n• Dimensi: 80 x ', NULL, 60250, NULL, NULL, 1, NULL, '2024-12-18'),
('MEG141', 'Socket Outlet and Single Switch NG Cream 525161-11', 'Broco', 'Soket Outlet', 27560, 99, 250, 1, 'NEW GEE Series merupakan salah satu koleksi dari Broco yang dirancang untuk memenuhi fungsi dan seni dalam satu kesatuan guna mencapai kesempurnaan.\r\n\r\n• Stop Kontak & Saklar Engkel\r\n• NEW GEE Series Tipe 525161\r\n• 16A/6A 250V\r\n• Warna Cream\r\n• Sertifikat', NULL, 27560, NULL, NULL, 1, NULL, '2024-12-18'),
('MEG142', ' Universal Socket Outlet and Single Switch NG Cream 525361-11', 'Broco', 'Soket Outlet', 27560, 99, 250, 1, 'NEW GEE Series merupakan salah satu koleksi dari Broco yang dirancang untuk memenuhi fungsi dan seni dalam satu kesatuan guna mencapai kesempurnaan.\r\n\r\n• Universal Socket Outlet & Saklar Engkel\r\n• NEW GEE Series Tipe 525361\r\n• 10A/6A 250V\r\n• Warna Cream\r\n', NULL, 27560, NULL, NULL, 1, NULL, '2024-12-18'),
('MEG143', 'Universal Socket Outlet Outbow NG Cream 15210-11', 'Broco', 'Soket Outlet Outbow', 21790, 99, 150, 1, 'NEW GEE Series merupakan salah satu koleksi dari Broco yang dirancang untuk memenuhi fungsi dan seni dalam satu kesatuan guna mencapai kesempurnaan.\r\n\r\n• Universal Socket Outlet tipe Outbow\r\n• NEW GEE Series Tipe 15211\r\n• 6A 250V\r\n• Warna Cream\r\n• Sertifi', NULL, 21790, NULL, NULL, 1, NULL, '2024-12-18'),
('MEG144', 'Universal Socket Outlet and Single Switch Outbow NG Cream 15211-11', 'Broco', 'Soket Outlet Outbow', 27560, 100, 250, 1, 'NEW GEE Series merupakan salah satu koleksi dari Broco yang dirancang untuk memenuhi fungsi dan seni dalam satu kesatuan guna mencapai kesempurnaan.\r\n\r\n• Universal Socket Outlet & Saklar Engkel tipe Outbow\r\n• NEW GEE Series Tipe 15211\r\n• 10AX/6A 250V\r\n• W', NULL, 27560, NULL, NULL, 1, NULL, '2024-12-18'),
('MEG145', 'Saklar Single Switch Neu Ray - White', 'Broco', 'Saklar Engkel', 15430, 100, 150, 1, 'Dirancang menggunakan teknik CAD/CAM terbaru dan menggunakan proses manufaktur paling canggih. NEU RAY Series memiliki tampilan sederhana dan kesan modern yang cocok untuk desain rumah modern saat ini.\r\n\r\n• Saklar Engkel\r\n• Neu Ray Series Tipe J161\r\n• 10A', NULL, 15430, NULL, NULL, 1, NULL, '2024-12-18'),
('MEG146', 'Saklar Double Switch Neu Ray - White', 'Broco', 'Saklar Seri', 20960, 100, 150, 1, 'Dirancang menggunakan teknik CAD/CAM terbaru dan menggunakan proses manufaktur paling canggih. NEU RAY Series memiliki tampilan sederhana dan kesan modern yang cocok untuk desain rumah modern saat ini.\r\n\r\n• Saklar Seri\r\n• Neu Ray Series Tipe J162\r\n• 10AX ', NULL, 20960, NULL, NULL, 1, NULL, '2024-12-18'),
('MEG147', 'Soket Outlet Neu Ray - White', 'Broco', 'Soket Outlet', 17210, 99, 150, 1, 'Dirancang menggunakan teknik CAD/CAM terbaru dan menggunakan proses manufaktur paling canggih. NEU RAY Series memiliki tampilan sederhana dan kesan modern yang cocok untuk desain rumah modern saat ini.\r\n\r\n• Stop Kontak\r\n• Neu Ray Series Tipe J151\r\n• 10AX ', NULL, 17210, NULL, NULL, 1, NULL, '2024-12-18'),
('MEG148', 'Saklar Single Change Over Switch Neu Ray J-163', 'Broco', 'Saklar Engkel', 17730, 100, 150, 1, 'Dirancang menggunakan teknik CAD/CAM terbaru dan menggunakan proses manufaktur paling canggih. NEU RAY Series memiliki tampilan sederhana dan kesan modern yang cocok untuk desain rumah modern saat ini.\r\n\r\n• Saklar Engkel Hotel\r\n• Neu Ray Series Tipe J163\r', NULL, 17730, NULL, NULL, 1, NULL, '2024-12-18'),
('MEG149', 'Soket TV Antenna Socket Outlet Neu Ray J181 ', 'Broco', 'Soket Televisi', 58760, 100, 250, 1, 'Dirancang menggunakan teknik CAD/CAM terbaru dan menggunakan proses manufaktur paling canggih. NEU RAY Series memiliki tampilan sederhana dan kesan modern yang cocok untuk desain rumah modern saat ini.\r\n\r\n• Stop Kontak Antenna TV\r\n• Neu Ray Series Tipe J1', NULL, 58760, NULL, NULL, 1, NULL, '2024-12-18'),
('MEG150', 'Soket Telephone Socket Outlet Neu Ray J171', 'Broco', 'Soket Telepon', 64810, 100, 150, 1, 'Dirancang menggunakan teknik CAD/CAM terbaru dan menggunakan proses manufaktur paling canggih. NEU RAY Series memiliki tampilan sederhana dan kesan modern yang cocok untuk desain rumah modern saat ini.\r\n\r\n• Stop Kontak Telepon (RJ11)\r\n• Neu Ray Series Tip', 0, 64810, '2024-12-30', '2024-12-31', 1, 0, '2024-12-18'),
('MEG151', 'Soket Single Network Socket Outlet Cat5 (RJ45) Neu Ray J174-11', 'Broco', 'Soket Network', 76160, 99, 150, 1, 'Dirancang menggunakan teknik CAD/CAM terbaru dan menggunakan proses manufaktur paling canggih. NEU RAY Series memiliki tampilan sederhana dan kesan modern yang cocok untuk desain rumah modern saat ini.\r\n\r\n• Stop Kontak Data Cat.5 (RJ45)\r\n• Neu Ray Series ', 6160, 70000, '2024-12-22', '2024-12-23', 1, 0, '2024-12-18'),
('MEG152', 'Paket LED BULB 6W', 'Phillips', 'PAKET LED BULB', 126900, 99, 250, 1, 'Tipe Produk	BOHLAM LED\r\nUkuran	14.5W\r\nMerek	Philips\r\nWarna	Putih Terang\r\nKapasitas	14.5W', 0, 126900, NULL, NULL, 1, NULL, '2024-12-31'),
('MEG153', 'Paket LED BULB 4W', 'Phillips', 'PAKET LED BULB', 110250, 100, 100, 1, 'Tipe Produk	BOHLAM LED\r\nUkuran	4W\r\nMerek	Philips\r\nWarna	Putih Terang\r\nKapasitas	4W', 0, 110250, NULL, NULL, 1, NULL, '2024-12-31'),
('MEG154', 'Paket LED BULB 14.5W', 'Phillips', 'PAKET LED BULB', 224550, 98, 250, 1, 'Tipe Produk	BOHLAM LED\r\nUkuran	14.5W\r\nMerek	Philips\r\nWarna	Putih Terang\r\nKapasitas	14.5W', 0, 224550, NULL, NULL, 1, NULL, '2024-12-31'),
('MEG155', 'PAKET LED BULB ESSENTIAL 5W E27 230V 1CT/3 APR', 'Phillips', 'PAKET LED BULB', 20700, 99, 150, 1, 'Tipe Produk	BOHLAM LED\nUkuran	5W\nMerek	Philips\nWarna	Putih Terang\nKapasitas	5W', 0, 20700, NULL, NULL, 1, NULL, '2024-12-31'),
('MEG156', 'PAKET LED BULB ESSENTIAL 7W E27  230V 1CT/3 APR', 'Phillips', 'PAKET LED BULB', 105300, 99, 250, 1, 'Tipe Produk	BOHLAM LED\r\nUkuran	7W\r\nMerek	Philips\r\nWarna	Putih Terang\r\nKapasitas	7W', 0, 105300, NULL, NULL, 1, NULL, '2024-12-31'),
('MEG157', 'PAKET LED BULB ESSENTIAL 9W E27 230V 1CT/3 APR', 'Phillips', 'PAKET LED BULB', 105300, 97, 250, 1, 'Tipe Produk    BOHLAM LED\r\nUkuran    9W\r\nMerek    Philips\r\nWarna    Putih Terang\r\nKapasitas    9W', 0, 105300, NULL, NULL, 1, NULL, '2024-12-31'),
('MEG158', 'PAKET LED BULB ESSENTIAL 11W E27 230V 1CT/3 APR', 'Phillips', 'PAKET LED BULB', 135000, 95, 250, 1, 'Tipe Produk    BOHLAM LED\r\nUkuran    11W\r\nMerek    Philips\r\nWarna    Putih Terang\r\nKapasitas    11W', 0, 135000, NULL, NULL, 1, NULL, '2024-12-31'),
('MEG159', 'LED BULB 3W ECO (PUTIH)', 'Meval', 'LED BULB 3W', 14400, 97, 150, 5, 'Spesifikasi Produk :\n- Jenis Produk = Lampu LED\n- Warna Lampu = Putih\n- Kapasitas = 3 Watt\n- Lumens = 270 Lumens (90 Lumens/Watt)\n- Voltage = AC 100 - 240V 50/60 Hz\n- Umur Lampu = 8.000 Jam', 0, 14400, NULL, NULL, 1, NULL, '2024-12-31'),
('MEG160', 'LED BULB 3W ECO (KUNING)', 'Meval', 'LED BULB 3W', 14400, 99, 150, 1, 'Spesifikasi Produk :\r\n- Jenis Produk = Lampu LED\r\n- Warna Lampu = Kuning (Warm White)\r\n- Kapasitas = 3 Watt\r\n- Lumens = 240 Lumens (80 Lumens/Watt)\r\n- Voltage = AC 100 - 240V 50/60 Hz\r\n- Umur Lampu = 8.000 Jam', 0, 14400, NULL, NULL, 1, NULL, '2024-12-31'),
('MEG161', 'LED BULB 5W ECO (KUNING)', 'Meval', 'LED BULB 5W', 19000, 99, 250, 1, 'Spesifikasi Produk :\n- Jenis Produk = Lampu LED\n- Warna Lampu = Kuning\n- Kapasitas = 5 Watt\n- Lumens = 450 Lumens (90 Lumens/Watt)\n- Voltage = AC 100 - 240V 50/60 Hz\n- Umur Lampu = 8.000 Jam', 0, 19000, NULL, NULL, 1, NULL, '2024-12-31'),
('MEG162', 'LED BULB 5W ECO (PUTIH)', 'Meval', 'LED BULB 5W', 19000, 100, 250, 1, 'Spesifikasi Produk :\r\n- Jenis Produk = Lampu LED\r\n- Warna Lampu = Putih\r\n- Kapasitas = 5 Watt\r\n- Lumens = 450 Lumens (90 Lumens/Watt)\r\n- Voltage = AC 100 - 240V 50/60 Hz\r\n- Umur Lampu = 8.000 Jam', 0, 19000, NULL, NULL, 1, NULL, '2024-12-31'),
('MEG163', 'LED BULB 7W ECO (PUTIH)', 'Meval', 'LED BULB 7W', 25000, 97, 150, 1, 'Spesifikasi Produk :\r\n- Jenis Produk = Lampu LED\r\n- Warna Lampu = Putih\r\n- Kapasitas = 7 Watt\r\n- Lumens = 620 Lumens (88 Lumens/Watt)\r\n- Voltage = AC 100 - 240V 50/60 Hz\r\n- Umur Lampu = 8.000 Jam', 0, 25000, NULL, NULL, 1, NULL, '2024-12-31'),
('MEG164', 'LED BULB 7W ECO (KUNING)', 'Meval', 'LED BULB 7W', 25000, 97, 250, 1, 'Spesifikasi Produk :\r\n- Jenis Produk = Lampu LED\r\n- Warna Lampu = Kuning\r\n- Kapasitas = 7 Watt\r\n- Lumens = 620 Lumens (88 Lumens/Watt)\r\n- Voltage = AC 100 - 240V 50/60 Hz\r\n- Umur Lampu = 8.000 Jam', 0, 25000, NULL, NULL, 1, NULL, '2024-12-31'),
('MEG165', 'LED BULB 9W ECO (PUTIH)', 'Meval', 'LED BULB 9W', 29700, 99, 250, 5, 'Spesifikasi Produk :\r\n- Jenis Produk = Lampu LED\r\n- Warna Lampu = Kuning\r\n- Kapasitas = 9 Watt\r\n- Umur Lampu = 8.000 Jam', 0, 29700, NULL, NULL, 1, NULL, '2024-12-31'),
('MEG166', 'LED BULB 9W ECO (KUNING)', 'Meval', 'LED BULB 9W', 29700, 100, 250, 1, 'Spesifikasi Produk :\r\n- Jenis Produk = Lampu LED\r\n- Warna Lampu = Kuning\r\n- Kapasitas = 9 Watt\r\n- Umur Lampu = 8.000 Jam', 0, 29700, NULL, NULL, 1, NULL, '2024-12-31'),
('MEG167', 'LED BULB 11W ECO (PUTIH)', 'Meval', 'LED BULB 11W', 34600, 99, 250, 1, 'Spesifikasi Produk :\r\n- Jenis Produk = Lampu LED\r\n- Warna Lampu = Putih\r\n- Kapasitas = 11 Watt\r\n- Umur Lampu = 8.000 Jam', 0, 34600, NULL, NULL, 1, NULL, '2024-12-31'),
('MEG168', 'LED BULB 13W ECO (PUTIH)', 'Meval', 'LED BULB 13W', 39400, 100, 250, 1, 'Spesifikasi Produk :\r\n- Jenis Produk = Lampu LED\r\n- Warna Lampu = Putih\r\n- Kapasitas = 13 Watt\r\n- Umur Lampu = 8.000 Jam', 0, 39400, NULL, NULL, 1, NULL, '2024-12-31'),
('MEG169', 'LED BULB 15W ECO (PUTIH)', 'Meval', 'LED BULB 15W', 49400, 99, 250, 1, 'Spesifikasi Produk :\r\n- Jenis Produk = Lampu LED\r\n- Warna Lampu = Putih\r\n- Kapasitas = 15 Watt\r\n- Umur Lampu = 8.000 Jam', 0, 49400, NULL, NULL, 1, NULL, '2024-12-31'),
('MEG170', 'LED BULB 17W ECO (PUTIH)', 'Meval', 'LED BULB 17W', 59600, 99, 250, 1, 'Spesifikasi Produk :\r\n- Jenis Produk = Lampu LED\r\n- Warna Lampu = Putih\r\n- Kapasitas = 17 Watt\r\n- Umur Lampu = 8.000 Jam', 0, 71800, NULL, NULL, 1, NULL, '2024-12-31'),
('MEG171', 'LED BULB 19W ECO (PUTIH)', 'Meval', 'LED BULB 19W', 71800, 100, 250, 1, 'Spesifikasi Produk :\r\n- Jenis Produk = Lampu LED\r\n- Warna Lampu = Putih\r\n- Kapasitas = 19 Watt\r\n- Umur Lampu = 8.000 Jam', 0, 71800, NULL, NULL, 1, NULL, '2024-12-31'),
('MEG172', 'LED BULB 25W JUMBO ECO (PUTIH)', 'Meval', 'LED BULB 25W', 76000, 99, 250, 1, 'Spesifikasi Produk :\r\n- Jenis Produk = Lampu LED\r\n- Warna Lampu = Putih\r\n- Kapasitas = 25 Watt\r\n- Umur Lampu = 8.000 Jam', 0, 76000, NULL, NULL, 1, NULL, '2024-12-31'),
('MEG173', 'LED BULB 30W JUMBO ECO (PUTIH)', 'Meval', 'LED BULB 30W', 98000, 99, 250, 1, 'Spesifikasi Produk :\r\n- Jenis Produk = Lampu LED\r\n- Warna Lampu = Putih\r\n- Kapasitas = 30 Watt\r\n- Umur Lampu = 8.000 Jam', 0, 98000, NULL, NULL, 1, NULL, '2024-12-31'),
('MEG174', 'LED BULB 40W JUMBO ECO (PUTIH)', 'Meval', 'LED BULB 40W', 125000, 96, 250, 1, 'Spesifikasi Produk :\r\n- Jenis Produk = Lampu LED\r\n- Warna Lampu = Putih\r\n- Kapasitas = 40 Watt\r\n- Umur Lampu = 8.000 Jam', 0, 125000, NULL, NULL, 1, NULL, '2024-12-31'),
('MEG175', 'Paket LED BULB 5W ECO', 'Meval', 'PAKET LED BULB', 57000, 89, 500, 1, 'Spesifikasi Produk :\r\n- Jenis Produk = Lampu LED\r\n- Warna Lampu = Putih\r\n- Kapasitas = 5 Watt\r\n- Lumens = 450 Lumens (90 Lumens/Watt)\r\n- Voltage = AC 100 - 240V 50/60 Hz\r\n- Umur Lampu = 8.000 Jam\r\n- ISI 4', 0, 57000, NULL, NULL, 1, NULL, '2024-12-31'),
('MEG176', ' Paket LED BULB 7W ECO', 'Meval', 'PAKET LED BULB', 75000, 86, 500, 1, 'Spesifikasi Produk :\r\n- Jenis Produk = Lampu LED\r\n- Warna Lampu = Putih\r\n- Kapasitas = 7 Watt\r\n- Lumens = 620 Lumens (88 Lumens/Watt)\r\n- Voltage = AC 100 - 240V 50/60 Hz\r\n- Umur Lampu = 8.000 Jam', 5000, 70000, '2025-01-03', '2025-01-04', 1, 1, '2024-12-31'),
('MEG177', ' Paket LED BULB 9W ECO', 'Meval', 'PAKET LED BULB', 89100, 85, 500, 1, 'Spesifikasi Produk :\r\n- Jenis Produk = Lampu LED\r\n- Warna Lampu = Putih\r\n- Kapasitas = 9 Watt\r\n- Lumens = 806 Lumens (89 Lumens/Watt)\r\n- Voltage = AC 100 - 240V 50/60 Hz\r\n- Umur Lampu = 8.000 Jam', 100, 89000, '2025-01-03', '2025-01-05', 1, 1, '2024-12-31'),
('MEG178', ' Paket LED BULB 11W ECO', 'Meval', 'PAKET LED BULB', 103800, 88, 500, 1, 'Spesifikasi Produk :\r\n- Jenis Produk = Lampu LED\r\n- Warna Lampu = Putih\r\n- Kapasitas = 11 Watt\r\n- Lumens = 1060 Lumens (96 Lumens/Watt)\r\n- Voltage = AC 100 - 240V 50/60 Hz\r\n- Umur Lampu = 8.000 Jam', 0, 103800, NULL, NULL, 1, NULL, '2024-12-31'),
('MEG179', 'Paket LED BULB 13W ECO', 'Meval', 'PAKET LED BULB', 118200, 80, 500, 1, '- Jenis Produk = Lampu LED\r\n- Warna Lampu = Putih\r\n- Kapasitas = 13 Watt\r\n- Lumens = 1200 Lumens (92 Lumens/Watt)\r\n- Voltage = AC 100 - 240V 50/60 Hz\r\n- Umur Lampu = 8.000 Jam', 0, 118200, NULL, NULL, 1, NULL, '2024-12-31');

-- --------------------------------------------------------

--
-- Table structure for table `rating`
--

DROP TABLE IF EXISTS `rating`;
CREATE TABLE `rating` (
  `id_rating` varchar(255) NOT NULL,
  `id_user` varchar(255) NOT NULL,
  `id_produk` varchar(255) NOT NULL,
  `rating` int(11) NOT NULL,
  `ulasan` text NOT NULL,
  `created_at` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `rating`
--

INSERT INTO `rating` (`id_rating`, `id_user`, `id_produk`, `rating`, `ulasan`, `created_at`) VALUES
('RAT001', 'CUST002', 'MEG149', 5, 'wenak', '2024-12-30'),
('RAT002', 'CUST002', 'MEG150', 4, 'bagus', '2024-12-30'),
('RAT003', 'CUST002', 'MEG151', 5, 'Mantap', '2024-12-30'),
('RAT004', 'CUST002', 'MEG151', 5, 'SDSAD', '2024-12-30'),
('RAT005', 'CUST002', 'MEG151', 5, 'Wow', '2024-12-30'),
('RAT006', 'CUST002', 'MEG165', 5, 'JOS', '2025-01-03'),
('RAT007', 'CUST002', 'MEG179', 5, 'Barang bagus, packing keren', '2025-01-04'),
('RAT008', 'CUST002', 'MEG086', 4, 'Cepat akurant', '2025-01-08'),
('RAT009', 'CUST002', 'MEG176', 4, 'Produk Sesuai', '2025-01-08'),
('RAT010', 'CUST002', 'MEG179', 5, 'Produk Sesuai', '2025-01-08'),
('RAT011', 'CUST002', 'MEG177', 5, 'Produk Sesuai', '2025-01-08'),
('RAT012', 'CUST002', 'MEG179', 4, 'Produk Sesuai', '2025-01-08'),
('RAT013', 'CUST002', 'MEG175', 5, 'Produk Sesuai', '2025-01-08'),
('RAT014', 'CUST002', 'MEG178', 5, 'Produk Sesuai', '2025-01-08');

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `id_user` varchar(255) NOT NULL,
  `nama_depan` varchar(255) NOT NULL,
  `nama_belakang` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `jenis_kelamin` varchar(255) NOT NULL,
  `no_telp` varchar(13) NOT NULL,
  `provinsi` varchar(255) NOT NULL,
  `kota` varchar(255) NOT NULL,
  `kecamatan` varchar(255) NOT NULL,
  `kelurahan` varchar(255) NOT NULL,
  `kode_pos` int(11) NOT NULL,
  `alamat_lengkap` text NOT NULL,
  `foto` varchar(255) DEFAULT NULL,
  `role` varchar(255) NOT NULL,
  `created_at` date NOT NULL,
  `status` int(11) NOT NULL,
  `id_provinsi` varchar(255) DEFAULT NULL,
  `id_kota` varchar(255) DEFAULT NULL,
  `id_kecamatan` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`id_user`, `nama_depan`, `nama_belakang`, `email`, `password`, `jenis_kelamin`, `no_telp`, `provinsi`, `kota`, `kecamatan`, `kelurahan`, `kode_pos`, `alamat_lengkap`, `foto`, `role`, `created_at`, `status`, `id_provinsi`, `id_kota`, `id_kecamatan`) VALUES
('ADM001', 'Admin', 'Dewa', 'admin01meg@gmail.com', '$2b$10$IlgDFZgyw2eLTNgZdAiXI.sTSLFqrfspsqWr8pJWW/R7GUEYv35Vu', 'Laki-laki', '081908353003', 'Jawa Timur', 'Sidoarjo', 'Waru', 'Kureksari', 61256, 'DSI L-7', NULL, 'Admin', '2024-12-15', 1, NULL, NULL, NULL),
('ADM002', 'Jono', 'Kasino', 'admin02meg@gmail.com', '$2b$10$RY15GgcNu/kuSRKeW0NbW.Z0ekLqLN3MXzGa/l0W7vC8YgRacVdY2', 'Laki-laki', '085583302510', 'Jawa Timur', 'Jawa Timur', 'Jawa Timur', 'Jawa Timur', 61256, '123', NULL, 'Admin', '2024-12-18', 1, NULL, NULL, NULL),
('ADM003', 'UT', 'Nichol', 'utnicol@gmail.com', '$2b$10$gBurhvL3a3Vqi.uefFx.JeFzMhczKIpoy1Gg7o1DEcuyBlR7Zd7ni', 'Laki-laki', '0856555419', 'Jawa Timur', 'Sidoarjo', 'Waru', 'Ngingas', 61256, 'Grand Delta Sari Cluster Aster blok J - 6', NULL, 'Admin', '2025-01-02', 1, NULL, NULL, NULL),
('ADM004', 'UT', 'Glenn', 'utglenn@gmail.com', '$2b$10$Nrm.VZJzav4o7YFZqKntHu0IF4fni089eFEhpJu02OPRncvQO3y7G', 'Laki-laki', '085583302510', 'Jawa Timur', 'Surabaya', 'Tenggilis Mejoyo', 'Kutisari', 60291, 'Jl. Kutisari Selatan II No.74 C, Kutisari, Kec. Tenggilis Mejoyo, Surabaya, Jawa Timur 60291', NULL, 'Admin', '2025-01-02', 1, NULL, NULL, NULL),
('CUST001', 'Radit', 'Setyo', 'raditsetyo@gmail.com', '$2b$10$ouqQHYr88B8rLPUydAJBSe0AdQ38l.8J4ojrrEqIqN2SB6ZHL0hQK', 'Laki-laki', '0838555485', 'Jawa Timur', '', 'Rungkut', 'Kedung Baruk', 6028, 'Jl. Dr. Ir. H. Soekarno No.396, Kedung Baruk, Kec. Rungkut, Surabaya, Jawa Timur 60298', NULL, 'Customer', '2024-12-18', 1, NULL, NULL, NULL),
('CUST002', 'Dewa', 'Felix', 'dewafelix321@gmail.com', '$2b$10$l9Y2vwWo/uXDa5ef1BdrtecjLCz7s53iQwatZtvxh5HdCFOOadshi', 'Laki-laki', '081908353003', 'Jawa Timur', 'Sidoarjo', 'Waru', 'Kureksari', 61256, 'DSI L-7', NULL, 'Customer', '2024-12-18', 1, NULL, NULL, NULL),
('CUST003', 'Jono', 'Kasino', 'Jonokasino@gmail.com', '$2b$10$tPth1BDGX/YdkGw7umOot.nhDrIvfxr2sDkq3qG/6Kfxvr6EA7UOq', 'Laki-laki', '085583302510', 'Jawa Timur', 'Sidoarjo', 'Waru', 'Sidoarjo', 61256, 'L-9', NULL, 'Customer', '2024-12-24', 1, NULL, NULL, NULL),
('CUST004', 'Pindi', 'Margaret', 'pindimargaret@gmail.com', '$2b$10$qV3HQaujc4qGBLxrLLInhe5jggvm9cqTLTYXvNptinjzxt9Uutx9u', 'Perempuan', '0853745678', 'Jawa Timur', 'Sidoarjo', 'Waru', 'Waru', 61256, 'Jl. Jend.S.Parman IV, Krajan Kulon, Waru, Kec. Waru, Kabupaten Sidoarjo, Jawa Timur', NULL, 'Customer', '2025-01-02', 1, NULL, NULL, NULL),
('CUST005', 'Zaranita', 'Amelya', 'zaranitaamelya@gmail.com', '$2b$10$0LIt2bU3Y3zV2FseCvK0F.QdcstBcTuu7qfnF9xJtYVlBWtY3oNfG', 'Perempuan', '087851457789', 'Jawa Timur', 'Sidoarjo', 'Waru', 'Bungurasih', 61256, 'Jl. Letjen Sutoyo, Kasian, Bungurasih, Kec. Waru, Kabupaten Sidoarjo, Jawa Timur ', NULL, 'Customer', '2025-01-02', 1, NULL, NULL, NULL),
('CUST006', 'Yoonara', 'Andrea', 'y00n@gmail.com', '$2b$10$sMYi7.ndXFwdwXRPiv1rruScoRjj55AvI6jL9211hyI8xPbcy2A2G', 'Perempuan', '081956789054', 'Jawa Timur', 'Sidoarjo', 'Waru', 'Waru', 61256, 'Jl. Brigjend Katamso No.34B, Mekar Raya Binangun, Janti, Kec. Waru, Kabupaten Sidoarjo, Jawa Timur', NULL, 'Customer', '2025-01-02', 1, NULL, NULL, NULL),
('CUST007', 'Sheila ', 'Permata', 'sheyyy@gmail.com', '$2b$10$8RuhcK8KerP3zqAFmq39vO0Kat3X3gw5/wtCr4cVS.fr1Mj0EGpGS', 'Perempuan', '08196784567', 'Daerah Istimewa Yogyakarta', 'Yogyakarta', 'Umbulharjo', 'Sorosutan', 55151, 'Jl. Taman Siswa No.712, Sorosutan, Kec. Umbulharjo, Kota Yogyakarta, Daerah Istimewa Yogyakarta', NULL, 'Customer', '2025-01-02', 1, NULL, NULL, NULL),
('CUST008', 'Ranti', 'Maulina', 'rantii@gmail.com', '$2b$10$sLqj2DaQtZ.BodV4bIc/jOnM5UszX0kD0/SBpXpaR7NpSvBOV5Ub2', 'Perempuan', '0853555547', 'Daerah Istimewa Yogyakarta', 'Sleman', 'Depok', 'Condongcatur', 55283, 'Jl. Wahid Hasyim No.21, Dabag, Condongcatur, Kec. Depok, Kabupaten Sleman, Daerah Istimewa Yogyakarta', NULL, 'Customer', '2025-01-02', 1, NULL, NULL, NULL),
('CUST009', 'Andrian', 'Pradipta', 'driann@gmail.com', '$2b$10$.4mdT/NOJeuGNBWMJfalAuwBWToA9.rukpD8Pxp4AclrAXVw0Sy3C', 'Laki-laki', '0838555485', 'Daerah Istimewa Yogyakarta', 'Bantul', 'Banguntapan', 'Baturetno', 55791, ' Jl. Pleret, Ngrpik, Baturetno, Kec. Banguntapan, Kabupaten Bantul, Daerah Istimewa Yogyakarta', NULL, 'Customer', '2025-01-02', 1, NULL, NULL, NULL),
('CUST010', 'Adivan', 'Reziandra', 'ziann@gmail.com', '$2b$10$N1.9ozZrQNZOKLYE3VieZ.R7p0lcpnNmryr58AmyCMS3KbtRND/tC', 'Laki-laki', '0856555419', 'Daerah Istimewa Yogyakarta', 'Bantul', 'Kotagede', 'Jagalan', 55171, 'Jl. Mondorakan No.5 B, Bodon, Jagalan, Kec. Kotagede, Kabupaten Bantul, Daerah Istimewa Yogyakarta ', NULL, 'Customer', '2025-01-02', 1, NULL, NULL, NULL),
('CUST011', 'Ardion', 'Bratajaya', 'brataa@gmail.com', '$2b$10$7rd3WvREqXXiuXoAiziBAeE.29.8w.FzoiZ4Ze6jZIWbEweDt1ZHe', 'Laki-laki', '0856555852', 'Jawa Barat', 'Bandung', 'Sumur Bandung', 'Pisang', 40110, 'Jl. Veteran No.25, Kb. Pisang, Kec. Sumur Bandung, Kota Bandung, Jawa Barat', NULL, 'Customer', '2025-01-02', 1, NULL, NULL, NULL),
('CUST012', 'Anthaleo', 'Baskara', 'leooo@gmail.com', '$2b$10$MIqGtUdVerS0RkIwRgUug.iKX.xh1fCL4C8.MqT.kiLEb2DaWOX42', 'Laki-laki', '0816555562', 'Jawa Timur', 'Sidoarjo', 'Sedati', 'Bono', 61251, 'Jl. Raya Sedati Gede No.11, Bono, Sedati Gede, Kec. Sedati, Kabupaten Sidoarjo, Jawa Timur', NULL, 'Customer', '2025-01-02', 1, NULL, NULL, NULL),
('CUST013', 'Aizar', 'Kennedy', 'zarr@gmail.com', '$2b$10$EqfX.wuskpFkqqVFIX/ZleFFjeLS5pbY7eqAfcYV2IYic4h/wlApC', 'Laki-laki', '0838555038', 'Jawa Barat', 'Bandung', ' Lengkong', 'Malabar', 40262, 'Jl. Burangrang No.41, Malabar, Kec. Lengkong, Kota Bandung, Jawa Barat', NULL, 'Customer', '2025-01-02', 1, NULL, NULL, NULL),
('CUST014', 'Zalleon', 'Carloza', 'zazaa@gmail.com', '$2b$10$BZWYweaCCOP8olTmER46D.8Qlv3Kp7gb2xZ0prn.QtZVJMR0fGNzW', 'Laki-laki', '0878555485', ' Jawa Barat ', 'Bandung', 'Cimenyan', 'Dago', 40132, 'Jl. Ir. H. Juanda No.91, Dago, Kec. Cimenyan, Kota Bandung, Jawa Barat', NULL, 'Customer', '2025-01-02', 1, NULL, NULL, NULL),
('CUST015', 'Carmelo', 'Ezeilie', 'carmell@gmail.com', '$2b$10$Yav3GVNIOM8RoFWNunQdgOrssHELNwa0r36zcNUFY0D0hBK551d.q', 'Laki-laki', '0812555914', 'Daerah Khusus Ibukota Jakarta', 'Jakarta Timur', 'Pulo Gadung', 'Rawamangun', 13220, 'Jl. H. Ten II No.24, Rawamangun, Kec. Pulo Gadung, Kota Jakarta Timur, Daerah Khusus Ibukota Jakarta', NULL, 'Customer', '2025-01-02', 1, NULL, NULL, NULL),
('CUST016', 'manusia', 'hebat', 'manusiahebat@gmail.com', '$2b$10$RjS8U1MLm2bVykXndZ7k8O2uMAyAUAEJmXvq9necD.majd.SH6.UO', 'Laki-laki', '08190989092', 'Jawa Timur', 'Sidoarjo', 'Waru', 'Kureksari', 61256, 'GYM Manusia Hebat Ruko Delta Sari Baru Depan kolam renang', NULL, 'Customer', '2025-01-02', 1, NULL, NULL, NULL),
('CUST017', 'Kareem', 'Maleek', 'musafeerbinmalik@gmail.com', '$2b$10$rJT7uRntJsQK0PMp43H1xObkElyiWg1xD/OIHm7uGc9DAuG72RE4i', 'Laki-laki', '0818184845754', 'Jawa Timur', 'Surabaya', 'Kali Deres', 'Ragungan', 65487, 'jl ragungan barat kalinom 5', NULL, 'Customer', '2025-01-02', 1, NULL, NULL, NULL),
('CUST018', 'Felicitas ', 'Mega', 'megamaharani@gmail.com', '$2b$10$BUiMTKuAn22bCnVWVFbLu.S.2RjA5Zv8IYDGb7.Zn/sROvhG1QEhe', 'Laki-laki', '081908353003', 'Jawa Timur', 'Sidoarjo', 'Waru', 'Kureksari', 61256, 'Delta Sari Indah Blok L-7', NULL, 'Customer', '2025-01-02', 1, NULL, NULL, NULL),
('CUST019', 'Toko Sinar', 'Gledek', 'akudewa@gmail.com', '$2b$10$3Z74wwkmgu0M5U6r/g3mLeU2KGIoauCBgrIM6l/WPowzauZ2lUtD2', 'Laki-laki', '0878555879', 'Jawa Timur', 'Sidoarjo', 'Waru', 'Kureksari', 61256, 'Delta Sari Raya 007', NULL, 'Customer', '2025-01-02', 1, NULL, NULL, NULL),
('CUST020', 'Theodorus', 'Albert', 'albertsamder@gmail.com', '$2b$10$5Rqu2L4Q7Sp/NK.nNMeV3.DTL83vxqL3RZToK69kllQ0uS8fWb/I6', 'Laki-laki', '088235969180', 'jawa timur', 'sidoarjo', 'waru', 'tropodo', 61256, 'Tropodo Indah N 39', NULL, 'Customer', '2025-01-02', 1, NULL, NULL, NULL),
('CUST021', 'Akbar', 'Maulana', '29akbarmaulana@gmail.com', '$2b$10$ZJWwZZJ6G5OzyVN3LfzM3ObZUINE6DJikVWZdLk.SPRt2ats5vpZK', 'Laki-laki', '081382641540', 'Sulawesi Utara', 'Manado', 'Wanea', 'Teling Atas', 95119, 'Jl. 17 Agustus No.17, Teling Atas, Kec. Wanea, Kota Manado, Sulawesi Utara 95119', NULL, 'Customer', '2025-01-03', 1, NULL, NULL, NULL),
('CUST022', 'Christopher', 'Gunawan', 'toge011100@gmail.com', '$2b$10$jEwEavrW0aqCyfl/xAGScekoaPukXUgNz4xjEyOsxijVsjAl.sjN6', 'Laki-laki', '0973014682', 'Jawa Timur', 'Surabaya', 'rungkut', 'kalikungkut', 404, 'Rungkut Asri ', NULL, 'Customer', '2025-01-03', 1, NULL, NULL, NULL),
('CUST023', 'Ratih', 'Setiawan', 'ratihstw@gmail.com', '$2b$10$d.qvhj7CWW2DxeduozYAI.9G3j0QOFC/Y7z3RJv13LZpu1hr7lGKO', 'Perempuan', '081855999232', 'Jawa Barat', 'Cimahi', 'Cimahi Tengah', 'Baros', 40521, 'Jl. Stasion, Baros, Kec. Cimahi Tengah, Kota Cimahi, Jawa Barat 40521', NULL, 'Customer', '2025-01-03', 1, NULL, NULL, NULL),
('CUST024', 'Hotel', 'Sinar', 'hotelsinar.juanda@gmail.com', '$2b$10$4/y6QiSzgEJ04hFIemQMV.DBWpAT.qPg7eZV2mLb4FrIikGiIxvxW', 'Laki-Laki', '08566612355', 'Jawa Timur', 'Sidoarjo', 'Sedati', 'Sedati Indah', 61256, 'Jl. Raya Bandara Juanda No.36-40', NULL, 'Customer', '2025-01-03', 1, NULL, NULL, NULL),
('CUST025', 'Fore', 'Delta Sari', 'foredeltasari@gmail.com', '$2b$10$gfRQKFaLVQzYuZClUmPbYuvJgSCHBfrawG5PIH.A87qo8AEfRqF7y', 'Laki-laki', '08881021357', 'Jawa Timur', 'Sidoarjo', 'Waru', 'Kureksari', 61256, 'Jl. Delta Sari Indah No.7, RW.16, Koreksari, Kureksari, Kec. Waru, Kabupaten Sidoarjo, Jawa Timur 61256', NULL, 'Customer', '2025-01-03', 1, NULL, NULL, NULL),
('CUST026', 'fani', 'c', 'namelesssteph@gmail.com', '$2b$10$5CfLFa23FDH2zkGcj11TkOCnlnVCRp/MRIM.YKmMGOJKURXws.bB.', 'Perempuan', '000000000000', 'jawa timur', 'sda', 'gdg', 'semambung', 262626, 'jl', NULL, 'Customer', '2025-01-03', 1, NULL, NULL, NULL),
('CUST027', 'gema', 'fajar', 'gemafajar011@gmail.com', '$2b$10$U33jyS6uhEf4G3ZXJWF5Y.Cw3l3tJgeYBKGhaQMdwu9gahwPh//sy', 'Laki-laki', '085162658554', 'sumatera barat', 'padang', 'koto tangah', 'lubuk minturun', 25172, 'jalan raya lubuk minturun', NULL, 'Customer', '2025-01-03', 1, NULL, NULL, NULL),
('CUST028', 'sonia', 'chandra', 'sonia.chandra2118@gmail.com', '$2b$10$lbwNj9JkNVVU.w1ZYk0qBu7kZIWYTUPtqnRjEbckNIuS5u.8zHyLO', 'Perempuan', '081249215329', 'Jawa Timur', 'Sidoarjo', 'Gedangan', 'Gemurung', 61254, 'Permata Alam Permai A2-14', NULL, 'Customer', '2025-01-03', 1, NULL, NULL, NULL),
('CUST029', 'Adrian', 'Adrian', 'nikolaus.adrian2@gmail.com', '$2b$10$6s9va0uFR1/2N5OJGi7NHek5JxDTNmwMlZT.Gulc81kfil38u8TGq', 'Laki-laki', '08113109893', 'Jawa Timur ', 'Sidoarjo', 'Waru', 'Kureksari', 61256, 'Delta Sari Indah Blok M no. 4, Kureksari, Waru, Sidoarjo', NULL, 'Customer', '2025-01-03', 1, NULL, NULL, NULL),
('CUST030', 'Fefe', 'Maharani', 'felicitasmaharani@gmail.com', '$2b$10$9Gs/V0.BmofCPqukOBZlJuaIm6zvKQzs/TsgWzxpkCvxJdUVzDdwK', 'Perempuan', '087851383378', 'Jawa Timur', 'Sidoarjo', 'Waru', 'Kureksari', 61256, 'Delta Sari Indah Blok L 7', NULL, 'Customer', '2025-01-03', 1, NULL, NULL, NULL),
('CUST031', 'Argentina', 'Gonzales', 'argentinagz@gmail.com', '$2b$10$o0aT8DVq1LABIYv/wLQcx.CgG.EtjEiStIqSq2t1nB5hxosuCaCGO', 'Laki-laki', '0854555732', 'Jawa Timur', 'Surabaya', 'Wonokromo', 'Darmo', 60256, 'Jl. Patmosusastro', NULL, 'Customer', '2025-01-03', 1, NULL, NULL, NULL),
('CUST032', 'Brazil', 'Da Silva', 'dasilva666brz@gmail.com', '$2b$10$nfsNjmUzaFSwYFlRN4j9O.eWRZ00x4nJc0EwwXt6xivFoOfFcIqDm', 'Laki-laki', '0852555201', 'Jawa Timur', 'Surabaya', 'Wonokromo', 'Darmo', 60241, 'Jl. Indragiri No.20', NULL, 'Customer', '2025-01-03', 1, NULL, NULL, NULL),
('CUST033', 'Nicolaus', 'Fristo', 'nicolaus.fristo@gmail.com', '$2b$10$MNiu2/GIEUsrPMsooes9keVHSiuoJG4pvsQ25Zum2gehOcHbv57Ny', 'Laki-laki', '081296962028', 'yogyakarta', 'bantul', 'kasihan', 'ngestiharjo', 55182, 'Sonopakis Lor No.269 RT.02 Ngestiharjo, Kasihan, Bantul, Yogyakarta 55182', NULL, 'Customer', '2025-01-03', 1, NULL, NULL, NULL),
('CUST034', 'Fransiskus ', 'Wibowo ', 'f.krisna.w.10@gmail.com', '$2b$10$rrTQk2lNtHONCcXXtL8u6OMn.AByH5N3xUf5DkZogUSAMXZBWo79y', 'Laki-laki', '089614544891', 'Jawa Timur ', 'Sidoarjo ', 'Gedangan ', 'Keboananom ', 61254, 'Jalan Telogo Bunder Gang 3', NULL, 'Customer', '2025-01-03', 1, NULL, NULL, NULL),
('CUST035', 'Arief', 'Prakoso', 'yoannesprakoso@gmail.com', '$2b$10$qhRvm8jqBdz.MV9dSRNLOuCkRoT4asYDZ8hQiY3qkBrtFc885FF5K', 'Laki-laki', '085251913441', 'Kalimantan Tengah', 'Katingan', 'Karingan Tengah', 'Tumbang Samba', 74454, 'Samba Danum', NULL, 'Customer', '2025-01-03', 1, NULL, NULL, NULL),
('CUST036', 'Iis', 'Dwi', 'dwyeidl@gmail.com', '$2b$10$HK.e41uwEtgLPhe78lF45.aEfAJ7r.15042HU7T38SThjFcRsr.iy', 'Perempuan', '081348871881', 'Kalimantan tengah', 'Katingan', 'Katingan tengah', 'Samba danum', 74454, 'Jl. SMA No. 37, RT 07 RW 02', NULL, 'Customer', '2025-01-03', 1, NULL, NULL, NULL),
('CUST037', 'Komang', 'Elvina', 'komang.elvina39@gmail.com', '$2b$10$rv27k1EMwc8XuEqzrMiLG.Y2FWys2YdfjsdTJLXZSHQe5P0n6MMUO', 'Perempuan', '082234600238', 'Jawa Timur', 'Surabaya', 'Sukolilo', 'Semolowaru', 60119, 'Semolowaru Indah II', NULL, 'Customer', '2025-01-03', 1, NULL, NULL, NULL),
('CUST038', 'valerin', 'astarina', 'valerin.wave@gmail.com', '$2b$10$/jILZ6CO9MFPaTAnscvQFebvBu0qDutEztwwuVH6KlKxNP3PM48VO', 'Perempuan', '087839708514', 'yogyakarta', 'yogyakarta', 'bantul', 'kasihan', 55181, 'nitiprayan rt 03 no 106 ', NULL, 'Customer', '2025-01-03', 1, NULL, NULL, NULL),
('CUST039', 'Louis', 'Elroi', 'louiselroi76@gmail.com', '$2b$10$9TFg0NaCVw8kPt/tOlGxJ.HOMTnKZhMTku0CMbQRiKjuLlxbRY0N2', 'Laki-laki', '08813243595', 'Jawa Timur', 'Sidoarjo', 'Waru', 'Pabean', 61253, 'Pabean Asri Blok O-14\nSedati', NULL, 'Customer', '2025-01-03', 1, NULL, NULL, NULL),
('CUST040', 'Yusian', 'Kasiwalli', 'dragonkayetanus@gmail.com', '$2b$10$yVrKkJ8WdNkrP6uoAlYUD.tKIEBspYqAa6fz6J/fUxW3UCCL0wgW6', 'Laki-laki', '082139882557', 'Jatim', 'Sidoarjo', 'Gedangan', 'Gedangan', 61254, 'Sidoarjo', NULL, 'Customer', '2025-01-03', 1, NULL, NULL, NULL),
('CUST041', 'Amadea ', 'Putri', 'amadea243@gmail.com', '$2b$10$EZCUV2VPvZn4m0h.u3uwGuTskP8.xLRsFcv.zQYv7.bToZ0u/a2q.', 'Perempuan', '082139262000', 'Jatim', 'Sidoarjo', 'gedangan', 'keboansikep', 61254, 'Griya Permata Gedangan B6 ', NULL, 'Customer', '2025-01-03', 1, NULL, NULL, NULL),
('CUST042', 'Vania', 'Aracelly', 'vincensiavaniaa@gmail.com', '$2b$10$2PnY52yXpJexeX9pYBuYQObZWSUU2Vj8BU0zGPVfs9wjYNFv.2Ssm', 'Perempuan', '081231399958', 'Jawa Timur', 'Surabaya', 'Rungkut', 'Wonorejo', 60296, 'Jl. Wonorejo Pernai Selatan V No.26 Perumahan Nirwana Eksekutif CC-375', NULL, 'Customer', '2025-01-03', 1, NULL, NULL, NULL),
('CUST043', 'kirana', 'p', 'kirana_prameswari@yahoo.co.id', '$2b$10$.GiyI1wZc/S2KhvoETlup.EhH/8xOCZXV6Vb2xcR48S4SxJyveIby', 'Perempuan', '081999307990', 'bali', 'denpasar', 'kutsel', 'jimb', 80361, 'bali', NULL, 'Customer', '2025-01-03', 1, NULL, NULL, NULL),
('CUST044', 'aldo', 'marchel', 'geraldomarchel20toped@gmail.com', '$2b$10$QaWRtAXuWV7sG3Wj80iuwugrACWEbFlfWZwCW5ptzbMPjyIIkeAlm', 'Laki-laki', '081335547978', 'Jakarta', 'Jakarta ', 'Jakarta Barat', 'Tanjung Duren', 9, '-', NULL, 'Customer', '2025-01-03', 1, NULL, NULL, NULL),
('CUST045', 'aylsa', 'Salsabila', 'aylsasalsabila@gamil.com', '$2b$10$ETVwJO5wPIymcktWnxfWLevmoVcC1b8FQpUjJFGGGz0ZcodwD1ogS', 'Perempuan', '081332011494', 'jawa timur', 'sidoarjo', 'gedangan', 'gemurung', 61254, 'valencia terrace cc5/22', NULL, 'Customer', '2025-01-03', 1, NULL, NULL, NULL),
('CUST046', 'aylsa ', 'salsabila', 'agathasalsabila23@gmail.com', '$2b$10$VOkFNu5GnKmn7KSBs6niQO7OKBPX.v6I82TBGFmm3iCNC6iEbGfoi', 'Perempuan', '081332011494', 'jawa timur', 'sidoarjo', 'gedangan', 'gemurung', 61254, 'sda', NULL, 'Customer', '2025-01-03', 1, NULL, NULL, NULL),
('CUST047', 'Fajar', 'Fajar', 'jangandibacabrok@gmail.com', '$2b$10$7ZcrBsF/4KyciGxm/3qL7.v13zqFPMI.RkTuknkl45ol3yZJ8pU22', 'Laki-laki', '0888888888888', 'Jakarta', 'Jakarta Utara', 'Koja', 'Tugu Selatan', 10123, 'Plumpang', NULL, 'Customer', '2025-01-03', 1, NULL, NULL, NULL),
('CUST048', 'Albert', 'Bayu Sani', 'sanialbertbayu612@gmail.com', '$2b$10$PGopxJ5QdIGb4GCJAVbKreZZweyqGKTRO6IkU8DvVgIscEIXGMvdK', 'Laki-laki', '082233554887', 'Jawa Timur', 'Surabaya', 'Waru', 'Ngingas', 61256, 'Delta Tama 6/12', NULL, 'Customer', '2025-01-04', 1, NULL, NULL, NULL),
('CUST049', 'Josephine ', 'Husodo', 'josephinehusodo@gmail.com', '$2b$10$SMa.Dp.mKnO9VVa6qfUObejqrwusrYyYmfvvADhNBHJtSt2OcwXny', 'Perempuan', '081235484601', 'Jawa Timur', 'Sidoarjo', 'Waru', 'Wedoro', 61256, 'Rewwin', NULL, 'Customer', '2025-01-09', 1, NULL, NULL, NULL),
('CUST050', 'Percobaan', 'Register', 'cobaregis@gmail.com', '$2b$10$veVBzE9LIVrakvrxHnDNG.dkG8KQHRrkLmX.rZsnSCFcaF0j4aC/C', 'Laki-laki', '081908353003', 'Jawa Timur', 'Sidoarjo', 'Waru', 'Kureksari', 61256, 'Percobaan REGIS 1', NULL, 'Customer', '2025-02-18', 1, NULL, NULL, NULL),
('CUST051', 'test', 'test', 'tt@g.com', '$2b$10$bgmeAJ48COUDztKhccOjI.7bwny8g09vlp7tUBZZgSKLIUI1WKzPm', 'Laki-laki', '085583302510', '11', '409', '16', 'Kedung Baruk', 12321412, 'dsadsadsadsa', NULL, 'Customer', '2025-04-17', 1, NULL, NULL, NULL),
('CUST052', 'Mas', 'Dewa', 'masdewa@gmail.com', '$2b$10$6ECHTprtHJjATxcRw6umY.0wQniElyMDF/9Fx/8/da1eupTO7AWTy', 'Laki-laki', '081908353003', '11', '409', '16', 'Kurersari', 61256, 'dsakdjsakjd', NULL, 'Customer', '2025-04-17', 1, NULL, NULL, NULL),
('CUST053', 'dsad', 'sad', 'dsa@dd.com', '$2b$10$c/EQ.DnnfgvOxVBux3ED0ONu00QA4Rfgg9/Sh04lNvYtN5h1vNt3q', 'Laki-laki', '0838555485', 'Jawa Timur', 'Banyuwangi', 'Kabupaten Siliragung', 'Kureksari', 123133, 'dsadsa', NULL, 'Customer', '2025-04-17', 1, NULL, NULL, NULL),
('CUST054', 'TESTBARU', 'BARU', 'ttbaru@gmail.com', '$2b$10$zZFDbw2MhpMSK96/N7adz.3/o3.BERdaKbeasxCgGGw3b3HPdvJ7.', 'Laki-laki', '081908353003', 'Jawa Timur', 'Malang', 'Lowokwaru', 'Kureksari', 61256, 'ASDSADSA', NULL, 'Customer', '2025-04-17', 1, '11', '256', NULL),
('CUST055', 'Coba', 'Lagi', 'cobalagi@gmail.com', '$2b$10$pvDg7V1LB2lfUy2gbD57Q.X3MkxsKYgHyjKc9YqlFBWNYEBhd2nMq', 'Laki-laki', '081908353003', 'Jawa Timur', 'Sidoarjo', 'Waru', 'Kureksari', 61254, 'DSI L-7', NULL, 'Customer', '2025-04-17', 1, '11', '409', NULL),
('CUST056', 'Felix ', 'Dewa', 'dewafelix123@gmail.com', '$2b$10$qgdOBm7llRLxi/e6pILR7e9m1dubBvyke8qYx9OuWLMn0s6sPdOje', 'Laki-laki', '0838555485', 'Jawa Timur', 'Sidoarjo', 'Waru', 'Kureksari', 61256, 'DSI L-7', NULL, 'Customer', '2025-04-18', 1, '11', '409', NULL),
('PEG001', 'Priska', 'Setiawan', 'priskasetya@gmail.com', '$2b$10$KZJagIct6Sibrg2OYaOC1.hFvYXnsLVJKM.QCLvkcjhR6EvyTit4K', 'Perempuan', '0856555419', 'Jawa Timur', '', 'Wiyung', 'Babatan', 60227, 'Jl. Raya Menganti No.88, Babatan, Kec. Wiyung, Surabaya, Jawa Timur 60227', NULL, 'Pegawai', '2024-12-18', 1, NULL, NULL, NULL),
('PEG002', 'Armayga', 'Aldeoza', 'peg1ptmeg@gmail.com', '$2b$10$r0P09bzCFwStdZwgEN8YVuELqC7rUuruTXTx9nOZEs6yQTi/6bI4m', 'Laki-laki', '0816555562', 'Jawa Timur', 'Sidoarjo', 'Sedati', 'Pabean', 61253, 'Pabean Asri Blok O-14, Sidoarjo, Jawa Timur, Indonesia 61253.', NULL, 'Admin', '2025-01-01', 1, NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `voucher`
--

DROP TABLE IF EXISTS `voucher`;
CREATE TABLE `voucher` (
  `id_voucher` varchar(255) NOT NULL,
  `nama_voucher` varchar(255) NOT NULL,
  `kode_voucher` varchar(255) NOT NULL,
  `potongan` int(11) NOT NULL,
  `jumlah_voucher` int(11) NOT NULL,
  `created_at` date NOT NULL,
  `status` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `voucher`
--

INSERT INTO `voucher` (`id_voucher`, `nama_voucher`, `kode_voucher`, `potongan`, `jumlah_voucher`, `created_at`, `status`) VALUES
('VOC001', 'HUTRI', 'MEG1120042024', 5000, 5, '2024-12-21', 1);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `beli`
--
ALTER TABLE `beli`
  ADD PRIMARY KEY (`id_beli`);

--
-- Indexes for table `beli_produk`
--
ALTER TABLE `beli_produk`
  ADD PRIMARY KEY (`id_beli_produk`);

--
-- Indexes for table `brand`
--
ALTER TABLE `brand`
  ADD PRIMARY KEY (`id_brand`);

--
-- Indexes for table `cart`
--
ALTER TABLE `cart`
  ADD PRIMARY KEY (`id_cart`);

--
-- Indexes for table `cart_produk`
--
ALTER TABLE `cart_produk`
  ADD PRIMARY KEY (`id_cart_produk`);

--
-- Indexes for table `favorite`
--
ALTER TABLE `favorite`
  ADD PRIMARY KEY (`id_favorite`);

--
-- Indexes for table `favorite_produk`
--
ALTER TABLE `favorite_produk`
  ADD PRIMARY KEY (`id_favorite_produk`);

--
-- Indexes for table `foto_product`
--
ALTER TABLE `foto_product`
  ADD PRIMARY KEY (`nama`);

--
-- Indexes for table `kategori`
--
ALTER TABLE `kategori`
  ADD PRIMARY KEY (`id_kategori`);

--
-- Indexes for table `pakai_voucher`
--
ALTER TABLE `pakai_voucher`
  ADD PRIMARY KEY (`id_pakaivoucher`);

--
-- Indexes for table `produk`
--
ALTER TABLE `produk`
  ADD PRIMARY KEY (`id_produk`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id_user`);

--
-- Indexes for table `voucher`
--
ALTER TABLE `voucher`
  ADD PRIMARY KEY (`id_voucher`);
SET FOREIGN_KEY_CHECKS=1;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
