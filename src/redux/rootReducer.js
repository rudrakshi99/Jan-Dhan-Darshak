import { combineReducers } from "@reduxjs/toolkit";

import { AlertSlice } from "./slices/alertSlice";
import { authSlice } from "./slices/authSlice";

const rootReducer = combineReducers({
	alerts: AlertSlice.reducer,
	auth: authSlice.reducer,
});

export default rootReducer;
