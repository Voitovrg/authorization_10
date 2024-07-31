import axios, { AxiosResponse } from 'axios';

interface UserExistsResponse {
    code: number;
    message: string;
    status: string;
    body: {
        code: number;
        message: string;
        status: string;
    }
}

interface LoginRequest {
    email: string;
    password: string;
}

const checkUserExists = async (email: string, password: string): Promise<void> => {
    const loginRequest: LoginRequest = { email, password };

    try {
        const response: AxiosResponse<UserExistsResponse> = await axios.post(
            `http://142.93.134.108:1111/login`,
            loginRequest,
            {
                params: { email, password }
            }
        );

        if (response.data.status === 'error') {
            console.log('User does not exist or invalid credentials:', response.data.message);
        } else {
            console.log('User exisssssssts:', response.data);
            console.log('User exisssssssts:', response.data.body);
            console.log('User exisssssssts:', response.data.body.message);
        }
    } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
            console.log('User does not exist or invalid credentials:', error.response.data.message);
        } else {
            console.error('Error checking user existence:', error);
        }
    }
};

// Пример использования функции:
checkUserExists('user@example.com', 'password123');
