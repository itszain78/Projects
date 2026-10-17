<?php
/**
 * CORE SECURITY MIDDLEWARE & HELPERS
 * Protections: Session Security, CSRF Token Generation & Check, XSS Output Escaping, RBAC
 * Developer: Zain Ul Haseeb
 */

// 1. Session Hardening
function init_secure_session() {
    if (session_status() === PHP_SESSION_NONE) {
        ini_set('session.cookie_httponly', 1); // Prevents JS reading session cookies
        ini_set('session.use_only_cookies', 1);
        ini_set('session.cookie_samesite', 'Lax'); // Protects against CSRF
        session_start();
    }

    // Session Rotation (30-minute expiration)
    if (!isset($_SESSION['created'])) {
        $_SESSION['created'] = time();
    } elseif (time() - $_SESSION['created'] > 1800) {
        session_unset();
        session_destroy();
        session_start();
        $_SESSION['created'] = time();
    }
}

// 2. Cryptographic CSRF Token Generator & Verifier
function generate_csrf_token() {
    init_secure_session();
    if (empty($_SESSION['csrf_token'])) {
        $_SESSION['csrf_token'] = bin2hex(random_bytes(32));
    }
    return $_SESSION['csrf_token'];
}

function verify_csrf_token($token) {
    init_secure_session();
    if (empty($_SESSION['csrf_token']) || empty($token)) {
        return false;
    }
    // Timing-attack safe comparison
    return hash_equals($_SESSION['csrf_token'], $token);
}

// 3. XSS Escaping Helper
function escape_html($data) {
    if (is_array($data)) {
        return array_map('escape_html', $data);
    }
    return htmlspecialchars((string)$data, ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8');
}

// 4. Role-Based Access Control (RBAC) Check
function require_auth_role($allowed_roles = []) {
    init_secure_session();
    if (!isset($_SESSION['user_id']) || !isset($_SESSION['user_role'])) {
        http_response_code(401);
        echo json_encode(['status' => 'error', 'message' => 'Unauthorized: Please log in.']);
        exit;
    }

    if (!empty($allowed_roles) && !in_array($_SESSION['user_role'], $allowed_roles, true)) {
        http_response_code(403);
        echo json_encode(['status' => 'error', 'message' => 'Forbidden: Access denied for your role.']);
        exit;
    }
}

// 5. Security Logging
function log_security_event($user_id, $action) {
    try {
        $db = get_db_connection();
        $ip = $_SERVER['REMOTE_ADDR'] ?? '127.0.0.1';
        $ua = substr($_SERVER['HTTP_USER_AGENT'] ?? 'Unknown', 0, 255);
        $stmt = $db->prepare("INSERT INTO security_logs (user_id, action, ip_address, user_agent) VALUES (?, ?, ?, ?)");
        $stmt->execute([$user_id, $action, $ip, $ua]);
    } catch (Exception $e) {
        error_log("[Security Log Error] " . $e->getMessage());
    }
}
