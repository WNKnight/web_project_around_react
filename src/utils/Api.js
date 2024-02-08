class Api {
  constructor(config) {
    this.baseUrl = config.baseUrl;
    this.headers = config.headers;
  }

  getUserInfo() {
    return fetch(`${this.baseUrl}/users/me`, {
      headers: this.headers,
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Error: ${res.status}`);
    });
  }

  getCards() {
    return fetch(`${this.baseUrl}/cards`, {
      headers: this.headers,
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Error: ${res.status}`);
    });
  }
}

const apiInstance = new Api({
  baseUrl: "https://around.nomoreparties.co/v1/web_ptbr_08",
  headers: {
    authorization: "7887b144-3999-4d14-a3d6-51691cca960c",
    "Content-Type": "application/json",
  },
});

export default apiInstance;
