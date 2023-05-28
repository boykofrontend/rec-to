import React, { DragEvent, FC } from "react";
import { ITodo } from "../types/types";

interface DraggableElementProps {
  children: React.ReactNode;
  todo: ITodo;
  activeDragItem: ITodo;
  todos: ITodo[];
  handleUpdateTodos: (todos: ITodo[]) => void;
  setActiveDragItem: (item: ITodo) => void;
}

const DraggableElement: FC<DraggableElementProps> = ({
  children,
  todo,
  todos,
  activeDragItem,
  handleUpdateTodos,
  setActiveDragItem,
}) => {
  const handleDragStart = (e: DragEvent<HTMLDivElement>, todo: ITodo): void => {
    setActiveDragItem(todo);
    e.currentTarget.className += " active";
  };

  const hadleOnDragLeave = (e: DragEvent<HTMLDivElement>): void => {
    e.currentTarget.style.backgroundColor = "transparent";
  };

  const handleOnDragEnd = (e: DragEvent<HTMLDivElement>): void => {
    e.currentTarget.classList.remove("active");
  };

  const handleOnDragOver = (e: DragEvent<HTMLDivElement>): void => {
    e.preventDefault();
    e.currentTarget.style.backgroundColor = "#2B8CE5";
  };

  const handleOnDrop = (
    e: DragEvent<HTMLDivElement>,
    dropTodo: ITodo
  ): void => {
    e.preventDefault();
    const dropTodoIndex = todos.findIndex((el) => el.id === dropTodo.id);

    const updatedList = todos.filter((el) => el.id !== activeDragItem.id);

    const newList = [
      ...updatedList.slice(0, dropTodoIndex),
      activeDragItem,
      ...updatedList.slice(dropTodoIndex),
    ];

    updatedList.splice(dropTodoIndex, 0, activeDragItem);

    e.currentTarget.style.backgroundColor = "transparent";

    handleUpdateTodos(newList);
  };

  return (
    <div
      className="drag-item"
      onDragStart={(e) => handleDragStart(e, todo)}
      onDragLeave={hadleOnDragLeave}
      onDragEnd={handleOnDragEnd}
      onDragOver={handleOnDragOver}
      onDrop={(e) => handleOnDrop(e, todo)}
      draggable={true}
    >
      {children}
    </div>
  );
};

export default DraggableElement;
