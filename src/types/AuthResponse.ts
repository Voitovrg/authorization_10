// src/types/AuthResponse.ts

export interface AuthResponse {
    statusCode: number;
    status_code: number;
    code: number;
    message: string;
    status: string;
    body: {
        access_token: string;
        refresh_token: string;
        code: number | undefined;
        message: string | undefined;
        status: string | undefined;
    };
}
