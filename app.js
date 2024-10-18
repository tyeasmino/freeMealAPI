document.getElementById("searchFood").addEventListener("click", (event) => {
  const searchedFood = document.getElementById("foodName").value;

  fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchedFood}`)
    .then((res) => res.json())
    .then((data) => {
      displayFood(data);
    });
});

const displayFood = (foods) => {
  const foodContainer = document.getElementById("foodContainer");
  foodContainer.innerHTML = "";

  const detailsOfFood = document.getElementById("detailsOfFood");
  detailsOfFood.innerHTML = "";

  if (foods.meals && Array.isArray(foods.meals)) {
    foods.meals.forEach((food) => {
      const div = document.createElement("div");
      div.classList.add("foodCard");

      div.addEventListener("click", (event) => {
        fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${food.idMeal}`)
          .then((res) => res.json())
          .then((data) => {
            // console.log(data.meals)
            displaySingleFood(data.meals);
          })
          .catch((error) => {
            console.error("Error fetching meal details:", error);
          });
      });

      div.innerHTML = `
            <img class="food-img" src="${food.strMealThumb}" >
            <h6> ${food.strMeal.slice(0, 20)} </h6>                
        `;

      foodContainer.appendChild(div);
      NoFoodFound.classList.add("d-none");
    });
  } else {
    const NoFoodFound = document.getElementById("NoFoodFound");
    NoFoodFound.classList.remove("d-none");
  }
};



const displaySingleFood = (food) => {
  const detailsOfFood = document.getElementById("detailsOfFood");
  detailsOfFood.innerHTML = "";

  const div = document.createElement("div");
  div.classList.add("SinglefoodCard");

  const foodDetails = food[0];
  const ingredients = [];
  for (let i = 0; i < 20; i++) {
    const ingredient = foodDetails[`strIngredient${i + 1}`];
    if (ingredient) {
      ingredients.push(ingredient);
    }
  }

  let ingredientsList = '<ul class="ingredientsList">';
  ingredients.forEach((element) => {
    ingredientsList += `<li> ${element} </li>`;
  });
  ingredientsList += "</ul>";

  div.innerHTML = `
      <img class="food-img" src="${foodDetails.strMealThumb}" >
      <h4> ${foodDetails.strMeal} </h4>  
      
      <h6> Ingredients </h6>
      ${ingredientsList}
  `;

  detailsOfFood.appendChild(div);
};
