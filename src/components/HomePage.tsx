import { FC } from "react";
import TodoList from "./TodoList/TodoList";

const Home: FC = () => {
  return (
    <div className="home">
      <TodoList />
    </div>
  );
};

export default Home;
