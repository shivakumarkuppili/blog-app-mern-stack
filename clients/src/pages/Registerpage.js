import { useState } from "react";


export default function Register(){
    const [username,setUsername] = useState('');
    const [password,setPassword] = useState('');
    const [email,setEmail] = useState('');
   async function register(ev){
        ev.preventDefault();
        const response=await fetch('http://localhost:4000/register',{
            method:'POST',
            body:JSON.stringify({username,password,email}),
            headers:{'Content-Type':'application/json'},
        })
        if(response.status === 200){
            alert('registration successfull :)');
        }
        else{
            alert('registration failed!,please check your name/email/password :( ');

        }


    }
    return(
    <form className="register" onSubmit={register}>
        
        <h1>Register</h1>
        <input type="name" placeholder="username"
        value={username}
        onChange={ev=>setUsername(ev.target.value)} required/>
        <input type="email" placeholder="email"
        value={email}
        onChange={ev=>setEmail(ev.target.value)} required/>
        <input type="password" placeholder="password"
        value={password} 
        onChange={ev=>setPassword(ev.target.value)} required/>
        <button>Register</button>
    </form>
    );


}