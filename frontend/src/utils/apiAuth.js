import { server } from './constants';

class ApiAuth {
  constructor (options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
  }

  _checkResponse(res) {
    if (res.ok) {
        return res.json();
    }
    return Promise.reject(`Ошибка ${res.status} : ${res.statusText}`);
  }
  
  register(password, email) {
    return fetch(`${this._baseUrl}/signup`, {
      method: 'POST',
      headers: this._headers,
      credentials: 'include',
      body: JSON.stringify({
        "password": password,
        "email": email
      })
    }).then(this._checkResponse);
  }

  signin(password, email) {
    return fetch(`${this._baseUrl}/signin`, {
      method: 'POST',
      headers: this._headers,
      credentials: "include",
      body: JSON.stringify({
        "password": password,
        "email": email
      })
    }).then(this._checkResponse);
  }

  logout() {
    return fetch(`${this._baseUrl}/logout`)
    .then(this._checkResponse);
  }

}

export const apiAuth = new ApiAuth({
  baseUrl: server,
  headers: {
    'Content-Type': 'application/json'
  }
});