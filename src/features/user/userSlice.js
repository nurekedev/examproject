import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios";
import { BASE_URL } from "../../utils/constants";

/* Fetching values by using axios and Redux tools */
export const createUser = createAsyncThunk('users/createUser',
    async (payload, thunkApi) => {
        try {
            const res = await axios.post(`${BASE_URL}/users`, payload);
            return res.data;

        } catch (err) {
            console.log(err);
            return thunkApi.rejectWithValue(err)

        }
    }
);

/* Using API method to put user's values */
export const updateUser = createAsyncThunk('users/updateUser',
    async (payload, thunkApi) => {
        try {
            const res = await axios.put(`${BASE_URL}/users/${payload.id}`, payload);
            return res.data;

        } catch (err) {
            console.log(err);
            return thunkApi.rejectWithValue(err)

        }
    }
);


/* Creating authorization tokens */
export const loginUser = createAsyncThunk('users/loginUser',
    async (payload, thunkApi) => {
        try {
            const res = await axios.post(`${BASE_URL}/auth/login`, payload);
            const login = await axios(`${BASE_URL}/auth/profile`, {
                headers: {
                    "Authorization": `Bearer ${res.data.access_token}`
                }
            });
            return login.data;

        } catch (err) {
            console.log(err);
            return thunkApi.rejectWithValue(err)

        }
    }
);


/* Methos to change current user */
const addCurrentUser = (state, { payload }) => {
    state.currentUser = payload
}

/* Creating methods and initial values */
const userSlice = createSlice({
    name: "user",

    initialState: {
        currentUser: null,
        cart: [],
        favourite: [],
        isLoading: false,
        formType: "signup",
        showForm: false,
    },

    /* Reducers methods to demonstarte using redux toolkit */
    reducers: {
        addItemToCart: (state, { payload }) => {
            let newCart = [...state.cart];
            const found = state.cart.find(({ id }) => id === payload.id)

            if (found) {
                newCart = newCart.map((item) => {
                    return item.id = payload.id ? { ...item, quantity: payload.quantity || item.quantity + 1 } : item
                });

            } else newCart.push({ ...payload, quantity: 1 })

            state.cart = newCart
        },
        addItemToFavourites: (state, { payload }) => {
            let newFavourite = [...state.favourite];
            const found = state.favourite.find(({ id }) => id === payload.id)

            if (found) {
                newFavourite = newFavourite.map((item) => {
                    return item.id = payload.id ? { ...item, quantity: payload.quantity || item.quantity + 1 } : item
                });

            } else newFavourite.push({ ...payload, quantity: 1 })

            state.favourite = newFavourite
        },
        removeItemFromCart: (state, { payload }) => {
            state.cart = state.cart.filter(({ id }) => id !== payload);
        },
        removeItemFromFavourites: (state, { payload }) => {
            state.favourite = state.favourite.filter(({ id }) => id !== payload);
        },
        toggleForm: (state, { payload }) => {
            state.showForm = payload
        },
        toggleFormType: (state, { payload }) => {
            state.formType = payload
        },
    },
    
    /* Determining logical part of Reducers */
    extraReducers: (builder) => {

        builder.addCase(createUser.fulfilled, addCurrentUser);
        builder.addCase(loginUser.fulfilled, addCurrentUser);
        builder.addCase(updateUser.fulfilled, addCurrentUser);

    }
})

export const { addItemToCart, toggleForm, toggleFormType, removeItemFromCart, addItemToFavourites, removeItemFromFavourites } = userSlice.actions;

export default userSlice.reducer