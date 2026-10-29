import { useState } from "react";
import type { ChangeEvent } from "react";
import type { Todo } from "./types";
import { initTodos } from "./initTodos";
import WelcomeMessage from "./WelcomeMessage";
import TodoList from "./TodoList";
import { v4 as uuid } from "uuid";
import { twMerge } from "tailwind-merge";
import dayjs from "dayjs";

const App = () => {
  const [todos, setTodos] = useState<Todo[]>(initTodos);
  const [newTodoName, setNewTodoName] = useState("");
  const [newTodoPriority, setNewTodoPriority] = useState(3);
  const [newTodoDeadline, setNewTodoDeadline] = useState<Date | null>(null);

  const uncompletedCount = todos.filter((todo: Todo) => !todo.isDone).length; // 未完了タスクの数え上げ
  
  const updateNewTodoName = (e: ChangeEvent<HTMLInputElement>) => {
    setNewTodoName(e.target.value);
  };

  const updateNewTodoPriority = (e: ChangeEvent<HTMLInputElement>) => {
    setNewTodoPriority(Number(e.target.value));
  };

  const updateDeadline = (e: ChangeEvent<HTMLInputElement>) => {
    const dt = e.target.value;
    // console.log(dt, typeof dt);
    setNewTodoDeadline(dt === "" ? null : new Date(dt));
  };

  const addNewTodo = () => {
    const newTodo: Todo = {
      id: uuid(),
      name: newTodoName,
      isDone: false,
      priority: newTodoPriority,
      deadline: newTodoDeadline,
    };
    // console.log(newTodo.deadline, newTodo.deadline instanceof Date);
    setTodos((currentTodos) => [...currentTodos, newTodo]);
    setNewTodoName("");
    setNewTodoPriority(3);
    setNewTodoDeadline(null);
  };
  // console.log(JSON.stringify(todos, null, 2));

  return (
    <div className="mx-4 mt-10 max-w-2xl md:mx-auto">
      <h1 className="mb-4 text-2xl font-bold">TomaranuTodo!</h1>
      <div className="mb-4">
        <WelcomeMessage
          userName="User"
          uncompletedCount={uncompletedCount}
        />
      </div>
      <TodoList todos={todos} />

      <div className="mt-4 space-y-2 rounded-md border border-slate-300 bg-white p-3 drop-shadow">
        <h2 id="newTodoHeading" className="text-lg font-bold">
          新しいタスクの追加
        </h2>

        <div className="flex items-center space-x-2">
          <label className="font-bold" htmlFor="newTodoName">
            名前
          </label>
          <input
            id="newTodoName"
            name="todoName"
            type="text"
            value={newTodoName}
            onChange={updateNewTodoName}
            className="min-w-0 grow rounded-md border border-gray-300 p-2"
            placeholder="タスクの名前を入力してください"
            />
        </div>

        <fieldset>
          <legend className="mb-1 font-bold">優先度</legend>
          <div className="flex gap-5">
            {["高", "中", "低"].map((label, index) => (
              <label key={label} className="flex items-center space-x-1">
                <input
                  id={`priority-${index + 1}`}
                  name="priorityGroup"
                  type="radio"
                  value={index + 1}
                  checked={newTodoPriority === index + 1}
                  onChange={updateNewTodoPriority}
                  // onChange={(e) => setNewTodoPriority(Number(e.target.value))}
                />
                <span>{label}</span>
              </label>
            ))}
          </div>
        </fieldset>

        <div className="flex flex-wrap items-center gap-2">
          <label className="font-bold" htmlFor="deadline">
            期限
          </label>
          <input
            type="datetime-local"
            id="deadline"
            name="deadline"
            value={
              newTodoDeadline
                ? dayjs(newTodoDeadline).format("YYYY-MM-DDTHH:mm:ss")
                : ""
            }
            onChange={updateDeadline}
            className="max-w-full min-w-0 rounded-md border border-gray-300 px-2 py-0.5"
          />
        </div>

        <button
          type="button"
          onClick={addNewTodo}
          className={twMerge(
            "cursor-pointer rounded-md px-3 py-1",
            "bg-orange-500 font-bold text-white hover:bg-orange-600",
          )}
        >
          追加
        </button>
      </div>
    </div>
  );
};

export default App;