import React, { createContext, useReducer, useState } from "react";

export interface UserInfo {
    name: string;
    email: string;
    profile_picture?: string;
}

export interface Task {
    id: number;
    title: string;
    status: "TODO" | "IN_PROGRESS" | "DONE";
    priority: "LOW" | "MEDIUM" | "HIGH";
    dueDate: string;
    projectId: number | null;
}

export interface Project {
    id: number;
    name: string;
}

type TaskAction =
    | { type: "SET"; payload: Task[] }
    | { type: "ADD"; payload: Omit<Task, "id"> & { id: number | undefined } }
    | { type: "UPDATE"; payload: Task }
    | { type: "DELETE"; payload: Task };

const taskReducer = (state: Task[], action: TaskAction): Task[] => {
    switch (action.type) {
        case "SET":
            return [...action.payload];
        case "ADD":
            const newTask: Task = {
                ...action.payload,
                id: Math.max(...state.map((task) => Number(task.id))) + 1,
            };

            return [...state, newTask];
        case "UPDATE":
            return state.map((task) =>
                task.id === action.payload.id ? action.payload : task
            );
        case "DELETE":
            return state.filter((task) => task.id !== action.payload.id);
        default:
            return state;
    }
};

type ProjectAction =
    | { type: "SET"; payload: Project[] }
    | { type: "ADD"; payload: Omit<Project, "id"> & { id: number | undefined } }
    | { type: "UPDATE"; payload: Project }
    | { type: "DELETE"; payload: Project };

const projectReducer = (state: Project[], action: ProjectAction): Project[] => {
    switch (action.type) {
        case "SET":
            return [...action.payload];
        case "ADD":
            const newProject: Project = {
                ...action.payload,
                id: Math.max(...state.map((project) => Number(project.id))) + 1,
            };

            return [...state, newProject];
        case "UPDATE":
            return state.map((project) =>
                project.id === action.payload.id ? action.payload : project
            );
        case "DELETE":
            return state.filter((project) => project.id !== action.payload.id);
        default:
            return state;
    }
};

export interface UserContextProps {
    userInfo: UserInfo | null;
    setUserInfo: React.Dispatch<React.SetStateAction<UserInfo | null>>;
    isLoading: boolean;
    setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
    tasks: Task[];
    dispatchTasks: React.Dispatch<TaskAction>;
    projects: Project[];
    dispatchProjects: React.Dispatch<ProjectAction>;
}

export const UserContext = createContext<UserContextProps | null>(null);

const UserContextWrapper = ({ children }: { children: React.ReactNode }) => {
    const [userInfo, setUserInfo] = useState<UserInfo | null>(null);

    const [isLoading, setIsLoading] = useState<boolean>(true);

    const [tasks, dispatchTasks] = useReducer(taskReducer, []);

    const [projects, dispatchProjects] = useReducer(projectReducer, []);

    return (
        <UserContext.Provider
            value={{
                userInfo,
                setUserInfo,
                isLoading,
                setIsLoading,
                tasks,
                dispatchTasks,
                projects,
                dispatchProjects,
            }}
        >
            {children}
        </UserContext.Provider>
    );
};

export default UserContextWrapper;
