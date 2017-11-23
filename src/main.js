// main.js
import React from 'react';
import {render} from 'react-dom';
import Home from '../src/components/home';

if (navigator.serviceWorker != null) {
  navigator.serviceWorker.register('sw.js')
  .then(function(registration) {
    console.log('Registered events at scope: ', registration.scope);
  })
  .catch((e) => {
    console.log(e);
  })
}

render(<Home />, document.getElementById('root'));
