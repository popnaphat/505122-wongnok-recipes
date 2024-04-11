<?php
// Include the database connection file
include '../utils/conn.php';
session_start();
// Check if the request method is POST
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Get the data sent via POST request
    $data = json_decode(file_get_contents('php://input'), true);
    // Extract the recipe data
    $title = $data['title'];
    $recipeIngredients = $data['recipeIngredients'];
    $recipeProcedure = $data['recipeProcedure'];
    $recipeDuration = $data['recipeDuration'];
    $recipeDifficulty = $data['recipeDifficulty'];
    $recipeImage = $data['recipeImage'];

    // Prepare and execute the SQL query to insert the new recipe into the database
    $sql = "INSERT INTO recipes (title, ingredients, description, duration, Difficulty, image_path, created_by) VALUES (?, ?, ?, ?, ?, ?, ?)";
    $stmt = $conn->prepare($sql);

    // Bind parameters and execute the statement
    $stmt->bind_param('sssssss', $title, $recipeIngredients, $recipeProcedure, $recipeDuration, $recipeDifficulty, $recipeImage, $_SESSION['email']);
    $stmt->execute();

    // Check if the insertion was successful
    if ($stmt->affected_rows > 0) {
        // Recipe inserted successfully
        header('Content-Type: application/json');
        echo json_encode(array("success" => true, "message" => "บันทึกสูตรสำเร็จ"));
    } else {
        header('Content-Type: application/json');
        echo json_encode(array("success" => false, "message" => "บันทึกสูตรไม่สำเร็จ"));
    }

    // Close the prepared statement
    $stmt->close();
} else {
    // If the request method is not POST, return an error response
    http_response_code(405); // Method Not Allowed
}
?>
