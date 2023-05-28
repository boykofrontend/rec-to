import { FC } from "react";
import { ITodo } from "../types/types";

interface CheckboxProps {
  data: ITodo;
  handleUpdateItem: (item: ITodo) => void;
}

const Checkbox: FC<CheckboxProps> = ({ data, handleUpdateItem }) => {
  const onChange = (): void => {
    handleUpdateItem({ ...data, completed: !data.completed });
  };

  return (
    <div className="boxes">
      <input
        type="checkbox"
        id={data.id}
        onChange={onChange}
        checked={data.completed}
      />
      <label htmlFor={data.id}></label>
    </div>
  );
};

export default Checkbox;
