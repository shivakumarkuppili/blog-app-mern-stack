import { useContext, useState } from "react";
import {Navigate} from 'react-router-dom';
import { UserContext } from "../UserContext";

export default function Loginpage(){
    const [username,setUsername]= useState('');
    const [password,setPassword]= useState('');
    const [redirect,setredirect]= useState(false);
    const {setuserinfo} = useContext(UserContext);
    async function login(ev){
        ev.preventDefault();
        const respond = await fetch('http://localhost:4000/login',{
            method:'POST',
            body:JSON.stringify({username,password}),
            headers:{'Content-Type':'application/json'},credentials: 'include',}
            
            
      );
      if(respond.ok){
        respond.json().then(userinfo=>{
            setuserinfo(userinfo);
            setredirect(true);
             
        });
     }else{
        alert('wrong credentials');
      }
    }
    if(redirect){
        return <Navigate to={'/'}/>
    }
    
    return(
        <form className="login" onSubmit={login}>
            <h1>Login </h1>
            <input type="text" placeholder="username"  value={username}
        onChange={ev=>setUsername(ev.target.value)} required/>
            <input type="password" placeholder="password"value={password}
        onChange={ev=>setPassword(ev.target.value)}  required/>
            <button>Login</button>
        </form>

    );
}