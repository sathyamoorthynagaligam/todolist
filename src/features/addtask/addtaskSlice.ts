import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
export interface AddTaskInputs {
  title: string,
  description: string,
  startAt: string | null,
  completeBy: string | null,
  status: string,
  
  }
  
export interface AddtaskState {
  task:any,
  error:any,
  alltask:any,
  
}
const initialState: AddtaskState = {
  task:null,
  error:null,
  alltask:null,


};

  // export const addtaskapi = createAsyncThunk(
  //   'addtask/addtaskapi',
  //   async (taskinput: AddTaskInputs) => {
  //    let token =localStorage.getItem('access_token')
  //    const headers = {
  //     Authorization: `Bearer ${token}`
  //   };
  //     let response = await axios.post('http://localhost:3000/api/todos', { ...taskinput },
  //     {headers }).then(res => res).catch(err => err.res)
  //     // console.log(token);
  //     // console.log(headers);
  //     console.log(response)
     
    
  
  //     if (response.status === 200 || response.status === 201) {
         
    
  //       return response.data;
  //     }
      
      
      
  //       return response
      
      
  //   }
  // )
  export const addtaskapi = createAsyncThunk(
    'addtask/addtaskapi',
    async (taskinput: AddTaskInputs, { rejectWithValue }) => {
      try {
        let token = localStorage.getItem('access_token');
        const headers = {
          Authorization: `Bearer ${token}`
        };
        let response = await axios.post('http://localhost:3000/api/todos', { ...taskinput }, { headers });
  
        if (response.status === 200 || response.status === 201) {
          return response.data;
        }
      } catch (error:any) {
        return rejectWithValue(error.response.data.message ); // Return the error response data
      }
      
  
      return null; // Add a return statement outside the try-catch block
    }
  );
  
  
  export const alltaskapi = createAsyncThunk(
    'addtask/alltaskapi',
    async () => {
      let token = localStorage.getItem('access_token');
      const headers = {
        Authorization: `Bearer ${token}`
      };
      let response = await axios.get('http://localhost:3000/api/todos', { headers })
        .then(res => res)
        .catch(err => err.res);
      // console.log(token);
      // console.log(headers);
      
          return response;
      
      
    }
  );
 
 
 
  
  
     
      // console.log(response.data.access_token);
  
      // if (response.status === 200 || response.status === 201) {
      //   const logintoken = response.data.access_token
  
      //   localStorage.setItem('access_token', logintoken)
  
      //   return response.data;
      // }
      // else {
      //   throw new Error('Login failed');
      // }
  export const addTaskSlice = createSlice({
    name: 'addtask',
    initialState:initialState,
    reducers: {
      
      settask: (state, action) => {
        state.task = action.payload;
      },
      setalltask: (state, action) => {
        state.alltask = action.payload;
      },
      seterror:(state,action)=>{
        state.error=action.payload
      },
     
      
  
    },
    extraReducers: (builder) => {
      builder
       
        .addCase(addtaskapi.pending, (state) => {
  
        })
        .addCase(addtaskapi.fulfilled, (state, action) => {
          state.task=action.payload
          state.error=null
          alert("added task successfully")
  
  
  
        })
        .addCase(addtaskapi.rejected, (state, action) => {
          state.error = action.payload;
        })
       
        .addCase(alltaskapi.pending, (state) => {
  
        })
        .addCase(alltaskapi.fulfilled, (state, action) => {
          state.alltask=action.payload.data.todo
          if(action.payload.status===401){
            state.error=401
          }
         
        })
        .addCase(alltaskapi.rejected, (state, action) => {
        })
       
    }
  })
  export const { settask,setalltask,seterror } = addTaskSlice.actions;
  
  export default addTaskSlice.reducer;
  export const selectTask = (state: { addtask: AddtaskState }) => state.addtask.task;
  export const selectAllTask = (state: { addtask: AddtaskState }) => state.addtask.alltask;
  export const selecterror = (state: { addtask: AddtaskState }) => state.addtask.error;
  