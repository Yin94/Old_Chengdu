import React from 'react';

export default function ListItem({ item }) {
  return (
    <div>
      <p>
        <strong>{item.meal.name}</strong> <span>{item.meal.chineseName}</span>
        <small>{`count: ${item.count}`}</small>
      </p>
    </div>
  );
}
