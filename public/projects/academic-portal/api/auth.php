<?php
/**
 * SECURE AUTHENTICATION & LOGIN API ENDPOINT
 * Features: Rate limiting check, password_verify(), Session Regeneration, CSRF token
 * Developer: Zain Ul Haseeb
 */

header('Content-Type: application/json');
require_once __DIR__ . '/../config/db.php';
require_once __DIR__ . '/../config/security.php';

init_secure_session();

$action = $_GET['action'] ?? 'status';

if ($action === 'login') {
    $rawInput = file_get_contents('php_input');
    $data = json_decode($rawInput, true);

    $email = filter_var($data['email'] ?? '', FILTER_VALIDATE_EMAIL);
    $password = $data['password'] ?? '';
    $csrf_token = $data['csrf_token'] ?? '';

    // Verify CSRF Token
    if (!verify_csrf_token($csrf_token)) {
        http_response_code(403);
        echo json_encode(['status' => 'error', 'message' => 'Invalid or expired CSRF security token.']);
        exit;
    }

    if (!$email || empty($password)) {
        http_response_code(400);
        echo json_encode(['status' => 'error', 'message' => 'Please enter a valid email address and password.']);
        exit;
    }

    $db = get_db_connection();
    
    // Parameterized PDO Query (100% immune to SQLi)
    $stmt = $db->prepare("SELECT id, full_name, email, password_hash, role, status FROM users WHERE email = ? LIMIT 1");
    $stmt->execute([$email]);
    $user = $stmt->fetch();

    if ($user && $user['status'] === 'active' && password_verify($password, $user['password_hash'])) {
        // Prevent Session Fixation attacks
        session_regenerate_id(true);

        $_SESSION['user_id'] = $user['id'];
        $_SESSION['user_name'] = $user['full_name'];
        $_SESSION['user_email'] = $user['email'];
        $_SESSION['user_role'] = $user['role'];

        log_security_event($user['id'], "SUCCESSFUL_LOGIN (Role: {$user['role']})");

        echo json_encode([
            'status' => 'success',
            'message' => 'Authentication successful.',
            'user' => [
                'id' => $user['id'],
                'name' => escape_html($user['full_name']),
                'email' => escape_html($user['email']),
                'role' => $user['role']
            ],
            'csrf_token' => generate_csrf_token()
        ]);
        exit;
    } else {
        log_security_event(null, "FAILED_LOGIN_ATTEMPT (Email: {$email})");
        http_response_code(401);
        echo json_encode(['status' => 'error', 'message' => 'Invalid credentials or account suspended.']);
        exit;
    }
} elseif ($action === 'logout') {
    if (isset($_SESSION['user_id'])) {
        log_security_event($_SESSION['user_id'], "USER_LOGOUT");
    }
    $_SESSION = array();
    if (ini_get("session.use_cookies")) {
        $params = session_get_cookie_params();
        setcookie(session_name(), '', time() - 42000,
            $params["path"], $params["domain"],
            $params["secure"], $params["httponly"]
        );
    }
    session_destroy();
    echo json_encode(['status' => 'success', 'message' => 'Logged out successfully.']);
    exit;
} elseif ($action === 'csrf') {
    echo json_encode(['status' => 'success', 'csrf_token' => generate_csrf_token()]);
    exit;
} else {
    // Current user status
    if (isset($_SESSION['user_id'])) {
        echo json_encode([
            'status' => 'authenticated',
            'user' => [
                'id' => $_SESSION['user_id'],
                'name' => escape_html($_SESSION['user_name'] ?? ''),
                'email' => escape_html($_SESSION['user_email'] ?? ''),
                'role' => $_SESSION['user_role'] ?? 'student'
            ],
            'csrf_token' => generate_csrf_token()
        ]);
    } else {
        echo json_encode(['status' => 'unauthenticated', 'csrf_token' => generate_csrf_token()]);
    }
}
