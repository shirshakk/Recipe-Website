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
    console.log(selectedMealType);
    Search(selectedMealType);
});
async function Search(food) {
    console.log(food);
    const IngredientsUrl=`https://api.spoonacular.com/recipes/${716429}/information`;
    const IngredientsResources=await fetch(`${IngredientsUrl}?apiKey=${Key}`);
    const IngredientsData= await IngredientsResources.json();
    console.log(IngredientsData);
    const SearchResources = await fetch(`${SearchUrl}?apiKey=${Key}&type=${food}`);
    const SearchData = await SearchResources.json();
    const Category = document.querySelector('.Category');
    Category.innerHTML = ''; 
    var NewRow;
    SearchData.results.forEach((recipe, index) => {
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
        getRecipe.textContent="Get Recipe";
        card.appendChild(title);
        card.appendChild(image);
        card.appendChild(getRecipe);
        NewRow.appendChild(card);
    });
}
window.addEventListener("load", function(){
    Search("main course")
  })