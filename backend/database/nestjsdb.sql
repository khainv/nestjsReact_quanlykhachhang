-- phpMyAdmin SQL Dump
-- version 5.2.2
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Oct 27, 2026 at 10:01 AM
-- Server version: 8.4.3
-- PHP Version: 8.3.33

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `nestjsdb`
--

-- --------------------------------------------------------

--
-- Table structure for table `tbladmin`
--

CREATE TABLE `tbladmin` (
  `id` int NOT NULL,
  `gro_id` int NOT NULL,
  `adm_level` int DEFAULT NULL,
  `adm_status` int NOT NULL DEFAULT '1',
  `adm_account` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `adm_password` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `adm_name` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `adm_rewrite` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `adm_mobile` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `adm_email` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tbladmin`
--

INSERT INTO `tbladmin` (`id`, `gro_id`, `adm_level`, `adm_status`, `adm_account`, `adm_password`, `adm_name`, `adm_rewrite`, `adm_mobile`, `adm_email`, `created_at`, `updated_at`) VALUES
(1, 2, 1, 1, 'admin', '$2b$10$U/dIorccAAiYXGI.0Js0GuJhECewcr1Mq5E4gX.rbDUDo4fCxIoUC', 'Me, my friends and polar bears', '', '', '', '0000-00-00 00:00:00', '2026-10-24 16:16:13.000000'),
(3, 2, 2, 1, 'admin2', '$2b$10$UZBL0I1jFqVdDh40wZ.HguefmgrPSpJhtQGdymxJdGdyHQ.h0Jpz.', 'àdas2', '', '', '', '0000-00-00 00:00:00', '2026-10-07 17:03:59.285835'),
(4, 3, NULL, 1, 'knv', '123', 'knv2', 'knv2', NULL, NULL, '2026-09-25 06:43:58', '2026-09-29 11:14:20.000000');

-- --------------------------------------------------------

--
-- Table structure for table `tbladmin_token`
--

CREATE TABLE `tbladmin_token` (
  `id` int NOT NULL,
  `adm_id` int NOT NULL,
  `updated_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `refresh_token` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `adm_name` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `access_token` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tbladmin_token`
--

INSERT INTO `tbladmin_token` (`id`, `adm_id`, `updated_at`, `refresh_token`, `adm_name`, `created_at`, `access_token`) VALUES
(1, 1, '2026-10-12 15:16:57.296642', '$2b$10$/Yqzn8tkYSq4mb2ZHVks8Ov80EEDH9bN0zAG7pDKCKc22OHfmF6.K', NULL, '2026-10-12 08:16:57', NULL),
(2, 1, '2026-10-12 16:27:56.078677', '$2b$10$NNDFDeZamm5y9KAktIlYFOb/RxYPpLLFdY1AMmG6sDMW0jnVqIimK', NULL, '2026-10-12 09:27:56', NULL),
(3, 1, '2026-10-12 16:28:30.029503', '$2b$10$BxDYPVrladpLfNyCrGAPcO7K87V8jNZfBkP7hajxpypSdHy3Dblhi', NULL, '2026-10-12 09:28:30', NULL),
(4, 1, '2026-10-12 16:51:30.234596', '$2b$10$3RxOZbhkkFZop8jixtzoB.QQmiSykUgl0O3H2KgtUAaUdwn9nMn7i', NULL, '2026-10-12 09:51:30', NULL),
(5, 1, '2026-10-12 16:58:44.236211', '$2b$10$KF9/E0N8hat2A2IxHdrQHeZ9asQIi4tW8jYK25vlAscaFi6m7vYlu', NULL, '2026-10-12 09:58:44', NULL),
(6, 1, '2026-10-13 16:46:51.254894', '$2b$10$jWorCpEdAhlE6Yuxp9YFL.LJn8mcW0FGWYMTcBlTxkhzEtrXSVZoW', NULL, '2026-10-13 09:46:51', NULL),
(7, 1, '2026-10-13 16:48:11.087947', '$2b$10$GksmU9zyobl5/A3iO2gWV.GJRZEQkLu1nrvf0ttH1l2ig33jHCNsy', NULL, '2026-10-13 09:48:11', NULL),
(8, 1, '2026-10-14 10:23:14.498227', '$2b$10$n3CaAQa0CVAsXMJN/lkaG.jTWQNlltkPGE94tbAOCKbc6m.rP/QJO', NULL, '2026-10-14 03:23:14', NULL),
(9, 1, '2026-10-15 17:00:29.878930', '$2b$10$oAA3YxFQCIbGbuHG06jK.ec79uL4uCndhzK4h1VdHHl.7OoSkrKVC', NULL, '2026-10-15 10:00:29', NULL),
(10, 1, '2026-10-16 16:39:24.912751', '$2b$10$I1ORbMPXKhcDZZ96qiuC.uQdrHAiCUggbRBpebrdsbHeLbRgybZUm', NULL, '2026-10-16 09:39:24', NULL),
(11, 1, '2026-10-20 12:06:27.764207', '$2b$10$QUPppuy5t.Q1cC0MpXaKIeDfu7BfPJK5nYBW2y2hpyJPhrXPwcAIS', NULL, '2026-10-20 05:06:27', NULL),
(12, 1, '2026-10-20 16:57:34.971606', '$2b$10$XIDHs1GxvU5ImQNG.1WVpOxdo1UkqjzKAfqvm3EiBlxIKdYFCUOvW', NULL, '2026-10-20 09:57:34', NULL),
(13, 1, '2026-10-23 14:22:57.604327', '$2b$10$PpmYn.e.IkBuoFjUPzRsveBZlcUwyMhSrNaZyKU3hF.vR20BbMt..', NULL, '2026-10-23 07:22:57', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsImFkbV9hY2NvdW50IjoiYWRtaW4iLCJpYXQiOjE3OTI3NDAxNzYsImV4cCI6MTc5Mjc0Mzc3Nn0.LZMdVMRJtmN9ZE9HjXJpJn4rg9IuMiRUxGQ2e8vPtIA'),
(15, 1, '2026-10-24 15:48:58.866622', '$2b$10$aq1EyVZfPxiPMj9qChVSHem.AM/JgEZc46hCx0m5QW3c8D29/mILa', NULL, '2026-10-24 08:48:58', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsImFkbV9hY2NvdW50IjoiYWRtaW4iLCJpYXQiOjE3OTI4MzE3MzgsImV4cCI6MTc5MjgzNTMzOH0.pxEvf9GzNwOlaiOLySwcexzyqymlY8uprV4r-syLJdA'),
(16, 1, '2026-10-24 15:55:56.408545', '$2b$10$M//bGjGJS2kxF.mOssM8.OcLyiksHbuahAgSiNGlWW8Ve8b2smNSi', NULL, '2026-10-24 08:55:56', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsImFkbV9hY2NvdW50IjoiYWRtaW4iLCJpYXQiOjE3OTI4MzIxNTYsImV4cCI6MTc5MjgzNTc1Nn0.rfmwan1PAi9JmdG-sOEXAixB4vYtS_DUxaNypbzB3_E'),
(17, 1, '2026-10-24 15:59:25.509537', '$2b$10$YOxN2joLxy9enPpD5Djq7OgiMyPa8CU5JNXq3GXGmKOFjlsSBMW0i', NULL, '2026-10-24 08:59:25', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsImFkbV9hY2NvdW50IjoiYWRtaW4iLCJpYXQiOjE3OTI4MzIzNjUsImV4cCI6MTc5MjgzMjQ4NX0.MbbCdViLH7NnWVDgS4zIZ_AN2hstURoolSX3Wtic1ZU'),
(18, 1, '2026-10-24 16:05:14.320996', '$2b$10$VoKrEEgAEOOqFb6EKwBB1eIEqiqNVC8ht9Gk8.EoO/aSq8TzroQ5q', NULL, '2026-10-24 09:05:14', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsImFkbV9hY2NvdW50IjoiYWRtaW4iLCJpYXQiOjE3OTI4MzI3MTQsImV4cCI6MTc5MjgzMjgzNH0.U1A8M8dPDlFmjnP5zcBP2imf94_e-9GJY5I73b8YEmc'),
(19, 1, '2026-10-24 16:07:21.052348', '$2b$10$cgb.501bi.z9hfb.SPXjiOCgRRzvaqQ4rOlTScNoJCNFrN/wtjCDG', NULL, '2026-10-24 09:07:21', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsImFkbV9hY2NvdW50IjoiYWRtaW4iLCJpYXQiOjE3OTI4MzI4NDAsImV4cCI6MTc5MjgzMjk2MH0.0z744m7Jd2-4FJcEflBulUDVSK3RV2cDdUGCLYhEPzg'),
(20, 1, '2026-10-24 16:07:35.289092', '$2b$10$iiwjQLxB86Vm/t4infLbsenSApzlIGGydVgLcp527rEutZYqvOw7C', NULL, '2026-10-24 09:07:35', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsImFkbV9hY2NvdW50IjoiYWRtaW4iLCJpYXQiOjE3OTI4MzI4NTUsImV4cCI6MTc5MjgzMjk3NX0.dQX_KTJdzTJySlMUmCHMfX9TzGdlus3z_u3h9sSSu-k'),
(21, 1, '2026-10-24 16:13:55.444812', '$2b$10$JGlcubr6T4.n33syclPLve3fhmOW8U9B854T9Nb4CfZmUHpM1BYGa', NULL, '2026-10-24 09:13:55', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsImFkbV9hY2NvdW50IjoiYWRtaW4iLCJpYXQiOjE3OTI4MzMyMzUsImV4cCI6MTc5MjgzMzM1NX0.Nqdv4RhwLaTKlF-Rhh0VxCOLLjupKP1X3zDfsjKV9yY'),
(22, 1, '2026-10-24 16:16:06.120987', '$2b$10$VvnjE9aVqtOkchvbtIpGuOKc/H9LtRRL6t//dDGMAsYUBaNEz4n/e', NULL, '2026-10-24 09:16:06', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsImFkbV9hY2NvdW50IjoiYWRtaW4iLCJpYXQiOjE3OTI4MzMzNjYsImV4cCI6MTc5MjgzMzQ4Nn0.aJmPKX1lfOG_DCo857Z7a38PZmgYjstBY7y95pMHcSM'),
(23, 1, '2026-10-27 11:15:49.991218', '$2b$10$1xaq13VsFinKkwIskwlksugboDrjMd6wkNP2rBTd4lkgtG5UXuNAO', NULL, '2026-10-27 04:15:49', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsImFkbV9hY2NvdW50IjoiYWRtaW4iLCJpYXQiOjE3OTMwNzQ1NDksImV4cCI6MTc5MzA3NDY2OX0.x7uFEPkxemCX1DEjeBWsGoDI-su30K0JaeyXPUdxa90'),
(24, 1, '2026-10-27 14:14:53.873916', '$2b$10$pOns/4pDrRR37VVAtwhhZ.pVRoGPjnAkNLggeEREbbNnTV3bH9tIm', NULL, '2026-10-27 07:14:53', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsImFkbV9hY2NvdW50IjoiYWRtaW4iLCJpYXQiOjE3OTMwODUyOTMsImV4cCI6MTc5MzA4NTQxM30.hyFpgtp56OO004P4HZuh1oUWWlcEwL2l9WG1NyNM-XM'),
(25, 1, '2026-10-27 14:22:23.911518', '$2b$10$ACajORSMKloXIUoqRBWQGe..dKzGzer8h2DX14oKDfLRgRLAh3y9q', NULL, '2026-10-27 07:22:23', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsImFkbV9hY2NvdW50IjoiYWRtaW4iLCJpYXQiOjE3OTMwODU3NDMsImV4cCI6MTc5MzA5MTY4M30.Rymqa6njWszM4Ut_yeX-v931-0kIgec0iR_CJHGMDHM'),
(26, 1, '2026-10-27 15:20:51.708061', '$2b$10$nlXWvKKm4Nj3YPK4xA8Nu.wtZwCdDL.47w3IiAolbD4d/bRTHaDsu', NULL, '2026-10-27 08:20:51', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsImFkbV9hY2NvdW50IjoiYWRtaW4iLCJpYXQiOjE3OTMwODkyNTEsImV4cCI6MTc5MzA5NTE5MX0.KWClUNV_2UM0CkeEmlgFBoIaRuxS7t5urr6lMgzuerY');

-- --------------------------------------------------------

--
-- Table structure for table `tbluser`
--

CREATE TABLE `tbluser` (
  `id` int UNSIGNED NOT NULL,
  `use_code` varchar(200) COLLATE utf8mb4_general_ci NOT NULL,
  `use_name` varchar(200) COLLATE utf8mb4_general_ci NOT NULL,
  `use_phone` varchar(200) COLLATE utf8mb4_general_ci NOT NULL,
  `use_img` varchar(250) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `use_address` varchar(250) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `use_status` int NOT NULL DEFAULT '0',
  `use_sex` int NOT NULL DEFAULT '1',
  `use_birthday` date DEFAULT NULL,
  `use_type` int NOT NULL,
  `created_by` int DEFAULT NULL COMMENT 'người tạo',
  `updated_by` int DEFAULT NULL COMMENT 'người update gần nhất',
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `tblusers`
--

CREATE TABLE `tblusers` (
  `id` int UNSIGNED NOT NULL,
  `use_code` varchar(200) COLLATE utf8mb4_general_ci NOT NULL,
  `use_name` varchar(250) COLLATE utf8mb4_general_ci NOT NULL,
  `use_phone` varchar(20) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `use_email` varchar(191) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `use_sex` tinyint UNSIGNED NOT NULL DEFAULT '0',
  `use_birthday` date DEFAULT NULL,
  `use_img` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `use_address` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `use_type` tinyint UNSIGNED NOT NULL DEFAULT '1',
  `use_status` tinyint UNSIGNED NOT NULL DEFAULT '1',
  `created_by` int UNSIGNED DEFAULT NULL,
  `updated_by` int UNSIGNED DEFAULT NULL,
  `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updated_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tblusers`
--

INSERT INTO `tblusers` (`id`, `use_code`, `use_name`, `use_phone`, `use_email`, `use_sex`, `use_birthday`, `use_img`, `use_address`, `use_type`, `use_status`, `created_by`, `updated_by`, `created_at`, `updated_at`) VALUES
(1, 'KH-MVQDKGRZ-1JCCY', 'Khách hàng 1', NULL, NULL, 0, NULL, NULL, NULL, 1, 1, 1, 1, '2026-10-27 14:39:32.985630', '2026-10-27 14:39:32.985630'),
(2, 'KH-MVQEU1TT-2PH7B', 'Nguyễn Văn A', '0901234567', 'nguyenvana@example.com', 1, '1990-05-20', NULL, 'Số 10 Nguyễn Trãi', 1, 2, 1, 1, '2026-10-27 15:14:59.781066', '2026-10-27 15:14:59.781066');

-- --------------------------------------------------------

--
-- Table structure for table `use_activities`
--

CREATE TABLE `use_activities` (
  `id` int UNSIGNED NOT NULL,
  `adm_id` int NOT NULL,
  `use_id` int NOT NULL,
  `act_name` text COLLATE utf8mb4_general_ci NOT NULL,
  `act_des` text COLLATE utf8mb4_general_ci NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `tbladmin`
--
ALTER TABLE `tbladmin`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tbladmin_token`
--
ALTER TABLE `tbladmin_token`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tbluser`
--
ALTER TABLE `tbluser`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tblusers`
--
ALTER TABLE `tblusers`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `uk_use_code` (`use_code`),
  ADD KEY `idx_use_created_at` (`created_at`),
  ADD KEY `idx_use_status` (`use_status`),
  ADD KEY `idx_use_phone` (`use_phone`);

--
-- Indexes for table `use_activities`
--
ALTER TABLE `use_activities`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `tbladmin`
--
ALTER TABLE `tbladmin`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `tbladmin_token`
--
ALTER TABLE `tbladmin_token`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=27;

--
-- AUTO_INCREMENT for table `tbluser`
--
ALTER TABLE `tbluser`
  MODIFY `id` int UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `tblusers`
--
ALTER TABLE `tblusers`
  MODIFY `id` int UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `use_activities`
--
ALTER TABLE `use_activities`
  MODIFY `id` int UNSIGNED NOT NULL AUTO_INCREMENT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
