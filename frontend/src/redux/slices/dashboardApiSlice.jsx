import { apiSlice } from "../apiSlice";

const dashboardApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getDash: builder.query({
      query: () => "/api/dashboard/dash",
      keepUnusedDataFor:0,
    }),
    })
    })


    export const {useGetDashQuery} = dashboardApiSlice;