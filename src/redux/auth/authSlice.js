import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import instance from "../../API";

const user = JSON.parse(localStorage.getItem('user') !== 'undefined' ? localStorage.getItem('user') : null);

const initialState = {
	user,
	loading: false,
	access_token: localStorage.getItem('access_token'),
	refresh_token: localStorage.getItem('refresh_token'),
	code: null
}

export const getCode = createAsyncThunk(
	"auth/getCode",
	async (data) => {
		try {
			const response = await instance.post('auth/login', data)
			return response.data
		} catch (e) {
			return e;
		}
	}
)

export const verifyCode = createAsyncThunk(
	"auth/getCode",
	async (data) => {
		try {
			const response = await instance.post('auth/confirm-verify-code', data)
			return response.data
		} catch (e) {
			return e;
		}
	}
)

const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		setAccess: (state, {payload}) => {
			state.access_token = payload?.access
			localStorage.setItem('access_token', payload?.access)
		},
		setRefresh: (state, {payload}) => {
			state.refresh_token = payload?.refresh_token
			localStorage.setItem('refresh_token', payload?.refresh_token)
		}
	},
	extraReducers: (builder) => {
		builder.addCase(getCode.pending, (state) => {
			state.loading = true
		})
		builder.addCase(getCode.fulfilled, (state, {payload}) => {
			state.code = payload
			state.loading = false
		})
		builder.addCase(getCode.rejected, (state) => {
			state.code = null
			state.loading = false
		})
	}
})

export const { setAccess, setRefresh } = authSlice.actions

export default authSlice.reducer
