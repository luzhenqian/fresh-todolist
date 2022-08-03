export interface ITodo {
  id?: string;
  text?: string;
  completed?: boolean;
}

export type ITodos = ITodo[];

export interface ITodoListStore {
  store: Storage;
  key: "todolist";
  _get(): ITodos;
  _set(todos: ITodos): void;
  get(): ITodos;
  create(todo: ITodo): ITodo;
  update(todo: ITodo): boolean;
  remove(id: string): boolean;
}

export class TodoListStore implements ITodoListStore {
  store: Storage;
  key: "todolist";
  constructor() {
    this.store = sessionStorage;
    this.key = "todolist";
  }

  _get() {
    return JSON.parse(this.store.getItem(this.key) || "[]");
  }
  _set(todos: ITodos): void {
    this.store.setItem(this.key, JSON.stringify(todos));
  }

  get() {
    return this._get();
  }
  create(todo: ITodo) {
    todo.id = crypto.randomUUID();
    todo.completed = false;
    const todos = this._get();
    todos.push(todo);
    this._set(todos);
    return todo;
  }
  update(todo: ITodo) {
    const todos = this._get();
    const findTodo = todos.find((t: ITodo) => t.id === todo.id);
    if (!findTodo) {
      return false;
    }
    Object.keys(todo).forEach((key) => {
      findTodo[key] = todo[key as keyof ITodo];
    });
    this._set(todos);
    return true;
  }
  remove(id: string): boolean {
    const todos = this._get();
    const idx = todos.findIndex((t: ITodo) => t.id === id);
    if (idx >= 0) {
      todos.splice(idx, 1);
      this._set(todos);
      return true;
    }
    return false;
  }
}
