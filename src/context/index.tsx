import React, { createContext, useReducer, useState } from "react";

export interface UserInfo {
    name: string;
    profile_picture: string;
}

export interface Task {
    id: number;
    title: string;
    status: "TODO" | "IN_PROGRESS" | "DONE";
    priority: "LOW" | "MEDIUM" | "HIGH";
    dueDate: string;
    project: string;
}

type Action =
    | { type: "SET"; payload: Task[] }
    | { type: "ADD"; payload: Omit<Task, "id"> & { id: number | undefined } }
    | { type: "UPDATE"; payload: Task }
    | { type: "DELETE"; payload: Task };

const taskReducer = (state: Task[], action: Action): Task[] => {
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
            console.log(action.payload);
            return state.map((task) =>
                task.id === action.payload.id ? action.payload : task
            );
        case "DELETE":
            return state.filter((task) => task.id !== action.payload.id);
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
    dispatch: React.Dispatch<Action>;
    projects: string[];
    setProjects: React.Dispatch<React.SetStateAction<string[]>>;
}

export const UserContext = createContext<UserContextProps | null>(null);

const UserContextWrapper = ({ children }: { children: React.ReactNode }) => {
    const [userInfo, setUserInfo] = useState<UserInfo | null>({
        name: "Rahat Khan",
        profile_picture: "https://i.ibb.co/jkQk36Kg/2.jpg",
    });

    const [isLoading, setIsLoading] = useState<boolean>(true);

    const [tasks, dispatch] = useReducer(taskReducer, []);

    const [projects, setProjects] = useState<string[]>([]);

    return (
        <UserContext.Provider
            value={{
                userInfo,
                setUserInfo,
                isLoading,
                setIsLoading,
                tasks,
                dispatch,
                projects,
                setProjects,
            }}
        >
            {children}
        </UserContext.Provider>
    );
};

export default UserContextWrapper;
