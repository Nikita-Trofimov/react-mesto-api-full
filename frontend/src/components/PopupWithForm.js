function PopupWithForm(props) {
  return (
    <section className={`popup popup-${props.name} ${props.isOpen ? ("popup_opened") : ("")}`}>
      <div className="popup__container">
        <h2 className="popup__title">{props.title}</h2>
        <form name={props.name} onSubmit={props.onSubmit} className="popup__form" noValidate>
          {props.children}
          <button type="submit" className="popup__submit-button">{props.submitButtonTitle}</button>
        </form>
        <button type="button" className="popup__close-button" onClick={props.onClose}></button>
      </div>
    </section>
  )
}

export default PopupWithForm;