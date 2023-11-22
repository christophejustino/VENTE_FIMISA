import { apiSlice } from "../apiSlice";

const recetteApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllRecette: builder.query({
      query: ({data}) => ({
        url: `/api/recette/skip/${data.page}`,
      }),
      keepUnusedDataFor: 5,
    }),
    getOneRecette: builder.query({
      query: (id) => ({
        url: "/api/recette" + "/" + id,
      }),
    }),
    createRecette: builder.mutation({
      query: (data) => ({
        url: "/api/recette",
        method: "POST",
        body: data,
      }),
    }),
    deleteRecette: builder.mutation({
      query: (id) => ({
        url: "/api/recette" + "/" + id,
        method: "DELETE",
      }),
    }),
    updateRecette: builder.mutation({
      query: ({ data, id }) => ({
        url: "/api/recette" + "/" + id,
        method: "PUT",
        body: data,
      }),
    }),

    searchRecette: builder.query({
      query: (data) => ({
        url: "/api/recette/search",
        method: "POST",
        body: data,
      }),
    }),
    getAllService: builder.query({
      query: () => ({
        url: "/api/service",
      }),
      keepUnusedDataFor: 5,
    }),
    getRecetteByService: builder.query({
      query: ({data}) => `/api/recette/service/${data.serviceId}/${data.date}`,
      keepUnusedDataFor: 0,
    }),
  }),
});

export const {
  useCreateRecetteMutation,
  useDeleteRecetteMutation,
  useUpdateRecetteMutation,
  useGetOneRecetteQuery,
  useGetAllRecetteQuery,
  useSearchRecetteQuery,
  useGetRecetteByServiceQuery,
  useGetAllServiceQuery,
} = recetteApiSlice;
