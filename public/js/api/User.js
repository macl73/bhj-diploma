class User {

static URL = "/user";

  static setCurrent(user) {
    localStorage.setItem("user", JSON.stringify(user));
  }

  static unsetCurrent() {
    localStorage.removeItem("user");
  }

  static current() {
    const user = localStorage.user;
    return user ? JSON.parse(localStorage.user) : user;
  }

  static fetch(callback) {
    createRequest({
      url: this.URL + "/current",
      method: "GET",
      callback: (err, response) => {
          if (response && response.success) {
            this.setCurrent(response.user);
          } else {
            this.unsetCurrent();
          }
          callback(err, response);
      }
    })
  }

  static login(data, callback) {
    createRequest({
      url: this.URL + '/login',
      method: 'POST',
      data,
      callback: (err, response) => {
        if (response && response.success) {
          this.setCurrent(response.user);
        }
        callback(err, response);
      }
    })
  }

  static register(data, callback) {
    createRequest({
      url: this.URL + '/register',
      method: 'POST',
      data,
      callback: (err, response) => {
        if (response && response.success) {
          this.setCurrent(response.user);
        }
        callback(err, response);
      }
    })
  }

  static logout(callback) {
    createRequest({
      url: this.URL + '/logout',
      method: 'POST',
      callback: (err, response) => {
        if (response && response.success) {
          this.unsetCurrent();
        }
        callback(err, response);
      }
    })
  }
}
