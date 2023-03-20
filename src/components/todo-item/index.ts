import { state } from "../../state";

export function initTodoItem() {
  class TodoItem extends HTMLElement {
    shadow: ShadowRoot;
    title: string;
    checked: boolean = false;
    constructor() {
      super();
      this.shadow = this.attachShadow({ mode: "open" });
    }
    connectedCallback() {
      this.title = this.getAttribute("title") || "";
      this.checked = this.hasAttribute("checked");
      this.id = this.getAttribute("id") as any;
      const style = document.createElement("style");
      style.innerHTML = `
      .root{
        display: flex;
        justify-content: space-evenly;
        align-items: flex-start;
        border-radius: 4px;
        background-color : rgb(70, 4, 122);
        padding: 22px 13px;
        max-width: 300px;
        box-shadow: 10px 15px 8px rgb(188, 187, 189);
        font-family: "Roboto";
        font-size: 18px;
        font-weight: 500;
        min-width: 300px;
        min-height: 200px;
      }
      
      input.checkbox-input:before{
        content: "";
        width: 40px;
        height: 40px;
        float: left;
        margin: 0em 0.5em 0 0;
        border: 2px solid #ccc;
        background: #fff;
        border-radius:2px;
      }

      input.checkbox-input:checked:after{
        content: "";
        width: 35px;
        height: 15px;
        border: 4px solid #a539e8;
        float: left;
        margin-left: -3.5499999999999945em;
        border-right: 0;
        border-top: 0;
        margin-top: 1em;
        transform: rotate(-45deg);
        margin-right: -4em;
        border-radius:2px;
        
      }
      .title{
        max-width:200px;
        text-align:start;
        margin-top:10px;
      }

      .container{
        min-height: 200px;
        display:flex;
        flex-direction: column;
        justify-content: space-between;
      }

      .delete-button{
        font-family:"Roboto";
        border:none;
        padding: 5px 20px;
        text-align: center;
        border-radius:2px;
        background-color: white;
        color: rgb(70, 4, 122);
      }
      
      h4.checked{
        text-decoration:line-through;
        text-decoration-color: black;
      }
      `;
      this.shadow.appendChild(style);
      this.render();
    }

    addlisteners() {
      const chEl = this.shadow.querySelector(".checkbox-input");
      chEl?.addEventListener("click", (e) => {
        const target = e.target as any;
        const event = new CustomEvent("change", {
          detail: {
            id: this.id,
            value: target.checked,
          },
        });
        this.dispatchEvent(event);
      });
      const deleteButton = this.shadow.querySelector(".delete-button");
      deleteButton?.addEventListener("click", (e) => {
        const target = e.target as any;
        const event = new CustomEvent("delete-item", {
          detail: {
            id: this.id,
            value: true,
          },
        });
        console.log(event);
        this.dispatchEvent(event);
      });
      this.addEventListener("delete-item", (e: any) => {
        function confirmMessege() {
          let resultado = window.confirm(
            "Seguro/a que querés eliminar este pendiente?"
          );
          if (resultado === true) {
            state.changeItemDeletedState(e.detail.id, e.detail.value);
          }
        }
        confirmMessege();
      });
    }
    render() {
      const div = document.createElement("div");
      div.innerHTML = `
      <div class="root">
      <div class="container">
      <h4 class="title ${this.checked ? "checked" : ""}" >${this.title}</h4>
      <button class ="delete-button">Eliminar pendiente</button>
      </div>
      <div>
      <input class="input checkbox-input" type="checkbox" ${
        this.checked ? "checked" : ""
      }/>
        </div>
        </div>
      
        `;
      this.shadow.appendChild(div);
      this.addlisteners();
    }
  }
  customElements.define("todo-item", TodoItem);
}
