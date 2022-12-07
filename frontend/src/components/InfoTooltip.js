import closePopup from '../images/Close.png'

function InfoTooltip(props) {
    return (
        <div className={`${props.opened ? "popup_opened" : ""} popup popup-infoTooltip`} >
            <div className="popup__container">
                <button onClick={props.onClose} className={`button ${props.name}`} type="button">
                    <img className="popup__close" src={closePopup} alt="Кнопка закрытия" />
                </button>
                <img className="popup__image" src={props.onTitle.img} alt={props.onTitle.message}/>
                <h2 className='popup__title-infoTooltip'>{props.onTitle.message}</h2>
            </div>
        </div>
    );
}
export default InfoTooltip;