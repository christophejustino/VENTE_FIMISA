import { apiSlice } from "../apiSlice";

const calendrierApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        calendrierFindByDate: builder.query({
          query: (data) => ({
            url: `/api/calendrier/${data}`,
          }),
          keepUnusedDataFor: 5,
        }),
        recetteParMois: builder.query({
          query: (data) => ({
            url: `/api/calendrier/get/recette/${data}`
          }),
          keepUnusedDataFor: 0,
        })
})
})

export const {
    useCalendrierFindByDateQuery,
    useRecetteParMoisQuery
} = calendrierApiSlice;


