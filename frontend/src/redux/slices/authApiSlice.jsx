import { apiSlice } from '../apiSlice';


const authApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (data) => ({
                url: "/api/compte/login",
                method: "POST",
                body: data,
            }),
        }), 
    }),
});


export const { useLoginMutation } = authApiSlice