<?php
/**
 * SECURE PDO DATABASE CONNECTION PROVIDER
 * Protection: SQL Injection Immunity via Strict Prepared Statement Emulation Disabled
 * Developer: Zain Ul Haseeb
 */

define('DB_HOST', 'localhost');
define('DB_USER', 'root');
define('DB_PASS', '');
define('DB_NAME', 'academic_portal_db');
define('DB_CHARSET', 'utf8mb4');

function get_db_connection() {
    static $pdo = null;

    if ($pdo === null) {
        $dsn = sprintf("mysql:host=%s;dbname=%s;charset=%s", DB_HOST, DB_NAME, DB_CHARSET);
        $options = [
            PDO::ATTR_ERRMODE                  => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE       => PDO::FETCH_ASSOC,
            PDO::ATTR_EMULATE_PREPARES         => false, // Crucial for 100% SQLi immunity
            PDO::MYSQL_ATTR_INIT_COMMAND       => "SET NAMES utf8mb4 COLLATE utf8mb4_unicode_ci"
        ];

        try {
            $pdo = new PDO($dsn, DB_USER, DB_PASS, $options);
        } catch (PDOException $e) {
            // Log real error internally, return generic error to user to avoid path disclosures
            error_log("[DB Error] Connection failed: " . $e->getMessage());
            http_response_code(500);
            die(json_encode([
                'status'  => 'error',
                'message' => 'Database connection failed. Please contact site administrator.'
            ]));
        }
    }

    return $pdo;
}
