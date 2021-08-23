import React, {useState} from 'react';
import ItemQuery from './components/ItemQuery.js';
import ItemLoadAndUpdate from './components/ItemLoadAndUpdate'


const App = () => {
  return (
    <div>
      <ItemLoadAndUpdate />
      <ItemQuery />
    </div>
  );
}

export default App;
