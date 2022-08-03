import { Handlers } from "$fresh/server.ts";
import { TodoListStore } from "../../../data/todo-list.ts";
import { JSONtoString } from "./index.ts";

const store = new TodoListStore();

export const handler: Handlers = {
  DELETE(_, ctx) {
    return new Response(
      JSONtoString({ ok: store.remove(ctx.params.id as string) }),
      {
        headers: { "Content-Type": "application/json" },
      }
    );
  },
};
