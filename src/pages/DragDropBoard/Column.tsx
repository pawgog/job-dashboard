import { ReactNode } from 'react';
import { useDrop, DropTargetMonitor } from 'react-dnd';
import { AiOutlinePlusCircle } from 'react-icons/ai';
import { colors } from '../../global/colors';
import * as S from './DragDropBoard.styled';

type Props = {
  children: ReactNode;
  title: string;
  bgColor: string;
};

const Column = ({ children, title, bgColor }: Props) => {
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
      <p>{title}</p>
      {children}
      <S.Button>
        <AiOutlinePlusCircle />
        <input />
      </S.Button>
    </S.Column>
  );
};

export default Column;
