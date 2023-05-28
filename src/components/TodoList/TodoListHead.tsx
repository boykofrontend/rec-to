import React, { FC, useState } from "react";
import uniqid from "uniqid";

import Filter from "./Filter";
import Button from "../Button";

import { ITodo } from "../../types/types";

interface TodoListHeadProps {
  handleCreateTodo: (todo: ITodo) => void;
  handleFilter: (filterType: string) => void;
}

const TodoListHead: FC<TodoListHeadProps> = ({
  handleCreateTodo,
  handleFilter,
}) => {
  const [todoValue, setTodoValue] = useState<ITodo>({
    id: "",
    description: "",
    completed: false,
  });

  const handleInputChange = (e: React.FormEvent<HTMLInputElement>): void => {
    setTodoValue({
      id: uniqid(),
      description: e.currentTarget.value,
      completed: false,
    });
  };

  const handleSubmit = (): void => {
    handleCreateTodo(todoValue);
    setTodoValue({ id: "", description: "", completed: false });
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === "Enter" && !!todoValue.description) {
      handleCreateTodo(todoValue);
      setTodoValue({ id: "", description: "", completed: false });
    }
  };

  return (
    <div className="todo-list-head">
      <h1 className="todo-list-title">Your todo list</h1>
      <div className="todo-list-head-content">
        <input
          className="todo-list-head-input"
          value={todoValue.description}
          onChange={handleInputChange}
          onKeyDown={onKeyDown}
          type="text"
        />
        <Button
          name="Create todo"
          className="todo-list-button"
          onClick={handleSubmit}
          disabled={!todoValue.description}
        />
      </div>
      <Filter handleFilter={handleFilter} />
    </div>
  );
};

export default TodoListHead;
