import { ITodoListStore } from "./data/todo-list.ts";
import { TodoListStore } from "./data/todo-list.memo.ts";

declare global {
  const todoListStore: ITodoListStore;
  interface Window {
    todoListStore: ITodoListStore;
  }
}

window.todoListStore = new TodoListStore();
