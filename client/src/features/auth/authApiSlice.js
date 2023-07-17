import { apiSlice } from "../../app/api/apiSlice";
import { setCredential, setCredentialNull } from "./authSlice";
const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (loginCredential) => ({
        url: "/auth/login",
        method: "POST",
        body: loginCredential,
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;

          const { accessToken, user } = data;
          dispatch(
            setCredential({
              token: accessToken,
              firstName: user.firstName,
              role: user.role,
              picture: user.picture,
              id: user._id,
            })
          );
        } catch (err) {
          console.log(err);
        }
      },
    }),

    sendLogout: builder.mutation({
      query: () => ({
        url: "/auth/logout",
        method: "POST",
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          dispatch(setCredentialNull());
          console.log("logout please");
          //   setTimeout(() => {
          //     dispatch(apiSlice.util.resetApiState());
          //   }, 1000);
        } catch (err) {
          console.log(err);
        }
      },
    }),
    refresh: builder.mutation({
      query: () => ({
        url: "/auth/refresh",
        method: "GET",
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          const { accessToken } = data;
          dispatch(setCredential({ accessToken }));
        } catch (err) {
          console.log(err);
        }
      },
    }),
  }),
});

export const { useLoginMutation, useSendLogoutMutation, useRefreshMutation } =
  authApiSlice;
