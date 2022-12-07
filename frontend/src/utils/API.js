const api_url = "https://mesto.nomoreparties.co/v1/cohort-48";
const api_auth = "c7779e8e-b945-41f5-b681-0ea9ccf3c32a";

class Api {
    constructor(api_url, api_authorization){
        this._url = api_url;
        this._authorization = api_authorization;
    };
    
    _handleResponce(res){
        if (!res.ok) {
            return Promise.reject(`Ошибка: ${res.status}`);
        }
        return res.json();
    };
    async getApiCards(){
        return fetch(`${this._url}/cards`, {
            headers: {
                authorization: this._authorization,
                'Content-Type': 'application/json'
            }
        }).then(this._handleResponce);
    };

    async getApiUsers(){
        return fetch(`${this._url}/users/me`, {
            headers: {
                authorization: this._authorization,
                'Content-Type': 'application/json'
            }
        }).then(this._handleResponce);
    };

    async setApiUsers(name, about){
        return fetch(`${this._url}/users/me`, {
            method: "PATCH",
            headers: {
                authorization: this._authorization,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name,
                about
            })
        }).then(this._handleResponce);
    };

    createCards(card){
        return fetch(`${this._url}/cards`,{
            method:'POST',
            headers:{ 
                authorization: this._authorization,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: card.name,
                link: card.link,
            })
        }).then(this._handleResponce);
    };

    deleteCard(id) {
        return fetch(`${this._url}/cards/${id}`, {
            method: 'DELETE',
            headers: {
                authorization: this._authorization,
                'Content-Type': 'application/json',
            }
        }).then(this._handleResponce);
    };

    addLike(id) {
        return fetch(`${this._url}/cards/${id}/likes`, {
            method: 'PUT',
            headers: {
                authorization: this._authorization,
                'Content-Type': 'application/json',
            }
        }).then(this._handleResponce);
    };

    removeLike(id) {
        return fetch(`${this._url}/cards/${id}/likes`, {
            method: 'DELETE',
            headers: {
                authorization: this._authorization,
                'Content-Type': 'application/json',
            }
        }).then(this._handleResponce);
    };

    changeAvatar(Avatar) {
        return fetch(`${this._url}/users/me/avatar`, {
            method: 'PATCH',
            headers: {
                authorization: this._authorization,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                avatar: Avatar,
            })
        }).then(this._handleResponce);
    };

    changeLikeCardStatus(id, isLiked) {
        if(isLiked) {
            return this.removeLike(id);
        } else {
            return this.addLike(id);
        }
    }
    
};

const api = new Api(api_url, api_auth);
export default api;