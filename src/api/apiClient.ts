const BASE_URL = 'http://139.162.9.129/v1';

interface ApiOptions {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
  body?: Record<string, any>;
  headers?: Record<string, string>;
  skipAuth?: boolean;
}

const apiClient = async <T>(endpoint: string, options: ApiOptions = {}): Promise<T> => {
  try {
    const { method = 'GET', body, headers = {}, skipAuth = false } = options;

    const token = localStorage.getItem('authToken'); 

    const config: RequestInit = {
      method,
      headers: {
        'Content-Type': 'application/json',
        ...(token && !skipAuth ? { Authorization: `Bearer ${token}` } : {}),
        ...headers,
      },
    };

    if (body) {
      config.body = JSON.stringify(body);
    }

    const response = await fetch(`${BASE_URL}/${endpoint}`, config);
    const data = await response.json();

    if (!response.ok) {
      let errorMessage = data?.message || 'An unexpected error occurred.';

      switch (response.status) {
        case 400:
          errorMessage = data?.message || 'Bad Request. Please check your input.';
          break;
        case 401:
          errorMessage = 'Unauthorized. Please log in again.';
          break;
        case 403:
          errorMessage = 'Forbidden. You do not have access to this resource.';
          break;
        case 404:
          errorMessage = data?.message || 'Resource not found.';
          break;
        case 500:
          errorMessage = 'Internal Server Error. Please try again later.';
          break;
      }

      throw new Error(errorMessage);
    }

    return data as T;
  } catch (error) {
    throw new Error((error as Error).message || 'Network Error: Please check your internet connection.');
  }
};

export default apiClient;
