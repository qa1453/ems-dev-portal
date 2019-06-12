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
   callingcode?: string;
   phone?: string;
   activationcode?: string;
}
