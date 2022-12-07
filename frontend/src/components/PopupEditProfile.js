import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import PopupWithForm from "./PopupWithForm";

function PopupEditProfile(props) {
    const [name, setName] = React.useState('');
    const [description, setDescription] = React.useState('');
    const currentUser = React.useContext(CurrentUserContext);

    React.useEffect(() => {
        setName(currentUser.name);
        setDescription(currentUser.about);
      }, [props.opened]); 

    function handleSubmit(e){
        e.preventDefault();
        props.onUpdateUser(name, description);
    };

    function handleChangeName(e) {
        setName(e.target.value);
    };

    function handleChangeDescription(e) {
        setDescription(e.target.value);
    };

    return(
        <PopupWithForm name="edit"opened={props.opened} onClosePopup={props.onClosePopup} title='Редактировать профиль' onSubmit={handleSubmit} buttonText='Сохранить'>
            <input onChange={handleChangeName}  value={name} className="popup__input popup__input_value_name" name="name" type="text" required minLength="2" maxLength='40' placeholder="имя"/>
            <span className="popup__input-name-error"></span>
            <input onChange={handleChangeDescription}  value={description} className="popup__input popup__input_value_profession" description="profession" type="text" required minLength="2" maxLength='200' placeholder="профессия"/>
            <span className="popup__input-profession-error"></span>
        </PopupWithForm>
    )
}

export default PopupEditProfile;