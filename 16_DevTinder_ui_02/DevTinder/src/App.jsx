import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

import NavBar from "./components/NavBar.jsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/Login.jsx";
import Profile from "./components/Profile.jsx";
import Body from "./components/Body.jsx";

function App() {
 

  return (
    <>
      <BrowserRouter basename="/">
        <Routes>
          <Route path="/" element={<Body />}>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/profile" element={<Profile/>}></Route>
        </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
