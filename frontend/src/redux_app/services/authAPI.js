import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `https://sandboxhhrr.plena-global.com/api/v1`,
    prepareHeaders: (headers, { getState }) => {
      const token = getState("authApi.current_user");
      headers.set("Access-Control-Allow-Origin", "*");
      return headers;
    },
  }),
  tagTypes: ["authApi"],
  endpoints: (builder) => ({
    loginUser: builder.mutation({
      query: (body) => {
        return {
          url: "login_employee/token",
          method: "POST",
          body,
        };
      },
      invalidatesTags: ["authApi"],
    }),
  }),
});

export const { useLoginUserMutation } = authApi;
