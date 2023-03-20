import { state } from "../../state";

export function initForm() {
  class Form extends HTMLElement {
    constructor() {
      super();
      this.render();
    }

    render() {
      const shadow = this.attachShadow({ mode: "open" });
      const div = document.createElement("div");
      div.className = "root-del-form";
      const style = document.createElement("style");
      style.innerHTML = `
      .form{
        display:flex;
        flex-direction:column;
        gap: 10px;
        font-family : "Roboto";
        width:100%;
      }
      .root-del-form{
        display:flex;
        flex-direction:column;
        margin: 30px 5px;
      }
      @media (min-width: 900px) {
        .form {
          display: flex;
          flex-direction: row;
          align-items: flex-end;
        }
        .root-del-form{
          padding: 50px;

        }
      }
      .blue-button{
        flex-grow: 2;
        font-family: "Roboto";
        font-size: 22px;
        padding: 15px 70px;
        text-align: center;
        color : white;
        background-color : rgb(70, 4, 122);
        border: none;
        border-radius:4px;
        min-width:300px;
        width:100%
      }
      .input{
        padding: 17px;
        font-family: "Roboto";
        font-size: 18px;
        border:none;
        border-radius:4px;

      }
      .span{
      }
      
      .container{
        flex-grow: 3;
        display:flex;
        flex-direction:column;
        text-align: start;
        min-width:300px;
        gap:5px;

      }
      `;
      div.innerHTML = `
        <form class="form">
        <div class="container">
          <span class="span">Agrega aqui tu nuevo pendiente</span>
          <input type="text" name="name" class="input" required />
        </div>
        <div>
        <button class="blue-button" >Agregar</button></div>
        </form>
  `;

      const formEl = div.querySelector(".form");
      formEl?.addEventListener("submit", (e) => {
        e.preventDefault();
        const inputEl = div.querySelector(".input") as any;
        const inputValue = inputEl.value;

        state.addTask(Math.floor(Math.random() * 1000 - 1) + 1, inputValue);
        inputEl.value = "";
      });
      shadow.appendChild(div);
      shadow.appendChild(style);
    }
  }
  customElements.define("todo-form", Form);
}
