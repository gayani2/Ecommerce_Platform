import axios from 'axios';

// In Choreo production: window.configs.apiUrl is set via Choreo's config dashboard
// In local dev: window.configs.apiUrl is "" so the Vite proxy handles /api/* calls
const baseURL = (window?.configs?.apiUrl) || '';

const axiosInstance = axios.create({
  baseURL,
});

export default axiosInstance;
