import apiClient from "./apiClient";
import { API_ENDPOINTS } from "./endPoint";
import { DevicesResponse, LoginPayload, LoginResponse } from "./types";


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
