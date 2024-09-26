const rootURL = "https://transstage1.iwayex.com/transnextgen";

export const isAuthorized = () => {};

const Auth = () => {};

export const getRequest = async (url: string, page: number) => {
  return new Promise((resolve, reject) => {
    fetch(`${rootURL}/${url}?page=${page}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((response) => {
        console.log(response);
      });
  });
};

// TODO rewrite localstorage to coockie
class API {
  _token = null;
  static _token: string | null;

  static setCookie(token: string) {
    let expires = "";
    let date = new Date();
    date.setTime(date.getTime() + 1 * 24 * 60 * 60 * 1000);
    expires = "; expires=" + date.toUTCString();
    document.cookie = "token=" + token + "; path=/";
  }

  static getCookie() {
    let nameEQ = "token=";
    let ca = document.cookie.split(";");
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == " ") c = c.substring(1, c.length);
      if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
  }

  static init() {
    if (API.getCookie()) {      
      API._token = API.getCookie();
    }
  }
  static isAuthorized() {
    if (!API.getCookie()) return false;
    return true;
  }

  static Auth(login: string, password: string) {
    return new Promise((resolve, reject) => {
      fetch(`/api/auth`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ login, password }),
      })
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          if (data?.result?.token) {
            API.setCookie(data.result.token);
            API.init()
            resolve(true);
          }
        })
        .catch((e) => {
          reject(e);
        });
    });
  }

  static getOrderTrips(page: number) {
    return new Promise((resolve, reject) => {
      fetch(`${rootURL}/v3/orders/trips?page=${page}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${this._token}`,
        },
      })
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          resolve(data?.result);
        })
        .catch((e) => {
          reject(e);
        });
    });
  }
}

export default API;
