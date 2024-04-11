<?php
// Assuming you have a database connection established
$servername = "localhost";
$username = "root";
$password = "123456";
$database = "checklist";
$conn = new mysqli($servername, $username, $password, $database);
mysqli_query($conn, "SET NAMES utf8");
	if ($conn->connect_error) {
	    die("Connection failed: " . $conn->connect_error);
	}
?>