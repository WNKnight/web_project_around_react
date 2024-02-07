function Main() {
  return (
    <main className="content">
      <div className="profile">
        <div className="profile__avatar-container">
          <img
            className="profile__avatar-image"
            src="<%= require('./images/Avatar.png') %>"
            alt="foto de perfil"
          />
          <button className="profile__avatar-edit" id="avatarEdit"></button>
          <div className="profile__avatar-overlay"></div>
        </div>
        <div className="profile__info">
          <h2 className="profile__name">Jacques Cousteau</h2>
          <button className="profile__edit-button" id="editButton"></button>
          <h3 className="profile__about">Explorar</h3>
        </div>
        <button className="profile__add-button" id="addButton"></button>
      </div>
      <section className="popup popup-forms" id="profilePopup">
        <button
          className="popup__close popup__close_edit"
          id="closeProfile"
        ></button>
        <h2 className="popup__title" id="pEdit">
          Editar Perfil
        </h2>
        <form className="popup__form" id="profileForm">
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
        </form>
        <button
          type="submit"
          className="popup__form-submit-button popup__form-submit-button_disabled"
          id="saveButton"
        >
          <span id="saveButtonText">Salvar</span>
        </button>
      </section>
      <section className="popup popup-forms" id="newLocationPopup">
        <button
          className="popup__close popup__close_new"
          id="closeNewLocation"
        ></button>
        <h2 className="popup__title" id="pAdd">
          Novo Local
        </h2>
        <form className="popup__form" id="newLocationForm">
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
        </form>
        <button
          type="submit"
          className="popup__form-submit-button popup__form-submit-button_disabled"
          id="createButton"
        >
          <span id="createButtonText">Criar</span>
        </button>
      </section>
      <section className="popup popup-forms" id="editAvatarPopup">
        <button
          className="popup__close popup__close_new-avatar"
          id="closeEditAvatar"
        ></button>
        <h2 className="popup__title" id="pEdAva">
          Alterar a foto do perfil
        </h2>
        <form className="popup__form" id="newAvatarImageForm">
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
        </form>
        <button
          type="submit"
          className="popup__form-submit-button popup__form-submit-button_disabled"
          id="saveAvatarButton"
        >
          <span id="AvatarButtonText">Salvar</span>
        </button>
      </section>
      <section className="popup popup-forms" id="deletePopup">
        <button
          className="popup__close popup__close_delete-popup"
          id="closeDelete"
        ></button>
        <h2 className="popup__title" id="pDelete">
          Tem Certeza?
        </h2>
        <button
          type="submit"
          className="popup__form-submit-button"
          id="confirmButton"
        >
          Sim
        </button>
      </section>

      <section className="popup popup-image" id="popupImage">
        <img className="popup__Image-Zoom" id="ImageZoom" />
        <button
          className="popup__close popup__close_image"
          id="closeImage"
        ></button>
        <h2 className="popup__image-text" id="ImageTitle"></h2>
      </section>

      <div className="overlay"></div>
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
