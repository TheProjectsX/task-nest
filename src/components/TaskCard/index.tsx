import { Project, Task } from "@/context";
import React from "react";
import { FiEdit3 } from "react-icons/fi";
import { RiDeleteBin4Line } from "react-icons/ri";

export enum STATUS {
    TODO = "Todo",
    IN_PROGRESS = "In Progress",
    DONE = "Done",
}

export enum PRIORITY {
    LOW = "Low",
    MEDIUM = "Medium",
    HIGH = "High",
}

interface TaskCardProps {
    task: Task & { project: Project | undefined };
    onEdit: () => void;
    onDelete: () => void;
}

const TaskCard = ({ task, onEdit, onDelete }: TaskCardProps) => {
    return (
        <div className="bg-white text-gray-900 pt-4 pb-0 rounded-xl shadow-lg w-full overflow-hidden flex flex-col">
            <div className="px-4 flex-1">
                <h3 className="text-lg font-semibold">{task.title}</h3>
                <p className="text-sm text-gray-500 mt-1">
                    Project: {task.project?.name ?? "N/A"}
                </p>
                <div className="flex justify-between mt-4 text-sm">
                    <span
                        className="px-2 py-1 bg-gray-200 rounded"
                        title="Status"
                    >
                        {STATUS[task.status]}
                    </span>
                    <span
                        className="px-2 py-1 bg-gray-200 rounded"
                        title="Priority"
                    >
                        {PRIORITY[task.priority]}
                    </span>
                    <span className="text-gray-400" title="Due Date">
                        {new Date(task.dueDate).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "short",
                            day: "2-digit",
                        })}
                    </span>
                </div>
            </div>

            <div className="pt-5 flex">
                <button
                    className="w-1/2 py-2 flex justify-center bg-gray-100 hover:bg-blue-500 hover:text-white cursor-pointer transition-color duration-200 ease-in-out"
                    title="Edit Task"
                    onClick={() => onEdit()}
                >
                    <FiEdit3 />
                </button>
                <button
                    className="w-1/2 py-2 flex justify-center bg-gray-100 hover:bg-red-500 hover:text-white cursor-pointer transition-color duration-200 ease-in-out"
                    title="Delete Task"
                    onClick={() => onDelete()}
                >
                    <RiDeleteBin4Line />
                </button>
            </div>
        </div>
    );
};

export default TaskCard;
