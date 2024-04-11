<?php
include '../utils/conn.php';
session_start();
// Check if the request method is POST
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Decode the JSON data received from the client
    $data = json_decode(file_get_contents("php://input"));
    $session = trim($_SESSION['email']);
    // Extract the recipe ID and rating from the decoded data
    $recipeId = mysqli_real_escape_string($conn, $data->id);
    $rating = mysqli_real_escape_string($conn, $data->rating);

    // Check if the user has already rated this recipe
    $checkQuery = "SELECT * FROM recipes_rating WHERE recipe_id = ? AND rated_by = ?";
    $checkStmt = $conn->prepare($checkQuery);
    $checkStmt->bind_param("ss", $recipeId, $session);
    $checkStmt->execute();
    $result = $checkStmt->get_result();

    if ($result->num_rows > 0) {
        // If the user has already rated this recipe, send a response indicating that
        header('Content-Type: application/json');
        echo json_encode(array("success" => false, "error" => "You have already rated this recipe"));
    } else {
        // Prepare the SQL statement to insert the rating into the database
        $insertQuery = "INSERT INTO recipes_rating (recipe_id, score, rated_by) VALUES (?, ?, ?)";
        $insertStmt = $conn->prepare($insertQuery);
        
        // Bind the parameters to the prepared statement
        $insertStmt->bind_param("sss", $recipeId, $rating, $session);
        
        // Execute the statement
        if ($insertStmt->execute()) {
            // If the rating was successfully inserted, send a success response to the client
            header('Content-Type: application/json');
            echo json_encode(array("success" => true, "message" => "Rating submitted successfully"));
        } else {
            // If there was an error with the query, send an error response to the client
            header('Content-Type: application/json');
            echo json_encode(array("success" => false, "error" => "Failed to submit rating"));
        }
        
        // Close statement
        $insertStmt->close();
    }

    // Close statement
    $checkStmt->close();
    
    // Close connection
    $conn->close();
}
?>
