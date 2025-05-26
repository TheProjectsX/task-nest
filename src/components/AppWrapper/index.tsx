"use client";

import UserContextWrapper, { Project, Task, UserContext } from "@/context";
import React, { useContext, useEffect } from "react";
import Navbar from "../Navbar";
import { usePathname, useRouter } from "next/navigation";
import axios from "axios";
import { Bounce, ToastContainer } from "react-toastify";
import Footer from "../Footer";

const ProviderWrapper = ({ children }: { children: React.ReactNode }) => {
    const {
        userInfo,
        setUserInfo,
        isLoading,
        setIsLoading,
        dispatchTasks,
        dispatchProjects,
    } = useContext(UserContext)!;

    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
        const fetchData = async () => {
            const loggedIn = localStorage.getItem("loggedIn");
            if (!loggedIn) {
                setUserInfo(null);
                return;
            }

            const localTasks: Task[] =
                JSON.parse(localStorage.getItem("tasks")!) ?? [];

            const localProjects: Project[] =
                JSON.parse(localStorage.getItem("projects")!) ?? [];

            const [tasksResponse, projectsResponse] = await Promise.all([
                axios.get<Task[]>("/api/tasks"),
                axios.get<Project[]>("/api/projects"),
            ]);

            dispatchTasks({
                type: "SET",
                payload: [...tasksResponse.data, ...localTasks],
            });

            dispatchProjects({
                type: "SET",
                payload: [...projectsResponse.data, ...localProjects],
            });

            setIsLoading(false);
        };
        fetchData();
    }, []);

    useEffect(() => {
        if (isLoading) return;

        if (userInfo) {
            if (["/", "/login", "/signup"].includes(pathname)) {
                router.push("/tasks");
            }
        } else {
            if (!["/", "/login", "/signup"].includes(pathname)) {
                router.push("/");
            }
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
            <ToastContainer
                position="top-center"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick={false}
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
                transition={Bounce}
            />
            <div className="flex flex-col gap-6 h-screen">
                <Navbar />
                <main className="flex-1">{children}</main>
                <Footer />
            </div>
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
