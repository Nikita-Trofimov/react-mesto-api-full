import React from 'react';
import PopupWithForm from './PopupWithForm';

function AddPlacePopup({ isOpen, onClose, onAddPlace }) {

  const [name, setName] = React.useState('');
  const [link, setLink] = React.useState('');

  React.useEffect(()=>{
    setName('');
    setLink('');
  }, [isOpen]);

  function handleSubmit(evt) {
    evt.preventDefault();
    onAddPlace({name, link})
  }

  function handleChangeName(evt) {
    setName(evt.target.value);
  }

  function handleChangeLink(evt) {
    setLink(evt.target.value);
  }

  return (
    <PopupWithForm title="Новое место" name="add-card" submitButtonTitle="Создать" isOpen={isOpen} onClose={onClose} onSubmit={handleSubmit}>
      <input name="name" type="text" placeholder="Название"
       value={name}
       onChange={handleChangeName}
       className="popup__input popup__input_type_name" 
       required minLength="2" maxLength="30" />
      <span className="name-input-error popup__error-message"></span>
      <input name="image" type="url" placeholder="Ссылка на картинку" 
      value={link}
      onChange={handleChangeLink}
      className="popup__input popup__input_type_card-link" required />
      <span className="image-input-error popup__error-message"></span>
    </PopupWithForm>
  )
}

export default AddPlacePopup;