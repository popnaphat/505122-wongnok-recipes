<?php
include '../utils/conn.php';
session_start();
if(isset($_POST['id'])){
// Retrieve recipe details based on the provided recipe ID
$recipeId = $_POST['id']; // Assuming you're passing the recipe ID as a query parameter
$sql = "SELECT * FROM recipes WHERE id = ?";
$stmt = $conn->prepare($sql);

// Bind the parameter (query) to the prepared statement
$stmt->bind_param("s", $recipeId);

// Set the parameter value and execute the statement
$stmt->execute();

// Get the result set
$recipe = $stmt->get_result()->fetch_all(MYSQLI_ASSOC);

// Close statement
$stmt->close();

// Close connection
$conn->close();

//     // Return recipe details as JSON
     header('Content-Type: application/json');
     echo json_encode($recipe);

}else{ 
    header('Content-Type: application/json');
    echo json_encode(array('error'=> 'Recipe not found'));
}
?>