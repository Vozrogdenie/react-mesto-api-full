import closePopup from '../images/Close.png'
function ImagePopup(props) {

    return(
        <div className={`${props.card && "popup_opened"} popup popup_type_picture`}>
            <div className="popup__container popup__container_type_picture">
                <button className="button" type="button">
                    <img className="popup__close" onClick={props.onClose} src={closePopup} alt="Кнопка закрытия"/>
                </button>
                <img className="popup__foto" src={props.card?.link} alt={props.card?.name}/>
                <p className="popup__title popup__title_type_picture">{props.card?.name}</p>
            </div>
        </div>
    );
};

export default ImagePopup;