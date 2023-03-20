import { initForm } from "./components/form/index";
import { initHeader } from "./components/header/index";
import { initFooter } from "./components/footer/index";
import { initTextComponent } from "./components/text/index";
import { initTodoItem } from "./components/todo-item/index";
import { initHomePage } from "./pages/home/index";
import { state } from "./state";
console.log("Bienvenida/o a mi app de notitas!");

(function () {
  state.init();
  initHeader();
  initFooter();
  initForm();
  initTextComponent();
  initTodoItem();
  const divEl = document.querySelector(".root");
  initHomePage(divEl);
})();
