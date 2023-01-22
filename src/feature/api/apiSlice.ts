import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { TagTypes } from "./tagTypes";
const baseQuery = fetchBaseQuery({
  baseUrl: process.env.REACT_APP_API_URL,
  prepareHeaders: async (headers, { getState, endpoint }) => {
    const token = localStorage.getItem("token");
    if (token) {
      headers.set("Authorization", token);
    }
    return headers;
  },
});

export const apiSlice = createApi({
  reducerPath: "api",
  // baseQuery:async(args,api,extraOptions)=>{

  // },
  tagTypes: [TagTypes.CONVERSATIONS, TagTypes.MESSAGES],
  endpoints: (builder) => ({}),
  baseQuery: async (args, api, extraOptions) => {
    let result = await baseQuery(args, api, extraOptions);

    if (result?.error?.status === 401) {
      localStorage.clear();
    }
    return result;
  },
});
