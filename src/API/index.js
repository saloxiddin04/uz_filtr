import axios from 'axios';
import { api_url } from '../config';
import { toast } from 'react-toastify';

const access_token = localStorage.getItem('access_token') || '';

const instance = axios.create({
	baseURL: api_url,
	headers: {
		'Content-Type': 'application/json',
	}
});

export const updateAuthHeader = () => {
	const access_token = localStorage.getItem('access_token');
	if (access_token) {
		instance.defaults.headers.common['Authorization'] = `Bearer ${access_token}`;
	}
};

instance.interceptors.request.use(
	(config) => {
		updateAuthHeader();
		// if (access_token) {
		// 	config.headers.Authorization = `Bearer ${access_token}`;
		// }
		return config;
	},
	(error) => {
		toast.error(error.message);
		return Promise.reject(error);
	}
);

instance.interceptors.response.use(
	(response) => response,
	async (error) => {
		if (error.response.status === 401) {
			localStorage.clear();
			window.location.href = '/';
		}
		toast.error(error?.response?.data?.detail || error?.message);
		return Promise.reject(error);
	}
);

export default instance;
