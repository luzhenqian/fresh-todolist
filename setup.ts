import { ITodoListStore } from "./data/todo-list.ts";
import { TodoListStore } from "./data/todo-list.memo.ts";

declare global {
  const todoListStore: ITodoListStore;
  interface Window {
    todoListStore: ITodoListStore;
  }
}

console.log(1);

window.todoListStore = new TodoListStore();
