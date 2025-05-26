"use client";

import { UserContext } from "@/context";
import ReactHead from "@theprojectsx/react-head";
import Link from "next/link";
import React, { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

interface Credential {
    name: string;
    email: string;
    password: string;
}

const Login = () => {
    const { setUserInfo } = useContext(UserContext)!;
    const [savedCredentials, setSavedCredentials] = useState<Credential[]>([]);

    // Handle Login
    const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const form = e.target as HTMLFormElement;

        const email = form.email.value;
        const password = form.password.value;

        let userFound = null;

        if (
            email === process.env.NEXT_PUBLIC_ADMIN_USER &&
            password === process.env.NEXT_PUBLIC_ADMIN_PASSWORD
        ) {
            userFound = {
                name: "Admin",
                profile_picture: "https://i.ibb.co/jkQk36Kg/2.jpg",
                email: process.env.NEXT_PUBLIC_ADMIN_USER,
            };
        } else {
            userFound = savedCredentials.find(
                (users) => users.email === email && users.password === password
            );
        }

        if (!userFound) return toast.error("Invalid Credentials");

        localStorage.setItem("loggedIn", JSON.stringify(userFound));
        toast.success("Login Successful!");
        setUserInfo({ ...(userFound as any) });
    };

    // Load Credentials
    useEffect(() => {
        const credentials: Credential[] =
            JSON.parse(localStorage.getItem("credentials")!) ?? [];

        setSavedCredentials(credentials);
    }, [setSavedCredentials]);

    return (
        <main className="flex-1 w-full h-full flex justify-center items-center py-10">
            <ReactHead>
                <title>Login | Task Nest</title>
                <meta
                    name="description"
                    content="Login to access your tasks and manage your projects effectively."
                />
                <meta
                    name="keywords"
                    content="login, sign in, task manager login, project access"
                />
            </ReactHead>

            <div className="w-full max-w-md">
                <h2 className="text-center underline underline-offset-4 mb-8 text-2xl font-semibold">
                    Login to Your Account
                </h2>

                <form className="space-y-6" onSubmit={handleLogin}>
                    <label className="text-gray-900 flex flex-col gap-2">
                        <span className="text-sm font-medium">Email</span>
                        <input
                            type="email"
                            name="email"
                            className="bg-gray-50 outline-none border-2 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full px-2.5 py-2"
                            placeholder="jhon@gmail.com"
                            required
                        />
                    </label>

                    <label className="text-gray-900 flex flex-col gap-2">
                        <span className="text-sm font-medium">Password</span>
                        <input
                            type="password"
                            name="password"
                            className="bg-gray-50 outline-none border-2 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full px-2.5 py-2"
                            placeholder="******"
                            required
                        />
                    </label>

                    <div className="text-sm pl-4">
                        Don't Have an Account?{" "}
                        <Link
                            href={"/signup"}
                            className="hover:underline underline-offset-4 text-blue-500 font-medium"
                        >
                            Signup!
                        </Link>
                    </div>

                    <button
                        type="submit"
                        className="text-white bg-blue-700 hover:bg-blue-800 active:scale-95 transition-[scale] duration-200 font-medium rounded-full text-sm px-5 py-2.5 text-center w-full cursor-pointer"
                    >
                        Login
                    </button>
                </form>
            </div>
        </main>
    );
};

export default Login;
