"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import { toast } from "react-toastify";

const Signup = () => {
    const router = useRouter();

    const handleSignup = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = e.target as HTMLFormElement;

        const userInfo = {
            name: (form.elements.namedItem("name") as HTMLInputElement).value,
            email: form.email.value,
            password: form.password.value,
        };

        const pastUsers =
            JSON.parse(localStorage.getItem("credentials")!) ?? [];

        const newUsers = [...pastUsers, userInfo];

        localStorage.setItem("credentials", JSON.stringify(newUsers));

        toast.success("Account Created Successfully!");
        router.push("/login");
    };

    return (
        <main className="flex-1 w-full h-full flex justify-center items-center py-10">
            <div className="w-full max-w-md">
                <h2 className="text-center underline underline-offset-4 mb-8 text-2xl font-semibold">
                    Register New Account
                </h2>

                <form className="space-y-6" onSubmit={handleSignup}>
                    <label className="text-gray-900 flex flex-col gap-2">
                        <span className="text-sm font-medium">Full Name</span>
                        <input
                            type="text"
                            name="name"
                            className="bg-gray-50 outline-none border-2 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full px-2.5 py-2"
                            placeholder="Jhon Deo"
                            minLength={5}
                            required
                        />
                    </label>

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
                            minLength={6}
                            required
                        />
                    </label>

                    <div className="text-sm pl-4">
                        Already Have an Account?{" "}
                        <Link
                            href={"/login"}
                            className="hover:underline underline-offset-4 text-blue-500 font-medium"
                        >
                            Login!
                        </Link>
                    </div>

                    <button
                        type="submit"
                        className="text-white bg-blue-700 hover:bg-blue-800 active:scale-95 transition-[scale] duration-200 font-medium rounded-full text-sm px-5 py-2.5 text-center w-full cursor-pointer"
                    >
                        Signup
                    </button>
                </form>
            </div>
        </main>
    );
};

export default Signup;
