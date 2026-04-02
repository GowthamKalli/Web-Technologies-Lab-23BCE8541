import { useState } from 'react';

function ItemList() {
  const [items, setItems] = useState([]);
  const [input, setInput] = useState('');

  function addItem() {
    if (!input) return;
    setItems([...items, { id: Date.now(), name: input }]);
    setInput('');
  }

  function removeItem(id) {
    setItems(items.filter((item) => item.id !== id));
  }

  return (
    <div>
      <h1>Item List</h1>
      <input type="text" value={input} onChange={(e) => setInput(e.target.value)} />
      <button onClick={addItem}>Add</button>
      {items.length === 0 ? (
        <p>No items in the list.</p>
      ) : (
        <ul>
          {items.map((item) => (
            <li key={item.id}>
              {item.name}
              <button onClick={() => removeItem(item.id)}>Remove</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default ItemList;
