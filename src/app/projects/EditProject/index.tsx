import { ProjectProps } from "@/components/ProjectCard";
import { Project, UserContext } from "@/context";
import React, { useContext, useEffect } from "react";
import { MdClose } from "react-icons/md";
import { toast } from "react-toastify";

const EditProject = ({
    project,
    closeModal,
}: {
    project: ProjectProps | undefined | null;
    closeModal: () => void;
}) => {
    const { dispatchProjects } = useContext(UserContext)!;

    useEffect(() => {
        document.body.style.overflow = project !== null ? "hidden" : "auto";
    }, [project]);

    if (project === null) return;

    // Handle Submit Task
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = e.target as HTMLFormElement;
        const newProject = {
            id: project?.id,
            name: form.project.value,
        };

        if (project) {
            dispatchProjects({
                type: "UPDATE",
                payload: newProject as Project,
            });
            toast.success("Project Updated!");
        } else {
            dispatchProjects({ type: "ADD", payload: newProject });
            toast.success("Project Created");
        }
        closeModal();
    };

    return (
        <dialog
            className="absolute inset-0 h-full w-full bg-black/50 z-10 flex items-center justify-center"
            open={!!project}
            onClose={closeModal}
            onClick={(e) => {
                if (e.target === e.currentTarget) {
                    closeModal();
                }
            }}
        >
            <div className="relative bg-white px-4 py-4 rounded-2xl w-full max-w-lg">
                <button
                    className="absolute top-0.5 right-0.5 text-gray-500 hover:text-gray-700 p-1.5 rounded-full hover:bg-gray-100 cursor-pointer"
                    onClick={closeModal}
                >
                    <MdClose className="w-5 h-5" />
                </button>

                <h3 className="text-lg font-semibold text-center underline underline-offset-4 mb-4">
                    {typeof project === "undefined"
                        ? "Create new Project"
                        : "Update Project"}
                </h3>

                <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                    <label className="mb-2 text-gray-900 flex flex-col gap-2">
                        <span className="text-sm font-medium">Project</span>
                        <input
                            type="text"
                            name="project"
                            className="bg-gray-50 outline-none border-2 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full px-2.5 py-2"
                            defaultValue={project?.name}
                            placeholder="Your Project"
                            required
                        />
                    </label>

                    <div className="flex items-center gap-4">
                        <button
                            type="reset"
                            className="text-white bg-red-600 hover:bg-red-700 active:scale-95 transition-[scale] duration-200 font-medium rounded-full text-sm px-5 py-2.5 text-center flex-1 cursor-pointer"
                        >
                            Clear
                        </button>
                        <button
                            type="submit"
                            className="text-white bg-blue-700 hover:bg-blue-800 active:scale-95 transition-[scale] duration-200 font-medium rounded-full text-sm px-5 py-2.5 text-center flex-1 cursor-pointer"
                        >
                            Submit
                        </button>
                    </div>
                </form>
            </div>
        </dialog>
    );
};

export default EditProject;
