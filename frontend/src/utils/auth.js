const base_url = 'http://renaissance.front.nomoredomains.club/api';

class Auth {

    _handleResponce(res){
        if (!res.ok) {
            return Promise.reject(`Ошибка: ${res.status}`);
        }
        return res.json();
    };
    
    request = ({
        url,
        method = 'POST',
        token,
        data
      }) => {
        return fetch(`${base_url}${url}`, {
          method,
          headers: {
            'Content-Type': 'application/json',
            ...!!token && { 'Authorization': `Bearer ${token}` }
          },
          ...!!data && { body: JSON.stringify(data) }
        })
        .then(this._handleResponce);
      }
      
    register = (password, email) => {
        return this.request({
          url: '/signup',
          data: {password, email}
        });
      };
      
    authorize = (password, email) => {
        return this.request({
          url: '/signin',
          data: {password, email}
        });
      };
      
    checkToken = (token) => {
      return this.request({
        url: '/users/me',
        method: 'GET',
        token
      });
    }
}


const auth = new Auth();
export default auth;