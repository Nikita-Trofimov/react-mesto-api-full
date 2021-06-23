import registrationOk from '../images/registration_ok.svg'
import registrationErr from '../images/registration_err.svg'
function InfoTooltip({isOpen, onClose, isRegistration}) {
  return (
    <section className={`popup popup-illustration-container ${isOpen && 'popup_opened'}`}>
      <div className="popup__container">
        <img className="info-tooltip__img" alt="Ошибка" src={isRegistration ? registrationOk : registrationErr}/>
        <p className="info-tooltip__text">{isRegistration ? "Вы успешно зарегистрировались!" : "Что-то пошло не так!Попробуйте ещё раз."}</p>
        <button type="button" className="popup__close-button" onClick={onClose}></button>    
      </div>
    </section>
  )
}

export default InfoTooltip