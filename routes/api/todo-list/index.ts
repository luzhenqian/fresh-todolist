import { Handlers } from "$fresh/server.ts";
import { TodoListStore } from "../../../data/todo-list.memo.ts";
import { ITodo } from "../../../data/todo-list.ts";
import { getData } from "../../../utils/getData.ts";

const store = new TodoListStore();

// deno-lint-ignore no-explicit-any
export function JSONtoString(json: any) {
  return JSON.stringify(json);
}

export const handler: Handlers = {
  GET(_) {
    return new Response(JSONtoString(store.get()), {
      headers: { "Content-Type": "application/json" },
    });
  },
  async POST(req) {
    const data = await getData(req.body);
    let response = null;
    if (data) {
      response = store.create(JSON.parse(data) as ITodo);
    }
    return new Response(JSONtoString(response), {
      headers: { "Content-Type": "application/json" },
    });
  },
};
