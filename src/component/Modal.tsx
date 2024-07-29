import { AiOutlineCloseCircle } from 'react-icons/ai';

import * as S from './Modal.styled';

type Prop = {
  id?: string;
  title: string;
  label: string;
  buttonTitle: string;
  text: string;
  color?: string;
  isColumn?: boolean;
  changeItemText: (comparedValue: string, changedValue: string) => void;
  handleDisplayModal: () => void;
  setText: React.Dispatch<React.SetStateAction<string>>;
  setColor?: React.Dispatch<React.SetStateAction<string>> | undefined;
};

const Modal = ({
  id = '',
  title,
  label,
  buttonTitle,
  text,
  color,
  isColumn,
  changeItemText,
  handleDisplayModal,
  setText,
  setColor
}: Prop) => {
  const handleTextInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setText(event.target.value);
  };

  const handleColorInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setColor && setColor(event.target.value);
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleDisplayModal();
    changeItemText(id, text);
  };

  return (
    <S.ModalContainer>
      <S.ModalContentContainer>
        <S.ModalIcon>
          <AiOutlineCloseCircle onClick={handleDisplayModal} />
        </S.ModalIcon>
        <S.ModalTitle>{title}</S.ModalTitle>
        <S.ModalBodyContainer>
          <form onSubmit={onSubmit}>
            <div className="form-input">
              <input value={text} onChange={handleTextInput} required />
              <label>
                <span>{label}</span>
              </label>
            </div>
            {isColumn && (
              <div className="form-color-picker">
                <input type="color" id="column" name="column" value={color} onChange={handleColorInput} />
                <label htmlFor="column">column background</label>
              </div>
            )}
            <button type="submit">{buttonTitle}</button>
          </form>
        </S.ModalBodyContainer>
      </S.ModalContentContainer>
    </S.ModalContainer>
  );
};
export default Modal;
