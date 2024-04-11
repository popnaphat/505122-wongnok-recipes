<?php
// Include database connection file
include '../utils/conn.php';
session_start();

// Define variables and initialize with empty values
$email = $password = $confirm_password = '';
$email_err = $password_err = $confirm_password_err = '';

// Processing form data when form is submitted
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    // Validate email
    if (empty(trim($_POST['email']))) {
        $email_err = 'Please enter an email.';
    } else {
        $email = trim($_POST['email']);
    }

    // Validate password
    if (empty(trim($_POST['password']))) {
        $password_err = 'Please enter a password.';
    } elseif (strlen(trim($_POST['password'])) < 6) {
        $password_err = 'Password must have at least 6 characters.';
    } else {
        $password = trim($_POST['password']);
    }

    // Validate confirm password
    if (empty(trim($_POST['confirm_password']))) {
        $confirm_password_err = 'Please confirm password.';
    } else {
        $confirm_password = trim($_POST['confirm_password']);
        if ($password != $confirm_password) {
            $confirm_password_err = 'Password did not match.';
        }
    }

    // Check if email is already in use
    $sql_check_email = "SELECT id FROM users WHERE email = ?";
    if ($stmt_check_email = $conn->prepare($sql_check_email)) {
        // Bind the parameter
        $stmt_check_email->bind_param('s', $email);

        // Attempt to execute the prepared statement
        if ($stmt_check_email->execute()) {
            // Store result
            $stmt_check_email->store_result();

            if ($stmt_check_email->num_rows > 0) {
                $email_err = 'This email is already taken.';
            }
        } else {
            $_SESSION['error'] = 'Something went wrong. Please try again later.';
            header('location: ../sign_up_page.php');
            exit();
        }

        // Close statement
        $stmt_check_email->close();
    }

    // Check input errors before inserting into database
    if (empty($email_err) && empty($password_err) && empty($confirm_password_err)) {
        // Prepare an SQL statement to insert data into the users table
        $sql = "INSERT INTO users (email, password) VALUES (?, ?)";

        if ($stmt = $conn->prepare($sql)) {
            // Bind parameters
            $stmt->bind_param('ss', $param_email, $param_password);

            // Set parameters
            $param_email = $email;
            $param_password = password_hash($password, PASSWORD_DEFAULT); // Creates a password hash

            // Attempt to execute the prepared statement
            if ($stmt->execute()) {
                // Redirect to login page
                header('location: ../sign_in_page.php');
                exit();
            } else {
                $_SESSION['error'] = 'Something went wrong. Please try again later.';
                header('location: ../sign_up_page.php');
                exit();
            }

            // Close statement
            $stmt->close();
        }
    } else {
        // Redirect back to the sign-up page with error messages
        $_SESSION['error'] = $email_err . '<br>' . $password_err . '<br>' . $confirm_password_err;
        header('location: ../sign_up_page.php');
        exit();
    }

    // Close connection
    $conn->close();
}
?>