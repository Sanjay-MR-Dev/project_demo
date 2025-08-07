import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';


interface customConfig extends AxiosRequestConfig {
    _retry?: boolean;
    headers?: AxiosRequestConfig['headers'];
}

const instance: AxiosInstance = axios.create({
    baseURL: 'http://localhost:5000/api',
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true,
})

let isRefreshing = false;
let refreshSubscribers: ((token: string) => void)[] = [];

function getCookie(name: string): string | null {
    const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
    if (match) {
        console.log(match[2]);
        return match[2];
    }
    return null;
}
function subscribeTokenRefresh(cb: (token: string) => void) {
    refreshSubscribers.push(cb);
}

function onRefreshed(newAccessToken: string) {
    refreshSubscribers.forEach(cb => cb(newAccessToken));
    refreshSubscribers = [];
}

instance.interceptors.request.use((config) => {
    const csrfToken = getCookie("XSRF-TOKEN");
    if (csrfToken) {
        console.log(csrfToken);
        config.headers['X-CSRF-Token'] = csrfToken;
    }

    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});


instance.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = (error.config ?? {}) as customConfig;

        if ((error.response?.status === 401 || error.response?.status === 403) && !originalRequest._retry) {
            originalRequest._retry = true;

            const refreshToken = localStorage.getItem('refreshToken');
            if (!refreshToken) {
                localStorage.removeItem("accessToken");
                localStorage.removeItem("refreshToken");
                localStorage.setItem('tokenError', 'Invalid or Expired Token');
                window.location.href = '/login';
                return Promise.reject(error);
            }

            if (isRefreshing) {
                return new Promise((resolve) => {
                    subscribeTokenRefresh((newAccessToken: string) => {
                        (originalRequest.headers as Record<string, string>)['Authorization'] = `Bearer ${newAccessToken}`;
                        resolve(instance(originalRequest));
                    });
                });
            }

            isRefreshing = true;

            try {
                const response = await axios.post('api/refresh-tokens', { refreshToken });

                const { accessToken: newAccessToken, refreshToken: newRefreshToken } = response.data;
                console.log('New Tokens Received', newAccessToken, newRefreshToken);

                localStorage.setItem('accessToken', newAccessToken);
                localStorage.setItem('refreshToken', newRefreshToken);
                instance.defaults.headers.common['Authorization'] = `Bearer ${newAccessToken}`;

                onRefreshed(newAccessToken);
                isRefreshing = false;

                (originalRequest.headers as Record<string, string>)['Authorization'] = `Bearer ${newAccessToken}`;
                return instance(originalRequest);
            } catch (refreshError) {
                isRefreshing = false;
                localStorage.removeItem("accessToken");
                localStorage.removeItem("refreshToken");
                localStorage.setItem('tokenError', 'Session expired. Please log in again.');
                window.location.href = '/login';
                return Promise.reject(refreshError);
            }
        }
        return Promise.reject(error);
    }
);

export default instance;