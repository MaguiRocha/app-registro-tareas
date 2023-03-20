import { state } from "../../state";

export function initHomePage(containerEl) {
  const div = document.createElement("div");

  const tasks = state.getEnabledTasks() as any;

  div.innerHTML = `
  <custom-text class="title" variant="title">Mis pendientes</custom-text>
  <todo-form></todo-form>
    <div class="lista"></div>
        `;
  const listaEl = div.querySelector(".lista") as any;

  function createTasks(items) {
    listaEl.innerHTML = "";
    for (const item of items) {
      const todoItemEl = document.createElement("todo-item");
      todoItemEl.setAttribute("title", item.title);
      todoItemEl.setAttribute("id", item.id);
      if (item.completed) {
        todoItemEl.setAttribute("checked", "true");
      }

      todoItemEl.addEventListener("change", (e: any) => {
        state.changeItemState(e.detail.id, e.detail.value);
      });
      listaEl.appendChild(todoItemEl);
    }
  }

  state.subscribe(() => {
    createTasks(state.getEnabledTasks());
  });

  createTasks(tasks);
  containerEl.appendChild(div);
}
