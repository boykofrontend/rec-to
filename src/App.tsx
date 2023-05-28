import { FC } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import HomePage from "./components/HomePage";

import "normalize.css";
import "./styles/global.scss";
import { AppPath } from "./utils/paths";

const App: FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={AppPath} element={<HomePage />} />
        <Route path="*" element={<div>NotFound</div>} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
