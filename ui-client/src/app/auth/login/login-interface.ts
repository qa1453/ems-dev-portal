export interface LoginInterface {
   email: string;
   password: string;
}

export enum LoginResult {
   Success = 1,
   Canceled,
   ForgotPassword
}