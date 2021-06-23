import React from 'react';
import PopupWithForm from './PopupWithForm';

function EditAvatarPopup({ isOpen, onClose, onUpdateUser }) {
  const avatar = React.useRef();

  React.useEffect(()=>{
    avatar.current.value = '';
  }, [isOpen]);

  function handleSubmit(evt) {
    evt.preventDefault();
    onUpdateUser(avatar.current.value);
  } 
  
  return (
    <PopupWithForm title="Обновить аватар" name="edit-avatar" submitButtonTitle="Сохранить" isOpen={isOpen} onClose={onClose} onSubmit={handleSubmit}>
      <input ref={avatar} name="image" type="url" placeholder="Ссылка на картинку" className="popup__input popup__input_type_avtar-link" required />
      <span className="image-input-error popup__error-message"></span>
    </PopupWithForm>
  )
}

export default EditAvatarPopup;