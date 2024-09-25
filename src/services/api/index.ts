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

  static init() {
    if (API.isAuthorized()) {
      API._token = localStorage.getItem("token");
    }
  }
  static isAuthorized() {
    if (!localStorage.getItem("token")) return false;
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
          if (data?.result?.token)
            localStorage.setItem("token", data?.result?.token);
          return true
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
