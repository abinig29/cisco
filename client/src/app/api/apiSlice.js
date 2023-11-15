import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { setToken } from "../../features/auth/authSlice";
const baseQuery = fetchBaseQuery({
  // baseUrl: "https://cisco-5aze.onrender.com/api/v1",
  // baseUrl: "http://localhost:5001/api/v1",
  baseUrl:'https://cisco-0p6y.onrender.com/api/v1',
  
  credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    const token = getState().auth.accessToken;

    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }
    headers.set("withCredentials", "true");
    return headers;
  },
});
const baseQueryWithReauth = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  if (result?.error?.status === 403) {
    console.log("sending refresh token");

    const refreshResult = await baseQuery("/auth/refresh", api, extraOptions);

    if (refreshResult?.data) {
      api.dispatch(setToken(refreshResult.data));

      result = await baseQuery(args, api, extraOptions);
    } else {
      if (refreshResult?.error?.status === 403) {
        refreshResult.error.data.message = "Your login has expired.";
      }
      return refreshResult;
    }
  }

  return result;
};

export const apiSlice = createApi({
  baseQuery: baseQueryWithReauth,
  tagTypes: ["Course", "User", "Registree"],
  endpoints: (builder) => ({}),
});
