import './App.css';
import Post from "./Posted";
import Header from "./Header";
import Loginpage from './pages/Loginpage';
import Indexpage from './pages/Indexpage';
import {Route, Routes} from "react-router-dom";
import Layout from "./Layout";
import Register from './pages/Registerpage';
import { Usercontextprovider } from './UserContext';
import Createpost from './pages/createpost';
import Postpage from './pages/postpage';
import Editpost from './pages/editpost';



function App() {
  return (
    <Usercontextprovider>
    <Routes>
      <Route path="/" element={<Layout/>}>
        <Route index element={<Indexpage />}/>
        <Route path={'/Login'} element={<Loginpage /> }/>
        <Route path={'/register'} element={<Register /> }/>
        <Route path={'/create'} element={<Createpost/>}/> 
        
        <Route path='/post/:id' element={<Postpage/>}/>
        <Route path="/edit/:id" element={<Editpost/>}/>

      </Route>
      
    </Routes>

  </Usercontextprovider>
   
  );
}

export default App;
