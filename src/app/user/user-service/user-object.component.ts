export interface User {
    userID?: number;
    firstName?: string | null;
    lastName?: string | null; 
    contactNumber?: string | null;
    emailAddress?: string | null;

    username?: string | null;
    password?: string | null;
    admin?: boolean;
}