/* global $*/
/*(async function () {
  'use strict';

  const recipeList = $('#recipes');
  const recipeNameElem = $('#name');
  const recipePictureElem = $('#picture');
  const recipeIngredients = $('#ingredients');
  const recipeElements = $('.has-recipe');
  const noRecipeElements = $('.no-recipe');
  const errorElem = $('.error');

  try {
    const response = await fetch('recipes.json');
    if (!response.ok) {
      throw new Error(`${response.status} - ${response.statusText}`);
    }
    const recipes = await response.json();

    recipes.forEach(recipe => {
      recipeList.append(`<option value="${recipe.id}">${recipe.name}</option>`);
    });

    recipeList.change(async e => /*function()* / {
      //console.log(recipeList.val());
      //console.log(this.value);
      //console.log(e.target.value);
      try {
        const r = await fetch(`${e.target.value}.json`);
        if (!r.ok) {
          throw new Error(`${r.status} - ${r.statusText}`);
        }
        const recipe = await r.json();
        //console.log(recipe);

        noRecipeElements.hide();
        recipeElements.show();

        recipeNameElem.text(recipe.name);
        recipePictureElem.attr('src', recipe.picture);

        recipeIngredients.empty();
        recipe.ingredients.forEach(ingredient => {
          recipeIngredients.append(`<li>${ingredient}</li>`);
        });
      } catch (e) {
        errorElem.text(e.message);
      }
    });
  } catch (e) {
    errorElem.text(e.message);
  }
}());*/

(async function () {
  'use strict';

  const recipeList = $('#recipes');
  const recipeNameElem = $('#name');
  const recipePictureElem = $('#picture');
  const recipeIngredients = $('#ingredients');
  const recipeElements = $('.has-recipe');
  const noRecipeElements = $('.no-recipe');
  const errorElem = $('.error');

  async function loadJson(url) {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`${response.status} - ${response.statusText}`);
      }
      return response.json();
      //const result = await response.json();
      //return result;
    } catch (e) {
      errorElem.text(e.message);
    }
  }

  async function selectRecipe(e) {
    const recipe = await loadJson(`${e.target.value}.json`);

    if (!recipe) {
      return;
    }

    noRecipeElements.hide();
    recipeElements.show();

    recipeNameElem.text(recipe.name);
    recipePictureElem.attr('src', recipe.picture);

    recipeIngredients.empty();
    recipe.ingredients.forEach(ingredient => {
      recipeIngredients.append(`<li>${ingredient}</li>`);
    });
  }

  const recipes = await loadJson('recipes.json');

  recipes?.forEach(recipe => {
    recipeList.append(`<option value="${recipe.id}">${recipe.name}</option>`);
  });

  recipeList.change(selectRecipe);
}());
