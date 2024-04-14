<?php
session_start();
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Wongnok Recipe Search</title>
    <link href="./css/bootstrap.min.css" rel="stylesheet">
    <link href="./css/star_rating.css" rel="stylesheet">
    <link href="./css/select2.min.css" rel="stylesheet" >
    <link href="./css/select2-bootstrap-5-theme.min.css" rel="stylesheet">
    <link href="./css/select2-bootstrap-5-theme.rtl.min.css" rel="stylesheet">
</head>
<body>
<nav class="px-3 py-2 text-bg-dark border-bottom">
    <div class="container d-flex flex-wrap">
      <ul class="nav me-auto">
        <li class="nav-item"><a href="#" class="nav-link link-body-emphasis px-2 active" aria-current="page">Home</a></li>
      </ul>
      <ul class="nav">
        <?php if(isset($_SESSION['email'])) {echo "<li class='nav-item'><a class='btn btn-light me-2' onclick=\"myRecipes('".$_SESSION['email']."')\">Welcome ".$_SESSION['email']."</a></li> <li class='nav-item'><a class='btn btn-success me-2' onclick='showNewRecipeForm()'>Add Recipe</a></li> <li class='nav-item'><a href='sign_out_page.php' class='btn btn-danger'>Sign Out</a></li>";}
        else{echo "<li class='nav-item'><a href='sign_in_page.php' class='btn btn-light text-dark me-2'>Sign In</a></li>
        <li class='nav-item'><a href='sign_up_page.php' class='btn btn-primary'>Sign-up</a></li>";}   ?>        
      </ul>
    </div>
  </nav>
    <div class="container">
    <div class="p-3 rounded">
        <h1 class="text-center">Wongnok Recipe Search</h1>
        <div class="row">
            <div class="col-md-8 mx-auto">
                <!-- Search input field -->
                <div class="input-group">
                    <input type="text" class="form-control" id="searchInput" placeholder="Search for recipes...">
                    <div class="input-group-append">
                        <button class="btn btn-primary" type="button" onclick="searchRecipes()">Search</button>
                        <button class="btn btn-secondary" type="button" onclick="clearSearch()">Clear</button>
                    </div>
                </div>
            </div>
        </div>
        <div class="row mt-4">
            <div class="col-md-8 mx-auto">
                <div id="recipeResults"></div>
            </div>
        </div>
    </div>
    </div>
    <script src="./js/script.js"></script>
    <script src="./js/jquery-3.2.1.slim.min.js" ></script>
    <script src="./js/popper.min.js"></script>
    <script src="./js/bootstrap.bundle.min.js"></script>
    <script src="./js/select2.min.js"></script>
    
</body>
</html>
