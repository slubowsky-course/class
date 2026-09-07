//import {setCss, click} from './pcsTools.js';
//import $ from './pcsTools.js';

/*const bibi = document.querySelector('#bibi');

const pcsObj = pcs();

// bibi.style.color = 'red';
pcsObj.setCss(bibi, 'color', 'red');
pcsObj.setCss(bibi, 'backgroundColor', 'black');

//bibi.addEventListener('click', () => console.log('bibi was clicked!'));
pcsObj.click(bibi, () => console.log('bibi was clicked!'));*/

const bibi = /*pcs*/$('#bibi');
//bibi.setCss('color', 'red');
//bibi.setCss('backgroundColor', 'black');
bibi.css('color', 'red');
bibi.css('backgroundColor', 'black');
bibi.click(() => {
  console.log('bibi was clicked!');
  bibi.hide();
  // bibi.style.display = 'none';

  setTimeout(() => {
    bibi.show();
  }, 2000);
});

//console.log(bibi.getCss('color'));
//console.log(bibi.getCss('fontFamily'));
console.log(bibi.css('color'));
console.log(bibi.css('fontFamily'));

bibi.css('position', 'absolute')
    .css('bottom', 0)
    .on('mouseenter', () => bibi.css('fontSize', '3em'));


const benGvir = $('#benGvir');
benGvir/*.css('color', 'green')*/
  .on('mouseenter', () => benGvir.css('fontSize', '1em'));
  //.sparkle(200, 2000);

$('h1').css('rotate', '5deg');
