import React from 'react';
import PopupWithForm from './PopupWithForm';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {
  const [name, setName] = React.useState('');
  const [description, setDescription] = React.useState('');
  const currentUser = React.useContext(CurrentUserContext);

  React.useEffect(() => {
    currentUser.name !== undefined && setName(currentUser.name);
    currentUser.about !== undefined && setDescription(currentUser.about);
  }, [currentUser, isOpen]);

  function handleChangeName(evt) {
    setName(evt.target.value);
  }

  function handleChangeDescription(evt) {
    setDescription(evt.target.value);
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    onUpdateUser({
      name,
      about: description,
    });
  } 
  
  return (
    <PopupWithForm title="Редактировать профиль" name="edit-profile" submitButtonTitle="Сохранить" 
    isOpen={isOpen} 
    onClose={onClose}
    onSubmit={handleSubmit}>
      <input name="name" type="text" placeholder="Имя" 
      value={name}
      onChange={handleChangeName}
      className="popup__input popup__input_type_name" 
      required minLength="2" maxLength="40" />
      <span className="name-input-error popup__error-message"></span>
      <input name="proffesion" type="text" placeholder="Занятие" 
      value={description}
      onChange={handleChangeDescription}
      className="popup__input popup__input_type_profession"
      required minLength="2" maxLength="200" />
      <span className="proffesion-input-error popup__error-message"></span>
    </PopupWithForm>
  )
}

export default EditProfilePopup;