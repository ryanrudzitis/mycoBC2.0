import React from "react";

// We use Route in order to define the different routes of our application
import { Route, Routes } from "react-router-dom";
import "./index.css";

// We import all the components we need in our app
import ShowCards from "./components/showCards";
import Edit from "./components/edit";
import Create from "./components/create";

const App = () => {
  return (
    <>
      {/* <Header />  */}
      <div className="navbar bg-base-300 z-10 h-[70px]">
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
        <Routes>
          <Route exact path="/" element={<ShowCards />} />
          <Route path="/edit/:id" element={<Edit />} />
          <Route path="/create" element={<Create />} />
        </Routes>
      {/* </div> */}
    </>
  );
};

export default App;
