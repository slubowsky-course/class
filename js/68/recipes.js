const nameElem = document.querySelector('#name');
const pictureElem = document.querySelector('#picture');
const ingredientsElem = document.querySelector('#ingredients');
const errorElem = document.querySelector('#error');
const hasRecipeElems = document.querySelectorAll('.has-recipe');
const noRecipeElems = document.querySelectorAll('.no-recipe'); ''

/*
try {
  const response = await fetch('recipes.json');
  if (!response.ok) {
    throw new Error(`${response.status} - ${response.statusText}`);
  }
  const recipes = await response.json();
  console.log(recipes);

  const recipesElem = document.querySelector('#recipes');

  recipes.forEach(recipe => {
    recipesElem.insertAdjacentHTML('beforeend', `<option value="${recipe.id}">${recipe.name}</option>`);
  });

  recipesElem.addEventListener('change', async e => {
    // this.value - if non arrow
    // e.target.value
    // recipesElem.value
    //console.log('recipe selected', e.target.value);

    try {
      const response = await fetch(`${e.target.value}.json`);
      if (!response.ok) {
        throw new Error(`${response.status} - ${response.statusText}`);
      }
      const recipe = await response.json();
      console.log(recipe);

      nameElem.textContent = recipe.name;
      pictureElem.src = recipe.picture;
      pictureElem.alt = recipe.name;

      ingredientsElem.innerHTML = '';
      recipe.ingredients.forEach(ingredient => {
        ingredientsElem.insertAdjacentHTML('beforeend', `<li>${ingredient}</li>`);
      });

      hasRecipeElems.forEach(elem => elem.style.display = 'block');
      noRecipeElems.forEach(elem => elem.style.display = 'none');
    } catch (e) {
      console.error('oops2', e);
      errorElem.textContent = e.message;
      hasRecipeElems.forEach(elem => elem.style.display = 'none');
      noRecipeElems.forEach(elem => elem.style.display = 'block');
    }
  });
}
catch (e) {
  console.error('ooops', e);
  errorElem.textContent = e.message;
  hasRecipeElems.forEach(elem => elem.style.display = 'none');
  noRecipeElems.forEach(elem => elem.style.display = 'block');
}
*/

async function loadJson(url) {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`${response.status} - ${response.statusText}`);
    }
    const result = await response.json();
    // console.log(result);
    return result;

    //return response.json();
  }
  catch (e) {
    console.error('ooops', e);
    errorElem.textContent = e.message;
    hasRecipeElems.forEach(elem => elem.style.display = 'none');
    noRecipeElems.forEach(elem => elem.style.display = 'block');
  }
}

async function recipeSelected(e) {
  const recipe = await loadJson(`${e.target.value}.json`);
  console.log(recipe);

  nameElem.textContent = recipe.name;
  pictureElem.src = recipe.picture;
  pictureElem.alt = recipe.name;

  ingredientsElem.innerHTML = '';
  recipe.ingredients.forEach(ingredient => {
    ingredientsElem.insertAdjacentHTML('beforeend', `<li>${ingredient}</li>`);
  });

  hasRecipeElems.forEach(elem => elem.style.display = 'block');
  noRecipeElems.forEach(elem => elem.style.display = 'none');
}

async function displayRecipes() {
  const recipes = await loadJson('recipes.json');
  const recipesElem = document.querySelector('#recipes');

  recipes.forEach(recipe => {
    recipesElem.insertAdjacentHTML('beforeend', `<option value="${recipe.id}">${recipe.name}</option>`);
  });

  recipesElem.addEventListener('change', recipeSelected);
}

console.log('before');
displayRecipes();
console.log('after');
