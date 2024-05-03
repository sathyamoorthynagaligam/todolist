import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { useAppDispatch } from "../../app/hooks";

export interface AuthState {
  token: string | null,
  error: any,
  id: string | null

}
export interface LoginData {

  email: string,
  password: string

}
export interface signupData {
  firstname: string,
  lastname: string,
  email: string,
  password: string

}
const initialState: AuthState = {
  token: null,
  error: null,
  id: null

};


export const login = createAsyncThunk(
  'auth/login',
  async (input: LoginData) => {
    let response = await axios.post('http://localhost:3000/api/auth/login', { ...input }).then(res => res).catch(err => err.res)

    console.log(response)
    console.log(response.data)
    console.log(response.data.access_token);

    if (response.status === 200 || response.status === 201) {
      const logintoken = response.data.access_token

      localStorage.setItem('access_token', logintoken)

      return response.data;
    }
    else {
      throw new Error('Login failed');
    }


  }
)
export const signup = createAsyncThunk(
  'auth/signup',
  async (signupinput: signupData) => {
    let response = await axios.post('http://localhost:3000/api/auth/signup', { ...signupinput }).then(res => res).catch(err => err.res)

    console.log(response)
    console.log(response.data)
    console.log(response.data.id);

    if (response.status === 200 || response.status === 201) {

      return response.data.id;
    }
    else {
      throw new Error('signup failed');
    }




  }
)


export const authSlice = createSlice({
  name: 'auth',
  initialState: initialState,
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
    },
    setId: (state, action) => {
      state.id = action.payload;
    },


  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {

      })
      .addCase(login.fulfilled, (state, action) => {
        state.token = action.payload;



      })
      .addCase(login.rejected, (state, action) => {
        state.error = action.payload
      })
      .addCase(signup.pending, (state) => {

      })
      .addCase(signup.fulfilled, (state, action) => {
        state.id = action.payload


      })
      .addCase(signup.rejected, (state, action) => {
        state.error=action.payload;
      });
  }
})
export const { setToken, setId } = authSlice.actions;

export default authSlice.reducer;
export const selectToken = (state: { auth: AuthState }) => state.auth.token;
export const errorToken = (state: { auth: AuthState }) => state.auth.error;
export const idToken = (state: { auth: AuthState }) => state.auth.id;