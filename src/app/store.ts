import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import authreducer from "../features/slices/authSlice"
import addtask from "../features/addtask/addtaskSlice"
import todo from '../features/todo/todoSlice';
import edit from '../features/editfield/editslice'
export const store = configureStore({
  reducer: {
    counter: counterReducer,
    auth:authreducer,
    addtask:addtask,
    todo:todo,
    edit:edit
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
