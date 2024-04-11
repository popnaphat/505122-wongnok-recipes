<?php
include '../utils/conn.php';

// Check if the request method is POST
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Decode the JSON data received from the client
         $data = json_decode(file_get_contents("php://input"));
         $id = mysqli_real_escape_string($conn, $data->id);
         $title = mysqli_real_escape_string($conn, $data->title);
         $recipeIngredients = mysqli_real_escape_string($conn, $data->recipeIngredients);
         $recipeProcedure = mysqli_real_escape_string($conn, $data->recipeProcedure);
         $recipeDuration = mysqli_real_escape_string($conn, $data->recipeDuration);
         $recipeDifficulty = mysqli_real_escape_string($conn, $data->recipeDifficulty);
         $recipeImage = mysqli_real_escape_string($conn, $data->recipeImage);
         // Update the recipe in the database
         $query = "UPDATE recipes SET title = ?, ingredients = ?, description = ?, duration = ?, Difficulty = ?, image_path = ? WHERE id = ?";
         $stmt = $conn->prepare($query);

         // Bind the parameter (query) to the prepared statement
         $stmt->bind_param("sssssss", $title, $recipeIngredients, $recipeProcedure, $recipeDuration, $recipeDifficulty, $recipeImage, $id);
         
         // Set the parameter value and execute the statement
         if ($stmt->execute()) {
            // If the update was successful, send a success response to the client
            header('Content-Type: application/json');
            echo json_encode("update successful");
        } else {
            // If there was an error with the query, send an error response to the client
            header('Content-Type: application/json');
            echo json_encode(array("success" => false, "error" => "Failed to update recipe"));
        }
         
         // Close statement
         $stmt->close();
         
         // Close connection
         $conn->close();
}
?>