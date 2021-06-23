function ImagePopup(props) {
  return (
    <section className={`popup popup-illustration-container ${props.card && 'popup_opened'}`}>
      <figure className="popup-illustration">
          <img className="popup-illustration__img" alt={props.card ? props.card.name : ""} src={props.card ? props.card.link : ""}/>
          <figcaption className="popup-illustration__title">{props.card ? props.card.name: ""}</figcaption>
          <button type="button" className="popup__close-button" onClick={props.onClose}></button>    
      </figure>
    </section>
  )
}

export default ImagePopup;