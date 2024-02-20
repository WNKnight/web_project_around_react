import React from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup({ isOpen, onClose, onAddPlaceSubmit }) {
  const [name, setName] = React.useState("");
  const [link, setLink] = React.useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddPlaceSubmit({ name, link });
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleLinkChange = (e) => {
    setLink(e.target.value);
  };

  return (
    <PopupWithForm
      name="newLocation"
      title="Novo Local"
      buttonId="createButton"
      buttonTextId="createButtonText"
      buttonText="Criar"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
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
          value={name}
          onChange={handleNameChange}
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
          value={link}
          onChange={handleLinkChange}
        />
        <span className="error-message" id="linkError"></span>
      </label>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
