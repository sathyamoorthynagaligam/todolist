import React from 'react';
import Login from './features/login/Login';
import './App.css';
import { BrowserRouter,Routes,Route, useNavigate } from 'react-router-dom';
import Signup from './features/signup/Signup';
import Home from './features/home/Home';
import Add_Task from './features/addtask/Add_Task';
import EditField from './features/editfield/EditField';

import Inprogress from './features/in progress/Inprogress';
import Completed from './features/completed/Completed';
import Todo from './features/todo/Todo';
import styled from 'styled-components';
function App() {
  
  let isauthendicated=false;
  let token =localStorage.getItem('access_token');
  if(token){
    isauthendicated=true
  }
  return (
    <div className="App">
    
       <BrowserRouter>
      <Routes>
        <Route path='/'element={<Login/>}/>
        <Route path='/signup' element={<Signup/>}/>
        <Route path='/home' element={isauthendicated ?<Home/>:<Login/>} />
        <Route path='/addtask' element={isauthendicated ?<Add_Task/>:<Login/>}/>
        <Route path='/editfield/:id' element={isauthendicated ?<EditField/>:<Login/>}/>
        <Route path='/todo' element={isauthendicated ?<Todo/>:<Login/>}/>
        <Route path='/inprogress' element={isauthendicated ?<Inprogress/>:<Login/>}/>
        <Route path='/completed' element={isauthendicated ?<Completed/>:<Login/>}/>
      </Routes>
      </BrowserRouter> 

      
    </div>
  );
}

export default App;
