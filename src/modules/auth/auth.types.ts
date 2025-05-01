import { User } from '../users/users.schema'; // Adjust the path as needed

export interface AuthResponse {
  user: User;
  accessToken: string;
  refreshToken: string;
}
