class AsyncForm {

  constructor(element) {
    this.element = element;
    if (element === null || element === "") {
      throw new Error ("Передан пустой элемент");
    }
    this.registerEvents();
  }

  registerEvents() {
    this.element.onsubmit = e => {
      e.preventDefault();
      this.submit();
    }
  }

  getData() {
    const formData = new FormData(this.element);
    return Object.fromEntries(formData.entries());
  }

  onSubmit(options){

  }

  submit() {
    this.onSubmit(this.getData());
  }
}