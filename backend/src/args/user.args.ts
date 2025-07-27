import { USER_ROLE } from "../enums";

export interface CreateUserArgs {
    email: string;
    role: USER_ROLE;
    name: string;   
    password: string;
    teamId?: string;
}

export interface UpdateUserArgs {
    id: string;
    email?: string;
    role?: USER_ROLE;
    name?: string; 
}

export interface DeleteUserArgs {
    id: string;
}