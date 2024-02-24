import { useRef } from 'react';
import { useDrag, useDrop, DragSourceMonitor, DropTargetMonitor } from 'react-dnd';

import { COLUMN_ARRAY } from '../utils/data';
import { ItemProps } from '../utils/types';

type Props = {
  index: number;
  currentColumnId: string;
  name: string;
  changeItemColumn: Function;
};

const useDragDrop = ({ index, currentColumnId, name, changeItemColumn }: Props) => {
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
            changeItemColumn(item.name, columnId);
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

  return { ref, opacity };
};

export default useDragDrop;
