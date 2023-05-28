import React, { FC, useState } from "react";
import { mockData } from "../../utils/constants";

interface FilterProps {
  handleFilter: (filterType: string) => void;
}

const Filter: FC<FilterProps> = ({ handleFilter }) => {
  const [activeButtonName, setActiveButtonName] = useState<string>("all");

  const onClick = (name: string) => (): void => {
    setActiveButtonName(name);
    handleFilter(name);
  };

  return (
    <div className="todo-filter">
      {mockData.radioButtonNames.map((name) => (
        <React.Fragment key={name}>
          <label className="radio-button">
            <span className="label">{name}</span>
            <input
              checked={name === activeButtonName}
              type="radio"
              onChange={onClick(name)}
            />
            <span className="radio"></span>
          </label>
        </React.Fragment>
      ))}
    </div>
  );
};

export default Filter;
