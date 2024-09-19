$('body').on('click', 'h1', e => console.log('clicked on a h1 in body', e));

const it = $('h1').css('color', 'red')
  .click(() => console.log('An h1 was clicked'));

$('h2').css('color', 'green');

$('body').append('<h1>Kamala Harris</h1>');

$('h1').css('font-family', 'cursive');


document.body.addEventListener('click', e => {
  if (e.target.nodeName === 'H1') {
    console.log('h1 was clicked');
  }
});
