import { useState } from 'react';
import Search from './Search';
import List from './List';

function Recipes() {
  const [title, setTitle] = useState('');

  return (
    <div>
      <h1>Recipes</h1>
      <Search onChange={setTitle} />
      <List title={title} />
    </div>
  );
}

export default Recipes;
