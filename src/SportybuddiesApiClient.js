const BASE_API_URL = process.env.REACT_APP_BASE_API_URL;

export default class SportybuddiesApiClient {
  constructor() {
    this.base_url = BASE_API_URL + "/api";
  }

  async request(options) {
    let response = await this.requestInternal(options);
    if (response.status === 401 && options.url !== '/refresh') {
      const refreshResponse = await this.post('/refresh', {
        refreshToken: localStorage.getItem('refreshToken'),
      });
      if (refreshResponse.ok) {
        localStorage.setItem('accessToken', refreshResponse.body.access_token);
        localStorage.setItem('refreshToken', refreshResponse.body.refreshToken);
        response = await this.requestInternal(options);
      }
    }
    return response;
  }


  async requestInternal(options) {
    let query = new URLSearchParams(options.query || {}).toString();
    if (query !== "") {
      query = "?" + query;
    }

    let response;
    try {
      response = await fetch(this.base_url + options.url + query, {
        method: options.method,
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("accessToken"),
          credentials: options.url === '/refresh' ? 'include' : 'omit',
          ...options.headers,
        },
        body: options.body ? JSON.stringify(options.body) : null,
      });
    } catch (error) {
      response = {
        ok: false,
        status: 500,
        json: async () => {
          return {
            code: 500,
            message: "The server is unresponsive",
            description: error.toString(),
          };
        },
      };
    }
    const headers = {};
    response.headers.forEach((value, key) => {
      headers[key] = value;
    });
    let responseBody = null;
    if (response.status !== 204) {
      const text = await response.text();
      responseBody = text ? JSON.parse(text) : null;
    }
    return {
      ok: response.ok,
      status: response.status,
      body: responseBody,
      headers: headers,
    };
  }

  async login(username, password) {
    const response = await this.post("/login", {
      email: username,
      password: password,
    });
    if (!response.ok) {
      return response.status === 401 ? "fail" : "error";
    }
    localStorage.setItem("accessToken", response.body.accessToken);
    localStorage.setItem("refreshToken", response.body.refreshToken);
    return "ok";
  }

  async logout() {
    await this.delete("/tokens");
    localStorage.removeItem("accessToken");
  }

  isAuthenticated() {
    return localStorage.getItem("accessToken") !== null;
  }

  async get(url, query, options) {
    return this.request({ method: "GET", url, query, ...options });
  }

  async post(url, body, options) {
    return this.request({ method: "POST", url, body, ...options });
  }

  async put(url, body, options) {
    return this.request({ method: "PUT", url, body, ...options });
  }

  async delete(url, options) {
    return this.request({ method: "DELETE", url, ...options });
  }
}
