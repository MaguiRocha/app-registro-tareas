const state = {
  data: {
    tasks: [
      {
        id: 1,
        title:
          "Este es un ejemplo de como se mostrará tu pendiente en la pantalla, si deseas, podés marcarlo como completo en la cajita blanca de acá al lado, o podés eliminarlo y comenzar a agregar tus tareas a realizar!<br>Saludos!",
        completed: false,
      },
      {
        id: 2,
        title: "segundo item cancelado",
        deleted: true,
      },
    ],
  },
  listeners: [],
  init() {
    const localData = localStorage.getItem("saved-state") as any;
    console.log;
    this.setState(JSON.parse(localData));
  },
  getState() {
    return this.data;
  },

  getEnabledTasks() {
    const currentState = this.getState();
    return currentState.tasks.filter((t) => {
      return !t.deleted;
    });
  },
  addTask(id, title) {
    const currentState = this.getState();
    currentState.tasks.push({ id, title, completed: false });
    this.setState(currentState);
  },

  changeItemState(id, value) {
    const currentState = this.getState();
    const found = currentState.tasks.find((t) => t.id == id);
    found.completed = value;
    this.setState(currentState);
  },

  changeItemDeletedState(id, value) {
    const currentState = this.getState();
    const found = currentState.tasks.find((t) => t.id == id);
    found.deleted = value;
    this.setState(currentState);
  },

  setState(newState) {
    this.data = newState || this.data;
    for (const cb of this.listeners) {
      cb();
    }
    console.log("soy el state, he cambiado", newState);
    localStorage.setItem("saved-state", JSON.stringify(newState));
  },

  subscribe(callback: (any) => any) {
    this.listeners.push(callback);
  },
};

export { state };
