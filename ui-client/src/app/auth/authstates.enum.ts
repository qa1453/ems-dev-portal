export enum AuthStates {
   loggedOut = 1,
   emailConfirmPending,
   phoneConfirmPending,
   loggedIn
}

export interface UserAuthInfo {
   state: AuthStates;
   email: string;
   firstname: string;
   lastname: string;
}
