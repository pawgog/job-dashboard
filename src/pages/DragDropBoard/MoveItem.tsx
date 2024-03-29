import { useState } from 'react';
import { MdEditSquare, MdOutlineDeleteForever } from 'react-icons/md';

import Modal from '../../component/Modal';
import useDragDrop from '../../hooks/useDragDrop';
import useUpdateTask from '../../hooks/useUpdateTask';
import useDeleteTask from '../../hooks/useDeleteTask';
import { changeItemAction } from '../../utils/helper';
import { ItemsArray } from '../../utils/types';
import { staticText } from '../../global/staticText';
import * as S from './DragDropBoard.styled';

type Props = {
  id: string;
  name: string;
  index: number;
  currentColumnId: string;
  data: ItemsArray[];
};

const MoveItem = ({ id, name, index, currentColumnId, data }: Props) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [text, setText] = useState<string>(name);
  const { mutate: mutateUpdate } = useUpdateTask();
  const { mutate: mutateDelete } = useDeleteTask();

  const handleDisplayModal = () => {
    setIsOpen((prev) => (prev = !prev));
  };

  const changeItemColumn = (comparedValue: string, changedValue: string) => {
    const prop = 'name';
    const value = 'column';
    const { newItems } = changeItemAction({ data, prop, value, comparedValue, changedValue });
    mutateUpdate(newItems);
  };

  const changeItemText = (comparedValue: number, changedValue: string) => {
    const prop = 'id';
    const value = 'name';
    const { newItems } = changeItemAction({ data, prop, value, comparedValue, changedValue });
    mutateUpdate(newItems);
  };

  const { ref, opacity } = useDragDrop({ index, currentColumnId, name, changeItemColumn });

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
          title={`${staticText.updateTask}`}
          label={`${staticText.taskName}`}
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
