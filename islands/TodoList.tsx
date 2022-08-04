/** @jsx h */
import { h } from "preact";
import { useEffect, useRef, useState } from "preact/hooks";
import "twind/shim";
import { get, add, complete, notComplete, remove } from "../apis/todolist.ts";
import { Button } from "../components/Button.tsx";
import { ITodo, ITodos } from "../data/todo-list.ts";

const AddButton = (props: any) => (
  <Button
    {...props}
    class="text-green-600 border-green-600 hover:text-white hover:bg-green-600"
  />
);

const CompleteButton = (props: any) => (
  <Button
    {...props}
    class="text-green-300 border-green-300 hover:text-white hover:bg-green-300"
  />
);

const NotCompleteButton = (props: any) => (
  <Button
    {...props}
    class="hover:text-white text-gray-400 border-gray-400 hover:bg-gray-400"
  />
);

const RemoveButton = (props: any) => (
  <Button
    {...props}
    class="text-red-400 border-red-400 hover:text-white hover:bg-red-400"
  />
);

const TodoItem = (props: ITodo & { refresh: Function }) => (
  <div
    class={`flex  py-2 px-3 items-center border-b-4 border-slate-400
  ${props.completed ? " bg-red-100 " : " bg-green-100 "}`}
  >
    <p class="w-full text-grey-darkest">{props.text}</p>
    {props.completed ? (
      <NotCompleteButton
        onClick={async () => {
          if (props.id) {
            const res = await notComplete(props.id);
            res.ok && props.refresh();
          }
        }}
      >
        未完成
      </NotCompleteButton>
    ) : (
      <CompleteButton
        onClick={async () => {
          if (props.id) {
            const res = await complete(props.id);
            res.ok && props.refresh();
          }
        }}
      >
        完成
      </CompleteButton>
    )}
    <RemoveButton
      onClick={async () => {
        if (props.id) {
          const res = await remove(props.id);
          res.ok && props.refresh();
        }
      }}
    >
      移除
    </RemoveButton>
  </div>
);

export default function TodoList(props: any) {
  const [todoList, setTodoList] = useState<ITodos>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const refresh = () => {
    get().then((todoList) => {
      setTodoList(todoList);
      console.log(todoList, "todoList");
    });
  };
  useEffect(refresh, []);

  const _add = () => {
    const inputEl = inputRef.current;
    if (inputEl) {
      const body = {
        text: inputEl.value,
      };
      add(body)
        .then(refresh)
        .finally(() => {
          inputEl.value = "";
        });
    }
  };

  return (
    <div class="h-100 w-full flex items-center justify-center bg-teal-lightest font-sans">
      <div class="bg-white rounded shadow p-6 m-4 w-full lg:w-3/4 lg:max-w-lg">
        <div class="mb-4">
          <h1 class="text-grey-darkest">任务列表</h1>
          <div class="flex items-center mt-4">
            <input
              class="shadow appearance-none border rounded w-full py-2 px-3 mr-4 text-grey-darker"
              placeholder="添加任务"
              ref={inputRef}
              onKeyPress={(evt) => {
                evt.key === "Enter" && _add();
              }}
            ></input>
            <AddButton onClick={_add}>添加</AddButton>
          </div>
        </div>
        <div>
          {todoList.map((todo) => (
            <TodoItem {...todo} refresh={refresh} />
          ))}
        </div>
      </div>
    </div>
  );
}
