import React from "react";
import { Route, Routes } from "react-router-dom";

import { Navbar } from "./components/Navbar";
import ShowCards from "./components/showCards";
import Edit from "./components/edit";
import Create from "./components/create";
import "./index.css";

const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route exact path="/" element={<ShowCards />} />
        <Route path="/edit/:id" element={<Edit />} />
        <Route path="/create" element={<Create />} />
      </Routes>
    </>
  );
};

export default App;
