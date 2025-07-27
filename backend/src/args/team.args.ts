export interface CreateTeamArgs {
    name: string;
    description?: string;
    members?: string[]; // Array of user IDs
}

export interface UpdateTeamArgs {
    name?: string;
    description?: string;
    id: string;
    members?: string[]; // Array of user IDs to add or remove
}

export interface DeleteTeamArgs {
    id: string;
}

export interface GetTeamMembersArgs {
    id: string;
}