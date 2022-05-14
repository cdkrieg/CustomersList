import React, { useState, useEffect, useContext } from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";
import "./App.css";
import PrivateRoute from "./utils/PrivateRoute";
import Navbar from "./components/Navbar/Navbar";
import Sidebar from "./components/Sidebar/Sidebar";
import Footer from "./components/Footer/Footer";


function App() {

  const [showMenu, setShowMenu] = useState(false)

  return (
    <div className='App'>
      <div id="wrapper">
      <Navbar setShowMenu={setShowMenu} showMenu={showMenu} />
      {showMenu && <Sidebar  setShowMenu={setShowMenu} showMenu={showMenu} />}
      <Routes>
        <Route
          path='/'
          element={
            <PrivateRoute>
              <HomePage />
            </PrivateRoute>
          }></Route>
      </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;
