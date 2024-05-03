import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
export interface AuthState {
   
    error: any,
    id: string | null,
    beforeedit:any,
    status:any
  
  }
  export interface editData {
  
    title: string,
    description: string,
    id:any
  
  }
  export interface editStatusData {
  
    status:any,
    id:any
    
  
  }
  const initialState: AuthState = {
    error: null,
    id: null,
    beforeedit:null,
    status:null
  
  };
  export const editapi = createAsyncThunk(
    'todo/editapi',
    async (did:editData) => {
      let token = localStorage.getItem('access_token');
      console.log(did);
      
      const headers = {
        Authorization: `Bearer ${token}`
      };
     
      let response = await axios.put('http://localhost:3000/api/todos/'+did.id, {...did},{ headers })
        .then(res => res)
        .catch(err => err.res);
      // console.log(token);
      // console.log(headers);
      
      
     
    
          return response.data;
      
      
    }
  );
  export const editstatusapi = createAsyncThunk(
    'todo/editstatusapi',
    async (did:editStatusData) => {
      let token = localStorage.getItem('access_token');
      
      const headers = {
        Authorization: `Bearer ${token}`
      };
     
      let response = await axios.put('http://localhost:3000/api/todos/'+did.id+'/status', {...did},{ headers })
        .then(res => res)
        .catch(err => err.res);
      // console.log(token);
      // console.log(headers);
      
      
     
    
          return response;
      
      
    }
  );
  
  export const editSlice = createSlice({
    name: 'edit',
    initialState: initialState,
    reducers: {
     
      setId: (state, action) => {
        state.id = action.payload;
      },
      setbeforeedit:(state,action)=>{
        state.beforeedit=action.payload
      }

  
  
    },
    extraReducers: (builder) => {
      builder
        .addCase(editapi.pending, (state) => {
  
        })
        .addCase(editapi.fulfilled, (state, action) => {
          
            state.beforeedit=action.payload
  
  
        })
        .addCase(editapi.rejected, (state, action) => {
          state.error = action.payload
        })
        .addCase(editstatusapi.pending, (state) => {
  
        })
        .addCase(editstatusapi.fulfilled, (state, action) => {
          
           
  
  
        })
        .addCase(editstatusapi.rejected, (state, action) => {
          state.error = action.payload
        })
    }
})
export const { setbeforeedit, setId } = editSlice.actions;

export default editSlice.reducer;
export const selectedit = (state: { edit: AuthState }) => state.edit.beforeedit;
export const selecterror = (state: { edit: AuthState }) => state.edit.error;