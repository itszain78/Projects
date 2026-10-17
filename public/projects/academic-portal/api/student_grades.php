<?php
/**
 * PARAMETERIZED STUDENT GRADES API ENDPOINT
 * Protection: RBAC + BOLA/IDOR Prevention (Students can ONLY view their own records)
 * Developer: Zain Ul Haseeb
 */

header('Content-Type: application/json');
require_once __DIR__ . '/../config/db.php';
require_once __DIR__ . '/../config/security.php';

require_auth_role(['student', 'admin']);

$db = get_db_connection();
$session_user_id = $_SESSION['user_id'];
$session_role = $_SESSION['user_role'];

// If student, force target ID to own ID to prevent BOLA / IDOR attacks
if ($session_role === 'student') {
    $target_student_id = $session_user_id;
} else {
    // Admin can query specified student_id
    $target_student_id = filter_input(INPUT_GET, 'student_id', FILTER_VALIDATE_INT) ?: $session_user_id;
}

// 100% Parameterized JOIN Query
$query = "
    SELECT 
        e.id AS enrollment_id,
        c.course_code,
        c.course_name,
        c.credit_hours,
        c.department,
        e.semester,
        e.gpa,
        e.letter_grade,
        e.status
    FROM enrollments e
    INNER JOIN courses c ON e.course_id = c.id
    WHERE e.student_id = ?
    ORDER BY e.semester DESC, c.course_code ASC
";

$stmt = $db->prepare($query);
$stmt->execute([$target_student_id]);
$records = $stmt->fetchAll();

// Calculate Cumulative GPA securely
$total_points = 0;
$total_credits = 0;

foreach ($records as &$row) {
    // Output Escaping for XSS protection
    $row['course_code'] = escape_html($row['course_code']);
    $row['course_name'] = escape_html($row['course_name']);
    $row['department'] = escape_html($row['department']);
    $row['semester'] = escape_html($row['semester']);
    $row['letter_grade'] = escape_html($row['letter_grade']);

    if ($row['gpa'] !== null && $row['status'] === 'completed') {
        $total_points += ($row['gpa'] * $row['credit_hours']);
        $total_credits += $row['credit_hours'];
    }
}

$cgpa = $total_credits > 0 ? round($total_points / $total_credits, 2) : 0.00;

echo json_encode([
    'status' => 'success',
    'student_id' => $target_student_id,
    'cgpa' => number_format($cgpa, 2),
    'total_credits' => $total_credits,
    'courses' => $records
]);
