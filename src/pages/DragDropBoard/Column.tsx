import { ReactNode, useState } from 'react';
import { useDrop, DropTargetMonitor } from 'react-dnd';
import { AiOutlinePlusCircle } from 'react-icons/ai';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { createTask } from '../../services';
import { ItemsArray } from '../../utils/types';
import { colors } from '../../global/colors';
import * as S from './DragDropBoard.styled';

type Props = {
  children: ReactNode;
  columnId: string;
  title: string;
  bgColor: string;
};

const Column = ({ children, columnId, title, bgColor }: Props) => {
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: createTask,
    onMutate: async (newTask) => {
      await queryClient.cancelQueries({ queryKey: ['tasks'] });
      const newTasks = { id: Math.random(), name: newTask, column: columnId };
      queryClient.setQueryData(['tasks'], (items: ItemsArray[]) => [...items, newTasks]);
      return { newTasks };
    },
    onSuccess: () => {
      queryClient.setQueryData(['tasks'], (items: ItemsArray[]) => {
        return items;
      });
    }
  });

  const [task, setTask] = useState<string>('');

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
      <S.Button>
        <input type="text" value={task} placeholder="Add new task" onChange={(e) => setTask(e.target.value)} />
        <AiOutlinePlusCircle onClick={() => mutate(task)} />
      </S.Button>
    </S.Column>
  );
};

export default Column;
