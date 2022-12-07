import PopupWithForm from "./PopupWithForm";
import React from "react";

function PopupEditAvatar(props) {
    const avatarRef = React.useRef();

    function handleSubmit(e) {
        e.preventDefault(); 
        props.onUpdateAvatar(avatarRef.current.value);
      } 
    
    return(
        <PopupWithForm name="new-avatar" onSubmit={handleSubmit}  opened={props.opened} title='Обновить аватар?' buttonText='Сохранить' onClosePopup={props.onClosePopup}>
                <input className="popup__input popup__input_value_url" ref={avatarRef} name="url" type="url" placeholder="Ссылка на картинку" required/>
                <span className="popup__input-url-error"></span>
        </PopupWithForm>
    )
}

export default PopupEditAvatar;