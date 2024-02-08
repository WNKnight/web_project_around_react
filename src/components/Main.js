import React from "react";
import apiInstance from "../utils/Api.js";
import PopupWithForm from "./PopupWithForm.js";
import Card from "./Card.js";
import ImagePopup from "./ImagePopup.js";

function Main({
  isEditProfilePopupOpen,
  isAddPlacePopupOpen,
  isEditAvatarPopupOpen,
  isDeleteConfirmationOpen,
  onEditProfileClick,
  selectedCard,
  onAddPlaceClick,
  onEditAvatarClick,
  onDeleteButtonClick,
  onCloseClick,
  onCardClick,
}) {
  const [userName, setUserName] = React.useState("");
  const [userDescription, setUserDescription] = React.useState("");
  const [userAvatar, setUserAvatar] = React.useState("");
  const [cards, setCards] = React.useState([]);

  React.useEffect(() => {
    apiInstance
      .getUserInfo()
      .then((userInfo) => {
        setUserName(userInfo.name);
        setUserDescription(userInfo.about);
        setUserAvatar(userInfo.avatar);
      })
      .catch((error) => console.log(error));
  }, []);

  React.useEffect(() => {
    apiInstance
      .getCards()
      .then((data) => {
        setCards(data);
      })
      .catch((error) => {
        console.error("Erro ao obter os dados dos cartões:", error);
      });
  }, []);

  return (
    <main className="content">
      <div className="profile">
        <div
          className="profile__avatar-container"
          style={{ backgroundImage: `url(${userAvatar})` }}
          onClick={onEditAvatarClick}
        >
          <img
            className="profile__avatar-image"
            src={userAvatar}
            alt="foto de perfil"
          />
          <button className="profile__avatar-edit" id="avatarEdit"></button>
          <div className="profile__avatar-overlay"></div>
        </div>
        <div className="profile__info">
          <h2 className="profile__name">{userName}</h2>
          <button
            className="profile__edit-button"
            id="editButton"
            onClick={onEditProfileClick}
          ></button>
          <h3 className="profile__about">{userDescription}</h3>
        </div>
        <button
          className="profile__add-button"
          id="addButton"
          onClick={onAddPlaceClick}
        ></button>
      </div>
      <PopupWithForm
        name="profile"
        title="Editar Perfil"
        buttonId="saveButton"
        buttonTextId="saveButtonText"
        buttonText="Salvar"
        isOpen={isEditProfilePopupOpen}
        onClose={onCloseClick}
      >
        <label className="popup__form-field">
          <input
            type="text"
            minLength="2"
            maxLength="40"
            placeholder="Nome"
            id="pName"
            className="popup__text"
            required
          />
          <span className="error-message" id="nameError"></span>
        </label>
        <label className="popup__form-field">
          <input
            type="text"
            minLength="2"
            maxLength="200"
            placeholder="Sobre Mim"
            id="pAboutme"
            className="popup__text"
            required
          />
          <span className="error-message" id="aboutError"></span>
        </label>
      </PopupWithForm>

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
        name="editAvatar"
        title="Alterar a foto do perfil"
        buttonId="saveAvatarButton"
        buttonTextId="avatarButtonText"
        buttonText="Salvar"
        isOpen={isEditAvatarPopupOpen}
        onClose={onCloseClick}
      >
        <label>
          <input
            type="url"
            placeholder="Link de Imagem"
            id="pLinkAvatar"
            className="popup__text"
            required
          />
          <span className="error-message" id="linkAvatarError"></span>
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
              onDeleteButtonClick={onDeleteButtonClick}
            />
          ))}
        </ul>
      </section>
    </main>
  );
}

export default Main;
