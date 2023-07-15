import { createSlice } from "@reduxjs/toolkit";
import { ITasks } from "../types/types";


export const initialTasksState: ITasks = {
  tasks: [],
};

export const tasksSlice = createSlice({
  name: 'tasks',
  initialState: initialTasksState,
  reducers: {
    addTask: (state, actions) => {
      state.tasks = state.tasks.concat(actions.payload);
    },
    deleteTask: (state, actions) => {
      const arr = state.tasks.filter((task) => {
        return task.id !== actions.payload;
      });
      state.tasks = [...arr];
    },
    updateTask: (state, actions) => {
      state.tasks.forEach((task) => {
        if (task.id === actions.payload.id) {
          task.content = actions.payload.content;
        }
      });
    },
  },
});

const { actions, reducer } = tasksSlice;
export const { addTask, deleteTask, updateTask } = actions;

export default reducer;