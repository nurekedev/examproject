import React from "react";
import {createRoot} from 'react-dom/client'
import { BrowserRouter } from "react-router-dom";

import App from "./components/App/App";
import "./styles/index.css"
import { Provider } from "react-redux";
import { store } from "./features/store";



createRoot(document.getElementById("root")).render(
    <Provider store={store}>
    <BrowserRouter>
        <App />
    </BrowserRouter>
    </Provider>
);