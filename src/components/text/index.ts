export function initTextComponent() {
  class TextComponent extends HTMLElement {
    constructor() {
      super();
      this.render();
    }

    render() {
      const variant = this.getAttribute("variant") || "body";
      const shadow = this.attachShadow({ mode: "open" });
      const div = document.createElement("div");
      const style = document.createElement("style");
      style.innerHTML = `
      .title{
        font-family: "Roboto";
        font-size: 52px;
        font-weight: 700;
      }
      .body{
        font-family: "Roboto";
        font-size: 22px;
        font-weight: 500;
      }
      `;
      div.className = variant;
      div.textContent = this.textContent;
      shadow.appendChild(div);
      shadow.appendChild(style);
    }
  }
  customElements.define("custom-text", TextComponent);
}
