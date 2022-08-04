import { ITodo } from "../data/todo-list.ts";

export const get = async () =>
  await fetch("/api/todo-list").then((res) => res.json());

export const add = async (body: ITodo) =>
  await fetch("/api/todo-list", {
    method: "POST",
    body: JSON.stringify(body),
  }).then((res) => res.json());

export const remove = async (id: string) =>
  await fetch(`/api/todo-list/${id}`, {
    method: "DELETE",
  }).then((res) => res.json());

export const complete = async (id: string) =>
  await fetch(`/api/todo-list/complete`, {
    method: "PUT",
    body: JSON.stringify({ id }),
  }).then((res) => res.json());

export const notComplete = async (id: string) =>
  await fetch(`/api/todo-list/not-complete`, {
    method: "PUT",
    body: JSON.stringify({ id }),
  }).then((res) => res.json());
