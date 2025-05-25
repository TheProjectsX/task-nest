import React, { createContext, useState } from "react";

export interface UserInfo {
    name: string;
    profile_picture: string;
}

export interface Tasks {
    id: string;
    title: string;
    status: "TODO" | "IN_PROGRESS" | "DONE";
    priority: "LOW" | "MEDIUM" | "HIGH";
    dueDate: string;
    project: string;
}

export interface UserContextProps {
    userInfo: UserInfo | null;
    setUserInfo: React.Dispatch<React.SetStateAction<UserInfo | null>>;
    isLoading: boolean;
    setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
    tasks: Tasks[];
    setTasks: React.Dispatch<React.SetStateAction<Tasks[]>>;
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

    const [tasks, setTasks] = useState<Tasks[]>([]);

    const [projects, setProjects] = useState<string[]>([]);

    return (
        <UserContext.Provider
            value={{
                userInfo,
                setUserInfo,
                isLoading,
                setIsLoading,
                tasks,
                setTasks,
                projects,
                setProjects,
            }}
        >
            {children}
        </UserContext.Provider>
    );
};

export default UserContextWrapper;
