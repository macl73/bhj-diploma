class CreateAccountForm extends AsyncForm {

  onSubmit(data) {
    Account.create(data, (err, response) => {
      if (response?.success) {
        App.getModal("createAccount").close();
        App.update();
        this.element.reset();
      }
    })
  }
}