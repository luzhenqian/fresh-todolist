import { ITodo, ITodoListStore, ITodos } from "./todo-list.ts";

let store: ITodos = [];

export class TodoListStore implements ITodoListStore {
  _get() {
    return store;
  }
  _set(todos: ITodos): void {
    store = todos;
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
      if (key in findTodo) {
        (findTodo as any)[key] = todo[key as keyof ITodo];
      }
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
