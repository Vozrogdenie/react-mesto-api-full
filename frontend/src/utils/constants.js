export const elemConfig = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__submit-button',
    inactiveButtonClass: 'popup__submit-button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible',
    inputErrorActive: 'popup__input-error_active'
};
export const popupEdit = document.querySelector('.popup_edit');
export const buttonOpenPopupEdit = document.querySelector('.profile__button');
export const buttonClosePopupEdit = popupEdit.querySelector('.popup__close');
export const popupEditForm = document.querySelector('.popup__edit-form');
export const popupNewPlace = document.querySelector('.popup_new-place');
export const buttonOpenPopupNewPlace = document.querySelector('.add-button');
export const buttonClosePopupNewPlace = popupNewPlace.querySelector('.popup__close');
export const popupNewPlaceForm = document.querySelector('.popup__new-place-form');
export const popupNewAvatarForm = document.querySelector('.popup__new-avatar-form');
export const elementTemplate = document.querySelector('#element-template').content;
export const sectionElements = document.querySelector('.elements');
export const picture = document.querySelector('.popup_type_picture');
export const pictureFoto = picture.querySelector('.popup__foto');
export const closeFullPhoto = picture.querySelector('.popup__close');
export const pictureTitle = picture.querySelector('.popup__title_type_picture');
export const popupNameInput = document.querySelector('.popup__input_value_name');
export const popupProfessionInput = document.querySelector('.popup__input_value_profession');
export const popupNewPlaceTitleInput = document.querySelector('.popup__input_value_title');
export const popupNewPlaceUrlInput = document.querySelector('.popup__input_value_url');
export const nameTitle = document.querySelector('.profile__title');
export const professionSubtitle = document.querySelector('.profile__subtitle');
export const changeAvatarButton = document.querySelector('.profile__icon-edit');