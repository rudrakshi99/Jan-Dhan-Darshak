import { configureStore } from "@reduxjs/toolkit";

import rootReducer from "./rootReducer";
import authSlice from "./slices/authSlice";

const store = configureStore({
    reducer: rootReducer,
    auth: authSlice
});
export default store;
