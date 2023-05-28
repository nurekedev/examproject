import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../../utils/constants";
import { buildUrl } from "../../utils/common";


/* Creating function to processing API */
/* Using Redux tools */
export const apiSlice = createApi({

    /* Redux attributes */
    reducerPath: "api",
    baseQuery: fetchBaseQuery({baseUrl: BASE_URL}),
    tagTypes: ["Product"],
    endpoints: (builder) => ({

        /* 2 queries to get values */
        getProduct: builder.query({
            query: ({id}) => `/products/${id}`,
            providesTags: ["Product"],
        }),

        getProducts: builder.query({
            query: (params) => buildUrl('/products', params),
            providesTags: ["Products"],
        }),

    }),
});

export const {useGetProductQuery, useGetProductsQuery} = apiSlice;