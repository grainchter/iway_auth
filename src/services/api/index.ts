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

  static Auth() {}

  static getRequest(url: string, page: number) {
    return new Promise((resolve, reject) => {
      fetch(`${rootURL}/${url}?page=${page}`, {
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
