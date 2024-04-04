import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  todos: [],
};

const todoSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    setTodos: (state, action) => {
      state.todos = action.payload;
    },
    addTodo: (state, action) => {
      state.todos.push({
        id: new Date().getTime().toString(),
        title: action.payload,
        done: false,
      });
    },
    toggleComplete: (state, action) => {
      const { id } = action.payload;
      const todo = state.todos.find((todo) => todo.id === id);
      if (todo) {
        todo.done = !todo.done;
      }
    },
  },
});

export const { addTodo, toggleComplete, setTodos } = todoSlice.actions;
export default todoSlice.reducer;