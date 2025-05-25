"use client";

import TaskCard from "@/components/TaskCard";
import { UserContext } from "@/context";
import React, { useContext } from "react";

const Task = () => {
    const { tasks, projects } = useContext(UserContext)!;

    enum STATUS {
        TODO = "Todo",
        IN_PROGRESS = "In Progress",
        DONE = "Done",
    }

    enum PRIORITY {
        LOW = "Low",
        MEDIUM = "Medium",
        HIGH = "High",
    }

    return (
        <div className=" max-width">
            {/* Filters */}
            <div className="mb-10 grid grid-cols-3 gap-5">
                <div className="w-full">
                    <label className="mb-2 text-sm font-medium text-gray-900 flex flex-col gap-2">
                        Filter by Status
                        <select className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
                            <option selected disabled>
                                Choose an option
                            </option>
                            {Object.entries(STATUS).map(([key, value]) => (
                                <option key={key} value={key}>
                                    {value}
                                </option>
                            ))}
                        </select>
                    </label>
                </div>

                <div className="w-full">
                    <label className="mb-2 text-sm font-medium text-gray-900 flex flex-col gap-2">
                        Filter by Priority
                        <select className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
                            <option selected disabled>
                                Choose an option
                            </option>
                            {Object.entries(PRIORITY).map(([key, value]) => (
                                <option key={key} value={key}>
                                    {value}
                                </option>
                            ))}
                        </select>
                    </label>
                </div>

                <div className="w-full">
                    <label className="mb-2 text-sm font-medium text-gray-900 flex flex-col gap-2">
                        Filter by Project
                        <select className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
                            <option selected disabled>
                                Choose an option
                            </option>
                            {projects.map((item) => (
                                <option key={item} value={item}>
                                    {item}
                                </option>
                            ))}
                        </select>
                    </label>
                </div>
            </div>

            {/* Tasks Section */}
            <section className="grid grid-cols-3 gap-6">
                {tasks.map((task, idx) => (
                    <TaskCard task={task} key={idx} />
                ))}
            </section>
        </div>
    );
};

export default Task;
