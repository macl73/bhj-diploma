class CreateTransactionForm extends AsyncForm {

  constructor(element) {
    super(element)
    this.renderAccountsList();
  }

  renderAccountsList() {
    Account.list(null, (err, response) => {
      if (response?.success) {
        const accountsSelect = this.element.querySelector(".accounts-select");
        Array.from(accountsSelect.childNodes).forEach(elem => elem.remove());
        response.data.forEach(account => {
          accountsSelect.insertAdjacentHTML("beforeend", `<option value="${account.id}">${account.name}</option>`);
        })
      }
    })
  }

  onSubmit(data) {
    Transaction.create(data, (err, response) => {
      if (response?.success) {
        this.element.reset();
        App.update();
        App.getModal("newIncome").close();
        App.getModal("newExpense").close();
      }
    })
  }
}