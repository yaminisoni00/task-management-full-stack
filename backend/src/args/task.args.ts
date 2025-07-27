import { TASK_STATUS } from "../enums";

export interface CreateTaskArgs {
    title: string;
    description?: string;
    projectId: string;
    assignedTo: string;
    status: TASK_STATUS
}

export interface UpdateTaskArgs {
    id: string;
    title?: string;
    description?: string;
    status?: TASK_STATUS;
    assignedTo?: string;
}

export interface DeleteTaskArgs {
    id: string;
}
export interface GetTasksArgs {
    projectId: string;
}