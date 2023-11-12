import { ReactNode } from 'react';
import { useDrop, DropTargetMonitor } from 'react-dnd';

type Props = {
  children: ReactNode;
  title: string;
};

const Column = ({ children, title }: Props) => {
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
        return 'rgb(188,251,255)';
      } else if (!canDrop) {
        return 'rgb(255,188,188)';
      }
    } else {
      return '';
    }
  };

  return (
    <div ref={drop} style={{ backgroundColor: getBackgroundColor() }}>
      <p>{title}</p>
      {children}
    </div>
  );
};

export default Column;
