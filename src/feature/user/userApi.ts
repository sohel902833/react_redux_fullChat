import { apiSlice } from "../api/apiSlice";
import { IGetUserProps } from "./user.types";
import { IUserSlice, setUsers } from "./userSlice";

export const userApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: ({ limit, page }: IGetUserProps) => ({
        url: `/user/all-users?page=${page}&limit=${limit}`,
        method: "GET",
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const result: any = await queryFulfilled;
          const payload = result.data as IUserSlice;
          if (result?.data && result?.data?.length > 0) {
            dispatch(setUsers(payload));
          }
        } catch (err) {}
      },
    }),
    changeActiveStatus: builder.mutation<any, boolean>({
      query: (active) => ({
        url: `/user/status/${active}`,
        method: "PUT",
      }),
    }),
    subscribeToPushNotification: builder.mutation<any, any>({
      query: (subscription) => ({
        url: `/user/subscribe-notification`,
        method: "PUT",
        body: subscription,
      }),
    }),
  }),
});
export const {
  useGetUsersQuery,
  useChangeActiveStatusMutation,
  useSubscribeToPushNotificationMutation,
} = userApi;
