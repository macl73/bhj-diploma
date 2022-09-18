class TransactionsPage {

  constructor( element ) {
    this.element = element;
    if (element === null || element === "") {
      throw new Error ("Передан пустой элемент");
    }
    this.registerEvents();
  }

  update() {
    if (localStorage.lastOptions) {
      this.render(JSON.parse(localStorage.lastOptions));
    } else {
      this.render();
    }
  }

  registerEvents() {
    this.element.querySelector(".remove-account").addEventListener("click", () => this.removeAccount());
    this.element.addEventListener("click", event => {
      event.preventDefault();
      if (event.target.closest(".transaction__remove").dataset.id) {
        this.removeTransaction(event.target.closest(".transaction__remove").dataset.id);
      }
    })
  }

  removeAccount() {
    let confirmDeleteAccount = confirm("Вы действительно хотите удалить счет?");
    if (!confirmDeleteAccount) {
      return;
    } else {
      Account.remove({id: JSON.parse(localStorage.lastOptions).account_id}, (err, response) => {
        if (response?.success) {
          this.clear();
          App.updateWidgets();
          this.update();
        }
      })
    }
  }

  removeTransaction( id ) {
    let confirmDeleteTransaction = confirm("Вы действительно хотите удалить транзакцию?");
    if (confirmDeleteTransaction) {
      Transaction.remove({id: id}, (err, response) => {
        if (response?.success) {
          App.update();
        }
      })
    }
  }

  render(options){
    if (!options) {
      return;
    } else {
      localStorage.setItem("lastOptions", JSON.stringify(options))
      Account.get(options.account_id, (err, response) => {
        if (response?.success) {
          this.renderTitle(response.data.name);
        }
      })
    Transaction.list(options, (err, response) => {
        if (response?.success) {
          const contentList = this.element.querySelectorAll(".transaction");
          contentList.forEach(elem => elem.remove());
          this.renderTransactions(response.data);
        }
      })
    }
  }

  clear() {
    const contentList = this.element.querySelectorAll(".transaction");
    contentList.forEach(elem => elem.remove());
    this.renderTransactions([]);
    this.renderTitle("Название счета");
    localStorage.removeItem("lastOptions");
  }

  renderTitle(name){
    this.element.querySelector(".content-title").innerText = name;
  }

  formatDate(date){
    const time = new Date(date);
    const month = ["января", "февраля", "марта", "апреля", "мая", "июня", "июля", "августа", "сентября", "октября", "ноября", "декабря"];
    const hour = time.getHours() < 10 ? `0${time.getHours()}` : `${time.getHours()}`;
    const min = time.getMinutes() < 10 ? `0${time.getMinutes()}` : `${time.getMinutes()}`;
    return `${time.getDate()} ${month[time.getMonth()]} ${time.getFullYear()} г. в ${hour}:${min}`;
  }

  getTransactionHTML(item){
    return `<div class="transaction transaction_${item.type} row">
    <div class="col-md-7 transaction__details">
      <div class="transaction__icon">
          <span class="fa fa-money fa-2x"></span>
      </div>
      <div class="transaction__info">
          <h4 class="transaction__title">${item.name}</h4>
          <div class="transaction__date">${this.formatDate(item.created_at)}</div>
      </div>
    </div>
    <div class="col-md-3">
      <div class="transaction__summ">
      ${item.sum} <span class="currency">₽</span>
      </div>
    </div>
    <div class="col-md-2 transaction__controls">
        <button class="btn btn-danger transaction__remove" data-id="${item.id}">
            <i class="fa fa-trash"></i>  
        </button>
    </div>
</div>`;
  }

  renderTransactions(data){
    const content = this.element.querySelector(".content");
    data.forEach(elem => content.insertAdjacentHTML("beforeend", this.getTransactionHTML(elem)));
    /*const transactionRemove = this.element.querySelectorAll(".transaction__remove");
    transactionRemove.forEach(elem => {
      elem.addEventListener("click", () => this.removeTransaction(elem.dataset.id));
    })*/
  }
}