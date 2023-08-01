import React, { useContext } from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Signup from "./Pages/Signup";
import Login from "./Pages/Login";
import Home from "./Pages/Home";
import Create from "./Pages/Create";
import ViewPost from "./Pages/ViewPost";


import  { useEffect,} from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import "firebase/auth";
import { AuthContext } from "./store/Context";
import Post from "./store/PostContext";



function App() {

  const {setUser}=useContext(AuthContext);
  useEffect(()=>{
     const auth = getAuth();
     const unsubscribe=onAuthStateChanged(auth,(user)=>{
      setUser(user);
      
    })
    return ()=>{
      unsubscribe();
    }
    
  })
 
  return (
    <div>
      <Post>
        <Router>
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/create" element={<Create />} />
            <Route path="/view" element={<ViewPost />} />
          </Routes>
        </Router>
      </Post>
    </div>
  );
}

export default App;
