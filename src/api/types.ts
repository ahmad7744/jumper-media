export interface LoginPayload {
    email: string;
    password: string;
}

export interface LoginResponse {
    message: string;
    token: string;
}

export interface Device {
    id: number;
    name: string;
    model: string;
    ip_address: string;
    status: "active" | "inactive"; 
    country: string;
    state: string;
    city: string;
    street: string;
    coordinates: string; 
    relay_server_id: number;
    created_at: string; 
    updated_at: string; 
}

export type DevicesResponse = Device[];
