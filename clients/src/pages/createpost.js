import { useState } from "react";
import {Navigate} from 'react-router-dom';
import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css';
import Editor from "../editor";
export default function Createpost(){
    const [title,settitle]=useState('');
    const [summary,setsummary]=useState('');
    const [content,setcontent]=useState('');
    const [files,setfiles]=useState('');
      
    const [redirect,setredirect] = useState(false);  
   
     async function createnewpost(ev){
      const data=new FormData();
      data.set('title',title);
      data.set('summary',summary);
      data.set('content',content);
      data.set('file',files[0]);
      ev.preventDefault();
      const respond = await fetch(`http://localhost:4000/post`,{
        method:"POST",
        body:data,
        credentials:'include',
      });
     console.log(await respond.json());
     if(respond.ok){
      setredirect(true);
     }

     }
     if(redirect){
      return <Navigate to={'/'}/>
     }
    
    return(
         <form onSubmit={createnewpost}> 
            <div>here you can create post!! </div>
            <input type="title" placeholder={'title'} name="title" value={title} onChange={ev=>settitle(ev.target.value) } required/>
            <input type="summary" placeholder={'summary'}  name="summary"  value={summary} onChange={ev=>setsummary(ev.target.value)} required/>
            
            <input type="file"  name="file" onChange={(ev)=>setfiles(ev.target.files)} required/>
            <Editor value={content} onChange={setcontent}/>
          <button type="submit" style={{marginTop:'5px'}}>create post</button>

        </form>
        
        
    );
}