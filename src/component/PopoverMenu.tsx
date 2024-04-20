import { useState, useRef, useEffect } from 'react';
import { HiDotsVertical } from 'react-icons/hi';
import { MdEditSquare, MdOutlineDeleteForever } from 'react-icons/md';

import { staticText } from '../global/staticText';
import * as S from './PopoverMenu.styled';

type Prop = {
  id: string;
  text: string;
  deleteFnc: (id: string) => void;
  editFnc: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
};

const PopoverMenu = ({ id, deleteFnc, editFnc }: Prop) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const ref = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    const handleOutsideClick = (e: Event) => {
      if (!ref?.current?.contains(e.target as HTMLInputElement)) {
        setIsOpen(false);
      }
    };

    const timeoutId = setTimeout(() => {
      document.addEventListener('click', handleOutsideClick, false);
    }, 0);
    return () => {
      clearTimeout(timeoutId);
      document.removeEventListener('click', handleOutsideClick, false);
    };
  }, []);

  return (
    <>
      <S.ButtonDots ref={ref} onClick={() => setIsOpen((prev: boolean) => !prev)}>
        <HiDotsVertical />
      </S.ButtonDots>
      {isOpen && (
        <S.ButtonContent>
          <S.ButtomAction onClick={editFnc}>
            <MdEditSquare />
            <span>{staticText.edit}</span>
          </S.ButtomAction>
          <S.ButtomAction onClick={() => deleteFnc(id)}>
            <MdOutlineDeleteForever />
            <span>{staticText.delete}</span>
          </S.ButtomAction>
        </S.ButtonContent>
      )}
    </>
  );
};
export default PopoverMenu;
