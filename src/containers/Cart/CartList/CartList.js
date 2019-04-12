import React from 'react';
import ListItem from './ListItem/ListItem';
export default function CartList({ list, deleteItem }) {
  const dList = list.map((ele, i) => (
    <ListItem deleteItem={deleteItem} item={list[i]} key={ele.id} />
  ));
  return <>{dList}</>;
}
