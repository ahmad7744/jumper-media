export interface LoginPayload {
    email: string;
    password: string;
}

export interface LoginResponse {
    message: string;
    token: string;
}

export interface Device {
    id: string;
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

export interface DevicesResponse {
    devices: Device[];
    total: number; 
    active: number;
    inactive: number;
    in_maintenance: number;
}


export interface LocationStats {
    state: string;
    total_devices: number;
    active_devices: number;
    inactive_devices: number;
    overlapping_ips: number;
    unique_ips: number;
    last_ip_rotation: string | null;
    cumulative_download_speed: number;
    cumulative_upload_speed: number;
}

export interface LocationStatsResponse {
    locations: LocationStats[];
}
