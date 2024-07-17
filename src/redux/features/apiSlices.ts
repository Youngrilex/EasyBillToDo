import {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
  MutationActionCreatorResult,
  MutationDefinition,
  QueryActionCreatorResult,
  QueryDefinition,
  createApi,
  fetchBaseQuery,
} from '@reduxjs/toolkit/query/react';
import { RootState } from '../store';

export type TQueryActionCreatorResult = QueryActionCreatorResult<
  QueryDefinition<
    unknown,
    BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError>,
    TApiTag,
    unknown,
    'api'
  >
>;

export type TMutationActionCreatorResult = MutationActionCreatorResult<
  MutationDefinition<
    unknown, // Argument type for the mutation
    BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError>, // Base query function type
    TApiTag, // Tags used for invalidation
    unknown, // Mutation response type
    'api' // Reducer path
  >
>;

export type ApiResponse<T> = {
  message: string;
  status: boolean;
  data: T;
};

export type ExtraHeaderOption = { sanitize?: boolean; isSession?: boolean };

export type TApiTag = 'Todos' | 'Todo';

const apiBaseUrl = 'http://localhost:3001/';

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: apiBaseUrl,
  }),

  endpoints: (builder) => ({}),
});
//export const {} = apiSlice;
