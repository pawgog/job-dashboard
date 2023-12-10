import { useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { useQuery } from '@tanstack/react-query';

import { fetchTasks } from '../../services';
import { COLUMN_ARRAY } from '../../utils/data';
import Column from './Column';
import MoveItem from './MoveItem';
import * as S from './DragDropBoard.styled';

type ItemsArray = {
  id: number;
  name: string;
  column: string;
};

const Board = () => {
  const { isPending, isError, data, error } = useQuery<ItemsArray[]>({
    queryKey: ['tasks'],
    queryFn: fetchTasks
  });

  const tasks = data || [];

  const [items, setItems] = useState<ItemsArray[]>(tasks);

  if (isPending) {
    return <span>Loading...</span>;
  }

  if (isError) {
    return <span>Error: {error.message}</span>;
  }

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

  const returnItemsForColumn = (columnId: string) => {
    return tasks
      .filter((item) => item.column === columnId)
      .map((item, index) => (
        <MoveItem
          key={item.id}
          name={item.name}
          currentColumnId={item.column}
          setItems={setItems}
          index={index}
          moveCardHandler={moveCardHandler}
        />
      ));
  };

  return (
    <S.Board>
      <DndProvider backend={HTML5Backend}>
        {COLUMN_ARRAY.map(({ columnId, name, bgColor }) => {
          return (
            <Column key={columnId} title={name} bgColor={bgColor}>
              {returnItemsForColumn(columnId)}
            </Column>
          );
        })}
      </DndProvider>
    </S.Board>
  );
};

export default Board;
