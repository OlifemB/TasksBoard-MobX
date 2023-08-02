export interface IUser {
    id: string,
    created_at: string,
    name: string,
    avatar: string,
}

export interface IDashboardTask {
    id: string,
    title: string,
    description?: string | null,
    assignee: IUser,
}

export interface IDashboardSection {
    id: string,
    title: string,
    tasks: IDashboardTask[],
}

export interface IBoard {
    id: string,
    title: string,
    sections: IDashboardSection[],
}
