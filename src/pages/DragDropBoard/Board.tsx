import { useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { AiOutlinePlusCircle } from 'react-icons/ai';
import { useQuery } from '@tanstack/react-query';

import Column from './Column';
import MoveItem from './MoveItem';
import Modal from '../../component/Modal';
import ErrorMessage from '../../component/Error';
import Spinner from '../../component/Spinner';
import useCreateColumn from '../../hooks/useCreateColumn';
import { fetchColumn, fetchTasks } from '../../services';
import { ColumnArray, TasksArray } from '../../utils/types';
import { staticText } from '../../global/staticText';
import * as S from './DragDropBoard.styled';

const Board = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [text, setText] = useState<string>('');
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
  const { mutate } = useCreateColumn();

  const addNewColumn = (name: string, color: string) => {
    const newColumn = { name, bgColor: color };
    mutate(newColumn);
  };

  const handleDisplayModal = () => {
    setIsOpen((prev) => (prev = !prev));
  };

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
      {isOpen && (
        <Modal
          title={`${staticText.updateColumn}`}
          label={`${staticText.columnName}`}
          buttonTitle={staticText.buttonTitle}
          text={text}
          changeItemText={() => addNewColumn(text, 'green')}
          setText={setText}
          handleDisplayModal={handleDisplayModal}
        />
      )}
      {columnArray.length <= 4 && (
        <S.ButtonAddColumn onClick={handleDisplayModal}>
          <AiOutlinePlusCircle />
        </S.ButtonAddColumn>
      )}
    </S.Board>
  );
};

export default Board;
