import { ITodo } from "../types/types";

export const getStorageTodos = (): ITodo[] => {
  const todos = localStorage.getItem("todos");

  return todos ? JSON.parse(todos) : [];
};

export const setStorageTodos = (todos: ITodo[]): void => {
  localStorage.setItem("todos", JSON.stringify(todos));
};
