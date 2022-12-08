const api_headers = {
    url: "http://api.renaissance.front.nomoredomains.club/api",
    headers: {
        'Content-Type': 'application/json'
    }
};

class Api {
    constructor(api_headers) {
        this._url = api_headers.url;
        this._headers = api_headers.headers;
    };

    _getToken() {
        return localStorage.getItem("jwt");
    }

    _handleResponce(res) {
        if (!res.ok) {
            return Promise.reject(`Ошибка: ${res.status}`);
        }
        return res.json();
    };

    async getApiCards() {
        return fetch(`${this._url}/cards`, {
            headers: {
                Authorization: `Bearer ${this._getToken()}`,
                ...api_headers.headers
            }
        }).then(this._handleResponce);
    };

    async getApiUsers() {
        return fetch(`${this._url}/users/me`, {
            headers: {
                Authorization: `Bearer ${this._getToken()}`,
                ...api_headers.headers
            }
        }).then(this._handleResponce);
    };

    async setApiUsers(name, about) {
        return fetch(`${this._url}/users/me`, {
            method: "PATCH",
            headers: {
                Authorization: `Bearer ${this._getToken()}`,
                ...api_headers.headers
            },
            body: JSON.stringify({
                name,
                about
            })
        }).then(this._handleResponce);
    };

    createCards(card) {
        return fetch(`${this._url}/cards`, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${this._getToken()}`,
                ...api_headers.headers
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
                Authorization: `Bearer ${this._getToken()}`,
                ...api_headers.headers
            }
        }).then(this._handleResponce);
    };

    addLike(id) {
        return fetch(`${this._url}/cards/${id}/likes`, {
            method: 'PUT',
            headers: {
                Authorization: `Bearer ${this._getToken()}`,
                ...api_headers.headers
            }
        }).then(this._handleResponce);
    };

    removeLike(id) {
        return fetch(`${this._url}/cards/${id}/likes`, {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${this._getToken()}`,
                ...api_headers.headers
            }
        }).then(this._handleResponce);
    };

    changeAvatar(Avatar) {
        return fetch(`${this._url}/users/me/avatar`, {
            method: 'PATCH',
            headers: {
                Authorization: `Bearer ${this._getToken()}`,
                ...api_headers.headers
            },
            body: JSON.stringify({
                avatar: Avatar,
            })
        }).then(this._handleResponce);
    };

    changeLikeCardStatus(id, isLiked) {
        if (isLiked) {
            return this.removeLike(id);
        } else {
            return this.addLike(id);
        }
    }

};

const api = new Api(api_headers);
export default api;