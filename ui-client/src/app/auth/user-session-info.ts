export enum UserAccountRoles {
   unknown = 0,
   admin = 1,
   regular
}

export enum UserAccountStates {
   loggedOut = 1,
   emailConfirmPending,
   phoneConfirmPending,
   loggedIn
}

export enum UserAccountTypes {
   unknown = 0,
   trial = 1,
   paid
}

// When a user account is logged on, this structure holds
// the current information about the user. 
// Note the state for when the user's has started the
// signup process but hasn't completed it.
// 
// This information in this structure should be returned
// from the server after a successful login. 
//

export interface UserSessionInfo {
   sessionId: string;
   email: string;
   firstname: string;
   lastname: string;
   country: string;
   calling_code: string;
   phone: string;
   company: string;
   account_role: UserAccountRoles;
   account_state: UserAccountStates;
   account_type: UserAccountTypes;
   account_create_date: Date;
   account_expired_date: Date;
   account_balance: number;
   account_limit: number;
}