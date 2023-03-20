export function initFooter() {
  class Footer extends HTMLElement {
    constructor() {
      super();
      this.render();
    }

    render() {
      const div = document.createElement("div");

      div.textContent = "Footer";
      div.style.backgroundColor = "rgb(70, 4, 122)";
      div.style.color = "white";
      div.style.width = "100%";
      div.style.height = "300px";
      div.style.display = "flex";
      div.style.alignItems = "center";
      div.style.alignContent = "center";
      div.style.justifyContent = "center";

      this.appendChild(div);
    }
  }
  customElements.define("my-footer", Footer);
}
