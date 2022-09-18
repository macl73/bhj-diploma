class UserWidget {

  constructor(element){
    this.element = element;
    if (element === null || element === "") {
      throw new Error ("Передан пустой элемент");
    }
  }

  update(){
    if (App.state === "user-logged") {
      this.element.querySelector(".user-name").textContent = User.current().name;
    }
  }
}
