// eslint-disable-next-line no-unused-vars
import { configureStore } from "@reduxjs/toolkit";
import categoriesSlice from "./categories/categoriesSlice";
import productsSlice from "./products/productsSlice";
import { apiSlice } from "./api/apiSlice";
import userSlice from "./user/userSlice";



export const store = configureStore({
    reducer: {
        categories: categoriesSlice,
        products: productsSlice,
        user: userSlice,
        [apiSlice.reducerPath]: apiSlice.reducer
    },
    /* Using middleWare layers to fetch API */
    middleware: (getMiddleware) => getMiddleware().concat(apiSlice.middleware),
    devTools: true,
});