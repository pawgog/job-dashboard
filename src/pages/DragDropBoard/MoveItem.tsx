import { useRef } from 'react';
import { DragSourceMonitor, useDrag, useDrop, DropTargetMonitor } from 'react-dnd';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateTasks } from '../../services';
import { COLUMN_ARRAY } from '../../utils/data';
import * as S from './DragDropBoard.styled';

type Props = {
  name: string;
  index: number;
  currentColumnId: string;
  data: ItemsArray[];
};

type ItemProps = {
  index: number;
  name: string;
  currentColumnId: string;
};

type ItemsArray = {
  id: number;
  name: string;
  column: string;
};

const MoveItem = ({ name, index, currentColumnId, data }: Props) => {
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: updateTasks,
    onMutate: (data: ItemsArray[]) => {
      queryClient.setQueryData(['tasks'], data);
    },
    onSuccess: () => {
      // queryClient.invalidateQueries({ queryKey: ['tasks'] });
    }
  });

  const changeItemColumn = (currentItem: ItemProps, columnId: string) => {
    const newItemsArray = data.map((item: ItemsArray) => {
      return {
        ...item,
        column: item.name === currentItem.name ? columnId : item.column
      };
    });
    mutate(newItemsArray);
  };

  const ref = useRef<HTMLDivElement>(null);

  const [, drop] = useDrop<ItemProps>({
    accept: 'BOX',
    hover(item: ItemProps, monitor: DropTargetMonitor) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;

      if (dragIndex === hoverIndex) {
        return;
      }

      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset() as { y: number };
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;

      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }

      item.index = hoverIndex;
    }
  });

  const [{ isDragging }, drag] = useDrag({
    type: 'BOX',
    item: () => ({ index, name, currentColumnId }),
    end: (item: ItemProps, monitor: DragSourceMonitor) => {
      const dropResult = monitor.getDropResult() as { dropEffect: string; name: string };

      if (dropResult) {
        COLUMN_ARRAY.find(({ columnId, name }) => {
          if (dropResult.name === name) {
            changeItemColumn(item, columnId);
          }
        });
      }
    },
    collect: (monitor: DragSourceMonitor) => ({
      isDragging: monitor.isDragging()
    })
  });

  const opacity = isDragging ? 0.4 : 1;

  drag(drop(ref));

  return (
    <S.Item ref={ref} style={{ opacity }}>
      {name}
    </S.Item>
  );
};

export default MoveItem;
