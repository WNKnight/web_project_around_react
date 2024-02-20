import React from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {
  const avatarRef = React.useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdateAvatar({
      avatar: avatarRef.current.value,
    });
  };

  return (
    <PopupWithForm
      isOpen={isOpen}
      onClose={onClose}
      title="Editar avatar"
      name="editAvatar"
      buttonId="saveAvatarButton"
      buttonTextId="avatarButtonText"
      buttonText="Salvar"
      onSubmit={handleSubmit}
    >
      <label>
        <input
          placeholder="Link da Imagem"
          type="url"
          className="popup__text"
          id="pLinkAvatar"
          ref={avatarRef}
          required
        />
        <span className="error-message" id="linkAvatarError"></span>
      </label>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
