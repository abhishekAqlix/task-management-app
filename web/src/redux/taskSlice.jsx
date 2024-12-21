import { createSlice } from '@reduxjs/toolkit';

const initialState = [];

const taskSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
     addTask: (state, action) => {
      state.push(action.payload);
     },
     deleteTask: (state, action) => {
      state.splice(action.payload, 1);
     },
     editTask: (state, action) => {
      const {index , saveValue} = action.payload
      state[index] = saveValue;
     },
  },
});

export const { addTask, editTask, deleteTask } = taskSlice.actions;


export default taskSlice.reducer;
