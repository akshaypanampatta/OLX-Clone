import React, { useContext, useState} from "react";
import Logo from "../../olx-logo.png";
import "./Signup.css";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase/config";
import { collection, addDoc, getFirestore } from "firebase/firestore";
import {useNavigate} from 'react-router-dom';
import { AuthContext } from "../../store/Context";

export default function Signup() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const navigate=useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      
      const userCredential=await createUserWithEmailAndPassword(auth, email, password);
      const userId=userCredential.user.uid;
      const db = getFirestore();
      const userCollectionRef = collection(db, "users");
      const data = {
        id:userId,
        name: username,
        phone: phone,
      };
      const docRef = await addDoc(userCollectionRef, data);
      console.log("a new dcmnt field has been added", docRef.id)
        navigate("/login")
      
    } catch (err) {
      console.log(err);
    }
  };

  const handleLogin=()=>{
    navigate("/login")
  }

  return (
    <div>
      <div className="signupParentDiv">
        <img width="200px" height="200px" src={Logo}></img>
        <form onSubmit={handleSubmit}>
          <label htmlFor="fname">Username</label>
          <br />
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="input"
            type="text"
            id="fname"
            name="name"
            defaultValue="John"
          />
          <br />
          <label htmlFor="fname">Email</label>
          <br />
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="input"
            type="email"
            id="fname"
            name="email"
            defaultValue="John"
          />
          <br />
          <label htmlFor="lname">Phone</label>
          <br />
          <input
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="input"
            type="number"
            id="lname"
            name="phone"
            defaultValue="Doe"
          />
          <br />
          <label htmlFor="lname">Password</label>
          <br />
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="input"
            type="password"
            id="lname"
            name="password"
            defaultValue="Doe"
          />
          <br />
          <br />
          <button>Signup</button>
        </form>
        <a onClick={handleLogin}>Login</a>
      </div>
    </div>
  );
}
