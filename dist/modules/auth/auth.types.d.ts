import { User } from '../users/users.schema';
export interface AuthResponse {
    user: User;
    accessToken: string;
    refreshToken: string;
}
