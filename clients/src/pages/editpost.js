import { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import { Navigate, useParams } from "react-router-dom";
import Editor from "../editor";
export default function Editpost(){
    const {id}=useParams();
    const [title,settitle]=useState('');
    const [summary,setsummary]=useState('');
    const [content,setcontent]=useState('');
    
    const [files,setfiles]=useState('');
    const [redirect,setredirect] = useState(false);
    useEffect(()=>{
        fetch('http://localhost:4000/post/'+id)
        .then(response=>{
            response.json().then(postinfo=>{
                settitle(postinfo.title);
                setcontent(postinfo.content);
                setsummary(postinfo.summary);

            });
        })
    },[]);

    async function updatepost(ev){
        ev.preventDefault();
        const data = new FormData();
        data.set('title',title);
        data.set('summary',summary);
        data.set('content',content);
        data.set('id',id);
        if(files?.[0]){
            data.set('file',files?.[0])
        }
        const response=await fetch(`http://localhost:4000/post`,{
            method:'PUT',
            body:data,
            credentials:'include',

        });
        if (response.ok){
            setredirect(true);

        }
        

    }


    if(redirect){
        return <Navigate to={'/post/'+id}/>
       }
       
     
      
      return(
           <form onSubmit={updatepost}> 
              <div>here you can create post!! </div>
              <input type="title" placeholder={'title'} name="title" value={title} onChange={ev=>settitle(ev.target.value) } required/>
              <input type="summary" placeholder={'summary'}  name="summary"  value={summary} onChange={ev=>setsummary(ev.target.value)} required/>
              <input type="file"  name="file" onChange={(ev)=>setfiles(ev.target.files)} required/>
              <Editor onChange={setcontent} value={content}/>
            <button type="submit" style={{marginTop:'5px'}}>update post</button>
  
          </form>
          
          
      );
  
     
}