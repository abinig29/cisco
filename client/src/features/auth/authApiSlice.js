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
              email: user.email,
              id: user._id,
              firstTimeLogin: user.firstTimeLogin,
            })
          );
        } catch (err) {
          console.log(err);
        }
      },
    }),
    changePassword: builder.mutation({
      query: ({ email, newPassword }) => {
        return {
          url: `/auth/changePassword`,
          method: "PATCH",
          body: { email, newPassword },
        };
      },
    }),

    sendLogout: builder.mutation({
      query: () => ({
        url: "/auth/logout",
        method: "POST",
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          console.log("logout please");
          await queryFulfilled;
          console.log("2");
          dispatch(setCredentialNull());
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

export const {
  useLoginMutation,
  useSendLogoutMutation,
  useRefreshMutation,
  useChangePasswordMutation,
} = authApiSlice;
