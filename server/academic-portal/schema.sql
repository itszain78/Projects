-- ==========================================================
-- SECURE ACADEMIC MANAGEMENT SYSTEM — DATABASE SCHEMA
-- Developer: Zain Ul Haseeb (BS Software Engineering)
-- Features: Normalized Tables, Foreign Key Constraints, Indexes
-- ==========================================================

CREATE DATABASE IF NOT EXISTS `academic_portal_db` 
CHARACTER SET utf8mb4 
COLLATE utf8mb4_unicode_ci;

USE `academic_portal_db`;

-- 1. USERS TABLE (Role-Based Access Control)
CREATE TABLE IF NOT EXISTS `users` (
  `id` INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  `full_name` VARCHAR(100) NOT NULL,
  `email` VARCHAR(150) NOT NULL UNIQUE,
  `password_hash` VARCHAR(255) NOT NULL,
  `role` ENUM('student', 'faculty', 'admin') NOT NULL DEFAULT 'student',
  `status` ENUM('active', 'suspended') NOT NULL DEFAULT 'active',
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX `idx_email_role` (`email`, `role`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 2. COURSES TABLE
CREATE TABLE IF NOT EXISTS `courses` (
  `id` INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  `course_code` VARCHAR(20) NOT NULL UNIQUE,
  `course_name` VARCHAR(150) NOT NULL,
  `credit_hours` TINYINT UNSIGNED NOT NULL DEFAULT 3,
  `department` VARCHAR(100) NOT NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 3. ENROLLMENTS & GRADES TABLE (Relational Mapping)
CREATE TABLE IF NOT EXISTS `enrollments` (
  `id` INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  `student_id` INT UNSIGNED NOT NULL,
  `course_id` INT UNSIGNED NOT NULL,
  `semester` VARCHAR(20) NOT NULL,
  `gpa` DECIMAL(3, 2) DEFAULT NULL,
  `letter_grade` VARCHAR(5) DEFAULT NULL,
  `status` ENUM('enrolled', 'completed', 'dropped') NOT NULL DEFAULT 'enrolled',
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (`student_id`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  FOREIGN KEY (`course_id`) REFERENCES `courses`(`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  UNIQUE KEY `unique_student_course_semester` (`student_id`, `course_id`, `semester`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 4. SECURITY AUDIT LOGS (Security Monitoring)
CREATE TABLE IF NOT EXISTS `security_logs` (
  `id` INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  `user_id` INT UNSIGNED NULL,
  `action` VARCHAR(150) NOT NULL,
  `ip_address` VARCHAR(45) NOT NULL,
  `user_agent` VARCHAR(255) NOT NULL,
  `timestamp` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- DEMO SEED DATA
-- Generate your own hash first:  php -r "echo password_hash('YOUR_PASSWORD', PASSWORD_BCRYPT);"
-- then replace both REPLACE_WITH_YOUR_HASH values below. Never commit real passwords.
INSERT INTO `users` (`id`, `full_name`, `email`, `password_hash`, `role`) VALUES
(1, 'Zain Ul Haseeb', 'zain.student@nfc.edu.pk', 'REPLACE_WITH_YOUR_HASH', 'student'),
(2, 'Admin Manager', 'admin@nfc.edu.pk', 'REPLACE_WITH_YOUR_HASH', 'admin')
ON DUPLICATE KEY UPDATE `id`=`id`;

INSERT INTO `courses` (`id`, `course_code`, `course_name`, `credit_hours`, `department`) VALUES
(1, 'SE-301', 'Software Architecture & Design', 3, 'Software Engineering'),
(2, 'DB-204', 'Relational Database Management Systems', 4, 'Computer Science'),
(3, 'WEB-105', 'Full-Stack Web Engineering', 3, 'Software Engineering')
ON DUPLICATE KEY UPDATE `id`=`id`;

INSERT INTO `enrollments` (`student_id`, `course_id`, `semester`, `gpa`, `letter_grade`, `status`) VALUES
(1, 1, 'Fall 2024', 3.80, 'A', 'completed'),
(1, 2, 'Fall 2024', 4.00, 'A+', 'completed'),
(1, 3, 'Spring 2025', 3.70, 'A-', 'enrolled')
ON DUPLICATE KEY UPDATE `gpa`=VALUES(`gpa`);
