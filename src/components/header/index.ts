export function initHeader() {
  class Header extends HTMLElement {
    constructor() {
      super();
      this.render();
    }

    render() {
      const div = document.createElement("div");

      div.textContent = "Header";
      div.style.backgroundColor = "rgb(70, 4, 122)";
      div.style.color = "white";
      div.style.width = "100%";
      div.style.height = "60px";
      div.style.display = "flex";
      div.style.alignItems = "center";
      div.style.alignContent = "center";
      div.style.justifyContent = "center";

      this.appendChild(div);
    }
  }
  customElements.define("my-header", Header);
}
