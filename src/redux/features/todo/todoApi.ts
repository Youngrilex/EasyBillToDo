import { apiSlice } from '../apiSlices';

export const todoApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    //getTodos

    getAllTodos: builder.query<any, unknown>({
      query: () => ({
        url: 'todos',
        method: 'GET',

        headers: {
          'Content-Type': 'application/json',
        },
      }),

      async onQueryStarted(arg: any, { dispatch, queryFulfilled }: any) {
        try {
          const res = await queryFulfilled;
          const result = res?.data;
          console.log({ result });
        } catch (error: any) {
          console.log(error);
        }
      },
    }),

    createTodo: builder.mutation<any, TodoItem>({
      query: (body: TodoItem) => ({
        url: 'todos',
        method: 'POST',
        body,
      }),
    }),

    updateTodo: builder.mutation<any, TodoItem>({
      query: (body: TodoItem) => ({
        url: 'todos',
        method: 'PATCH',
        body,
      }),
    }),
  }),

  overrideExisting: false,
});

export const {
  useGetAllTodosQuery,
  useLazyGetAllTodosQuery,
  useCreateTodoMutation,
  useUpdateTodoMutation,
} = todoApi;
