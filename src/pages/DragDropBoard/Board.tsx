import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { useQuery } from '@tanstack/react-query';

import { fetchColumn, fetchTasks } from '../../services';
import { ColumnArray, ItemsArray } from '../../utils/types';
import Column from './Column';
import MoveItem from './MoveItem';
import * as S from './DragDropBoard.styled';

const Board = () => {
  const { isPending, isError, data, error } = useQuery<ItemsArray[]>({
    queryKey: ['tasks'],
    queryFn: fetchTasks
  });

  const { data: dataColumn } = useQuery<ColumnArray[]>({
    queryKey: ['column'],
    queryFn: fetchColumn
  });

  const tasks = data || [];
  const columnArray = dataColumn || [];

  if (isPending) {
    return <span>Loading...</span>;
  }

  if (isError) {
    return <span>Error: {error.message}</span>;
  }

  const returnItemsForColumn = (columnId: string, name: string) => {
    return tasks
      .filter((item) => item.column === columnId)
      .map((item, index) => (
        <MoveItem
          key={item.id}
          id={item.id}
          name={item.name}
          currentColumnId={item.column}
          currentColumnName={name}
          index={index}
          data={tasks}
        />
      ));
  };

  return (
    <S.Board>
      <DndProvider backend={HTML5Backend}>
        {columnArray.map(({ _id, name, bgColor }) => {
          return (
            <Column key={_id} columnId={_id} title={name} bgColor={bgColor}>
              {returnItemsForColumn(_id, name)}
            </Column>
          );
        })}
      </DndProvider>
    </S.Board>
  );
};

export default Board;
