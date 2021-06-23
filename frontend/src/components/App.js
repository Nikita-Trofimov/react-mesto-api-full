import React from 'react';
import { Redirect, Route, Switch, useHistory} from 'react-router-dom'
import Header from './Header';
import Main from './Main';
import ImagePopup from './ImagePopup';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import Login from './Login';
import Register from './Register';
import Footer from './Footer';
import ProtectedRoute from './ProtectedRoute';
import InfoTooltip from './InfoTooltip';
import { api } from '../utils/api';
import { apiAuth } from '../utils/apiAuth';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function App() {
  const [loggedIn, setloggedIn] = React.useState(false);
  const [isEditProfilePopupOpen, setEditProfilePopupOpenActive] = React.useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpenActive] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpenActive] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState(null);
  const [currentUser, setCurrentUser] = React.useState({});
  const [cards, setCards] = React.useState([]);
  const [isInfoTooltipPopupOpen, setIsInfoTooltipPopupOpen] = React.useState(false);
  const [isRegistration, setIsRegistration] = React.useState(false);
  const [userEmail, setUserEmail] = React.useState('');

  const history = useHistory();

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    
    api.changeLikeCardStatus(card._id, !isLiked).then((newCard) => {
      setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
    }).catch(err => console.log('Ошибка ' + err));
  } 

  function handleCardDelete(card) {
    api.removeCard(card._id).then(() => {
      setCards((state) => state.filter((c) => c._id !== card._id));
    }).catch(err => console.log('Ошибка ' + err));;
  }

  React.useEffect(() => {
    api.getInitialCards()
    .then((cards) => {
      setCards(cards);
    })
    .catch(err => console.log('Ошибка ' + err));
  }, []);

  React.useEffect(() => {
    api.getProfile()
    .then((profile) => {
      setCurrentUser(profile);
    })
    .catch(err => console.log('Ошибка ' + err));
  }, []);

  function handleCardClick(card) {
    setSelectedCard(card);
  }
  function handleEditProfileClick() {
    setEditProfilePopupOpenActive(true);
  }
  function handleAddPlaceClick() {
    setAddPlacePopupOpenActive(true);
  }
  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpenActive(true);
  }
  
  function closeAllPopups() {
    setIsEditAvatarPopupOpenActive(false);
    setAddPlacePopupOpenActive(false);
    setEditProfilePopupOpenActive(false);
    setIsInfoTooltipPopupOpen(false);
    setSelectedCard(null);
  }
  function handleUpdateUser({ name, about }) {
    api.updateProfile(name, about)
    .then((profile) => {
      setCurrentUser(profile);
      closeAllPopups();
    })
    .catch(err => console.log('Ошибка ' + err));
  }

  function handleUpdateAvatar(avatar) {
    api.udpateAvatar(avatar)
    .then((profile) => {
      setCurrentUser(profile);
      closeAllPopups();
    })
    .catch(err => console.log('Ошибка ' + err));
  }

  function handleAddPlaceSubmit({name, link}) {
    api.addCard(name, link)
    .then((card) => {
      setCards([card, ...cards])
      closeAllPopups();
    })
    .catch(err => console.log('Ошибка ' + err));
  }

  function handleSignIn({ password, email }) {
    apiAuth.signin(password, email)
    .then((res) => {
      setloggedIn(true);
      setUserEmail(email);
      localStorage.setItem('token', res.token);
      history.push("/");
    })
    .catch((err) =>  {
      console.log('Ошибка ' + err);
    });
  }

  function handleRegister( { password, email} ) {
    apiAuth.register(password, email)
    .then(() => {
      setIsRegistration(true);
      setIsInfoTooltipPopupOpen(true);
      history.push("/sign-in");
    })
    .catch((err) => {
      setIsRegistration(false);
      setIsInfoTooltipPopupOpen(true);
      console.log('Ошибка ' + err);
    });
  }

  function tokenCheck() {
    const token = localStorage.getItem('token')
    if (!token) {
      return;
    }

    apiAuth.checkToken(token)
    .then(({ data }) => {
      setloggedIn(true);
      setUserEmail(data.email);
    })
    .catch((err) => console.log('Ошибка ' + err));
  }

  function onLogOut() {
    localStorage.removeItem("token");
    setloggedIn(false);
  }

  React.useEffect(() => {
    tokenCheck()
  }, []);

  React.useEffect(() =>{
    history.push("/");
  }, [loggedIn]);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="body">
        <div className="page">
        <Header userEmail={userEmail} onLogOut={onLogOut} />
          <Switch>
            <ProtectedRoute 
              exact path="/"
              loggedIn={loggedIn}
              component={Main}
              onEditProfile={handleEditProfileClick}
              onAddPlace={handleAddPlaceClick}
              onEditAvatar={handleEditAvatarClick}
              onCardClick={handleCardClick}
              cards={cards}
              onCardLike={handleCardLike}
              onCardDelete={handleCardDelete} /> 
            <Route path="/sign-up">
              <Register onRegister={handleRegister} />
            </Route>
            <Route path="/sign-in">
              <Login onLogin={handleSignIn} />
            </Route>
            <Route path="*">
              {loggedIn ? <Redirect to="/" /> : <Redirect to="/sign-in" /> }
            </Route>
          </Switch>
          <Footer />
          <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser} />
          <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onAddPlace={handleAddPlaceSubmit} />
          <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateAvatar} />
          <ImagePopup card={selectedCard} onClose={closeAllPopups} />
          <InfoTooltip isOpen={isInfoTooltipPopupOpen} onClose={closeAllPopups} isRegistration={isRegistration} />
        </div>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
