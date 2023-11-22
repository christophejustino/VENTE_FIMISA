import { apiSlice } from "../apiSlice";


const serviceApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllService: builder.query({
      query: () => ({
        url: "/api/service",
      }),
      keepUnusedDataFor:5,
    }),
    getOneService: builder.query({
      query: (id) => ({
        url: "/api/service" + "/" + id,
      }),
    }),
    createService: builder.mutation({
      query: (data) => ({
        url: "/api/service",
        method: "POST",
        body: data,
      }),
    }),
    deleteService: builder.mutation({
      query: (id) => ({
        url: "/api/service" + "/" + id,
        method: "DELETE",
      }),
    }),
    updateService: builder.mutation({
      query: (data) => ({
        url: "/api/service" + "/" + data.id,
        method: "PUT",
        body: data,
      }),
    }),
  }),
});

export const {
  useGetAllServiceQuery,
  useCreateServiceMutation,
  useDeleteServiceMutation,
  useUpdateServiceMutation,
  useGetOneServiceQuery
} = serviceApiSlice;
