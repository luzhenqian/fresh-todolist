export interface ITodo {
  id?: string;
  text?: string;
  completed?: boolean;
}

export type ITodos = ITodo[];

export interface ITodoListStore {
  _get(): ITodos;
  _set(todos: ITodos): void;
  get(): ITodos;
  create(todo: ITodo): ITodo;
  update(todo: ITodo): boolean;
  remove(id: string): boolean;
}
