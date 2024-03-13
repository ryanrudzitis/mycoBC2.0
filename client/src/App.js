import React from "react";

import "bootstrap/dist/css/bootstrap.min.css";

// We use Route in order to define the different routes of our application
import { Route, Routes } from "react-router-dom";
import "./index.css";

// We import all the components we need in our app
import Header from "./components/Header";
import ShowCards from "./components/showCards";
import Edit from "./components/edit";
import Create from "./components/create";

const styles = {
  backgroundImage: `url(/trees.jpg)`,
  backgroundPosition: 'fixed',
  backgroundSize: 'cover',
  backgroundRepeat: 'no-repeat',
  backgroundAttachment: 'fixed',
  // height: "100%",
  // filter: "blur(5px)"
  // backdropFilter: "blur(5px)"
};

const App = () => {
  return (
    <>
      <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Hello!</h3>
          <p className="py-4">
            Press ESC key or click the button below to close
          </p>
          <div className="modal-action">
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button className="btn">Close</button>
            </form>
          </div>
        </div>
      </dialog>
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
