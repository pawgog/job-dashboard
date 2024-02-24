import { AiOutlineCloseCircle } from 'react-icons/ai';

import * as S from './Modal.styled';

type Prop = {
  id: string;
  title: string;
  label: string;
  text: string;
  changeItemText: Function;
  handleDisplayModal: Function;
  setText: React.Dispatch<React.SetStateAction<string>>;
};

const Modal = ({ id, title, label, text, changeItemText, handleDisplayModal, setText }: Prop) => {
  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setText(event.target.value);
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
            <label>{label}</label>
            <input value={text} onChange={handleInput} />
            <button type="submit">Submit</button>
          </form>
        </S.ModalBodyContainer>
      </S.ModalContentContainer>
    </S.ModalContainer>
  );
};
export default Modal;
