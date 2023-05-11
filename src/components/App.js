import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";
import { useState, useEffect } from 'react';
import { api } from '../utils/Api.js';

function App() {

  const [cards, setCards] = useState([]);

  const [userInfo, setuserInfo] = useState({
    "name": '',
    "about": '',
    "avatar": '',
    "_id": '',
    "cohort": ''
  });

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null)

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true)
  }

  const handleCardClick = (cards) => {
    setSelectedCard(cards);
  }

  const closeAllPopups = () => {
    setIsEditProfilePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setSelectedCard(null);
  }

  useEffect(() => {
    Promise.all([api.getUser(), api.getCards()])
      .then(([user, cards]) => {
        setuserInfo(user);
        setCards(cards.reverse());
      })
      .catch(err => console.log(err));
  }, []);

  return (
    <div className="page">
      <Header />
      <Main
        cards={cards}
        onEditProfile={handleEditProfileClick}
        onEditAvatar={handleEditAvatarClick}
        onAddPlace={handleAddPlaceClick}
        userName={userInfo.name}
        userDescription={userInfo.about}
        userAvatar={userInfo.avatar}
        onCardClick={handleCardClick}
      />
      <Footer />
      <PopupWithForm
        name={'profile'}
        title={'Редактировать профиль'}
        isOpen={isEditProfilePopupOpen}
        children={<><input type="text" id="name-input" className="popup__input popup__input_name" minLength="2"
          maxLength="40" required placeholder="Введите имя" name="username" />
          <span className="name-input-error popup__span-error"></span>
          <input type="text" id="job-input" className="popup__input popup__input_job" minLength="2"
            maxLength="200" required placeholder="Введите род деятельности" name="job" />
          <span className="job-input-error popup__span-error"></span></>
        }
        onClose={closeAllPopups}
      />
      <PopupWithForm
        name={'avatar'}
        title={'Обновить аватар'}
        isOpen={isEditAvatarPopupOpen}
        children={<><input type="url" id="avatar-input" className="popup__input popup__input_avatar" required
          placeholder="Аватар" name="avatar" />
          <span className="avatar-input-error popup__span-error"></span></>
        }
        onClose={closeAllPopups}
      />
      <PopupWithForm
        name={'place'}
        title={'Новое место'}
        isOpen={isAddPlacePopupOpen}
        children={<> <input type="text" id="place-input" className="popup__input popup__input_place" minLength="2"
          maxLength="30" required placeholder="Название" name="name" />
          <span className="place-input-error popup__span-error"></span>
          <input type="url" id="link-input" className="popup__input popup__input_link" required
            placeholder="Ссылка на картинку" name="link" />
          <span className="link-input-error popup__span-error"></span></>
        }
        onClose={closeAllPopups}
      />
      <ImagePopup
        card={selectedCard}
        onClose={closeAllPopups}
      />
    </div>

  );
}

export default App;
