import { ReactNode, useState } from 'react';
import { useDrop, DropTargetMonitor } from 'react-dnd';
import { AiOutlinePlusCircle } from 'react-icons/ai';
import { v4 as uuidv4 } from 'uuid';

import useCreateTask from '../../hooks/useCreateTask';
import { colors } from '../../global/colors';
import * as S from './DragDropBoard.styled';

type Props = {
  children: ReactNode;
  columnId: string;
  title: string;
  bgColor: string;
};

const Column = ({ children, columnId, title, bgColor }: Props) => {
  const [task, setTask] = useState<string>('');
  const { mutate } = useCreateTask();

  const addNewTask = (taskName: string) => {
    const newTask = { id: uuidv4(), name: taskName, column: columnId };
    mutate(newTask);
    setTask('');
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

  return (
    <S.Column ref={drop} $bgColor={bgColor} style={{ backgroundColor: getBackgroundColor() }}>
      <S.ColumTitle>{title}</S.ColumTitle>
      {children}
      <S.ColumnBody>
        <input type="text" value={task} placeholder="Add new task" onChange={(e) => setTask(e.target.value)} />
        <S.Button>
          <AiOutlinePlusCircle onClick={() => addNewTask(task)} />
        </S.Button>
      </S.ColumnBody>
    </S.Column>
  );
};

export default Column;
