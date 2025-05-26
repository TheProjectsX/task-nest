import React from "react";
import { FiEdit3 } from "react-icons/fi";
import { RiDeleteBin4Line } from "react-icons/ri";

export interface ProjectProps {
    id: number;
    name: string;
    count: number;
}

interface ProjectCardProps {
    project: ProjectProps;
    onEdit: () => void;
    onDelete: () => void;
}

const ProjectCard = ({ project, onEdit, onDelete }: ProjectCardProps) => {
    return (
        <div className="border border-gray-200 rounded-md shadow-sm bg-white flex items-center justify-between h-[90px] overflow-hidden">
            <div className="pl-4">
                <h3 className="text-lg font-semibold text-gray-800 mb-1">
                    {project.name}
                </h3>
                <p className="text-sm text-gray-500">
                    {project.count.toString().padStart(2, "0")} task
                    {project.count > 1 && "s"}
                </p>
            </div>
            <div className="flex flex-col h-full">
                <button
                    className="px-2 flex-1 flex items-center bg-gray-100 hover:bg-blue-500 hover:text-white cursor-pointer transition-color duration-200 ease-in-out"
                    title="Edit Task"
                    onClick={() => onEdit()}
                >
                    <FiEdit3 />
                </button>
                <button
                    className="px-2 flex-1 flex items-center bg-gray-100 hover:bg-red-500 hover:text-white cursor-pointer transition-color duration-200 ease-in-out"
                    title="Delete Task"
                    onClick={() => onDelete()}
                >
                    <RiDeleteBin4Line />
                </button>
            </div>
        </div>
    );
};

export default ProjectCard;
