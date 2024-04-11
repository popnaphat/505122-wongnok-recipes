<?php
session_start();

// Include database connection file
include '../utils/conn.php';

// Initialize variables to store user input and error messages
$email = $password = '';
$email_err = $password_err = '';

// Check if the form is submitted
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Validate email
    if (empty(trim($_POST['email']))) {
        $email_err = 'Please enter your email.';
    } else {
        $email = trim($_POST['email']);
    }

    // Validate password
    if (empty(trim($_POST['password']))) {
        $password_err = 'Please enter your password.';
    } else {
        $password = trim($_POST['password']);
    }

    // Check if there are no input errors
    if (empty($email_err) && empty($password_err)) {
        // Prepare SQL statement to retrieve user data from the database
        $sql = "SELECT id, email, password FROM users WHERE email = ?";
        if ($stmt = $conn->prepare($sql)) {
            // Bind variables to the prepared statement as parameters
            $stmt->bind_param('s', $param_email);

            // Set parameters
            $param_email = $email;

            // Attempt to execute the prepared statement
            if ($stmt->execute()) {
                // Store result
                $stmt->store_result();

                // Check if the email exists
                if ($stmt->num_rows == 1) {
                    // Bind result variables
                    $stmt->bind_result($id, $email, $hashed_password);
                    if ($stmt->fetch()) {
                        // Verify password
                        if (password_verify($password, $hashed_password)) {
                            // Password is correct, start a new session
                            session_start();

                            // Store data in session variables
                            $_SESSION['id'] = $id;
                            $_SESSION['email'] = $email;

                            // Redirect user to the dashboard or any secure page
                            header('location: ../index.php');
                        } else {
                            // Display an error message if password is not valid
                            $_SESSION['error'] = 'Invalid password.';
                            header('location: ../sign_in_page.php');
                        }
                    }
                } else {
                    // Display an error message if email doesn't exist
                    $_SESSION['error'] = 'No account found with that email.';
                    header('location: ../sign_in_page.php');
                }
            } else {
                echo 'Oops! Something went wrong. Please try again later.';
            }

            // Close statement
            $stmt->close();
        }
    }

    // Close connection
    $conn->close();
}
?>
