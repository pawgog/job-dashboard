import { useRef, Dispatch } from 'react';
import { DragSourceMonitor, useDrag, useDrop, DropTargetMonitor } from 'react-dnd';
import { COLUMN_NAMES } from '../../global/staticText';

type Props = {
  name: string;
  index: number;
  currentColumnName: string;
  moveCardHandler: (dragIndex: number, hoverIndex: number) => void;
  setItems: Dispatch<React.SetStateAction<ItemsArray[]>>;
};

type ItemProps = {
  index: number;
  name: string;
  currentColumnName: string;
};

type ItemsArray = {
  id: number;
  name: string;
  column: string;
};

const MoveItem = ({ name, index, currentColumnName, moveCardHandler, setItems }: Props) => {
  const changeItemColumn = (currentItem: ItemProps, columnName: string) => {
    setItems((prevState: ItemsArray[]) => {
      return prevState.map((item: ItemsArray) => {
        return {
          ...item,
          column: item.name === currentItem.name ? columnName : item.column
        };
      });
    });
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

      moveCardHandler(dragIndex, hoverIndex);
      item.index = hoverIndex;
    }
  });

  const [{ isDragging }, drag] = useDrag({
    type: 'BOX',
    item: () => ({ index, name, currentColumnName }),
    end: (item: ItemProps, monitor: DragSourceMonitor) => {
      const dropResult = monitor.getDropResult() as { dropEffect: string; name: string };

      if (dropResult) {
        const { TO_APPLY, APPLIED, INTERVIEWING, ONSITE, OFFER } = COLUMN_NAMES;
        switch (dropResult.name) {
          case TO_APPLY:
            changeItemColumn(item, TO_APPLY);
            break;
          case APPLIED:
            changeItemColumn(item, APPLIED);
            break;
          case INTERVIEWING:
            changeItemColumn(item, INTERVIEWING);
            break;
          case ONSITE:
            changeItemColumn(item, ONSITE);
            break;
          case OFFER:
            changeItemColumn(item, OFFER);
            break;
          default:
            break;
        }
      }
    },
    collect: (monitor: DragSourceMonitor) => ({
      isDragging: monitor.isDragging()
    })
  });

  const opacity = isDragging ? 0.4 : 1;

  drag(drop(ref));

  return (
    <div ref={ref} style={{ opacity }}>
      {name}
    </div>
  );
};

export default MoveItem;
