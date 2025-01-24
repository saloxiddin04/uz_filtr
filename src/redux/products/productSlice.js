import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import instance from "../../API";

const initialState = {
	loading: false,
	products: null,
	product: null
}

export const getAllProducts = createAsyncThunk(
	"product/getAllProducts",
	async (params) => {
		try {
			const response = await instance.get('product/list-products', {params})
			return response.data
		} catch (e) {
			return e;
		}
	}
)

export const getProduct = createAsyncThunk(
	"product/getProduct",
	async (id) => {
		try {
			const response = await instance.get(`product/detail-products/${id}`)
			return response.data;
		}catch (e) {
			return e;
		}
	}
)

const productsSlice = createSlice({
	name: "product",
	initialState,
	extraReducers: builder => {
		// getAllProducts
		builder
			.addCase(getAllProducts.pending, (state) => {
				state.loaading = true
			})
			.addCase(getAllProducts.fulfilled, (state, {payload}) => {
				state.products = payload
				state.loading = false
			})
			.addCase(getAllProducts.rejected, (state) => {
				state.loading = false
				state.products = null
			})
		
		// getProduct
		builder
			.addCase(getProduct.pending, (state) => {
				state.loading = true
			})
			.addCase(getProduct.fulfilled, (state, {payload}) => {
				state.product = payload
				state.loading = false
			})
			.addCase(getProduct.rejected, (state) => {
				state.loading = false
				state.product = null
			})
	}
})

export default productsSlice.reducer