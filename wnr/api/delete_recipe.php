<?php
include '../utils/conn.php';

// Check if the request method is POST
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Decode the JSON data received from the client
    $data = json_decode(file_get_contents("php://input"));

    // Check if the required field (recipe ID) is set
    if (isset($data->id)) {
        // Sanitize and escape the recipe ID to prevent SQL injection
        $id = mysqli_real_escape_string($conn, $data->id);

        // Delete the recipe from the database
        $query = "DELETE FROM recipes WHERE id = ?";

        // Prepare the query
        $stmt = $conn->prepare($query);

        // Bind parameters
        $stmt->bind_param("i", $id);

        // Execute the statement
        if ($stmt->execute()) {
            // If the deletion was successful, send a success response to the client
            header('Content-Type: application/json');
            echo json_encode(array("success" => true));
        } else {
            // If there was an error with the query, send an error response to the client
            header('Content-Type: application/json');
            echo json_encode(array("success" => false, "error" => "Failed to delete recipe"));
        }

        // Close statement
        $stmt->close();
    } else {
        // If the required field is missing, send an error response to the client
        header('Content-Type: application/json');
        echo json_encode(array("success" => false, "error" => "Recipe ID is missing"));
    }
} else {
    // If the request method is not POST, send an error response to the client
    header('Content-Type: application/json');
    echo json_encode(array("success" => false, "error" => "Invalid request method"));
}

// Close connection
$conn->close();
?>
