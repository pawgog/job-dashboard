import { ReactNode, useState } from 'react';
import { useDrop, DropTargetMonitor } from 'react-dnd';
import { AiOutlinePlusCircle } from 'react-icons/ai';
import { v4 as uuidv4 } from 'uuid';

import Modal from '../../component/Modal';
import ButtonAction from '../../component/PopoverMenu';
import ErrorMessage from '../../component/Error';
import useCreateTask from '../../hooks/useCreateTask';
import useUpdateColumn from '../../hooks/useUpdateColumn';
import { ColumnArray } from '../../utils/types';
import { staticText } from '../../global/staticText';
import { colors } from '../../global/colors';
import * as S from './DragDropBoard.styled';

type Props = {
  children: ReactNode;
  columnId: string;
  title: string;
  bgColor: string;
  dataColumn: ColumnArray[];
};

const Column = ({ children, columnId, title, bgColor, dataColumn }: Props) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [text, setText] = useState<string>(title);
  const [task, setTask] = useState<string>('');
  const [inputError, setInputError] = useState<string>('');
  const { mutate: mutateUpdate } = useUpdateColumn();
  const { mutate } = useCreateTask();

  const addNewTask = (taskName: string) => {
    if (!taskName) {
      setInputError(staticText.inputError);
      setTimeout(() => {
        setInputError('');
      }, 5000);
    } else {
      const newTask = { id: uuidv4(), name: taskName, column: columnId, created_at: Date.now().toString() };
      mutate(newTask);
      setTask('');
    }
  };

  const [{ isOver, canDrop }, drop] = useDrop({
    accept: 'BOX',
    drop: () => ({ name: title }),
    collect: (monitor: DropTargetMonitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop()
    })
  });

  const getBackgroundColor = () => {
    if (isOver) {
      if (canDrop) {
        return `${colors.blue}`;
      } else if (!canDrop) {
        return `${colors.lightRed}`;
      }
    } else {
      return '';
    }
  };

  const handleDisplayModal = () => {
    setIsOpen((prev) => (prev = !prev));
  };

  const changeColumnText = (columnId: string, changedValue: string) => {
    const newItems = dataColumn.map((column) =>
      column._id === columnId ? { ...column, name: changedValue } : { ...column }
    );
    mutateUpdate({ columnId, newItems });
  };

  const deleteColumn = (id: string) => {
    console.log('delete column', id);
  };

  return (
    <S.Column ref={drop} $bgColor={bgColor} style={{ backgroundColor: getBackgroundColor() }}>
      <S.ColumTitle>{title}</S.ColumTitle>
      {children}
      <S.ColumnBody>
        <S.ColumnBodyInput>
          <input type="text" value={task} placeholder="Add new task" onChange={(e) => setTask(e.target.value)} />
          <ErrorMessage text={inputError} />
        </S.ColumnBodyInput>
        <S.Button>
          <AiOutlinePlusCircle onClick={() => addNewTask(task)} />
        </S.Button>
      </S.ColumnBody>
      {isOpen && (
        <Modal
          id={columnId}
          title={`${staticText.updateColumn}`}
          label={`${staticText.columnName}`}
          buttonTitle={staticText.buttonTitle}
          text={title}
          changeItemText={() => changeColumnText(columnId, title)}
          setText={setText}
          handleDisplayModal={handleDisplayModal}
        />
      )}
      <ButtonAction id={columnId} text={text} deleteFnc={deleteColumn} editFnc={handleDisplayModal} />
    </S.Column>
  );
};

export default Column;
