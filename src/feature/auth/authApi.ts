import { apiSlice } from "../api/apiSlice";
import { userLoggedIn } from "./authSlice";

export const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation({
      query: (data: any) => ({
        url: "/auth/signup",
        method: "POST",
        body: data,
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          if (result?.data?.user) {
            localStorage.setItem("token", result?.data?.token);
            dispatch(userLoggedIn(result.data));
          }
        } catch (err) {
          console.log("Error", err);
        }
      },
    }),
    login: builder.mutation({
      query: (data) => ({
        url: "/auth/login",
        method: "POST",
        body: data,
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          if (result?.data?.user) {
            localStorage.setItem("token", result?.data?.token);
            dispatch(userLoggedIn(result.data));
          }
        } catch (err) {}
      },
    }),
    forgetPassword: builder.mutation({
      query: (data: any) => ({
        url: "auth/forget-password",
        method: "PUT",
        body: data,
      }),
    }),
    resetPasswordByCode: builder.mutation({
      query: (data: any) => ({
        url: "auth/set-new-password",
        method: "PUT",
        body: data,
      }),
    }),
    getCurrentUser: builder.query({
      query: (data) => ({
        url: "/user/",
        method: "GET",
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const result: any = await queryFulfilled;
          if (result?.data?._id) {
            const payload: any = {
              user: result.data,
              token: localStorage.getItem("token"),
            };
            dispatch(userLoggedIn(payload));
          }
        } catch (err) {}
      },
    }),
  }),
});
export const {
  useLoginMutation,
  useRegisterMutation,
  useGetCurrentUserQuery,
  useForgetPasswordMutation,
  useResetPasswordByCodeMutation,
} = authApi;
