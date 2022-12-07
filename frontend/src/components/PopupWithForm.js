import closePopup from '../images/Close.png'

function PopupWithForm({opened, onClosePopup, name, title, buttonText, children, onSubmit}) {
    return (
        <div className={`${opened ? "popup_opened" : ""} popup popup-${name}`}>
            <div className="popup__container">
                <button onClick={onClosePopup} className={`button ${name}`} type="button">
                    <img className="popup__close" src={closePopup} alt="Кнопка закрытия" />
                </button>
                <h2 className={`popup__title ${name}`}>{title}</h2>
                <form name={name} className={`popup__${name}-form popup__form`} onSubmit={onSubmit}>
                    {children}
                    <button type="submit" className="popup__submit-button">{buttonText}</button>
                </form>

            </div>
        </div>
    );
};

export default PopupWithForm;