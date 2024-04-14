let newDuration;
let newDifficulty;
function showNewRecipeForm() {
    // Clear any previous content in the recipeResults div
    document.getElementById('recipeResults').innerHTML = '';

    // Create a form for adding a new recipe
    var form = document.createElement('div');
    form.classList.add('mb-3');
    form.innerHTML = `
    <div class="bg-body-tertiary p-5 rounded">
        <h1>เพิ่มสูตรอาหารของท่าน</h1>
        <form id="editRecipeForm" onsubmit="submitNewRecipe(event); ">
        <div class="mb-3">
            <label for="newRecipeTitle">ชื่อ</label>
            <input type="text" class="form-control" id="newRecipeTitle" placeholder="ชื่อเมนู" required>
        </div>
        <div class="mb-3">
            <label for="newRecipeImage" class="form-label">URL รูป</label>
            <input type="text" id="newRecipeImage" class="form-control" required>
        </div>
        <div class="mb-3">
            <label for="newRecipeIngredients" class="form-label">วัตถุดิบ</label>
            <textarea id="newRecipeIngredients" class="form-control" rows="4" required></textarea>
        </div>
        <div class="mb-3">
            <label for="newRecipeDescription">ขั้นตอน</label>
            <textarea class="form-control" id="newRecipeDescription" rows="3" required></textarea>
        </div>
        <div class="mb-3">
            <div class="input-group mb-3">
                <div class="input-group-text">ระยะเวลาที่ใช้ปรุง</div>
                    <select class="form-select" id="newRecipeDuration" data-placeholder="เลือกระยะเวลาการปรุง" required>
                        <option></option>
                        <option data-value='5-10 mins'>5-10 mins</option>
                        <option data-value='11-30 mins'>11-30 mins</option>
                        <option data-value='31-60 mins'>31-60 mins</option>
                        <option data-value='60+ mins'>60+ mins</option>
                    </select>
            </div>
        </div>
        <div class="mb-3">
            <div class="input-group mb-3">
                <div class="input-group-text">ระดับความยากง่ายของสูตร</div>
                    <select class="form-select" id="newRecipeDifficulty" data-placeholder="เลือกระดับ" required>
                        <option></option>
                        <option data-value='Easy'>Easy</option>
                        <option data-value='Medium'>Medium</option>
                        <option data-value='Hard'>Hard</option>
                    </select>
            </div>
        </div>
            <button type="submit" class="btn btn-primary mt-3">บันทึกสูตร</button>
            </form>
    </div>`;
            // Append the form to the recipeResults div
            document.getElementById('recipeResults').appendChild(form);
            ////
            $( '.form-select' ).select2( {
                theme: "bootstrap-5",
                width: $( this ).data( 'width' ) ? $( this ).data( 'width' ) : $( this ).hasClass( 'w-100' ) ? '100%' : 'style',
                placeholder: $( this ).data( 'placeholder' ),
            } );
            // Attach change event listener to the select element
            $('#newRecipeDuration').on('change', function() {
                // Get the selected option
                var selectedOption1 = $(this).find('option:selected');
                // Get the data value of the selected option
                newDuration = selectedOption1.data('value');
            });
            // Attach change event listener to the select element
            $('#newRecipeDifficulty').on('change', function() {
                // Get the selected option
                var selectedOption2 = $(this).find('option:selected');
                // Get the data value of the selected option
                newDifficulty = selectedOption2.data('value');
            });
}
function submitNewRecipe(event) {
    // Prevent the default form submission behavior
    event.preventDefault();

    // Get the form data
    var newTitle = document.getElementById('newRecipeTitle').value;
    var newProcedure = document.getElementById('newRecipeDescription').value;
    var newIngredients = document.getElementById('newRecipeIngredients').value; 
    var newImage = document.getElementById('newRecipeImage').value;    

    // Create an object to hold the recipe data
    var newRecipeData = {
            title: newTitle,
            recipeIngredients: newIngredients,
            recipeProcedure: newProcedure,
            recipeDuration: newDuration,
            recipeDifficulty: newDifficulty,
            recipeImage: newImage
        // Add more properties as needed
    };
    // Perform an AJAX request to submit the new recipe data
    fetch('./api/submit_new_recipe.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newRecipeData)
    })
    .then(response => response.json())
    .then(data => {
        alert(data.message); 
        document.getElementById('recipeResults').innerHTML = '';
    })        
    .catch(error => {
        console.error('Error submitting new recipe:', error);
    });
}
// Define a function to check if the user has scrolled to 80% of the page
function isScrolledToPercent(percent) {
    var scrollPosition = window.scrollY;
    var documentHeight = document.documentElement.scrollHeight;
    var viewportHeight = window.innerHeight;
    scrollPercentage = (scrollPosition / (documentHeight - viewportHeight)) * 100;
    return scrollPercentage >= percent;
}
let myRecipesStatus;
// Add a scroll event listener to the window
let appendCounter;
let appendBreaker
function clearSearch(){
    document.getElementById('searchInput').value = '';
    document.getElementById('recipeResults').innerHTML = '';
}
function myRecipes(username) {
    document.getElementById('searchInput').value = '';
    var recipeResults = document.getElementById('recipeResults');
    myRecipesStatus = true;
    appendCounter = 1;
    appendBreaker = false;
    // Clear previous results
    recipeResults.innerHTML = '';
    // Assuming you have a PHP script called search_recipes.php that handles the backend logic
    fetch('./api/search_recipes.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: 'query=' + encodeURIComponent(username) + '&appendCounter=' + appendCounter 
    })
        .then(response => response.json())
        .then(data => {
            if (data.length === 0) {
                // Display a message when there are no results
                recipeResults.innerHTML = "<div class='alert alert-warning text-center' role='alert'><b>NO DATA!</b></div>";
                return;
            }
            //Loop through each recipe returned by the backend
            data.forEach(recipe => {
                // Create HTML elements to display each recipe
                var recipeElement = document.createElement('div');
                recipeElement.classList.add('card', 'mb-3');
                if(!recipe.member){
                    recipeElement.innerHTML = `
                    <div class="row no-gutters">
                        <div class="col-md-4 d-flex align-items-center">
                            <img src="${recipe.image_path}" class="card-img" alt="${recipe.title}">
                        </div>
                        <div class="col-md-8">
                            <div class="card-body">
                                <h5 class="card-title">${recipe.title} <span class="badge text-bg-warning">rating : ${recipe.avg_rating}</span></h5>
                                <div class="btn-group" role="group">
                                    <button type="button" class="btn btn-dark" onclick="viewRecipe('${recipe.id}')">View</button>
                                </div>
                            </div>
                        </div>
                    </div>
                `;
                }
                else{
                    if(recipe.matching){
                recipeElement.innerHTML = `
                    <div class="row no-gutters">
                        <div class="col-md-4 d-flex align-items-center">
                            <img src="${recipe.image_path}" class="card-img" alt="${recipe.title}">
                        </div>
                        <div class="col-md-8">
                            <div class="card-body">
                                <h5 class="card-title">${recipe.title} <span class="badge text-bg-warning">rating : ${recipe.avg_rating}</span></h5>
                                <div class="btn-group" role="group">
                                    <button type="button" class="btn btn-dark" onclick="viewRecipe('${recipe.id}')">View</button>
                                    <button type="button" class="btn btn-primary" onclick="editRecipe('${recipe.id}')">Edit</button>
                                    <button type="button" class="btn btn-danger" onclick="deleteRecipe('${recipe.id}')">Delete</button>
                                </div>
                            </div>
                        </div>
                    </div>
                `;}else{
                    if(!recipe.rating){
                    recipeElement.innerHTML = `
                    <div class="row no-gutters">
                        <div class="col-md-4 d-flex align-items-center">
                            <img src="${recipe.image_path}" class="card-img" alt="${recipe.title}">
                        </div>
                        <div class="col-md-8">
                            <div class="card-body">
                                <h5 class="card-title">${recipe.title} <span class="badge text-bg-warning">rating : ${recipe.avg_rating}</span></h5>
                                <div class="btn-group" role="group">
                                    <button type="button" class="btn btn-dark" onclick="viewRecipe('${recipe.id}')">View</button>
                                    <button type="button" class="btn btn-warning" onclick="rateRecipe('${recipe.id}')">Rate</button>
                                </div>
                            </div>
                        </div>
                    </div>
                `;
            }else{
                recipeElement.innerHTML = `
                <div class="row no-gutters">
                    <div class="col-md-4 d-flex align-items-center">
                        <img src="${recipe.image_path}" class="card-img" alt="${recipe.title}">
                    </div>
                    <div class="col-md-8">
                        <div class="card-body">
                            <h5 class="card-title">${recipe.title} <span class="badge text-bg-warning">rating : ${recipe.avg_rating}</span></h5>
                            <div class="btn-group" role="group">
                                <button type="button" class="btn btn-dark" onclick="viewRecipe('${recipe.id}')">View</button>
                                <button type="button" class="btn btn-warning">Your gave ${recipe.rating} Points</button>
                            </div>                            
                        </div>
                    </div>
                </div>
            `;
                }
                }
            }
                // Append the recipe element to the results container
                recipeResults.appendChild(recipeElement); 
            });
        })
         .catch(error => {
             console.error('Error fetching recipes:', error);
         });
}
function searchRecipes() {
    var searchInput = document.getElementById('searchInput').value.trim();
    var recipeResults = document.getElementById('recipeResults');
    appendCounter = 1;
    appendBreaker = false;
    myRecipesStatus = false;
    // Regular expression to check for null, %, or any potential SQL injection
    var invalidCharsRegex = /['";%]/;

    // Check if search input contains any invalid characters
    if (searchInput === '' || invalidCharsRegex.test(searchInput)) {
        recipeResults.innerHTML = '<p>Please enter a valid search query</p>';
        return;
    }
    
    // Clear previous results
    recipeResults.innerHTML = '';
    
    // Perform AJAX request to fetch recipes based on search input
    // Assuming you have a PHP script called search_recipes.php that handles the backend logic
    fetch('./api/search_recipes.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: 'query=' + encodeURIComponent(searchInput) + '&appendCounter=' + appendCounter
    })
        .then(response => response.json())
        .then(data => {
            //console.log(data.length)
            if (data.length === 0) {
                // Display a message when there are no results
                recipeResults.innerHTML = "<div class='alert alert-warning text-center' role='alert'><b>NO DATA!</b></div>";
                return;
            }
            //Loop through each recipe returned by the backend
            data.forEach(recipe => {
                // Create HTML elements to display each recipe
                var recipeElement = document.createElement('div');
                recipeElement.classList.add('card', 'mb-3');
                if(!recipe.member){
                    recipeElement.innerHTML = `
                    <div class="row no-gutters">
                        <div class="col-md-4 d-flex align-items-center">
                            <img src="${recipe.image_path}" class="card-img" alt="${recipe.title}">
                        </div>
                        <div class="col-md-8">
                            <div class="card-body">
                                <h5 class="card-title">${recipe.title} <span class="badge text-bg-warning">rating : ${recipe.avg_rating}</span></h5>
                                <div class="btn-group" role="group">
                                    <button type="button" class="btn btn-dark" onclick="viewRecipe('${recipe.id}')">View</button>
                                </div>
                            </div>
                        </div>
                    </div>
                `;
                }
                else{
                    if(recipe.matching){
                recipeElement.innerHTML = `
                    <div class="row no-gutters">
                        <div class="col-md-4 d-flex align-items-center">
                            <img src="${recipe.image_path}" class="card-img" alt="${recipe.title}">
                        </div>
                        <div class="col-md-8">
                            <div class="card-body">
                                <h5 class="card-title">${recipe.title} <span class="badge text-bg-warning">rating : ${recipe.avg_rating}</span></h5>
                                <div class="btn-group" role="group">
                                    <button type="button" class="btn btn-dark" onclick="viewRecipe('${recipe.id}')">View</button>
                                    <button type="button" class="btn btn-primary" onclick="editRecipe('${recipe.id}')">Edit</button>
                                    <button type="button" class="btn btn-danger" onclick="deleteRecipe('${recipe.id}')">Delete</button>
                                </div>
                            </div>
                        </div>
                    </div>
                `;}else{
                    if(!recipe.rating){
                    recipeElement.innerHTML = `
                    <div class="row no-gutters">
                        <div class="col-md-4 d-flex align-items-center">
                            <img src="${recipe.image_path}" class="card-img" alt="${recipe.title}">
                        </div>
                        <div class="col-md-8">
                            <div class="card-body">
                                <h5 class="card-title">${recipe.title} <span class="badge text-bg-warning">rating : ${recipe.avg_rating}</span></h5>
                                <div class="btn-group" role="group">
                                    <button type="button" class="btn btn-dark" onclick="viewRecipe('${recipe.id}')">View</button>
                                    <button type="button" class="btn btn-warning" onclick="rateRecipe('${recipe.id}')">Rate</button>
                                </div>
                            </div>
                        </div>
                    </div>
                `;
            }else{
                recipeElement.innerHTML = `
                <div class="row no-gutters">
                    <div class="col-md-4 d-flex align-items-center">
                        <img src="${recipe.image_path}" class="card-img" alt="${recipe.title}">
                    </div>
                    <div class="col-md-8">
                        <div class="card-body">
                            <h5 class="card-title">${recipe.title} <span class="badge text-bg-warning">rating : ${recipe.avg_rating}</span></h5>
                            <div class="btn-group" role="group">
                                <button type="button" class="btn btn-dark" onclick="viewRecipe('${recipe.id}')">View</button>
                                <button type="button" class="btn btn-warning">Your gave ${recipe.rating} Points</button>
                            </div>                            
                        </div>
                    </div>
                </div>
            `;
                }
                }
            }
                // Append the recipe element to the results container
                recipeResults.appendChild(recipeElement); 
            });
        })
         .catch(error => {
             console.error('Error fetching recipes:', error);
         });
}
function appendSearchRecipesResult() {
    var searchInput = document.getElementById('searchInput').value.trim();
    var recipeResults = document.getElementById('recipeResults');
    fetch('./api/search_recipes.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: 'query=' + encodeURIComponent(searchInput) + '&appendCounter=' + appendCounter 
    })
        .then(response => response.json())
        .then(data => {
            
            if (data.length === 0) {
                appendBreaker = true;
            }
            //Loop through each recipe returned by the backend
            data.forEach(recipe => {
                // Create HTML elements to display each recipe
                var recipeElement = document.createElement('div');
                recipeElement.classList.add('card', 'mb-3');
                if(!recipe.member){
                    recipeElement.innerHTML = `
                    <div class="row no-gutters">
                        <div class="col-md-4 d-flex align-items-center">
                            <img src="${recipe.image_path}" class="card-img" alt="${recipe.title}">
                        </div>
                        <div class="col-md-8">
                            <div class="card-body">
                                <h5 class="card-title">${recipe.title} <span class="badge text-bg-warning">rating : ${recipe.avg_rating}</span></h5>
                                <div class="btn-group" role="group">
                                    <button type="button" class="btn btn-dark" onclick="viewRecipe('${recipe.id}')">View</button>
                                </div>
                            </div>
                        </div>
                    </div>
                `;
                }
                else{
                    if(recipe.matching){
                recipeElement.innerHTML = `
                    <div class="row no-gutters">
                        <div class="col-md-4 d-flex align-items-center">
                            <img src="${recipe.image_path}" class="card-img" alt="${recipe.title}">
                        </div>
                        <div class="col-md-8">
                            <div class="card-body">
                                <h5 class="card-title">${recipe.title} <span class="badge text-bg-warning">rating : ${recipe.avg_rating}</span></h5>
                                <div class="btn-group" role="group">
                                    <button type="button" class="btn btn-dark" onclick="viewRecipe('${recipe.id}')">View</button>
                                    <button type="button" class="btn btn-primary" onclick="editRecipe('${recipe.id}')">Edit</button>
                                    <button type="button" class="btn btn-danger" onclick="deleteRecipe('${recipe.id}')">Delete</button>
                                </div>
                            </div>
                        </div>
                    </div>
                `;}else{
                    if(!recipe.rating){
                    recipeElement.innerHTML = `
                    <div class="row no-gutters">
                        <div class="col-md-4 d-flex align-items-center">
                            <img src="${recipe.image_path}" class="card-img" alt="${recipe.title}">
                        </div>
                        <div class="col-md-8">
                            <div class="card-body">
                                <h5 class="card-title">${recipe.title} <span class="badge text-bg-warning">rating : ${recipe.avg_rating}</span></h5>
                                <div class="btn-group" role="group">
                                    <button type="button" class="btn btn-dark" onclick="viewRecipe('${recipe.id}')">View</button>
                                    <button type="button" class="btn btn-warning" onclick="rateRecipe('${recipe.id}')">Rate</button>
                                </div>
                            </div>
                        </div>
                    </div>
                `;
            }else{
                recipeElement.innerHTML = `
                <div class="row no-gutters">
                    <div class="col-md-4 d-flex align-items-center">
                        <img src="${recipe.image_path}" class="card-img" alt="${recipe.title}">
                    </div>
                    <div class="col-md-8">
                        <div class="card-body">
                            <h5 class="card-title">${recipe.title} <span class="badge text-bg-warning">rating : ${recipe.avg_rating}</span></h5>
                            <div class="btn-group" role="group">
                                <button type="button" class="btn btn-dark" onclick="viewRecipe('${recipe.id}')">View</button>
                                <button type="button" class="btn btn-warning">Your gave ${recipe.rating} Points</button>
                            </div>                            
                        </div>
                    </div>
                </div>
            `;
                }
                }
            }
                // Append the recipe element to the results container
                recipeResults.appendChild(recipeElement); 
            });
        })
         .catch(error => {
             console.error('Error fetching recipes:', error);
         });
}
window.addEventListener('scroll', function() {
    if (isScrolledToPercent(95) && !appendBreaker && !myRecipesStatus) {
        appendBreaker = true; // Set appendBreaker to true to prevent immediate execution
        setTimeout(function() {
            appendCounter++;
            console.log(appendCounter);
            appendSearchRecipesResult();
            appendBreaker = false; // Reset appendBreaker after the delay
        }, 1000); // Add a delay of 1000 milliseconds (1 second)
    }
});

function viewRecipe(recipeId) {
    // Perform AJAX request to fetch details of the recipe based on its ID
    fetch('./api/get_recipe_details.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: 'id=' + encodeURIComponent(recipeId)
    })
        .then(response => response.json())
        .then(recipe => {
            // Display the details of the recipe in a modal or any other way you prefer
            // For example, you can dynamically generate HTML and append it to a modal
            var modalContent = `
                <div class="modal fade" id="viewRecipeModal" tabindex="-1" role="dialog" aria-labelledby="viewRecipeModalLabel" aria-hidden="true">
                    <div class="modal-dialog modal-lg" role="document">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="viewRecipeModalLabel">${recipe[0].title}</h5>
                                <button type="button" id="closeModalBtn" class="btn-close" data-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div class="modal-body">
                                <img src="${recipe[0].image_path}" class="card-img" alt="${recipe[0].title}">
                                <p>วัตถุดิบ: ${recipe[0].ingredients}</p>
                                <p>ขั้นตอน: ${recipe[0].description}</p>
                                <p>ระยะเวลา: ${recipe[0].duration}</p>
                                <p>ความยากง่ายของสูตร: ${recipe[0].Difficulty}</p>
                                <!-- Add more details as needed -->
                            </div>
                        </div>
                    </div>
                </div>
            `;

        // Append modal markup to the document body
        document.body.insertAdjacentHTML('beforeend', modalContent);

        // Show the modal
        $('#viewRecipeModal').modal('show');
        // Remove modal when close
        $('#viewRecipeModal').on('hidden.bs.modal', function () {
            document.getElementById('viewRecipeModal').remove();
        });
        // Select the close button element
            var closeModalBtn = document.getElementById('closeModalBtn');
            // Add event listener to the close button
            closeModalBtn.addEventListener('click', function() {
                // Hide the modal using Bootstrap's modal API
                var modal = document.getElementById('viewRecipeModal');
                var bootstrapModal = bootstrap.Modal.getInstance(modal);
                bootstrapModal.hide();
            });
        })
        .catch(error => {
            console.error('Error fetching recipe details:', error);
        });
}
let updateDuration;
let updateDifficulty;
function editRecipe(recipeId) {
     // Perform AJAX request to fetch details of the recipe based on its ID
     fetch('./api/get_recipe_details.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: 'id=' + encodeURIComponent(recipeId)
    })
    .then(response => response.json())
    .then(recipe => {
        //
        if( recipe[0].Difficulty === 'Easy'){
        var selectedDifficulty = "<option data-value='Easy' selected>Easy</option><option data-value='Medium'>Medium</option><option data-value='Hard'>Hard</option>";}
            else if( recipe[0].Difficulty === 'Medium'){
            var selectedDifficulty = "<option data-value='Easy'>Easy</option><option data-value='Medium' selected>Medium</option><option data-value='Hard'>Hard</option>";}
            else if( recipe[0].Difficulty === 'Hard'){
            var selectedDifficulty = "<option data-value='Easy'>Easy</option><option data-value='Medium'>Medium</option><option data-value='Hard' selected>Hard</option>";} 
            else{
            var selectedDifficulty = "<option data-value='Easy'>Easy</option><option data-value='Medium'>Medium</option><option data-value='Hard'>Hard</option>";}
        //
        if( recipe[0].duration === '5-10 mins'){
            var selectedDuration = "<option data-value='5-10 mins' selected>5-10 mins</option><option data-value='11-30 mins'>11-30 mins</option><option data-value='31-60 mins'>31-60 mins</option><option data-value='60+ mins'>60+ mins</option>";}
            else if( recipe[0].duration === '11-30 mins'){
            var selectedDuration = "<option data-value='5-10 mins'>5-10 mins</option><option data-value='11-30 mins' selected>11-30 mins</option><option data-value='31-60 mins'>31-60 mins</option><option data-value='60+ mins'>60+ mins</option>";}
            else if( recipe[0].duration === '31-60 mins'){
            var selectedDuration = "<option data-value='5-10 mins'>5-10 mins</option><option data-value='11-30 mins'>11-30 mins</option><option data-value='31-60 mins' selected>31-60 mins</option><option data-value='60+ mins'>60+ mins</option>";} 
            else if( recipe[0].duration === '60+ mins'){
            var selectedDuration = "<option data-value='5-10 mins'>5-10 mins</option><option data-value='11-30 mins'>11-30 mins</option><option data-value='31-60 mins'>31-60 mins</option><option data-value='60+ mins' selected>60+ mins</option>";} 
            else{
            var selectedDuration = "<option data-value='5-10 mins'>5-10 mins</option><option data-value='11-30 mins'>11-30 mins</option><option data-value='31-60 mins'>31-60 mins</option><option data-value='60+ mins'>60+ mins</option>";}
        // Generate modal markup
        var modalContent = `
            <div class="modal fade bd-modal-lg" id="editRecipeModal" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
                <div class="modal-dialog modal-lg">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title">Edit Recipe</h5>
                            <button type="button" id="closeModalBtn" class="btn-close" data-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <form id="editRecipeForm" onsubmit="submitEditedRecipe(${recipe[0].id}, event); ">
                                <div class="mb-3">
                                    <label for="editRecipeImage" class="form-label">url รูป:</label>
                                    <input type="text" id="editRecipeImage" class="form-control" value="${recipe[0].image_path}" required>
                                </div>
                                <div class="mb-3">
                                    <label for="editRecipeTitle" class="form-label">Title:</label>
                                    <input type="text" id="editRecipeTitle" class="form-control" value="${recipe[0].title}" required>
                                </div>
                                <div class="mb-3">
                                    <label for="editRecipeIngredients" class="form-label">วัตถุดิบ:</label>
                                    <textarea id="editRecipeIngredients" class="form-control" rows="4" required>${recipe[0].ingredients}</textarea>
                                </div>
                                <div class="mb-3">
                                    <label for="editRecipeDescription" class="form-label">ขั้นตอน:</label>
                                    <textarea id="editRecipeDescription" class="form-control" rows="4" required>${recipe[0].description}</textarea>
                                </div>
                                <div class="mb-3">
                                    <div class="input-group mb-3">
                                        <div class="input-group-text">ระยะเวลา</div>
                                            <select class="form-select" id="recipeDuration" data-placeholder="เลือกระยะเวลาการปรุง" required>
                                            ${selectedDuration}
                                            </select>
                                    </div>
                                </div>
                                <div class="mb-3">
                                    <div class="input-group mb-3">
                                        <div class="input-group-text">ระดับความยากง่ายของสูตร</div>
                                            <select class="form-select" id="recipeDifficulty" data-placeholder="เลือกระดับความยากของสูตร" required>
                                                ${selectedDifficulty}
                                            </select>
                                    </div>
                                </div>                              
                                <button type="submit" class="btn btn-primary mt-3">Save Changes</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        `;

        // Append modal markup to the document body
        document.body.insertAdjacentHTML('beforeend', modalContent);
        // get select2 data from db
        updateDuration = document.getElementById('recipeDuration').value;
        updateDifficulty = document.getElementById('recipeDifficulty').value;
        $( '.form-select' ).select2( {
            theme: "bootstrap-5",
            width: $( this ).data( 'width' ) ? $( this ).data( 'width' ) : $( this ).hasClass( 'w-100' ) ? '100%' : 'style',
            placeholder: $( this ).data( 'placeholder' ),
        } );
        // Attach change event listener to the select element
        $('#recipeDuration').on('change', function() {
            // Get the selected option
            var selectedOption1 = $(this).find('option:selected');
            // Get the data value of the selected option
            updateDuration = selectedOption1.data('value');
        });
        // Attach change event listener to the select element
        $('#recipeDifficulty').on('change', function() {
            // Get the selected option
            var selectedOption2 = $(this).find('option:selected');
            // Get the data value of the selected option
            updateDifficulty = selectedOption2.data('value');
        });
        // Show the modal
        $('#editRecipeModal').modal('show');
        // Remove modal when close
        $('#editRecipeModal').on('hidden.bs.modal', function () {
            document.getElementById('editRecipeModal').remove();
        });
        // Select the close button element
            var closeModalBtn = document.getElementById('closeModalBtn');
            // Add event listener to the close button
            closeModalBtn.addEventListener('click', function() {
                // Hide the modal using Bootstrap's modal API
                var modal = document.getElementById('editRecipeModal');
                var bootstrapModal = bootstrap.Modal.getInstance(modal);
                bootstrapModal.hide();
            });
    })
    .catch(error => {
        console.error('Error fetching recipe details:', error);
    });
}
function submitEditedRecipe(recipeId, event) {
        event.preventDefault();
        // Gather the updated data from the form fields
        var updatedTitle = document.getElementById('editRecipeTitle').value;
        var updatedRecipeIngredients = document.getElementById('editRecipeIngredients').value; 
        var updatedDescription = document.getElementById('editRecipeDescription').value;
        var updatedRecipeImage = document.getElementById('editRecipeImage').value;        
        
        // Prepare the data to be sent to the server
        var formData = {
            id: recipeId,
            title: updatedTitle,
            recipeIngredients: updatedRecipeIngredients,
            recipeProcedure: updatedDescription,
            recipeDuration: updateDuration,
            recipeDifficulty: updateDifficulty,
            recipeImage: updatedRecipeImage
            // Add other data fields as needed
        };
    
        // Send an AJAX request to update the recipe data on the server
        fetch('./api/update_recipe.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        })
        .then(response => response.json())
        .then(data => {
            console.log(data); // Log the response from the server
            // Perform actions based on the response, if needed
            $('#editRecipeModal').modal('hide');
            if(myRecipesStatus){
                alert('สูตรอาหารได้รับการอัพเดต');
                clearSearch();
                myRecipesStatus = false;
            }else{
            searchRecipes();
            }
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
            $('#editRecipeModal').modal('hide');
            searchRecipes();
        });
}
function deleteRecipe(recipeId) {
    // Confirm with the user before deleting the recipe
    if (confirm("Are you sure you want to delete this recipe?")) {
        // Send an AJAX request to delete the recipe
        fetch('./api/delete_recipe.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ id: recipeId })
        })
        .then(response => response.json())
        .then(data => {
            // Handle the server's response
            if (data.success) {
                // If the deletion was successful, display a success message
                alert('Recipe deleted successfully!');
                // Refresh the list of recipes
                searchRecipes();
            } else {
                // If there was an error, display an error message
                alert('Failed to delete recipe. Please try again.');
            }
        })
        .catch(error => {
            console.error('Error deleting recipe:', error);
            // If there was an error with the AJAX request, display an error message
            alert('An error occurred while deleting the recipe. Please try again later.');
        });
    }
}
let selectedRating = 0;
function rateRecipe(recipeId) {
    // Here you can implement your logic for rating the recipe
    // For example, you can show a modal for rating input
    var modalRating = `
    <div class="modal fade bd-modal-lg" id="rateRecipeModal" tabindex="-1" role="dialog" aria-labelledby="rateRecipeModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="rateRecipeModalLabel">Rate Recipe</h5>
                <button type="button" class="btn-close" id="closeModalBtn" data-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <!-- Rating input form -->
                <form id="ratingForm" onsubmit="submitRatingRecipe(${recipeId}, event); ">
                    <div class="form-group text-center">
                        <fieldset class="rating">
                            <input type="radio" id="star5" name="rating" value="5" /><label for="star5"></label>
                            <input type="radio" id="star4" name="rating" value="4" /><label for="star4"></label>
                            <input type="radio" id="star3" name="rating" value="3" /><label for="star3"></label>
                            <input type="radio" id="star2" name="rating" value="2" /><label for="star2"></label>
                            <input type="radio" id="star1" name="rating" value="1" /><label for="star1"></label>
                        </fieldset>
                    </div>
                    <div class="form-group text-center">
                        <button type="submit" class="btn btn-primary">Submit Rating</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</div>
`;
    document.body.insertAdjacentHTML('beforeend', modalRating);
    // Assuming you have a modal with id "rateRecipeModal", you can show it like this:
    $('#rateRecipeModal').modal('show');
    $('#rateRecipeModal').on('hidden.bs.modal', function () {
        document.getElementById('rateRecipeModal').remove();
    });
            // Select the close button element
            var closeModalBtn = document.getElementById('closeModalBtn');
            // Add event listener to the close button
            closeModalBtn.addEventListener('click', function() {
                // Hide the modal using Bootstrap's modal API
                var modal = document.getElementById('rateRecipeModal');
                var bootstrapModal = bootstrap.Modal.getInstance(modal);
                bootstrapModal.hide();
            });
            
            const ratingInputs = document.querySelectorAll('.rating input');
            // Add event listener to each radio input
            ratingInputs.forEach(input => {
              input.addEventListener('change', () => {
            selectedRating = input.value;
              });
            });

}
function submitRatingRecipe(recipeId, event) {
    // Prevent the default form submission behavior
    event.preventDefault();
        // Get the selected rating value
        var rating = selectedRating;

        // Prepare the data to be sent to the server
        var formData = {
            id: recipeId,
            rating: rating
        };
    
        // Send an AJAX request to submit the rating
        fetch('./api/submit_rating.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        })
        .then(response => response.json())
        .then(data => {
            // Handle the response from the server
            if (data.success) {
                // If the rating submission was successful, display a success message
                alert('Rating submitted successfully!');
                // Close the modal
                $('#rateRecipeModal').modal('hide');
                searchRecipes();
            } else {
                // If there was an error, display an error message
                alert(data.error);
            }
        })
        .catch(error => {
            console.error('Error submitting rating:', error);
            // If there was an error with the AJAX request, display an error message
            alert('An error occurred while submitting the rating. Please try again later.');
        });
        
}