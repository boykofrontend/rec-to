import { FC, useEffect, useState } from "react";
import TodoItem from "./TodoItem";
import TodoListHead from "./TodoListHead";
import { ITodo } from "../../types/types";
import {
  getStorageTodos,
  setStorageTodos,
} from "../../utils/localStorageManager";
import DraggableElement from "../DraggableElement";

type TodoActiveState = {
  [key: string]: string;
};

const TodoList: FC = () => {
  const [todos, setTodos] = useState<ITodo[]>([]);
  const [unifiedTodos, setUnifiedTodos] = useState<ITodo[]>([]);
  const [todoActiveState, setTodoActiveState] = useState<TodoActiveState>({
    editItemId: "",
    filterState: "all",
  });

  const [activeDragItem, setActiveDragItem] = useState<ITodo>({
    id: "",
    description: "",
    completed: false,
  });

  const storageTodos = getStorageTodos();

  useEffect(() => {
    if (storageTodos) {
      setTodos(storageTodos);
    }
  }, []);

  useEffect(() => {
    if (todoActiveState.filterState === "all") {
      return setUnifiedTodos(storageTodos);
    }

    if (todoActiveState.filterState === "completed") {
      return setUnifiedTodos(storageTodos.filter(({ completed }) => completed));
    }

    setUnifiedTodos(storageTodos.filter(({ completed }) => !completed));
  }, [todoActiveState.filterState, todos]);

  const shouldUpdateTodos = (updatedList: ITodo[]): void => {
    setStorageTodos(updatedList);
    setTodos(updatedList);
  };

  const handleCreateTodo = (newTodo: ITodo): void => {
    shouldUpdateTodos([...todos, newTodo]);
  };

  const handleRemoveItem = (itemId: string) => (): void => {
    const updatedTodo = todos.filter(({ id }) => id !== itemId);
    shouldUpdateTodos(updatedTodo);
  };

  const handleUpdateItem = (updatedItem: ITodo): void => {
    const updatedTodo = [
      ...todos.map((item) => (item.id !== updatedItem.id ? item : updatedItem)),
    ];

    shouldUpdateTodos(updatedTodo);
    setTodoActiveState({ ...todoActiveState, editItemId: "" });
  };

  const handleEditedItemId = (id: string) => (): void => {
    setTodoActiveState({ ...todoActiveState, editItemId: id });
  };

  const handleFilter = (filterType: string): void => {
    setTodoActiveState({ ...todoActiveState, filterState: filterType });
  };

  return (
    <div className="todo-list">
      <TodoListHead
        handleCreateTodo={handleCreateTodo}
        handleFilter={handleFilter}
      />
      {unifiedTodos.map((todo) => (
        <DraggableElement
          key={todo.id}
          todo={todo}
          todos={todos}
          activeDragItem={activeDragItem}
          setActiveDragItem={setActiveDragItem}
          handleUpdateTodos={shouldUpdateTodos}
        >
          <TodoItem
            todo={todo}
            key={todo.id}
            handleUpdateItem={handleUpdateItem}
            handleRemoveItem={handleRemoveItem}
            handleEditedItemId={handleEditedItemId}
            isEditItem={todo.id === todoActiveState.editItemId}
          />
        </DraggableElement>
      ))}
    </div>
  );
};

export default TodoList;
