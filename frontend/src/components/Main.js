import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import Card from './Card';

function Main({
  onEditProfile,
  onAddPlace,
  onEditAvatar,
  onCardClick,
  cards,
  onCardLike,
  onCardDelete
}) {
  const currentUser = React.useContext(CurrentUserContext);
  
  return (
    <main className="main">
      <section className="profile">
        <div className="profile__avatar-overlay">
          <img src={currentUser.avatar} alt="фото аватара профиля" className="profile__photo" onClick = {onEditAvatar} />
        </div>
        <div className="profile__text">
          <h1 className="profile__title">{currentUser.name}</h1>
            <button type="button" className="profile__edit-button" onClick={onEditProfile}></button>
            <p className="profile__subtitle">{currentUser.about}</p>
        </div>
        <button type="button" className="profile__add-button" onClick={onAddPlace}></button>
      </section>
           
      <section className="cards-section">
        <ul className="cards">
        {cards.map(card => { return (
          <Card key={card._id}
           card={card}
           onCardClick={onCardClick}
           onCardLike={onCardLike}
           onCardDelete ={onCardDelete} /> 
        )})}
        </ul>
      </section>
    </main>
  )
}

export default Main;