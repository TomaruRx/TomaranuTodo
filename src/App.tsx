import { useState, useEffect } from "react";
import type { ChangeEvent } from "react";
import type { Todo } from "./types";
import { initTodos } from "./initTodos";
import WelcomeMessage from "./WelcomeMessage";
import TodoList from "./TodoList";
import HeroArt from "./HeroArt";
import { v4 as uuid } from "uuid";
import { twMerge } from "tailwind-merge";
import dayjs from "dayjs";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSun, faTriangleExclamation } from "@fortawesome/free-solid-svg-icons";

const localStorageKey = "TodoApp";
const userNameStorageKey = "TodoApp.userName";

type StoredTodo = {
  id: string;
  name: string;
  tag?: string;
  isDone: boolean;
  priority: number;
  deadline: string | null;
};

const loadTodos = (): Todo[] => {
  const todoJsonStr = localStorage.getItem(localStorageKey);
  if (todoJsonStr === null) {
    return initTodos;
  }

  const storedTodos: StoredTodo[] = JSON.parse(todoJsonStr);
  return storedTodos.map((todo) => ({
    ...todo,
    deadline: todo.deadline === null ? null : new Date(todo.deadline),
  }));
};

const getTodoNameError = (name: string): string => {
  const trimmedName = name.trim();
  if (trimmedName.length < 2 || trimmedName.length > 32) {
    return "前後の空白を除いて、2文字以上、32文字以内で入力してください";
  }
  return "";
};

const App = () => {
  const [todos, setTodos] = useState<Todo[]>(loadTodos);
  const [userName, setUserName] = useState(() => {
    const savedName = localStorage.getItem(userNameStorageKey) ?? "";
    return savedName === "User" ? "" : savedName;
  });
  const [newTodoName, setNewTodoName] = useState("");
  const [newTodoTag, setNewTodoTag] = useState("");
  const [newTodoPriority, setNewTodoPriority] = useState(3);
  const [newTodoDeadline, setNewTodoDeadline] = useState<Date | null>(null);
  const [isNameTouched, setIsNameTouched] = useState(false);

  const uncompletedCount = todos.filter((todo: Todo) => !todo.isDone).length;
  const completedCount = todos.length - uncompletedCount;
  const newTodoNameError = getTodoNameError(newTodoName);
  const isNewTodoNameInvalid = newTodoNameError !== "";
  const showNewTodoNameError = isNameTouched && isNewTodoNameInvalid;

  useEffect(() => {
    localStorage.setItem(localStorageKey, JSON.stringify(todos));
  }, [todos]);

  useEffect(() => {
    localStorage.setItem(userNameStorageKey, userName);
  }, [userName]);

  const updateNewTodoName = (e: ChangeEvent<HTMLInputElement>) => {
    setNewTodoName(e.target.value);
    setIsNameTouched(true);
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
    if (isNewTodoNameInvalid) {
      setIsNameTouched(true);
      return;
    }

    const newTodo: Todo = {
      id: uuid(),
      name: newTodoName.trim(),
      tag: newTodoTag.trim(),
      isDone: false,
      priority: newTodoPriority,
      deadline: newTodoDeadline,
    };
    // console.log(newTodo.deadline, newTodo.deadline instanceof Date);
    setTodos((currentTodos) => [...currentTodos, newTodo]);
    setNewTodoName("");
    setNewTodoTag("");
    setNewTodoPriority(3);
    setNewTodoDeadline(null);
    setIsNameTouched(false);
  };
  // console.log(JSON.stringify(todos, null, 2));

  const updateIsDone = (id: string, value: boolean) => {
    setTodos((currentTodos) =>
      currentTodos.map((todo) => {
        if (todo.id === id) {
          return { ...todo, isDone: value };
        } else {
          return todo;
        }
      }),
    );
  };

  const removeCompletedTodos = () => {
    setTodos((currentTodos) => currentTodos.filter((todo) => !todo.isDone));
  };

  const remove = (id: string) => {
    setTodos((currentTodos) => currentTodos.filter((todo) => todo.id !== id));
  };

  return (
    <div className="app-shell">
      <header className="app-header">
        <div className="header-rail">
          <span>Tomaranu / Personal task index</span>
          <div className="header-profile">
            <input
              id="userName"
              name="userName"
              type="text"
              aria-label="表示名"
              autoComplete="nickname"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              className="user-name-input"
              placeholder="UserName"
            />
            <span aria-hidden="true">＋ ＋ ＋</span>
          </div>
        </div>
        <div className="hero">
          <div className="hero-copy">
            {/* <p className="eyebrow">ひとこと</p> */}
            <h1 className="app-title">
              Tomaranu<span>Todo!</span>
            </h1>
          </div>
          <HeroArt />
        </div>
        <div className="welcome-bar">
          <WelcomeMessage
            userName={userName.trim() || "User"}
            uncompletedCount={uncompletedCount}
          />
          <span className="welcome-mark" aria-hidden="true">
            <FontAwesomeIcon icon={faSun} />
          </span>
        </div>
      </header>

      <main className="workspace">
        <section className="task-panel" aria-labelledby="taskListHeading">
          <div className="section-heading">
            <h2 id="taskListHeading">
              <span className="section-number" aria-hidden="true">
                01 /
              </span>{" "}
              タスク一覧
            </h2>
            <span className="task-total">{todos.length} 件</span>
          </div>
          <TodoList todos={todos} updateIsDone={updateIsDone} remove={remove} />

          <button
            type="button"
            onClick={removeCompletedTodos}
            disabled={completedCount === 0}
            className="button button-bulk"
          >
            Delete completed tasks
          </button>
        </section>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            addNewTodo();
          }}
          aria-labelledby="newTodoHeading"
          className="todo-form"
        >
          <h2 id="newTodoHeading" className="form-heading">
            <span className="section-number" aria-hidden="true">
              02 /
            </span>
            新しいタスクの追加
          </h2>

          <div className="form-field">
            <div className="name-tag-fields">
              <div className="field-control">
                <label htmlFor="newTodoName">名前</label>
                <input
                  id="newTodoName"
                  name="todoName"
                  type="text"
                  required
                  value={newTodoName}
                  onChange={updateNewTodoName}
                  aria-invalid={showNewTodoNameError}
                  aria-describedby={
                    showNewTodoNameError ? "newTodoNameError" : undefined
                  }
                  className={twMerge(
                    "text-input",
                    showNewTodoNameError && "input-invalid",
                  )}
                  placeholder="2文字以上、32文字以内で入力してください"
                />
              </div>
              <div className="field-control">
                <label htmlFor="newTodoTag">タグ（任意）</label>
                <input
                  id="newTodoTag"
                  name="todoTag"
                  type="text"
                  value={newTodoTag}
                  onChange={(e) => setNewTodoTag(e.target.value)}
                  className="text-input"
                  placeholder="例：勉強"
                />
              </div>
            </div>
            {showNewTodoNameError && (
              <div
                id="newTodoNameError"
                aria-live="polite"
                className="field-error"
              >
                <FontAwesomeIcon icon={faTriangleExclamation} />
                <div>{newTodoNameError}</div>
              </div>
            )}
          </div>

          <fieldset className="form-field">
            <legend>優先度</legend>
            <div className="priority-options">
              {["高", "中", "低"].map((label, index) => (
                <label key={label} className="priority-choice">
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

          <div className="form-field deadline-add-fields">
            <div className="field-control deadline-field">
              <label htmlFor="deadline">期限</label>
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
                className="text-input deadline-input"
              />
            </div>

            <button
              type="submit"
              disabled={isNewTodoNameInvalid}
              className="button button-add"
            >
              追加
              <span aria-hidden="true">↗</span>
            </button>
          </div>
        </form>
      </main>
      <footer className="app-footer">
        <span>TomaranuTodo!</span>
        <span className="footer-bars" aria-hidden="true" />
        <a
          className="footer-link"
          href="https://tomarurx.github.io/Portfolio/"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Portfolio（新しいタブで開く）"
        >
          Portfolio↗
        </a>
        <div className="center">
          &copy; 2026 TomaranuTodo. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default App;
