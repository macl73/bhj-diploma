class TransactionsWidget {

  constructor( element ) {
    this.element = element;
    if (element === null || element === "") {
      throw new Error ("Передан пустой элемент");
    }
    this.registerEvents();
  }

  registerEvents() {
    this.element.querySelector(".create-income-button").addEventListener("click", () => {
      App.getModal("newIncome").open();
    })
    this.element.querySelector(".create-expense-button").addEventListener("click", () => {
      App.getModal("newExpense").open();
    })
  }
}
