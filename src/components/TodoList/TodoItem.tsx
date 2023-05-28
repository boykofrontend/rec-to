import { FC, useState } from "react";

import ButtonIcon from "../ButtonIcon";

import { ITodo } from "../../types/types";
import Button from "../Button";
import Checkbox from "../Checkbox";

interface TodoItem {
  todo: ITodo;
  handleRemoveItem: (id: string) => () => void;
  handleEditedItemId: (id: string) => () => void;
  handleUpdateItem: (item: ITodo) => void;
  isEditItem: boolean;
}

const TodoItem: FC<TodoItem> = ({
  todo,
  handleRemoveItem,
  handleEditedItemId,
  handleUpdateItem,
  isEditItem,
}) => {
  const [inputValue, setInputValue] = useState<string>(todo.description);

  const onInputChange = (e: React.FormEvent<HTMLInputElement>): void => {
    setInputValue(e.currentTarget.value);
  };

  const handleSubmit = (): void => {
    handleUpdateItem({
      ...todo,
      description: inputValue,
    });
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === "Enter" && inputValue) {
      handleSubmit();
    }
  };

  return (
    <div className={`todo-item ${todo.completed ? "completed" : ""}`}>
      {isEditItem ? (
        <div className="todo-item-edit">
          <input
            value={inputValue}
            className="todo-item-edit-input"
            onChange={onInputChange}
            autoFocus={isEditItem}
            onKeyDown={onKeyDown}
          />
          <Button
            className="todo-item-edit-btn"
            name="save"
            onClick={handleSubmit}
            disabled={!inputValue}
          />
        </div>
      ) : (
        <p className="todo-item-description">{todo.description}</p>
      )}
      <div className="todo-item-icons-block">
        <Checkbox data={todo} handleUpdateItem={handleUpdateItem} />
        <ButtonIcon iconType="pencil" onClick={handleEditedItemId(todo.id)} />
        <ButtonIcon iconType="trash" onClick={handleRemoveItem(todo.id)} />
      </div>
    </div>
  );
};

export default TodoItem;
