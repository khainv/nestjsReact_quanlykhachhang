import axios from 'axios';
import { URL_BACKEND } from './constantsk';

const axiosClient = axios.create({
  baseURL: URL_BACKEND,
  headers: {
    'Content-Type': 'application/json',
  },
});
// 1. Tự động đính kèm Access Token vào mọi request gửi đi
axiosClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('access_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);
// 2. Bộ chặn Response: Phát hiện lỗi 401 để tự động làm mới token
axiosClient.interceptors.response.use(
  (response) => response, // Nếu request thành công thì cứ trả về bình thường
  async (error) => {
    const originalRequest = error.config;

    // Nếu Backend trả về 401 (Unauthorized) và request này chưa từng được thử lại
    if (error.response && error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true; // Đánh dấu đã thử lại để tránh lặp vô hạn

      try {
        const refreshToken = localStorage.getItem('refresh_token');
        if (!refreshToken) throw new Error('No refresh token');

        // Gọi API của NestJS để lấy Access Token mới
        const res = await axios.post(`${URL_BACKEND}/admink/refresh-token`, {
          refresh_token: refreshToken,
        });

        if (res.data && res.data.access_token) {
          // Lưu token mới vào máy
          localStorage.setItem('access_token', res.data.access_token);
          
          // Cập nhật lại token mới vào request hiện tại và thực thi lại nó
          originalRequest.headers.Authorization = `Bearer ${res.data.access_token}`;
          return axiosClient(originalRequest);
        }
      } catch (refreshError) {
        // Nếu ngay cả Refresh Token cũng hết hạn hoặc lỗi => Bắt buộc đăng nhập lại
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        window.location.href = '/admink/login'; // Chuyển hướng về trang login
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default axiosClient;
