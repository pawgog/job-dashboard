import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { useQuery } from '@tanstack/react-query';

import { fetchColumn, fetchTasks } from '../../services';
import { ColumnArray, TasksArray } from '../../utils/types';
import ErrorMessage from '../../component/Error';
import Spinner from '../../component/Spinner';
import Column from './Column';
import MoveItem from './MoveItem';
import * as S from './DragDropBoard.styled';

const Board = () => {
  const { isPending, isError, data, error } = useQuery<TasksArray[] | undefined>({
    queryKey: ['tasks'],
    queryFn: fetchTasks
  });

  const {
    isPending: isPendingColumn,
    isError: isErrorColumn,
    data: dataColumn,
    error: errorColumn
  } = useQuery<ColumnArray[]>({
    queryKey: ['column'],
    queryFn: fetchColumn
  });

  const tasks = data || [];
  const columnArray = dataColumn || [];

  if (isPending || isPendingColumn) {
    return <Spinner />;
  }

  if (isError || isErrorColumn) {
    return <ErrorMessage text={error?.message || errorColumn?.message || ''} />;
  }

  const returnItemsForColumn = (columnId: string, name: string) => {
    return tasks
      .filter((item) => item.column === columnId)
      .map((item, index) => (
        <MoveItem
          key={item._id}
          id={item._id}
          name={item.name}
          currentColumnId={item.column}
          currentColumnName={name}
          columnArray={columnArray}
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
            <Column key={_id} columnId={_id} title={name} bgColor={bgColor} dataColumn={dataColumn}>
              {returnItemsForColumn(_id, name)}
            </Column>
          );
        })}
      </DndProvider>
    </S.Board>
  );
};

export default Board;
