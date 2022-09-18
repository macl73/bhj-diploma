class Sidebar {

  static init() {
    this.initAuthLinks();
    this.initToggleButton();
  }

  static initToggleButton() {
    const sidebarToggle = document.querySelector(".sidebar-toggle");

    sidebarToggle.addEventListener("click", () => {
      sidebarToggle.closest(".sidebar-mini").classList.toggle("sidebar-open");
      sidebarToggle.closest(".sidebar-mini").classList.toggle("sidebar-collapse");
    })
  }

  static initAuthLinks() {
    const loginBtn = document.querySelector(".menu-item_login > a");
    loginBtn.addEventListener("click", e => {
      e.preventDefault();
      App.getModal("login").open();
    })

    const registerBtn = document.querySelector(".menu-item_register > a");
    registerBtn.addEventListener("click", e => {
      e.preventDefault();
      App.getModal("register").open();
    })

    const logoutBtn = document.querySelector(".menu-item_logout > a");
    logoutBtn.addEventListener("click", e => {
      e.preventDefault();
      User.logout((err, response) => {
        if (response && response.success) {
          App.setState("init");
        }
      })      
    })
  }
}