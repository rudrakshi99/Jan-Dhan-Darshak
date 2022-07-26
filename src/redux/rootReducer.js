import { combineReducers } from "@reduxjs/toolkit";

import { AlertSlice } from "./slices/alertSlice";

const rootReducer = combineReducers({
    alerts: AlertSlice.reducer,
});

export default rootReducer;
