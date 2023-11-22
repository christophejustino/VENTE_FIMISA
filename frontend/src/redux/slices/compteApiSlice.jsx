import { apiSlice } from "../apiSlice";

const COMPTE_URL = "/api/compte";

const compteApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllCompte: builder.query({
      query: () => ({
        url: COMPTE_URL,
      }),
      keepUnusedDataFor: 5,
    }),
    getOneCompte: builder.query({
      query: (id) => ({
        url: COMPTE_URL + "/" + id,
      }),
    }),
    createCompte: builder.mutation({
      query: (data) => ({
        url: COMPTE_URL,
        method: "POST",
        body: data,
      }),
    }),
    deleteCompte: builder.mutation({
      query: (id) => ({
        url: COMPTE_URL + "/" + id,
        method: "DELETE",
      }),
    }),
    updateCompte: builder.mutation({
      query: ({data, id}) => ({
        url: COMPTE_URL + "/" + id,
        method: "PUT",
        body: data,
      }),
    }),
    getService: builder.query({
      query: () => ({
        url: "/api/service"
      }),
      keepUnusedDataFor: 5,
    })
  }),
});

export const {
  useCreateCompteMutation,
  useGetAllCompteQuery,
  useGetOneCompteQuery,
  useDeleteCompteMutation,
  useUpdateCompteMutation,
  useGetServiceQuery,
  useUpdateServiceMutation,
} = compteApiSlice;
