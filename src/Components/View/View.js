import React,{useEffect,useState,useContext} from 'react';

import './View.css';
import { PostContext } from '../../store/PostContext';
import { FirebaseContext } from '../../store/Context';
import { collection, getDocs, getFirestore,  query,  where } from 'firebase/firestore';
function  View() {
  const [userDetails,setUserDetails]=useState()
  const{postDetails}=useContext(PostContext)
  const { firebase } = useContext(FirebaseContext);
  
 useEffect(()=>{

  const fetchData=async()=>{
     const { userId } = postDetails;
     const db = getFirestore();
     const prodtCol = collection(db, "users");

     const querySnapshot=await getDocs(prodtCol)
     const userDoc= querySnapshot.docs.find((doc)=>doc.id===userId);

     const prodtList=[];
     

     querySnapshot.forEach((doc)=>{
      const data=doc.data();
      setUserDetails(data);
     });


  };

fetchData();
 },[])
  return (
    
    <div className="viewParentDiv">
      <div className="imageShowDiv">
        <img
          src={postDetails.url}
          alt=""
        />
      </div>
      <div className="rightSection">
        <div className="productDetails">
          <p>&#x20B9;{postDetails.price} </p>
          <span>{postDetails.name}</span>
          <p>{postDetails.category}</p>
          <span>{postDetails.date}</span>
        </div>
      {userDetails &&  <div className="contactDetails">
          <p>Seller details</p>
          <p>{userDetails.username}</p>
          <p>{userDetails.phone}</p>
        </div>}
      </div>
    </div>
  );
}
export default View;
