import { createSlice } from "@reduxjs/toolkit";

export const AlertSlice = createSlice({
    name: "alert",
    initialState: {
        alerts: [],
    },
    reducers: {
        createAlert: (state, action) => {
            state.alerts.push({
                message: action.payload.message,
                status: action.payload.status,
            });
        },
        removeAlert: (state) => {
            state.alerts.pop();
        },
    },
});

export const alertActions = AlertSlice.actions;

export default AlertSlice;
