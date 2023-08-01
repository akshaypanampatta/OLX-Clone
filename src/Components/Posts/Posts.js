import React,{useState, useEffect, useContext} from 'react';

import Heart from '../../assets/Heart';
import './Post.css';

import { collection, getDocs, getFirestore } from 'firebase/firestore';
import { PostContext } from '../../store/PostContext';
import { useNavigate } from 'react-router-dom';


function Posts() {
  
  const [products,setProducts]=useState([])
  const {setPostDetails}=useContext(PostContext)
  const navigate=useNavigate();
  
  useEffect(()=>{
    const fetchData = async ()=>{
      const db=getFirestore();
      
      const prodtCol=collection(db,'products');
      const prodtSnapshot=await getDocs(prodtCol);
      const prodtList=prodtSnapshot.docs.map((product)=>{
        return{
           id:product.id,
          ...product.data()
         
        }
      })
      setProducts(prodtList)
    }
    fetchData();
  },[])

  return (
    <div className="postParentDiv">
      <div className="moreView">
        <div className="heading">
          <span>Quick Menu</span>
          <span>View more</span>
        </div>
        <div className="cards">
          {products.map(product=>{
            return <div className="card" 
            onClick={()=>{
              setPostDetails(product) 
              navigate('/view')}}>
                    <div className="favorite">
                      <Heart></Heart>
                    </div>
                    <div className="image">
                      <img src={product.url} alt="" />
                    </div>
                    <div className="content">
                      <p className="rate">&#x20B9; {product.price}</p>
                      <span className="kilometer">{product.category}</span>
                      <p className="name">{product.price}</p>
                    </div>
                    <div className="date">
                      <span>{product.createdAt}</span>
                    </div>
                  </div>;

          })}

      

        </div>
      </div>
      <div className="recommendations">
        <div className="heading">
          <span>Fresh recommendations</span>
        </div>
        <div className="cards">
          <div className="card">
            <div className="favorite">
              <Heart></Heart>
            </div>
            <div className="image">
              <img src="../../../Images/R15V3.jpg" alt="" />
            </div>
            <div className="content">
              <p className="rate">&#x20B9; {250000}</p>
              <span className="kilometer">Two Wheeler</span>
              <p className="name"> YAMAHA R15V3</p>
            </div>
            <div className="date">
              <span>10/5/2021</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Posts;
