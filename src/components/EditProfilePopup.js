import React from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {
  const currentUser = React.useContext(CurrentUserContext);
  const [name, setName] = React.useState("");
  const [description, setDescription] = React.useState("");

  React.useEffect(() => {
    if (currentUser) {
      setName(currentUser.name);
      setDescription(currentUser.about);
    }
  }, [currentUser]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdateUser({
      name,
      about: description,
    });
  };

  return (
    <PopupWithForm
      isOpen={isOpen}
      onClose={onClose}
      title="Editar perfil"
      name="edit"
      buttonId="saveButton"
      buttonTextId="saveButtonText"
      buttonText="Salvar"
      onSubmit={handleSubmit}
    >
      <label className="popup__form-field">
        <input
          type="text"
          minLength="2"
          maxLength="40"
          placeholder="Nome"
          id="pName"
          className="popup__text"
          value={name}
          onChange={(e) => setName(e.target.value)}
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
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <span className="error-message" id="aboutError"></span>
      </label>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
