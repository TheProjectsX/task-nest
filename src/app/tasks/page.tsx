"use client";

import EditTask from "./EditTask";
import TaskCard, { PRIORITY, STATUS } from "@/components/TaskCard";
import { Task, UserContext } from "@/context";
import ReactHead from "@theprojectsx/react-head";
import React, { useContext, useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";

const TaskView = () => {
    const {
        tasks,
        dispatchTasks: dispatch,
        projects,
    } = useContext(UserContext)!;

    const [tasksToView, setTasksToView] = useState<Task[]>(tasks);

    const [currentTask, setCurrentTask] = useState<Task | undefined | null>(
        null
    );

    const statusRef = useRef<HTMLSelectElement | null>(null);
    const priorityRef = useRef<HTMLSelectElement | null>(null);
    const projectRef = useRef<HTMLSelectElement | null>(null);

    // Handle Filter
    const handleFilter = () => {
        const status = statusRef.current?.value;
        const priority = priorityRef.current?.value;
        const project = projectRef.current?.value;

        const filtered = tasks.filter(
            (item) =>
                [item.status, undefined, ""].includes(status) &&
                [item.priority, undefined, ""].includes(priority) &&
                [item.projectId?.toString(), undefined, ""].includes(project)
        );

        setTasksToView(filtered);
    };

    // Handle Delete Task
    const handleDeleteTask = async (task: Task) => {
        const confirmed = window.confirm("Delete Task?");
        if (!confirmed) return;

        dispatch({ type: "DELETE", payload: task });
        toast.success("Task Deleted");

        const localData: Task[] =
            JSON.parse(localStorage.getItem("tasks")!) ?? [];
        let newData;

        const contains = localData.find((item) => item.id === task.id);
        if (contains) {
            newData = localData.filter((item) => item.id !== task.id);
        } else {
            newData = localData;
        }

        localStorage.setItem("tasks", JSON.stringify(newData));
    };

    // Update tasksToView after tasks updated
    useEffect(() => {
        handleFilter();
    }, [tasks]);

    return (
        <main className="max-width mb-8">
            <ReactHead>
                <title>Tasks | Task Nest</title>
                <meta
                    name="description"
                    content="View and manage all your tasks. Filter by project, priority, and status."
                />
                <meta
                    name="keywords"
                    content="tasks, task list, manage tasks, filter tasks, project tasks"
                />
            </ReactHead>

            <EditTask
                task={currentTask}
                closeModal={() => setCurrentTask(null)}
            />

            {/* Filters and Action Button */}
            <div className="mb-5 md:mb-10 grid grid-cols-2 md:grid-cols-4 gap-5">
                <div className="w-full">
                    <label className="text-sm font-medium text-gray-900 flex flex-col gap-2">
                        Filter by Status
                        <select
                            ref={statusRef}
                            className="bg-gray-50 border-2 outline-none border-gray-300 text-gray-900 text-sm rounded-lg  focus:border-blue-500 block w-full p-2"
                            onChange={handleFilter}
                            defaultValue={""}
                        >
                            <option value={""}>Unfiltered</option>
                            {Object.entries(STATUS).map(([key, value]) => (
                                <option key={key} value={key}>
                                    {value}
                                </option>
                            ))}
                        </select>
                    </label>
                </div>

                <div className="w-full">
                    <label className="text-sm font-medium text-gray-900 flex flex-col gap-2">
                        Filter by Priority
                        <select
                            ref={priorityRef}
                            className="bg-gray-50 border-2 outline-none border-gray-300 text-gray-900 text-sm rounded-lg  focus:border-blue-500 block w-full p-2"
                            onChange={handleFilter}
                            defaultValue={""}
                        >
                            <option value={""}>Unfiltered</option>
                            {Object.entries(PRIORITY).map(([key, value]) => (
                                <option key={key} value={key}>
                                    {value}
                                </option>
                            ))}
                        </select>
                    </label>
                </div>

                <div className="w-full">
                    <label className="text-sm font-medium text-gray-900 flex flex-col gap-2">
                        Filter by Project
                        <select
                            ref={projectRef}
                            className="bg-gray-50 border-2 outline-none border-gray-300 text-gray-900 text-sm rounded-lg  focus:border-blue-500 block w-full p-2"
                            onChange={handleFilter}
                            defaultValue={""}
                        >
                            <option value={""}>Unfiltered</option>
                            {projects.map((project) => (
                                <option key={project.id} value={project.id}>
                                    {project.name}
                                </option>
                            ))}
                        </select>
                    </label>
                </div>

                <div className="w-full flex items-end">
                    <button
                        className="text-white bg-blue-700 hover:bg-blue-800 active:scale-95 transition-[scale] duration-200 font-medium rounded-lg text-sm px-4 py-2.5 text-center flex-1 cursor-pointer"
                        onClick={() => setCurrentTask(undefined)}
                    >
                        Add New
                    </button>
                </div>
            </div>

            {/* Tasks Section */}
            {tasksToView.length === 0 && (
                <div className="w-full p-6 border border-dashed rounded-md border-gray-400 text-center text-gray-400">
                    No Task to Show!
                </div>
            )}

            {tasksToView.length > 0 && (
                <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {tasksToView.map((task, idx) => (
                        <TaskCard
                            task={{
                                ...task,
                                project: projects.find(
                                    (item) => item.id === task.projectId
                                ),
                            }}
                            key={idx}
                            onEdit={() => setCurrentTask(task)}
                            onDelete={() => handleDeleteTask(task)}
                        />
                    ))}
                </section>
            )}
        </main>
    );
};

export default TaskView;
