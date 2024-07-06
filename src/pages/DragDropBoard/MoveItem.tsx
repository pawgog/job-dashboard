import { useState } from 'react';
import { MdEditSquare, MdOutlineDeleteForever } from 'react-icons/md';

import Modal from '../../component/Modal';
import useDragDrop from '../../hooks/useDragDrop';
import useUpdateTask from '../../hooks/useUpdateTask';
import useDeleteTask from '../../hooks/useDeleteTask';
import { updateItemsArray } from '../../utils/helper';
import { ColumnArray, TasksArray } from '../../utils/types';
import { staticText } from '../../global/staticText';
import * as S from './DragDropBoard.styled';

type Props = {
  id: string;
  name: string;
  index: number;
  currentColumnId: string;
  currentColumnName: string;
  columnArray: ColumnArray[];
  data: TasksArray[];
};

const MoveItem = ({ id, name, index, currentColumnId, currentColumnName, columnArray, data }: Props) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [text, setText] = useState<string>(name);
  const { mutate: mutateUpdate } = useUpdateTask();
  const { mutate: mutateDelete } = useDeleteTask();

  const handleDisplayModal = () => {
    setIsOpen((prev) => (prev = !prev));
  };

  const changeItemColumn = (columnId: string, taskName: string) => {
    const tasks = updateItemsArray(data, taskName, columnId, 'name', 'column');
    mutateUpdate(tasks);
  };

  const changeItemText = (taskId: string, changedValue: string) => {
    const tasks = updateItemsArray(data, taskId, changedValue, '_id', 'name');
    mutateUpdate(tasks);
  };

  const { ref, opacity } = useDragDrop({ index, currentColumnId, name, columnArray, changeItemColumn });

  const deleteTask = (id: string) => {
    if (confirm(`${staticText.deleteConfirm}`)) {
      mutateDelete(id);
    }
  };

  return (
    <S.Item ref={ref} style={{ opacity }}>
      {name}
      {isOpen && (
        <Modal
          id={id}
          title={`${staticText.updateTask} ${currentColumnName.toLowerCase()}`}
          label={`${staticText.taskName}`}
          buttonTitle={staticText.buttonTitle}
          text={text}
          changeItemText={changeItemText}
          setText={setText}
          handleDisplayModal={handleDisplayModal}
        />
      )}
      <S.ButtonDelete onClick={() => deleteTask(id)}>
        <MdOutlineDeleteForever />
      </S.ButtonDelete>
      <S.ButtonEdit onClick={handleDisplayModal}>
        <MdEditSquare />
      </S.ButtonEdit>
    </S.Item>
  );
};

export default MoveItem;
