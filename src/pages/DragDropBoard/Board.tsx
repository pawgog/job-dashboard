import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { useQuery } from '@tanstack/react-query';

import { fetchTasks } from '../../services';
import { COLUMN_ARRAY } from '../../utils/data';
import { ItemsArray } from '../../utils/types';
import Column from './Column';
import MoveItem from './MoveItem';
import * as S from './DragDropBoard.styled';

const Board = () => {
  const { isPending, isError, data, error } = useQuery<ItemsArray[]>({
    queryKey: ['tasks'],
    queryFn: fetchTasks
  });

  const tasks = data || [];

  if (isPending) {
    return <span>Loading...</span>;
  }

  if (isError) {
    return <span>Error: {error.message}</span>;
  }

  const returnItemsForColumn = (columnId: string) => {
    return tasks
      .filter((item) => item.column === columnId)
      .map((item, index) => (
        <MoveItem
          key={item.id}
          id={item.id}
          name={item.name}
          currentColumnId={item.column}
          index={index}
          data={tasks}
        />
      ));
  };

  return (
    <S.Board>
      <DndProvider backend={HTML5Backend}>
        {COLUMN_ARRAY.map(({ columnId, name, bgColor }) => {
          return (
            <Column key={columnId} columnId={columnId} title={name} bgColor={bgColor}>
              {returnItemsForColumn(columnId)}
            </Column>
          );
        })}
      </DndProvider>
    </S.Board>
  );
};

export default Board;
