import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import instance from "../../API";

const initialState = {
	categories: null,
	category: null,
	loading: false
}

export const getAllCategories = createAsyncThunk(
	"category/getAllCategories",
	async () => {
		try {
			const response = await instance.get('main/create-categories')
			return response.data
		} catch (e) {
			return e;
		}
	}
)

export const getCategory = createAsyncThunk(
	"category/getCategory",
	async (id) => {
		try {
			const response = await instance.get(`main/retrive-update-categories/${id}`)
			return response.data
		} catch (e) {
			return e;
		}
	}
)

const categorySlice = createSlice({
	name: "category",
	initialState,
	extraReducers: builder => {
		// getAllCategories
		builder
			.addCase(getAllCategories.pending, (state) => {
				state.loading = true
			})
			.addCase(getAllCategories.fulfilled, (state, {payload}) => {
				state.categories = payload
				state.loading = false
			})
			.addCase(getAllCategories.rejected, (state) => {
				state.categories = null
				state.loading = false
			})
		
		// getCategory
		builder
			.addCase(getCategory.pending, (state) => {
				state.loading = true
			})
			.addCase(getCategory.fulfilled, (state, {payload}) => {
				state.category = payload
				state.loading = false
			})
			.addCase(getCategory.rejected, (state) => {
				state.category = null
				state.loading = false
			})
	}
})

export default categorySlice.reducer