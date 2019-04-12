import React from 'react';
import { Link } from 'react-router-dom';
export default function ListItem({ item, deleteItem }) {
  return (
    <div>
      <p>
        <strong>{item.meal.name}</strong> <span>{item.meal.chineseName}</span>
        <small>{`count: ${item.count}`}</small>
        <Link to='#' onClick={() => deleteItem(item.id)}>
          delete
        </Link>
      </p>
    </div>
  );
}
