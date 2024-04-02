import { useContext, useEffect, useState } from "react";
import {Link, Route} from "react-router-dom"
import { UserContext } from './UserContext';
export default function Header(){
  const {setuserinfo,userinfo}=useContext(UserContext);
  useEffect(()=>{
    fetch('http://localhost:4000/profile',{
      credentials:'include',
    }).then(response =>{
      response.json().then(userinfo =>{
        setuserinfo(userinfo);

      })
    }) 
  },[]);
  function logout(){
    fetch('http://localhost:4000/logout',{
      credentials:'include',
      method:'POST',
    });
    setuserinfo(null);

  }
  const username = userinfo?.username ;
  

    return(
        <header>
        <Link to="/" className="logo">MyBlog</Link>
     <nav> 
      
      {username && (
        <>
        <Link to="/">Home</Link>
         <Link to="/create">create new post</Link>
         <a href={logout}>logout</a>
        </>
      )}
      {!username  && (
        <>
        <Link to="/">Home</Link>
         <Link to="/login">Login</Link>
        <Link  to="/register">Register</Link>
        </>
      )}
      
     </nav>
     </header>
    );
}