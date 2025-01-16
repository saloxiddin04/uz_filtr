import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import instance, {updateAuthHeader} from "../../API";

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

export const updateUser = createAsyncThunk(
	"auth/updateUser",
	async (data) => {
		try {
			const response = await instance.patch('auth/update-user-auth', data)
			return response.data
		} catch (e) {
			return e;
		}
	}
)

export const login = createAsyncThunk(
	"auth/login",
	async (data) => {
		try {
			const response = await instance.post('auth/authenticate', data)
			return response.data
		} catch (e) {
			return e;
		}
	}
)

export const getUserDetail = createAsyncThunk(
	"auth/getUserDetail",
	async (_, { rejectWithValue }) => {
		try {
			const response = await instance.get('user/detail');
			return response.data;
		} catch (error) {
			if (error.response && error.response.data) {
				return rejectWithValue(error.response.data);
			}
			return rejectWithValue({ message: error.message });
		}
	}
);

const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		setAccess: (state, {payload}) => {
			state.access_token = payload?.access
			localStorage.setItem('access_token', payload?.access)
			updateAuthHeader()
		},
		setRefresh: (state, {payload}) => {
			state.refresh_token = payload?.refresh_token
			localStorage.setItem('refresh_token', payload?.refresh_token)
			updateAuthHeader()
		},
		setUser: (state, {payload}) => {
			state.user = payload
			localStorage.setItem('user', JSON.stringify(payload))
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
		
		// updateUser
		builder
			.addCase(updateUser.pending, (state) => {
				state.loading = true
			})
			.addCase(updateUser.fulfilled, (state, {payload}) => {
				state.user = payload
				state.loading = false
			})
			.addCase(updateUser.rejected, (state) => {
				state.user = null
				state.loading = false
			})
		
		// login
		builder
			.addCase(login.pending, (state) => {
				state.loading = true
			})
			.addCase(login.fulfilled, (state, {payload}) => {
				state.loading = false
			})
			.addCase(login.rejected, (state) => {
				state.loading = false
			})
	}
})

export const { setAccess, setRefresh, setUser } = authSlice.actions

export default authSlice.reducer
