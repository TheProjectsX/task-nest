import React from "react";
import { FiEdit3 } from "react-icons/fi";
import { RiDeleteBin4Line } from "react-icons/ri";

type TaskStatus = "TODO" | "IN_PROGRESS" | "DONE";
type Priority = "LOW" | "MEDIUM" | "HIGH";

interface Task {
    id: string;
    title: string;
    status: TaskStatus;
    priority: Priority;
    dueDate: string;
    project: string;
}

interface TaskCardProps {
    task: Task;
}

const TaskCard = ({ task }: TaskCardProps) => {
    return (
        <div className="bg-white text-gray-900 pt-4 pb-0 rounded-xl shadow-lg w-full overflow-hidden">
            <h3 className="text-lg font-semibold px-4">{task.title}</h3>
            <p className="text-sm text-gray-500 mt-1 px-4">
                Project: {task.project ?? "N/A"}
            </p>
            <div className="flex justify-between mt-4 text-sm px-4">
                <span className="px-2 py-1 bg-gray-200 rounded">
                    {task.status}
                </span>
                <span className="px-2 py-1 bg-gray-200 rounded">
                    {task.priority}
                </span>
                <span className="text-gray-400">{task.dueDate}</span>
            </div>

            <div className="pt-5 flex">
                <button className="w-1/2 py-2 flex justify-center bg-gray-100 hover:bg-blue-500 hover:text-white cursor-pointer transition-color duration-200 ease-in-out">
                    <FiEdit3 />
                </button>
                <button className="w-1/2 py-2 flex justify-center bg-gray-100 hover:bg-red-500 hover:text-white cursor-pointer transition-color duration-200 ease-in-out">
                    <RiDeleteBin4Line />
                </button>
            </div>
        </div>
    );
};

export default TaskCard;
