const urlParams = new URLSearchParams(window.location.search);
const recipeId = urlParams.get('recipeID');
const recipeName=urlParams.get('RecipeName');
const recipeImage=urlParams.get('recipeImage');
const Name=recipeName.trim();
const key="242535a8bd4349f6a087851a6ab842d1"
const RecipeUrl=`https://api.spoonacular.com/recipes/${recipeId}/analyzedInstructions`


document.getElementById("Foodname").innerHTML=Name;
document.getElementById("Foodimage").setAttribute("src",recipeImage);
const RightContent=document.getElementById("Ingredient");




async function getRecipe(){
    const RecipeResources=await fetch(`${RecipeUrl}?apiKey=${key}`);
    const RecipeData= await RecipeResources.json();
    const STEPS= RecipeData[0].steps;
    console.log(STEPS);
    for(let i=0; i<STEPS.length;i++)
        {   
            const step=document.createElement("h2");
            step.textContent=`Step:${i+1}`
            RightContent.appendChild(step);
            const para=document.createElement("p");
            para.textContent=`${STEPS[i].step}`
            RightContent.appendChild(para)
        }
}





getRecipe()