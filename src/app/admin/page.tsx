"use client";

import { PRIORITY, STATUS } from "@/components/TaskCard";
import { UserContext } from "@/context";
import ReactHead from "@theprojectsx/react-head";
import React, { useContext, useEffect, useState } from "react";

const AdminDashboard = () => {
    const { userInfo, tasks, isLoading } = useContext(UserContext)!;
    const [allUsers, setAllUsers] = useState<{}[]>([]);

    if (isLoading) return;
    if (userInfo?.email !== process.env.NEXT_PUBLIC_ADMIN_USER) return;

    useEffect(() => {
        const credentials =
            JSON.parse(localStorage.getItem("credentials")!) ?? [];

        setAllUsers([userInfo, ...credentials]);
    }, []);

    return (
        <main className="max-width mb-8">
            <ReactHead>
                <title>Admin Panel | Task Nest</title>
                <meta name="description" content="View users, Tasks, Status!" />
            </ReactHead>

            <h2 className="text-2xl font-semibold underline underline-offset-4 mb-6">
                Users
            </h2>

            <div className="relative overflow-x-auto shadow-md sm:rounded-lg mb-8">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                Full Name
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Email
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Role
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {allUsers.map((user: any, idx: number) => (
                            <tr
                                key={idx}
                                className="odd:bg-white even:bg-gray-50 border-b border-gray-200"
                            >
                                <th
                                    scope="row"
                                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap "
                                >
                                    {user.name}
                                </th>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    {user.email}
                                </td>
                                <td className="px-6 py-4">
                                    {user.email ===
                                    process.env.NEXT_PUBLIC_ADMIN_USER
                                        ? "Admin"
                                        : "User"}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <h2 className="text-2xl font-semibold underline underline-offset-4 mb-6">
                Tasks
            </h2>

            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                        <tr className=" w-full">
                            <th scope="col" className="px-6 py-3 ">
                                Task
                            </th>
                            <th scope="col" className="px-6 py-3 ">
                                Status
                            </th>
                            <th scope="col" className="px-6 py-3 ">
                                Priority
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {tasks.map((task) => (
                            <tr
                                key={task.id}
                                className="odd:bg-white even:bg-gray-50 border-b border-gray-200"
                            >
                                <th
                                    scope="row"
                                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                                >
                                    {task.title}
                                </th>
                                <td className="px-6 py-4">
                                    {STATUS[task.status]}
                                </td>
                                <td className="px-6 py-4">
                                    {PRIORITY[task.priority]}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </main>
    );
};

export default AdminDashboard;
