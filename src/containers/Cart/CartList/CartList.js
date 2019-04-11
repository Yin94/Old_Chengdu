import React from 'react';
import ListItem from './ListItem/ListItem';
export default function CartList() {
  const list = [
    {
      name: 'mapo rofu1',
      count: 2
    },
    { name: 'mapo rofu2', count: 2 },
    { name: 'mapo rofu3', count: 2 },
    { name: 'mapo rofu4', count: 2 },
    { name: 'mapo rofu7', count: 2 },
    { name: 'mapo rofu5', count: 2 },
    { name: 'mapo rofu6', count: 2 },
    { name: 'mapo rofu9', count: 2 }
  ];
  const dList = list.map((ele, i) => (
    <ListItem item={list[i]} key={ele.name} />
  ));
  return <>{dList}</>;
}
