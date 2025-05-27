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

            if (!loggedIn || loggedIn === "false") {
                setUserInfo(null);
            } else {
                setUserInfo(JSON.parse(loggedIn));
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
            } else if (
                pathname === "/admin" &&
                userInfo?.email !== process.env.NEXT_PUBLIC_ADMIN_USER
            ) {
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
                <img
                    src={"/logo.png"}
                    alt="Task Nest Data loading"
                    className="animate-bounce size-20 shadow-2xl rounded-full"
                />
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
            <div className="flex flex-col gap-6 min-h-screen px-4">
                <Navbar />
                {children}
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
