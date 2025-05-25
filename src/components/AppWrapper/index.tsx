"use client";

import UserContextWrapper, { Task, UserContext } from "@/context";
import React, { useContext, useEffect } from "react";
import Navbar from "../Navbar";
import { useRouter } from "next/navigation";
import axios from "axios";

const ProviderWrapper = ({ children }: { children: React.ReactNode }) => {
    const {
        userInfo,
        setUserInfo,
        isLoading,
        setIsLoading,
        setTasks,
        setProjects,
    } = useContext(UserContext)!;

    const router = useRouter();

    useEffect(() => {
        const fetchData = async () => {
            const loggedIn = localStorage.getItem("loggedIn");
            if (!loggedIn) {
                setUserInfo(null);
                return;
            }

            const localTasks: Task[] =
                JSON.parse(localStorage.getItem("tasks")!) ?? [];

            const localProjects: string[] =
                JSON.parse(localStorage.getItem("projects")!) ?? [];

            const [tasksResponse, projectsResponse] = await Promise.all([
                axios.get<Task[]>("/api/tasks"),
                axios.get<string[]>("/api/projects"),
            ]);

            setTasks([...tasksResponse.data, ...localTasks]);
            setProjects([...projectsResponse.data, ...localProjects]);
            setIsLoading(false);
        };
        fetchData();
    }, []);

    useEffect(() => {
        if (isLoading) return;

        if (userInfo) {
            router.push("/tasks");
        } else {
            router.push("/");
        }
    }, [userInfo, isLoading]);

    if (isLoading) {
        return (
            <div className="absolute inset-0 flex justify-center items-center">
                <p className="animate-bounce text-2xl">Loading...</p>
            </div>
        );
    }

    return (
        <>
            <Navbar />
            {children}
        </>
    );
};

const AppWrapper = ({ children }: { children: React.ReactNode }) => {
    return (
        <UserContextWrapper>
            <ProviderWrapper>{children}</ProviderWrapper>
        </UserContextWrapper>
    );
};

export default AppWrapper;
