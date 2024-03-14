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
          <ul className="menu menu-horizontal px-1">
            <li>
              <details>
                <summary>Filter</summary>
                <ul className="p-2 bg-base-100 rounded-t-none">
                  <li>
                    <a>Link 1</a>
                  </li>
                  <li>
                    <a>Link 2</a>
                  </li>
                </ul>
              </details>
            </li>
          </ul>
        </div>
      </div>
      {/* <div style={styles}> */}
      {/* <div className="relative">
        <div style={styles} className="absolute top-0 right-0 bottom-0 left-0">
        </div> */}
          <Routes>
            <Route exact path="/" element={<ShowCards />} />
            <Route path="/edit/:id" element={<Edit />} />
            <Route path="/create" element={<Create />} />
          </Routes>
      {/* </div> */}
      {/* </div> */}
    </>
  );
};

export default App;
