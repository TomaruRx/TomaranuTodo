import type { Todo } from "./types";
import dayjs from "dayjs";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBolt,
  faClock,
  // faThumbsUp,
} from "@fortawesome/free-solid-svg-icons";
import { twMerge } from "tailwind-merge";

type Props = {
  todo: Todo;
  updateIsDone: (id: string, value: boolean) => void;
  remove: (id: string) => void;
};

const num2star = (n: number): string => "✢".repeat(4 - n);

const formattedDate = (date: Date) => {
  if (date.getHours() === 0 && date.getMinutes() === 0) {
    return dayjs(date).format("YYYY/MM/DD");
  }
  return dayjs(date).format("YYYY/MM/DD HH:mm");
};

const TodoItem = (props: Props) => {
  const todo = props.todo;

  return (
    <div className={twMerge("todo-item", todo.isDone && "todo-item-done")}>
      <div className="todo-content">
        <label className="todo-label">
          <input
            type="checkbox"
            checked={todo.isDone}
            onChange={(e) => props.updateIsDone(todo.id, e.target.checked)}
            className="todo-checkbox"
          />
          <FontAwesomeIcon
            icon={faBolt}
            flip="horizontal"
            className="todo-icon"
          />
          <span className="todo-name">{todo.name}</span>
        </label>

        <div aria-label={`優先度: ${todo.priority}`} className="todo-priority">
          {num2star(todo.priority)}
        </div>

        {todo.deadline && (
          <span className="todo-deadline">
            <FontAwesomeIcon icon={faClock} flip="horizontal" />
            {formattedDate(todo.deadline)}
          </span>
        )}

        {todo.isDone && (
          <div className="todo-status">
            Complete!
            {/* <FontAwesomeIcon icon={faThumbsUp} className="ml-1.5" /> */}
          </div>
        )}
      </div>
      <button
        type="button"
        onClick={() => props.remove(todo.id)}
        aria-label={`${todo.name}を削除`}
        className="button button-delete"
      >
        Delete
      </button>
    </div>
  );
};

export default TodoItem;
