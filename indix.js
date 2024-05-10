const SearchUrl = "https://api.spoonacular.com/recipes/complexSearch";
const Key = "242535a8bd4349f6a087851a6ab842d1";
const mealTypes = ["Caregory", "main course", "side dish", "dessert", "appetizer", "salad", "bread", "breakfast", "soup", "beverage", "sauce", "marinade", "fingerfood", "snack", "drink"];

const dropdownOptions = mealTypes.map((mealType) => {
    const optionElement = document.createElement("option");
    optionElement.value = mealType;
    optionElement.textContent = mealType;
    return optionElement;
});

const dropdown = document.getElementById("mealTypeDropdown");

dropdownOptions.forEach((option) => {
    dropdown.appendChild(option);
});

dropdown.addEventListener("change", function () {
    const selectedMealType = dropdown.value;
    Search(selectedMealType);
});
async function Search(food) {
    
    const Category = document.querySelector('.Category');
    Category.innerHTML = '';
    var InputText=document.getElementById("InputText").value.trim();  
    let SearchEngine;
    let NewRow;
    if(InputText){
        const SearchSystem = await  fetch(`${SearchUrl}?apiKey=${Key}&query=${InputText}`);
        SearchEngine = await SearchSystem.json();
        
    }  
    else{
        const SearchResources = await fetch(`${SearchUrl}?apiKey=${Key}&type=${food}`);
        SearchEngine = await SearchResources.json();
        
    }
    SearchEngine.results.forEach((recipe, index) => {
        if(index%4===0)
            {
                NewRow=document.createElement("div");
                NewRow.classList.add("row");
                Category.appendChild(NewRow);
            }
            const card = document.createElement("div");
            card.classList.add("card");
            const title = document.createElement("h2");
            title.textContent = recipe.title;   
            const image=document.createElement("img");
            image.src=recipe.image;
            const getRecipe=document.createElement("button");
            getRecipe.classList.add("btn");
            getRecipe.setAttribute("data-recipe-id", recipe.id);
            console.log(getRecipe.dataset.recipeId);
            getRecipe.textContent="Get Recipe";
            card.appendChild(title);
            card.appendChild(image);
            card.appendChild(getRecipe);
            NewRow.appendChild(card);
            console.log(food);
            getRecipe.addEventListener("click", function(){
                const recipeId = this.dataset.recipeId;
                const recipeName=recipe.title;
                const recipeImage=recipe.image
                window.location.href = `Recipe.html?recipeID=${recipeId}&RecipeName=${recipeName}&recipeImage=${recipeImage}`
            })
        });
        
        
    }
        window.addEventListener("load", function(){
            Search("main course")
        })