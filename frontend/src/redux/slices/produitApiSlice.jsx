import { apiSlice } from "../apiSlice";

const produitApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllProduit: builder.query({
      query: ({data}) => ({
        url: `/api/produit/search/${data.search_value}/skip/${data.page}`,
      }),
      keepUnusedDataFor:5,
    }),
    getMostProduct: builder.query({
      query: () => ({
        url: "/api/produit/most/vendus",
        keepUnusedDataFor:5,
      })
    }),
    getToutProduit: builder.query({
      query: () => ({
        url: "/api/produit",
      }),
      keepUnusedDataFor:5,
    }),
    getOneProduit: builder.query({
      query: (id) => ({
        url: "/api/produit" + "/" + id,
      }),
    }),
    createProduit: builder.mutation({
      query: (data) => ({
        url: "/api/produit",
        method: "POST",
        body: data,
      }),
    }),
    deleteProduit: builder.mutation({
      query: (id) => ({
        url: "/api/produit" + "/" + id,
        method: "DELETE",
      }),
    }),
    updateProduit: builder.mutation({
      query: (data) => ({
        url: "/api/produit" + "/" + data.id,
        method: "PUT",
        body: data,
      }),
    }),
    getAllService: builder.query({
      query: () => ({
        url: "/api/service"
      }),
      keepUnusedDataFor: 5,
    }),
    searchProduit: builder.query({
      query: (data) => ({
        url: "/api/produit/search",
        method: "POST",
        body: data,
      }),
    }),
    getProduitByService: builder.query({
      query: ({data, id}) => `/api/produit/service/${id}/skip/${data.page}`,
      keepUnusedDataFor: 5,
    }),
  }),
  })

export const {
    useGetAllProduitQuery,
    useCreateProduitMutation,
    useDeleteProduitMutation,
    useUpdateProduitMutation,
    useGetOneProduitQuery,
    useGetAllServiceQuery,
    useSearchProduitQuery,
    useGetToutProduitQuery,
    useGetProduitByServiceQuery,
    useGetMostProductQuery
} = produitApiSlice;
