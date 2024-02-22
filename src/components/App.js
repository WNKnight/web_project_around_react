import React from "react";
import apiInstance from "../utils/Api.js";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";
import Header from "./Header.js";
import Main from "./Main.js";
import EditAvatarPopup from "./EditAvatarPopup.js";
import AddPlacePopup from "./AddPlacePopup.js";
import EditProfilePopup from "./EditProfilePopup.js";
import Footer from "./Footer.js";

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] =
    React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] =
    React.useState(false);
  const [isDeleteConfirmationOpen, setIsDeleteConfirmationOpen] =
    React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState(null);
  const [currentUser, setCurrentUser] = React.useState(null);
  const [cards, setCards] = React.useState([]);

  React.useEffect(() => {
    apiInstance
      .getUserInfo()
      .then((userInfo) => {
        setCurrentUser(userInfo);
      })
      .catch((error) => {
        console.log(
          "Erro ao recuperar as informacoes do usuario atual:",
          error
        );
      });

    apiInstance
      .getCards()
      .then((data) => {
        setCards(data);
      })
      .catch((error) => {
        console.log("Erro ao obter os dados dos cartões:", error);
      });
  }, []);

  const handleUpdateUser = (userData) => {
    apiInstance
      .setUserInfo(userData)
      .then((updatedUser) => {
        setCurrentUser(updatedUser);
        closeAllPopups();
      })
      .catch((error) => {
        console.log("Erro ao atualizar perfil:", error);
      });
  };

  const handleUpdateAvatar = (avatarData) => {
    apiInstance
      .setUserAvatar(avatarData)
      .then((updatedUser) => {
        setCurrentUser(updatedUser);
        closeAllPopups();
      })
      .catch((error) => {
        console.log("Erro ao atualizar avatar:", error);
      });
  };

  const handleCardLike = (card) => {
    const isLiked = card.likes.some((i) => i._id === currentUser._id);
    apiInstance
      .changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch((error) => {
        console.log("Erro ao atualizar status de curtida:", error);
      });
  };

  const handleCardDelete = (card) => {
    apiInstance
      .deleteCard(card._id)
      .then(() => {
        setCards((prevCards) => prevCards.filter((c) => c._id !== card._id));
      })
      .catch((error) => {
        console.log("Erro ao excluir o cartão:", error);
      });
  };

  const handleAddPlaceSubmit = (newCardData) => {
    apiInstance
      .addCard(newCardData)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((error) => {
        console.log("Erro ao adicionar novo cartão:", error);
      });
  };

  const handleEditProfileClick = () => {
    setIsEditProfilePopupOpen(true);
  };

  const handleAddPlaceClick = () => {
    setIsAddPlacePopupOpen(true);
  };

  const handleEditAvatarClick = () => {
    setIsEditAvatarPopupOpen(true);
  };

  const handleDeleteButtonClick = () => {
    setIsDeleteConfirmationOpen(true);
  };

  const handleCardClick = (card) => {
    setSelectedCard(card);
  };

  const closeAllPopups = () => {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsDeleteConfirmationOpen(false);
    setSelectedCard(null);
  };

  return (
    <div className="page">
      <CurrentUserContext.Provider value={currentUser}>
        <Header />
        <Main
          isEditProfilePopupOpen={isEditProfilePopupOpen}
          isAddPlacePopupOpen={isAddPlacePopupOpen}
          isEditAvatarPopupOpen={isEditAvatarPopupOpen}
          isDeleteConfirmationOpen={isDeleteConfirmationOpen}
          selectedCard={selectedCard}
          onEditProfileClick={handleEditProfileClick}
          onAddPlaceClick={handleAddPlaceClick}
          onEditAvatarClick={handleEditAvatarClick}
          onCloseClick={closeAllPopups}
          onCardClick={handleCardClick}
          onDeleteButtonClick={handleDeleteButtonClick}
          onUpdateUser={handleUpdateUser}
          onCardLike={handleCardLike}
          onCardDelete={handleCardDelete}
          cards={cards}
        />
        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
        />
        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlaceSubmit={handleAddPlaceSubmit}
        />
        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        />
        <Footer />
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
