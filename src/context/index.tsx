import React, { createContext, useState } from "react";

export interface UserInfo {
    name: string;
    profile_picture: string;
}

export interface Tasks {}

export interface UserContextProps {
    userInfo: UserInfo | null;
    setUserInfo: React.Dispatch<React.SetStateAction<UserInfo | null>>;
    isLoading: boolean;
    setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
    tasks: Tasks[];
    setTasks: React.Dispatch<React.SetStateAction<Tasks[]>>;
    drawerOpened: boolean;
    setDrawerOpened: React.Dispatch<React.SetStateAction<boolean>>;
}

export const UserContext = createContext<UserContextProps | null>(null);

const UserContextWrapper = ({ children }: { children: React.ReactNode }) => {
    const [userInfo, setUserInfo] = useState<UserInfo | null>({
        name: "Rahat Khan",
        profile_picture: "https://i.ibb.co/jkQk36Kg/2.jpg",
    });

    const [isLoading, setIsLoading] = useState<boolean>(false);

    const [tasks, setTasks] = useState<Tasks[]>([]);

    const [drawerOpened, setDrawerOpened] = useState<boolean>(false);

    return (
        <UserContext.Provider
            value={{
                userInfo,
                setUserInfo,
                isLoading,
                setIsLoading,
                tasks,
                setTasks,
                drawerOpened,
                setDrawerOpened,
            }}
        >
            {children}
        </UserContext.Provider>
    );
};

export default UserContextWrapper;
