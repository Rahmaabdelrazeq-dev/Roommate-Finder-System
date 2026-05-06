export interface SignupCredentials {
  email: string;
  password: string;
  fullName: string;
}

export type LoginCredentials = Omit<SignupCredentials, 'fullName'>;


export interface AuthResponse {
  user: any;
  session: any;
}