import { useEffect, useState } from "react";
import type { Todo } from "./types";
import TodoItem from "./TodoItem";

type Props = {
  todos: Todo[];
  updateIsDone: (id: string, value: boolean) => void;
  remove: (id: string) => void;
};

const TodoList = (props: Props) => {
  const [now, setNow] = useState(() => Date.now());

  useEffect(() => {
    const updateNow = () => setNow(Date.now());
    const timer = window.setInterval(updateNow, 60_000);
    window.addEventListener("focus", updateNow);
    document.addEventListener("visibilitychange", updateNow);

    return () => {
      window.clearInterval(timer);
      window.removeEventListener("focus", updateNow);
      document.removeEventListener("visibilitychange", updateNow);
    };
  }, []);

  // const todos = [...props.todos].sort((a, b) => a.priority - b.priority);
  const todos = props.todos;

  if (todos.length === 0) {
    return (
      <div className="empty-state">
        現在、登録されているタスクはありません。
      </div>
    );
  }

  return (
    <div className="todo-list">
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          now={now}
          updateIsDone={props.updateIsDone}
          remove={props.remove}
        />
      ))}
    </div>
  );
};

export default TodoList;
