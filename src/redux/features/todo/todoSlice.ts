import { PayloadAction, createSlice } from '@reduxjs/toolkit';

const initialState: todoState = {
  todos: [],
  isEdit: false,
};

const todoSlice = createSlice({
  name: 'todo',
  initialState,
  reducers: {
    setTodo: (state: todoState, { payload }: PayloadAction<TodoItem[]>) => {
      state.todos = payload;
    },
    setIsEdit: (state: todoState, { payload }: PayloadAction<boolean>) => {
      state.isEdit = payload;
    },
  },
});

export const { setTodo, setIsEdit } = todoSlice.actions;

export default todoSlice.reducer;
