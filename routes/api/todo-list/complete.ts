import { Handlers } from "$fresh/server.ts";
import { ITodo, TodoListStore } from "../../../data/todo-list.ts";
import { getData } from "../../../utils/getData.ts";
import { JSONtoString } from "./index.ts";

const store = new TodoListStore();

export const handler: Handlers = {
  async PUT(req) {
    const data = await getData(req.body);
    let response = null;
    if (data) {
      const todo = JSON.parse(data) as ITodo;
      todo.completed = true;
      response = store.update(todo);
    }
    return new Response(JSONtoString({ ok: response }), {
      headers: { "Content-Type": "application/json" },
    });
  },
};
