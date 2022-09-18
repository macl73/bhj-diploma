class AccountsWidget {

  constructor( element ) {
    this.element = element;
    if (element === null || element === "") {
      throw new Error ("Передан пустой элемент");
    }
    this.update();
    this.registerEvents();
  }

  registerEvents() {
    this.element.querySelector(".create-account").addEventListener("click", () => App.getModal("createAccount").open());
    this.element.addEventListener("click", event => {
      event.preventDefault();
      if (event.target.closest(".account").dataset.id) {
        this.onSelectAccount(event.target.closest(".account"));
      }
    })
  }

  update() {
    if (User.current()) {
      Account.list(null, (err, response) => {
        if (response?.success) {
          this.clear();
          response.data.forEach(account => this.renderItem(account));
        }
      })
    }
  }

  clear() {
    this.element.querySelectorAll(".account").forEach(elem => elem.remove());
  }

  onSelectAccount( element ) {
    if (this.element.querySelector(".active")) {
      this.element.querySelector(".active").classList.remove("active");
    }
    element.classList.add("active");
    App.showPage('transactions', {account_id: element.dataset.id})
  }

  getAccountHTML(item){
    return `
      <li class="account" data-id="${item.id}">
        <a href="#">
          <span>${item.name}</span> /
          <span>${item.sum} ₽</span>
        </a>
      </li>
`
  }

  renderItem(data){
    this.element.insertAdjacentHTML("beforeend", this.getAccountHTML(data));
  }
}