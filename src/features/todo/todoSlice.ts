import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
export interface AddtodoState {
 
    error:any,
    todo:any,
    inprogress:any,
    completed:any,
    id:any
  
  }
  export interface deleteid {

  id:string
  
  }

  const initialState: AddtodoState = {
   
    error:null,
    todo:null,
    inprogress:null,
    completed:null,
  id:null
  
  
  };
  export const todoapi = createAsyncThunk(
    'todo/todoapi',
    async () => {
      let token = localStorage.getItem('access_token');
      const headers = {
        Authorization: `Bearer ${token}`
      };
      const params = {
        status:'not started'
      };
      let response = await axios.get('http://localhost:3000/api/todos', { headers,params }).then(res=>res).catch(err=>err.response)
      // console.log(token);
      // console.log(headers);
      // console.log(response.data.todo);
      
      
     return response;
    }
  );
  export const inprogressapi = createAsyncThunk(
    'todo/inprogressapi',
    async () => {
      let token = localStorage.getItem('access_token');
      const headers = {
        Authorization: `Bearer ${token}`
      };
      const params = {
        status:'in progress'
      };
      let response = await axios.get('http://localhost:3000/api/todos', { headers,params }).then(res=>res).catch(err=>err.response)
      // console.log(token);
      // console.log(headers);
      // console.log(response.data.todo);
      
      
     return response;
    }
  );
  export const completedapi = createAsyncThunk(
    'todo/completedapi',
    async () => {
      let token = localStorage.getItem('access_token');
      const headers = {
        Authorization: `Bearer ${token}`
      };
      const params = {
        status:'completed'
      };
      let response = await axios.get('http://localhost:3000/api/todos', { headers,params }).then(res=>res).catch(err=>err.response)
      // console.log(token);
      // console.log(headers);
      // console.log(response.data.todo);
      
      
     return response;
    }
  );


  
  export const deleteapi = createAsyncThunk(
    'todo/deleteapi',
    async (did:deleteid) => {
      let token = localStorage.getItem('access_token');
      // console.log(did.id);
      
      const headers = {
        Authorization: `Bearer ${token}`
      };
     
      let response = await axios.delete('http://localhost:3000/api/todos/'+did.id, { headers })
        .then(res => res)
        .catch(err => err.res);
      // console.log(token);
      // console.log(headers);
      // console.log(did.id);
      
     
    
          return response;
      
      
    }
  );
  
  export const todoSlice = createSlice({
    name: 'todo',
    initialState:initialState,
    reducers: {
      settodo:(state,action)=>{
        state.todo=action.payload.data
      },
      setinprogress:(state,action)=>{
        state.inprogress=action.payload.data
      },
      setcompleted:(state,action)=>{
        state.completed=action.payload.data
      },
      seterror:(state,action)=>{
        state.error=action.payload
      },
      setid:(state,action)=>{
        state.id=action.payload.data
      }
    },
    extraReducers: (builder) => {
      builder
       
        .addCase(todoapi.pending, (state) => {
  
        })
        .addCase(todoapi.fulfilled, (state, action) => {
          state.todo=action.payload.data.todo
          if(action.payload.status===401){
            state.error=401
          }
          console.log(action.payload.status)
          
        })
        .addCase(todoapi.rejected, (state, action:any) => {
          console.log(action)
          state.error = action.payload?.status;
        })
        .addCase(inprogressapi.pending, (state) => {
  
        })
        .addCase(inprogressapi.fulfilled, (state, action) => {
          state.inprogress=action.payload.data.todo
          if(action.payload.status===401){
            state.error=401
          }
          console.log(action.payload.status)
          
        })
        .addCase(inprogressapi.rejected, (state, action:any) => {
          console.log(action)
          state.error = action.payload?.status;
        })
        .addCase(completedapi.pending, (state) => {
  
        })
        .addCase(completedapi.fulfilled, (state, action) => {
          state.completed=action.payload.data.todo
          if(action.payload.status===401){
            state.error=401
          }
          console.log(action.payload.status)
          
        })
        .addCase(completedapi.rejected, (state, action:any) => {
          console.log(action)
          state.error = action.payload?.status;
        })
   
        
    }
})
export const { settodo,setcompleted,setinprogress } = todoSlice.actions;
  
export default todoSlice.reducer;
export const selectTodo = (state: { todo: AddtodoState }) => state.todo.todo
export const selectTodoError = (state: { todo: AddtodoState }) => state.todo.error
export const selectInprogress = (state: { todo: AddtodoState }) => state.todo.inprogress
export const selectCompleted = (state: { todo: AddtodoState }) => state.todo.completed
export const selecterror= (state: { todo: AddtodoState }) => state.todo.error