export interface CreateProjectArgs {
  name: string;
  description?: string;
  teamId: string;
}

export interface UpdateProjectArgs {
  id: string;
  name?: string;
  description?: string;
}

export interface DeleteProjectArgs {
  id: string;
}