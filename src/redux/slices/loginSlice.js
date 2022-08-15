import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { auth } from "../utils/auth";

export const checkAuth = createAsyncThunk("signin/checkAuth", async () => {
	return new Promise(async (resolve, reject) => {
		try {
			if (auth.isAuthenticated()) {
				const { user } = await auth.getUser();
				return resolve({ user });
			} else {
				reject({ token: null, user: null });
			}
		} catch (err) {
			return reject({ token: null, user: null });
		}
	});
});

export const renewToken = createAsyncThunk(
	"renew/renewToken",
	auth.renewAccessToken
);

export const login = createAsyncThunk("signin/login", auth.login);

export const logout = createAsyncThunk("signout/logout", auth.logout);

const initialState = {
	loading: false,
	error: null,
	loggedIn: false,
	loggedInUser: null,
	token: null,
};

export const signinSlice = createSlice({
	name: "signin",
	initialState,
	reducers: {},
	extraReducers: {
		[checkAuth.pending]: startLoading,
		[checkAuth.fulfilled]: (state, { payload }) => {
			const { user = null } = payload;

			Object.assign(state, {
				loading: false,
				error: null,
				loggedIn: true,
				loggedInUser: user,
			});
		},
		[checkAuth.rejected]: (state, action) => {
			Object.assign(state, {
				loading: false,
				error: action.error,
			});
			// window.location.replace(true);
			// window.location.href = "/signin";
		},

		[login.pending]: startLoading,
		[login.fulfilled]: (state, { payload }) => {
			const { user, token } = payload;
			return Object.assign(state, {
				...initialState,
				loading: false,
				loggedIn: true,
				loggedInUser: user,
				token,
			});
		},
		[login.rejected]: receiveError,

		[logout.pending]: startLoading,
		[logout.fulfilled]: (state) =>
			Object.assign(state, {
				...initialState,
				loading: false,
				loggedIn: false,
				loggedInUser: null,
				token: null,
			}),
		[logout.rejected]: receiveError,

		[renewToken.pending]: startLoading,
		[renewToken.fulfilled]: (state, { payload }) => {
			Object.assign(state, {
				...initialState,
				loading: false,
				token: payload.access,
			});
		},
		[renewToken.rejected]: receiveError,
	},
});

function startLoading(state) {
	Object.assign(state, {
		loading: true,
		error: null,
	});
}

function receiveError(state, action) {
	Object.assign(state, {
		loading: false,
		error: action.error,
	});
}

export const selectSignin = (state) => state.signin;

export const signinReducer = signinSlice.reducer;
