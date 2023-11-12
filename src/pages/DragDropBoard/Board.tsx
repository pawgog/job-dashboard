import { useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { COLUMN_NAMES } from '../../global/staticText';
import Column from './Column';
import MoveItem from './MoveItem';

const { TO_APPLY, APPLIED, ONSITE } = COLUMN_NAMES;

const tasks = [
  { id: 1, name: 'Intel', column: TO_APPLY },
  { id: 2, name: 'Zoom', column: TO_APPLY },
  { id: 3, name: 'Spotify', column: APPLIED },
  { id: 4, name: 'Meta', column: ONSITE },
  { id: 5, name: 'Google', column: ONSITE }
];

const Board = () => {
  const [items, setItems] = useState(tasks);

  const moveCardHandler = (dragIndex: number, hoverIndex: number) => {
    const dragItem = items[dragIndex];

    if (dragItem) {
      setItems((prevState) => {
        const coppiedStateArray = [...prevState];
        const prevItem = coppiedStateArray.splice(hoverIndex, 1, dragItem);

        coppiedStateArray.splice(dragIndex, 1, prevItem[0]);

        return coppiedStateArray;
      });
    }
  };

  const returnItemsForColumn = (columnName: string) => {
    return items
      .filter((item) => item.column === columnName)
      .map((item, index) => (
        <MoveItem
          key={item.id}
          name={item.name}
          currentColumnName={item.column}
          setItems={setItems}
          index={index}
          moveCardHandler={moveCardHandler}
        />
      ));
  };

  const { TO_APPLY, APPLIED, INTERVIEWING, ONSITE, OFFER } = COLUMN_NAMES;

  return (
    <div>
      <DndProvider backend={HTML5Backend}>
        <Column title={TO_APPLY}>{returnItemsForColumn(TO_APPLY)}</Column>
        <Column title={APPLIED}>{returnItemsForColumn(APPLIED)}</Column>
        <Column title={INTERVIEWING}>{returnItemsForColumn(INTERVIEWING)}</Column>
        <Column title={ONSITE}>{returnItemsForColumn(ONSITE)}</Column>
        <Column title={OFFER}>{returnItemsForColumn(OFFER)}</Column>
      </DndProvider>
    </div>
  );
};

export default Board;
