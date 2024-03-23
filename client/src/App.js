import React from "react";

// We use Route in order to define the different routes of our application
import { Route, Routes } from "react-router-dom";
import "./index.css";

// We import all the components we need in our app
import ShowCards from "./components/showCards";
import Edit from "./components/edit";
import Create from "./components/create";

const styles = {
  backgroundImage: `url(/trees.jpg)`,
  backgroundPosition: "fixed",
  backgroundSize: "cover",
  backgroundRepeat: "no-repeat",
  backgroundAttachment: "fixed",
  height: "100%",
  filter: "blur(5px)",
};

const App = () => {
  return (
    <>
      <div className="max-w-screen-2xl mx-auto overflow-hidden">
        <div className="navbar bg-green-600 z-10 h-[70px]">
          <div className="flex-1">
            <a className="btn btn-ghost text-xl" href="/">
              mycoBC
            </a>
          </div>
          <div className="flex-none">
            <div className="flex-1">
              <a className="btn btn-ghost text-xl" href="/create">
                Create
              </a>
            </div>
          </div>
        </div>
      </div>
      <Routes>
        <Route exact path="/" element={<ShowCards />} />
        <Route path="/edit/:id" element={<Edit />} />
        <Route path="/create" element={<Create />} />
      </Routes>
    </>
  );
};

export default App;
