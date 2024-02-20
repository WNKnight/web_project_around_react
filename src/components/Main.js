import React from "react";
import apiInstance from "../utils/Api.js";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";
import PopupWithForm from "./PopupWithForm.js";
import Card from "./Card.js";
import ImagePopup from "./ImagePopup.js";
import EditProfilePopup from "./EditProfilePopup.js";

function Main({
  isEditProfilePopupOpen,
  isAddPlacePopupOpen,
  isEditAvatarPopupOpen,
  isDeleteConfirmationOpen,
  onEditProfileClick,
  selectedCard,
  onAddPlaceClick,
  onEditAvatarClick,
  onCloseClick,
  onCardClick,
  onUpdateUser,
}) {
  const currentUser = React.useContext(CurrentUserContext);
  const [cards, setCards] = React.useState([]);

  React.useEffect(() => {
    apiInstance
      .getCards()
      .then((data) => {
        setCards(data);
        console.log();
      })
      .catch((error) => {
        console.error("Erro ao obter os dados dos cartões:", error);
      });
  }, []);

  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i._id === currentUser._id);
    apiInstance
      .changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch((error) => {
        console.error("Erro ao atualizar status de curtida:", error);
      });
  }

  function handleCardDelete(card) {
    apiInstance
      .deleteCard(card._id)
      .then(() => {
        setCards((prevCards) => prevCards.filter((c) => c._id !== card._id));
      })
      .catch((error) => {
        console.error("Erro ao excluir o cartão:", error);
      });
  }

  return (
    <main className="content">
      <div className="profile">
        <div
          className="profile__avatar-container"
          style={{
            backgroundImage: `url(${currentUser && currentUser.avatar})`,
          }}
          onClick={onEditAvatarClick}
        >
          <img
            className="profile__avatar-image"
            src={currentUser && currentUser.avatar}
            alt="foto de perfil"
          />
          <button className="profile__avatar-edit" id="avatarEdit"></button>
          <div className="profile__avatar-overlay"></div>
        </div>
        <div className="profile__info">
          <h2 className="profile__name">{currentUser && currentUser.name}</h2>
          <button
            className="profile__edit-button"
            id="editButton"
            onClick={onEditProfileClick}
          ></button>
          <h3 className="profile__about">{currentUser && currentUser.about}</h3>
        </div>
        <button
          className="profile__add-button"
          id="addButton"
          onClick={onAddPlaceClick}
        ></button>
      </div>

      <EditProfilePopup
        isOpen={isEditProfilePopupOpen}
        onClose={onCloseClick}
        onUpdateUser={onUpdateUser}
      />

      <PopupWithForm
        name="newLocation"
        title="Novo Local"
        buttonId="createButton"
        buttonTextId="createButtonText"
        buttonText="Criar"
        isOpen={isAddPlacePopupOpen}
        onClose={onCloseClick}
      >
        <label className="popup__form-field">
          <input
            type="text"
            minLength="2"
            maxLength="30"
            placeholder="Titulo"
            id="pTitle"
            className="popup__text"
            required
          />
          <span className="error-message" id="titleError"></span>
        </label>
        <label className="popup__form-field">
          <input
            type="url"
            placeholder="Link de Imagem"
            id="pLink"
            className="popup__text"
            required
          />
          <span className="error-message" id="linkError"></span>
        </label>
      </PopupWithForm>

      <PopupWithForm
        name="DeleteConfirmation"
        title="Tem Certeza?"
        buttonId="confirmButton"
        buttonTextId="confirmButtonText"
        buttonText="Sim"
        isOpen={isDeleteConfirmationOpen}
        onClose={onCloseClick}
      />

      <ImagePopup selectedCard={selectedCard} onClose={onCloseClick} />

      <div
        className={`overlay ${
          isEditProfilePopupOpen ||
          isAddPlacePopupOpen ||
          isEditAvatarPopupOpen ||
          isDeleteConfirmationOpen ||
          selectedCard
            ? "overlay_visible"
            : ""
        }`}
        onClick={onCloseClick}
      ></div>
      <section className="gallery">
        <ul className="card-list">
          {cards.map((card) => (
            <Card
              key={card._id}
              card={card}
              onCardClick={onCardClick}
              onDeleteButtonClick={handleCardDelete}
              onCardLike={handleCardLike}
            />
          ))}
        </ul>
      </section>
    </main>
  );
}

export default Main;
