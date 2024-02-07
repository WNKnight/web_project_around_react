import React from "react";
import AvatarImage from "../images/Avatar.png";
import PopupWithForm from "./PopupWithForm.js";

function Main({
  isEditProfilePopupOpen,
  isAddPlacePopupOpen,
  isEditAvatarPopupOpen,
  onEditProfileClick,
  onAddPlaceClick,
  onEditAvatarClick,
  onCloseClick,
}) {
  return (
    <main className="content">
      <div className="profile">
        <div className="profile__avatar-container" onClick={onEditAvatarClick}>
          <img
            className="profile__avatar-image"
            src={AvatarImage}
            alt="foto de perfil"
          />
          <button className="profile__avatar-edit" id="avatarEdit"></button>
          <div className="profile__avatar-overlay"></div>
        </div>
        <div className="profile__info">
          <h2 className="profile__name">Jacques Cousteau</h2>
          <button
            className="profile__edit-button"
            id="editButton"
            onClick={onEditProfileClick}
          ></button>
          <h3 className="profile__about">Explorar</h3>
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
      />

      <section className="popup popup-image" id="popupImage">
        <img className="popup__Image-Zoom" id="ImageZoom" />
        <button
          className="popup__close popup__close_image"
          id="closeImage"
        ></button>
        <h2 className="popup__image-text" id="ImageTitle"></h2>
      </section>

      <div
        className={`overlay ${
          isEditProfilePopupOpen || isAddPlacePopupOpen || isEditAvatarPopupOpen
            ? "overlay_visible"
            : ""
        }`}
        onClick={onCloseClick}
      ></div>
      <section className="gallery">
        <ul className="card-list"></ul>
        <template id="cardTemplate">
          <li className="card">
            <img className="card__img" />
            <button className="card__delete-button" id="deleteButton"></button>
            <div className="card__info">
              <h2 className="card__img-name"></h2>
              <div className="card__likes">
                <button type="button" className="card__like-button"></button>
                <span className="card__like-count">0</span>
              </div>
            </div>
          </li>
        </template>
      </section>
    </main>
  );
}

export default Main;
