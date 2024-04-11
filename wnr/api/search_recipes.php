<?php
include '../utils/conn.php';
session_start();
if (isset($_POST['query'])) {

$query = trim($_POST['query']); // Trim any leading/trailing whitespace
if(isset($_SESSION['email'])){
    $session = $_SESSION['email'];}
    else{
        $session = null;
    }
// Prepare the SQL statement with a placeholder for the query
if($session == $query){
$sql = "SELECT * FROM (SELECT * FROM recipes) as aa LEFT JOIN (SELECT recipe_id , avg(score) as avg_rating FROM recipes_rating GROUP BY recipe_id) as bb
ON aa.id = bb.recipe_id WHERE created_by = ? ORDER BY avg_rating DESC";
$param = $query;
}else{
$sql = "SELECT * FROM (SELECT * FROM recipes) as aa LEFT JOIN (SELECT recipe_id , avg(score) as avg_rating FROM recipes_rating GROUP BY recipe_id) as bb
ON aa.id = bb.recipe_id WHERE title LIKE ? ORDER BY avg_rating DESC";
$param = '%' . $query . '%';
}
$stmt = $conn->prepare($sql);


// Bind the parameter (query) to the prepared statement
$stmt->bind_param("s", $param);

$stmt->execute();

// Get the result set
$searchResults1 = $stmt->get_result()->fetch_all(MYSQLI_ASSOC);
$searchResults2 = array();
foreach ($searchResults1 as $row) {
    if(is_null($session)){
        $row['matching'] = false;
        $row['member'] = false;
        $row['rating'] = false;
        array_push($searchResults2, $row);
    }else{
            if (trim($row['created_by']) == trim($session)) { 
                $row['matching'] = true;
                $row['member'] = true;
                $row['rating'] = false;
                array_push($searchResults2, $row);
            }else{
                $row['matching'] = false;
                $row['member'] = true;
                // Check if the user has already rated this recipe
                $checkQuery = "SELECT * FROM recipes_rating WHERE recipe_id = ? AND rated_by = ?";
                $checkStmt = $conn->prepare($checkQuery);
                $checkStmt->bind_param("ss", $row['id'], $session);
                $checkStmt->execute();
                $result = $checkStmt->get_result();
                    if ($result->num_rows > 0) {
                        $rowdata = $result->fetch_assoc();
                        $row['rating'] = $rowdata['score'];
                    }
                    else {$row['rating'] = false;}
                array_push($searchResults2, $row);
                $checkStmt->close();
            }
        }
}

// Close statement
$stmt->close();

// Close connection
$conn->close();

// Return the search results in JSON format
header('Content-Type: application/json');
echo json_encode($searchResults2);
}else{
    header('Content-Type: application/json');
    echo json_encode('status : 200');
}
?>
