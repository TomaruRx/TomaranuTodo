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
    todos: Todo[];
    updateIsDone: (id: string, value: boolean) => void;
    remove: (id: string) => void;
};

const num2star = (n: number): string => "✢".repeat(4 - n);

const TodoList = (props: Props) => {
    // const todos = [...props.todos].sort((a, b) => a.priority - b.priority);
    const todos = props.todos;

    if (todos.length === 0) {
    return (
        <div className="text-red-500">
            現在、登録されているタスクはありません。
        </div>
        );
    }

    return (
        <div className="flex flex-col gap-2">
        {todos.map((todo) => (
            <div 
                key={todo.id}
                className={twMerge(
                "flex items-center justify-between gap-3 rounded-md border border-slate-500 bg-white px-3 py-1.5 drop-shadow-md",
                todo.isDone && "bg-blue-50 opacity-50"
                )}
            >
            <div className="flex min-w-0 flex-1 flex-row flex-wrap items-baseline gap-y-1 text-slate-700">
                <label className="flex min-w-0 cursor-pointer items-baseline">
                    <input
                        type="checkbox"
                        checked={todo.isDone}
                        onChange={(e) => props.updateIsDone(todo.id, e.target.checked)}
                        className="mr-3 shrink-0 cursor-pointer self-center"
                    />
                    <FontAwesomeIcon icon={faBolt} flip="horizontal" className="mr-1 shrink-0 text-orange-400" />
                    <span
                        className={twMerge(
                            "min-w-0 text-lg font-bold wrap-anywhere",
                            todo.isDone && "line-through decoration-2"
                        )}
                    >
                        {todo.name}
                    </span>
                </label>

                <div className="ml-2"></div>
                <div aria-label={`優先度: ${todo.priority}`} className="ml-2 text-orange-400 um2star">
                    {num2star(todo.priority)}
                </div>
                
                {todo.deadline && (
                <div className="ml-4 flex items-center text-sm text-slate-500">
                    <FontAwesomeIcon
                        icon={faClock}
                        flip="horizontal"
                        className="mr-1.5"
                    />
                    <div className={twMerge(todo.isDone && "line-through")}>
                        期限: {dayjs(todo.deadline).format("YYYY年M月D日 H時m分")}
                    </div>
                </div>
                )}

                {todo.isDone && (
                <div className="ml-2 rounded bg-orange-400 px-1 py-0.5 text-center text-xs text-white">
                    Complete!
                    {/* <FontAwesomeIcon icon={faThumbsUp} className="ml-1.5" /> */}
                </div>
            )}
            </div>
            <button
                type="button"
                onClick={() => props.remove(todo.id)}
                aria-label={`${todo.name}を削除`}
                className={twMerge(
                    "shrink-0 cursor-pointer rounded-md px-2 py-1 text-sm font-bold",
                    "bg-rose-300 text-white hover:bg-rose-500",
                )}
            >
                Delete
            </button>
            </div>
        ))}
        </div>
    );
};

export default TodoList;
