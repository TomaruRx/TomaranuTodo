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
        <div className="flex items-center justify-between gap-3 rounded-md border border-slate-300 bg-white px-4 py-2 drop-shadow">
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
                <span className="ml-4 flex items-center text-sm text-slate-500">
                    <FontAwesomeIcon
                        icon={faClock}
                        flip="horizontal"
                        className="mr-1.5"
                    />
                    {formattedDate(todo.deadline)}
                </span>
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
    );
};

export default TodoItem;
