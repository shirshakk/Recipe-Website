const urlParams = new URLSearchParams(window.location.search);
const recipeId = urlParams.get('recipeID');
const recipeName=urlParams.get('RecipeName');
const recipeImage=urlParams.get('recipeImage');
const Name=recipeName.trim();
const key="242535a8bd4349f6a087851a6ab842d1"
const RecipeUrl=`https://api.spoonacular.com/recipes/${recipeId}/analyzedInstructions`


document.getElementById("Foodname").innerHTML=Name;
document.getElementById("Foodimage").setAttribute("src",recipeImage);
const RightContent=document.getElementById("Steps");
const LeftContentingredient=document.getElementById("IngredientText");
const LeftContentRequirement=document.getElementById("RequirementText");


async function getRecipe(){
    const RecipeResources=await fetch(`${RecipeUrl}?apiKey=${key}`);
    const RecipeData= await RecipeResources.json();
    const STEPS= RecipeData[0].steps;
    for(let i=0; i<STEPS.length;i++)
        {   
            const step=document.createElement("h2");
            step.textContent=`Step:${i+1}`
            RightContent.appendChild(step);
            const para=document.createElement("p");
            para.textContent=`${STEPS[i].step}`
            RightContent.appendChild(para)
            const IngredientLength=RecipeData[0].steps[i].ingredients.length;
            for(let j=0;j<IngredientLength;j++){
                const Ingredient=RecipeData[0].steps[i].ingredients[j].name;
                const IngredientText=document.createElement("p");
                IngredientText.textContent=Ingredient;
                LeftContentingredient.appendChild(IngredientText);
            }
            const Requirementlength=RecipeData[0].steps[i].equipment.length;
            for(let k=0;k<Requirementlength;k++)
                {
                    const RequirementText=RecipeData[0].steps[i].equipment[k].name;
                    if(RequirementText!==" ")
                        {
                            // console.log(RequirementText);
                            // const text=document.createElement("p");
                            // text.textContent=RequirementText;
                            // LeftContentRequirement.appendChild(text);
                            
                        }
                }
            
        }
}





getRecipe()