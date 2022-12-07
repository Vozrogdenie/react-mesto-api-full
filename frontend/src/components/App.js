import PopupYouSure from './PopupYouSure';
import ImagePopup from './ImagePopup';
import PopupEditAvatar from './PopupEditAvatar';
import PopupAddPlace from './PopupAddPlace';
import PopupWithForm from './PopupWithForm';
import PopupEditProfile from './PopupEditProfile';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import { useState } from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import { CurrentCardContext } from '../contexts/CurrentCardContext';
import React from 'react';
import api from '../utils/API';
import { Switch, Redirect, Route, useHistory } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';
import Login from './Login';
import Register from './Register';
import InfoTooltip from './InfoTooltip'
import unionJackdaw from '../images/unionJackdaw.png'
import unionCross from '../images/unionCross.png'
import auth from '../utils/auth';


function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isYouSurePopupOpen, setIsYouSurePopupOpen] = useState(false);
  const [isInfoTooltip, setIsInfoTooltip] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [currentUser, setCurrentUser] = useState({ name: '', about: '', avatar: '', _id: '' })
  const [cards, setCards] = useState([])
  const [loggedIn, setLoggedIn] = useState(false)
  const [userData, setUserData] = useState({password: '', email: '' })
  const [message, setMessage] = useState({ message: '', img: '' })
  const [isLoading, setIsLoading] = useState(false)

  const isOpen = isEditProfilePopupOpen || isEditProfilePopupOpen || isAddPlacePopupOpen || isYouSurePopupOpen || isInfoTooltip;
  const history = useHistory();
  const buttonText=(isLoading ? "Сохранение..." : "Сохранить")
 
  React.useEffect(() => {
    function closeByEscape (evt) {
      if (evt.key === 'Escape'){
        closeAllPopups();
      }
    }
    if (isOpen) {
      document.addEventListener('keydown', closeByEscape);
      return () => {
        document.removeEventListener('keydown', closeByEscape)
      }
    }
  }, [isOpen])

  React.useEffect(() => {
    tokenCheck();
    api.getApiCards()
      .then((res) => {
        setCards(res.data)
      }).catch((err) => {
        console.log(err)
      });
  }, [])

  function tokenCheck() {
    const jwt = localStorage.getItem('jwt')
    if (!jwt) return;
    auth.checkToken(jwt).then((data) => {
      setLoggedIn(true);
      setUserData({
        email: data.email
      });
      setCurrentUser({
        name: data.name,
        about: data.about,
        avatar: data.avatar,
        _id: data._id
      })
      history.push('/');
    }).catch((err) => {
      console.log(err)
    });
  }

  const handleLogin = (password, email) => {
    return auth.authorize(password, email)
      .then((data) => {
        if (!data.token) throw new Error('Missing jwt');

        localStorage.setItem('jwt', data.token);
        setLoggedIn(true);
        api.getApiCards()
          .then((res) => {
            setCards(res.data)
          }).catch((err) => {
            console.log(err)
          });
        api.getApiUsers()
          .then(data => {
            setUserData({
              email: data.email
            });
            setCurrentUser({
              name: data.name,
              about: data.about,
              avatar: data.avatar,
              _id: data._id
            })
          })
          .catch((err) => {
            console.log(err)
          });

        history.push('/');
      });
  };

  function handleRegister(password, email) {
    return auth.register(password, email)
      .then(() => {

        setMessage({ message: 'Вы успешно зарегистрировались!', img: unionJackdaw })
        history.push('/signin')
      }).catch(err => {
        console.log(err)
        setMessage({ message: ('Что-то пошло не так!   Попробуйте еще раз.'), img: unionCross })
      }).finally(() => setIsInfoTooltip(true));
  }

  function handleLogout() {
    localStorage.removeItem('jwt');
    setLoggedIn(false);
    history.push('/signin');
  }

  function handleCardClick(card) {
    setSelectedCard(card)
  };

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true)
  };

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true)
  };

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true)
  };

  function closeAllPopups() {
    setSelectedCard(null);
    setIsEditAvatarPopupOpen(false)
    setIsEditProfilePopupOpen(false)
    setIsAddPlacePopupOpen(false)
    setIsInfoTooltip(false);
  };

  function handleCardLike(card) {
    const isLiked = card.likes.some(like => like._id === currentUser._id);
    api.changeLikeCardStatus(card._id, isLiked).then((newCard) => {
      setCards((state) => state.map((c) => c._id === card._id ? newCard : c))
    }).catch((err) => {
      console.log(err)
    });;
  };

  function handleCardDelete(card) {
    api.deleteCard(card._id)
      .then(() => {
        setCards((state) => state.filter((item) => item._id !== card._id)); 
      }).catch((err) => {
        console.log(err)
      });
  };

  function handleUpdateUser(name, about) {
    setIsLoading(true)
    api.setApiUsers(name, about)
      .then(res => {
        setCurrentUser(res);
        closeAllPopups();
      }).catch((err) => {
        console.log(err)
      }).finally(() => setIsLoading(false));;
  };

  function handleAddPlaceSubmit(card) {
    api.createCards(card)
      .then(newCard => {
        setCards([newCard.data, ...cards]);
        closeAllPopups();
      }).catch((err) => {
        console.log(err)
      })
  };

  function handleUpdateAvatar(avatar) {
    setIsLoading(true)
    api.changeAvatar(avatar)
      .then((res) => {
        setCurrentUser(res)
        closeAllPopups();
      }).catch((err) => {
        console.log(err)
      }).finally(() => setIsLoading(false));
  };

  return (
    <div>
      <Switch>
        <ProtectedRoute exact path="/" loggedIn={loggedIn} >
          <Header
            link={'Выйти'}
            path='/signin'
            onLogout={handleLogout}
            userData={userData}
            loggedIn={loggedIn}
            
          />
          <CurrentUserContext.Provider value={currentUser}>
            <CurrentCardContext.Provider value={cards}>
              <Main
                onEditProfile={handleEditProfileClick}
                onAddPlace={handleAddPlaceClick}
                onEditAvatar={handleEditAvatarClick}
                handleCardClick={handleCardClick}
                onCardLike={handleCardLike}
                onCardDelete={handleCardDelete}
              />
              <PopupEditProfile opened={isEditProfilePopupOpen} buttonText={buttonText} onUpdateUser={handleUpdateUser} onClosePopup={closeAllPopups}></PopupEditProfile>
              <PopupAddPlace opened={isAddPlacePopupOpen} buttonText={buttonText} onPlace={handleAddPlaceSubmit} onClosePopup={closeAllPopups}></PopupAddPlace>
              <PopupEditAvatar opened={isEditAvatarPopupOpen} buttonText={buttonText} onUpdateAvatar={handleUpdateAvatar} onClosePopup={closeAllPopups}></PopupEditAvatar>
              <ImagePopup card={selectedCard} onClose={closeAllPopups} />
              <PopupWithForm name="you-sure" opened={isYouSurePopupOpen} title='Вы уверены?' buttonText='Да' onClosePopup={closeAllPopups}><PopupYouSure /></PopupWithForm>
            </CurrentCardContext.Provider>
          </CurrentUserContext.Provider>
        </ProtectedRoute>
        <Route path="/signup">
          <Header
            link={'Войти'}
            path='/signin'
            
          />
          <Register onRegister={handleRegister} />
          <InfoTooltip opened={isInfoTooltip} onClose={closeAllPopups} onTitle={message} />
        </Route>
        <Route path="/signin">
          <Header
            link={'Зарегистрироваться'}
            path='/signup'
            
          />
          <Login onLogin={handleLogin} />
        </Route>
        <Route exact path="/">
          {loggedIn ? <Redirect to="/" /> : <Redirect to="/signin" />}
        </Route>
      </Switch>
      <Footer />
    </div>
  );
};

export default App;
