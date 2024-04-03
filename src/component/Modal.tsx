import { AiOutlineCloseCircle } from 'react-icons/ai';

import * as S from './Modal.styled';

type Prop = {
  id: string;
  title: string;
  label: string;
  buttonTitle: string;
  text: string;
  changeItemText: (comparedValue: string, changedValue: string) => void;
  handleDisplayModal: () => void;
  setText: React.Dispatch<React.SetStateAction<string>>;
};

const Modal = ({ id, title, label, buttonTitle, text, changeItemText, handleDisplayModal, setText }: Prop) => {
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
            <div className="form-input">
              <input value={text} onChange={handleInput} required />
              <label>
                <span>{label}</span>
              </label>
            </div>
            <button type="submit">{buttonTitle}</button>
          </form>
        </S.ModalBodyContainer>
      </S.ModalContentContainer>
    </S.ModalContainer>
  );
};
export default Modal;
