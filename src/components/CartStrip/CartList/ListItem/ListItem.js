import React from 'react';

export default function ListItem({ item }) {
  return (
    <div>
      <p>
        <strong>{item.name}</strong> <small>{`count: ${item.count}`}</small>
      </p>
    </div>
  );
}
