import React from 'react';
import ListItem from './ListItem/ListItem';
export default function CartList({ list }) {
  const dList = list.map((ele, i) => <ListItem item={list[i]} key={ele.id} />);
  return <>{dList}</>;
}
