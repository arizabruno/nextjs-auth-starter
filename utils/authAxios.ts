import { cookies } from 'next/headers';
import axios from 'axios';

const authAxios = axios.create();

// Use request interceptor to set the Authorization header before each request
authAxios.interceptors.request.use((config) => {
  // Retrieve JWT token from cookies for every request
  const token = cookies().get('jwt')?.value;

  // If the token exists, set the Authorization header
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
}, (error) => {
  // Do something with request error
  return Promise.reject(error);
});

// Export the custom Axios instance
export default authAxios;
