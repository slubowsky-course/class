/* globals $*/
(async function () {
  'use strict';

  const recipeSelect = $('#recipes');
  const nameElem = $('#name');
  const pictureElem = $('#picture');
  const ingredientsElem = $('#ingredients');
  const hasRecipe = $('.has-recipe');
  const noRecipe = $('.no-recipe');

  /*
  try {
    noRecipe.hide();

    const response = await fetch('recipes.json');
    if (!response.ok) {
      throw new Error(`${response.status} - ${response.statusText}`);
    }
    const recipes = await response.json();
    //console.log(recipes);

    recipes.forEach(recipe => {
      recipeSelect.append(`<option value=${recipe.id}>${recipe.name}</option>`);
    });

    recipeSelect.change(async /*function (e)* /e => {
      //console.log('recipe selected');
      //console.log(this.value);// if not arrow func
      //console.log(e.target.value);
      //console.log(recipeSelect.val());

      try {
        const response = await fetch(`x${e.target.value}.json`);
        if (!response.ok) {
          throw new Error(`${response.status} - ${response.statusText}`);
        }
        const recipe = await response.json();
        //console.log(recipe);

        hasRecipe.show();
        nameElem.text(recipe.name);
        pictureElem.attr('src', recipe.picture);

        ingredientsElem.empty();
        recipe.ingredients.forEach(i => {
          ingredientsElem.append(`<li>${i}</li>`);
        });

      } catch (e) {
        $('#error').text(e.message);
        hasRecipe.hide();
        noRecipe.show();
      }
    });

  } catch (e) {
    $('#error').text(e.message);
  }*/

  async function loadJson(url) {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`${response.status} - ${response.statusText}`);
      }
      const data = await response.json();
      return data;
    } catch (e) {
      $('#error').text(e.message);
      hasRecipe.hide();
      noRecipe.show();
    }
  }

  async function selectRecipe(e) {
    const recipe = await loadJson(`${e.target.value}.json`);
    if (! recipe) {
      return;
    }
    noRecipe.hide();
    hasRecipe.show();
    nameElem.text(recipe.name);
    pictureElem.attr('src', recipe.picture);

    ingredientsElem.empty();
    recipe.ingredients.forEach(i => {
      ingredientsElem.append(`<li>${i}</li>`);
    });
  }

  const recipes = await loadJson('recipes.json');

  recipes.forEach(recipe => {
    recipeSelect.append(`<option value=${recipe.id}>${recipe.name}</option>`);
  });

  recipeSelect.change(selectRecipe);
}());
