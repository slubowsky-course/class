
function ourFetch(url) {
  return new Promise((resolve, reject) => {
    const request = new XMLHttpRequest();

    request.open('GET', url);

    request.send();


    request.onloadend = () => {
      if (request.status < 400) {
        resolve && resolve(request.responseText);
      } else {
        reject && reject(new Error(`${request.status} - ${request.statusText}`));
      }
    };

    request.onerror = e => {
      reject && reject(e);
    };
  });
}

try {
  const r = await ourFetch('xmlHttpRequest.html');
  console.log('got result', r);
} catch (e) {
  console.error('got error', e);
};

/*
recipes.json
[
  {id: 1, name: 'chulent'},
  {id: 2, name: 'cake'}
  ...
]

http://myRecipes.com/api/getRecipe?recipeId=1
1.json
{
  id: 1,
  name: 'chulent',
  ingredients: ['beans, barley'],
  directions: 'put in pot, cook'
  picture: 'https://chulent.com/chulent.png'
}

2.json
{
  id: 1,
    name: 'cake',
      ingredients: ['flour, sugar'],
        directions: 'put in pan, bake'
  picture: 'https://cake.com/cake.png'
}
*/
