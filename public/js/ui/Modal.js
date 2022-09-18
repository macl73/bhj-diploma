class Modal {

  constructor(element){
    this.element = element;
    if (element === null || element === "") {
      throw new Error ("Передан пустой элемент");
    }
    this.registerEvents();
  }

  registerEvents() {
    const closeBtn = this.element.querySelectorAll('[data-dismiss="modal"]');
    closeBtn.forEach(elem => {
      elem.onclick = e => this.onClose(e);
    });
  }

  onClose(e) {
    e.preventDefault();
    this.close(e);
  }

  open() {
    this.element.setAttribute("style", "display: block;");
  }

  close(){
    this.element.setAttribute("style", "display: none;");
  }
}