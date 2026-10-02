import {
  type BaseQueryFn,
  type FetchArgs,
  type FetchBaseQueryError,
  createApi,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";
import { logout, setToken } from "../../features/auth/slices/Auth.slice";
import type { RootState } from "../store";
import i18n from "../../core/i18n";

let baseUrl: string | undefined;
let isRefreshing = false;
let failedQueue: Array<{ resolve: (value?: unknown) => void; reject: (reason?: any) => void }> = [];

const getBaseQuery = async () => {
  baseUrl = import.meta.env.VITE_API_ENDPOINTS_URL;

  return fetchBaseQuery({
    baseUrl: baseUrl,

    prepareHeaders: (headers, { getState }) => {
      const state = getState() as RootState;
      const token = state.auth.jwtToken;
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      
      const language = i18n.language || "ar";
      headers.set("Accept-Language", language);

      return headers;
    },
  });
};

const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  const baseQuery = await getBaseQuery();
  const state = api.getState() as RootState;

  let result = await baseQuery(args, api, extraOptions);
  
  if ((result.error && result.error.status === 401) && !((args as any).url == 'auth/login')) {
    if (!state.auth.refreshToken) {
      api.dispatch(logout());
      return result;
    }
    
    if (!isRefreshing) {
      isRefreshing = true;
      
      try {
        const refreshResult = await baseQuery(
          {
            url: "/Auth/refresh-token",
            method: "POST", 
            body: {
              refreshToken: state.auth.refreshToken,
            },
          },
          api,
          extraOptions
        );

        if (refreshResult?.data) {
          api.dispatch(setToken(refreshResult.data));
          
          failedQueue.forEach(({ resolve }) => resolve());
          failedQueue = [];
          
          result = await baseQuery(args, api, extraOptions);
        } else {
          api.dispatch(logout());
          failedQueue.forEach(({ reject }) => reject());
          failedQueue = [];
        }
      } finally {
        isRefreshing = false;
      }
    } else {
      return new Promise((resolve, reject) => {
        failedQueue.push({ resolve, reject });
      }).then(async () => {
        return await baseQuery(args, api, extraOptions);
      }).catch(async () => {
        return result;
      });
    }
  }
  return result;
};

export const instanceApi = createApi({
  reducerPath: "instanceApi",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["auth", "Notification"],
  endpoints: () => ({}),
});

export type InstanceApi = typeof instanceApi;
