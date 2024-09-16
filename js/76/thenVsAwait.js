console.log('1 - file start');

function loadData() {
  console.log('2 = before fetch');

  fetch('thenVsAwait.js')
    .then(r => console.log('3 - got response'));

  console.log('4 - after fetch');
}

loadData();

console.log('5 - file end');

////////


console.log('10 - file start');

async function loadData2() {
  console.log('11 - before fetch');
  const response = await fetch('thenVsAwait.js');
  console.log('12 - got response');

  console.log('13 - after fetch');
}

loadData2();

console.log('14 - file end');
