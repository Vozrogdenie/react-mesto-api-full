import closePopup from '../images/Close.png'

function PopupWithForm(props){
    return(
        <div className={`${ props.opened ? "popup_opened" : ""} popup popup-${props.name}`}>
            <div className="popup__container">
                <button onClick={props.onClosePopup} className={`button ${props.name}`} type="button">
                    <img className="popup__close" src={closePopup} alt="Кнопка закрытия"/>
                </button>
                <h2 className={`popup__title ${props.name}`}>{props.title}</h2>
                <form name="name" className={`popup__${props.name}-form popup__form`} onSubmit={props.onSubmit}>
                    {props.children}
                    <button type="submit" className="popup__submit-button">{props.buttonText}</button>
                </form>
                
            </div>
        </div>
    );
};

export default PopupWithForm;