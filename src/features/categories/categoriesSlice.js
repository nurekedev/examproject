import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios";
import { BASE_URL } from "../../utils/constants";


/* Fetching values by using axios and Redux tools */
export const getCategories = createAsyncThunk('categories/getCategories', 
async(_, thunkApi) => {
    try{
        const res = await axios(`${BASE_URL}/categories`);
        return res.data;

    }catch(err){
        console.log(err);
        return thunkApi.rejectWithValue(err)

    }
}
);

/* Creating methods and initial values */
const categoriesSlice = createSlice({
    name: 'categories',

    /* Setting initial values */
    initialState: {
        list: [],
        isLoading: false
    },

    /* Determining logical part of Reducers */
    extraReducers: (builder) => {

        /* Changing values for each state */
        builder.addCase(getCategories.pending, (state) => {
            state.isLoading = true
        });

        builder.addCase(getCategories.fulfilled, (state, {payload}) => {
            state.list = payload
            state.isLoading = false
        });

        builder.addCase(getCategories.rejected, (state) => {
            state.isLoading = false

        });
    }
})

export default categoriesSlice.reducer