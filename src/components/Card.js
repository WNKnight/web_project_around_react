import React from "react";

function Card({ card, onCardClick, onDeleteButtonClick }) {
  const handleClick = () => {
    onCardClick(card);
  };

  const handleDeleteButtonClick = (evt) => {
    evt.stopPropagation();
    onDeleteButtonClick();
  };

  return (
    <li className="card" onClick={handleClick}>
      <img className="card__img" src={card.link} alt={card.name} />
      <button
        className="card__delete-button"
        id="deleteButton"
        onClick={handleDeleteButtonClick}
      ></button>
      <div className="card__info">
        <h2 className="card__img-name">{card.name}</h2>
        <div className="card__like-container">
          <button type="button" className="card__like-button"></button>
          <span className="card__like-count">{card.likes.length}</span>
        </div>
      </div>
    </li>
  );
}

export default Card;
