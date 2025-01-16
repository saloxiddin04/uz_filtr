import axios from 'axios';
import { api_url } from '../config';
import { toast } from 'react-toastify';

const access_token = localStorage.getItem('access_token') || '';
const user = localStorage.getItem('user') || '';

const instance = axios.create({
	baseURL: api_url,
	headers: {
		'Content-Type': 'application/json',
	}
});

if (access_token) {
	instance.defaults.headers.common = { Authorization: `Bearer ${access_token}` };
}

instance.interceptors.request.use(
	(config) => {
		if (access_token) {
			config.headers.Authorization = `Bearer ${access_token}`;
		}
		return config;
	},
	async (error) => {
		toast.error(error?.response?.data?.err_msg || error?.message);
		return Promise.reject(error);
	}
);

instance.interceptors.response.use(
	(response) => {
		return response;
	},
	(error) => {
		if (user && error.response.status === 401) {
			window.location.href = '/';
			localStorage.clear();
			window.location.reload();
		}
		toast.error(error?.response?.data?.err_msg || error?.message);
		return Promise.reject(error);
	}
);

export default instance;