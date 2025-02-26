import apiClient from "./apiClient";
import { API_ENDPOINTS } from "./endPoint";
import { DevicesResponse, LocationStatsResponse, LoginPayload, LoginResponse } from "./types";


export const loginUser = async (
    payload: LoginPayload
): Promise<LoginResponse> => {
    console.log("Login Request:", payload);
    try {
        const response = await apiClient<LoginResponse>(API_ENDPOINTS.LOGIN, {
            method: "POST",
            body: payload,
        });

        console.log("Login Successful:", response);
        return response;
    } catch (error: any) {
        console.error('Login Error:', error.message);
        throw error;
    }
};


export const getDevices = async (offset: number = 0, limit: number = 4): Promise<DevicesResponse> => {
    try {
        const url = `${API_ENDPOINTS.GET_DEVICES}?offset=${offset}&limit=${limit}&total_count=true&count_by_status=true`;
        const response = await apiClient<DevicesResponse>(url, {
            method: "GET",
        });

        console.log("Devices Fetched:", response);
        return response;
    } catch (error: any) {
        console.error("Error Fetching Devices:", error.message);
        throw error;
    }
};


export const searchDevices = async (name: string) => {
    try {
        const url = `${API_ENDPOINTS.SEARCH_DEVICES}?name=${name}`
      const response = await apiClient<DevicesResponse>(url, {
        method: "GET",
        headers: {
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3NDA2NDc5MTksImlhdCI6MTc0MDU2MTUxOSwicm9sZXMiOlsxXSwidXNlcklkIjoyfQ.rOx0yW5WhCF_oEmBBBOAhpoRhbjEegJP2eEK6C8SZXk'
        }
      });
  
      console.log("Devices Fetched:", response);
      
      return response.devices;
    } catch (error: any) {
        console.error("Error Fetching Devices:", error.message);
        throw error;
    }
  };
  
export const getLocationStats = async (): Promise<LocationStatsResponse> => {
    try {
        const response = await apiClient<LocationStatsResponse>(API_ENDPOINTS.GET_LOCATIONS, {
            method: "GET",
        });

        console.log("Location Stats Fetched:", response);
        return response;
    } catch (error: any) {
        console.error("Error Fetching Location Stats:", error.message);
        throw error;
    }
};
