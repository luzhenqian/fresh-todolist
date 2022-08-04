import { Handlers } from "$fresh/server.ts";
import { JSONtoString } from "./index.ts";

const store = window.todoListStore

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
