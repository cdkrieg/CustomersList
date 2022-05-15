import React, { useState, useEffect, useContext } from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";
import "./App.css";
import PrivateRoute from "./utils/PrivateRoute";
import Navbar from "./components/Navbar/Navbar";
import Sidebar from "./components/Sidebar/Sidebar";
import Footer from "./components/Footer/Footer";
import AuthContext from "./context/AuthContext";
import LoginPage from './pages/LoginPage/LoginPage'
import RegisterPage from "./pages/RegisterPage/RegisterPage";
import ProfilePage from "./pages/ProfilePage/ProfilePage";

function App() {
  const {user} = useContext(AuthContext)
  const [showMenu, setShowMenu] = useState(false);

  return (
    <div className='App'>
      <div id='wrapper'>
        <Navbar setShowMenu={setShowMenu} showMenu={showMenu} />
        {showMenu && <Sidebar setShowMenu={setShowMenu} showMenu={showMenu} />}
        <Routes>
          <Route
            path='/'
            element={
              <PrivateRoute>
                <HomePage />
              </PrivateRoute>
            }/>
            <Route path="/register" element={<RegisterPage />}/>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/profile" element={<ProfilePage />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;
