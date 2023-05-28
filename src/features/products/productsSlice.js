import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios";
import { BASE_URL } from "../../utils/constants";
import { shuffle } from "../../utils/common";

/* Fetching values by using axios and Redux tools */
export const getProducts = createAsyncThunk("products/getProducts",

    async (_, thunkApi) => {
        try {
            const res = await axios(`${BASE_URL}/products`);
            return res.data;

        } catch (err) {
            console.log(err);
            return thunkApi.rejectWithValue(err)

        }
    }
);


/* Creating methods and initial values */
const productsSlice = createSlice({
    name: 'products',
    initialState: {
        list: [],
        filtered: [],
        related: [],
        isLoading: false,
    },


    /* 2 reduce methods to demonstarte using redux toolkit */
    reducers: {
        filterByPrice: (state, { payload }) => {
            state.filtered = state.list.filter(({ price }) => price < payload);
        },
        getRelatedProducts: (state, { payload }) => {
            const list = state.list.filter(({ category: { id } }) => id === payload);
            state.related = shuffle(list)
        },
    },

    /* Determining logical part of Reducers */
    extraReducers: (builder) => {

        /* Changing values for each state */
        builder.addCase(getProducts.pending, (state) => {
            state.isLoading = true
        });

        builder.addCase(getProducts.fulfilled, (state, { payload }) => {
            state.list = payload
            state.isLoading = false
        });

        builder.addCase(getProducts.rejected, (state) => {
            state.isLoading = false

        });
    }
})

export const { filterByPrice, getRelatedProducts } = productsSlice.actions;
export default productsSlice.reducer;