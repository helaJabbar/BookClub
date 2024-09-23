// App.js
import React from "react";
import { Route, Routes } from "react-router-dom";
import Main from "./components/Main";
import NewProject from "./components/NewProject";
import SignIn from "./components/SignIn";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/new-project" element={<NewProject />} />
        <Route path="/signin" element={<SignIn />} />
      </Routes>
    </div>
  );
}

export default App;
