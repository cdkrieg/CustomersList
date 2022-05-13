import React, { useState, useEffect, useContext } from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";
import "./App.css";
import PrivateRoute from "./utils/PrivateRoute";

function App() {
  return (
    <div className='App'>
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
  );
}

export default App;
