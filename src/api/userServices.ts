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


export const getDevices = async (): Promise<DevicesResponse> => {
    try {
        const response = await apiClient<DevicesResponse>(API_ENDPOINTS.GET_DEVICES, {
            method: "GET",
        });

        console.log("Devices Fetched:", response);
        return response;
    } catch (error: any) {
        console.error("Error Fetching Devices:", error.message);
        throw error;
    }
};