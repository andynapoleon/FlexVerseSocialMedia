import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
  // a section of the store in redux
  baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_BASE_URL }), // base URL
  reducerPath: "main", // name of the slice
  tagTypes: [], // where to save data (we don't need it)
  // the endpoints mean we're creating functions that will call the APIs, therefore, we need to export these functions
  endpoints: (build) => ({
    postAiText: build.mutation({
      // query call used to make an API request to the back-end (POST API CALL)
      query: (payload) => ({
        url: "openai/text",
        method: "POST",
        body: payload, // basically what we're sending to the server
      }),
    }),
    postAiCode: build.mutation({
      query: (payload) => ({
        url: "openai/code",
        method: "POST",
        body: payload,
      }),
    }),
    postAiAssist: build.mutation({
      query: (payload) => ({
        url: "openai/assist",
        method: "POST",
        body: payload,
      }),
    }),
    postLogin: build.mutation({
      query: (payload) => ({
        url: "auth/login",
        method: "POST",
        body: payload,
      }),
    }),
    postSignUp: build.mutation({
      query: (payload) => ({
        url: "auth/signup",
        method: "POST",
        body: payload,
      }),
    }),
  }),
});

export const {
  usePostAiTextMutation,
  usePostAiCodeMutation,
  usePostAiAssistMutation,
  usePostLoginMutation,
  usePostSignUpMutation,
} = api; // just export these functions from the API constant
