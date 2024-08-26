import axios from "axios";
// import nextConfig from "@/app/next.config";
import nextConfig from "@/next.config.mjs";

// Buat instance Axios
const api = axios.create({
  baseURL: "http://13.210.185.89",
  // baseURL: nextConfig.env?.CUSTOM_VAR,
});

// Fungsi untuk merefresh access token
const refreshAccessToken = async () => {
  try {
    const refreshToken = document.cookie
      .split("; ")
      .find((row) => row.startsWith("refreshToken="))
      ?.split("=")[1];

    if (!refreshToken) {
      throw new Error("Refresh token not found");
    }

    const response = await api.put("/authentication", {
      refreshToken,
    });

    const { accessToken } = response.data.data;

    // Simpan access token yang baru di localStorage
    localStorage.setItem("accessToken", accessToken);

    return accessToken;
  } catch (error) {
    return null;
  }
};

// Tambahkan interceptor ke instance Axios
api.interceptors.response.use(
  (response) => response, // Jika response berhasil, lanjutkan
  async (error) => {
    const originalRequest = error.config;

    // Jika token sudah kedaluwarsa dan belum dicoba refresh
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      // Coba untuk refresh access token
      const newAccessToken = await refreshAccessToken();

      if (newAccessToken) {
        // Update Authorization header dengan token yang baru
        originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
        return api(originalRequest); // Ulangi request yang gagal
      }
    }

    return Promise.reject(error); // Jika gagal, lempar error
  }
);

export default api;
