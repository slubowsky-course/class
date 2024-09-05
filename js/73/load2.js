(function () {
  'use strict';

  /*const oldOnLoad = onload;

  onload = () => {
    'use strict';

    if (oldOnLoad) {
      oldOnLoad();
    }

    document.querySelector('#theButton').addEventListener('click', () => console.log('#2 - button was clicked'));
  };*/

  document.addEventListener('DOMContentLoaded', () => {
    'use strict';

    document.querySelector('#theButton').addEventListener('click', () => console.log('#2 - button was clicked'));
  });
}());
