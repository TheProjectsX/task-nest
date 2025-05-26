import { Task, UserContext } from "@/context";
import React, { useContext, useEffect } from "react";
import { PRIORITY, STATUS } from "@/components/TaskCard";
import { MdClose } from "react-icons/md";
import { toast } from "react-toastify";

const EditTask = ({
    task,
    closeModal,
}: {
    task: Task | undefined | null;
    closeModal: () => void;
}) => {
    const {
        tasks,
        projects,
        dispatchTasks: dispatch,
    } = useContext(UserContext)!;

    useEffect(() => {
        document.body.style.overflow = task !== null ? "hidden" : "auto";
    }, [task]);

    if (task === null) return;

    // Handle Submit Task
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = e.target as HTMLFormElement;

        const taskData: Omit<Task, "id"> & { id: number | undefined } = {
            id:
                task?.id ??
                Math.max(...tasks.map((task) => Number(task.id))) + 1,
            title: (form.elements.namedItem("title") as HTMLInputElement).value,
            status: form.status.value,
            priority: form.priority.value,
            projectId: Number(form.project.value),
            dueDate: form.dueDate.value,
        };

        if (task) {
            dispatch({ type: "UPDATE", payload: taskData as Task });
            toast.success("Task Updated!");
        } else {
            dispatch({ type: "ADD", payload: taskData });
            toast.success("Task Created");
        }

        const localData: Task[] =
            JSON.parse(localStorage.getItem("tasks")!) ?? [];
        let newData;

        if (task) {
            const contains = localData.find((item) => item.id === taskData.id);
            if (contains) {
                newData = localData.map((item) =>
                    item.id === taskData.id ? taskData : item
                );
            } else {
                newData = localData;
            }
        } else {
            newData = [...localData, taskData];
        }

        localStorage.setItem("tasks", JSON.stringify(newData));

        closeModal();
    };

    return (
        <dialog
            className="fixed inset-0 w-full bg-black/50 z-10 flex justify-center items-center h-screen"
            open={!!task}
            onClose={closeModal}
            onClick={(e) => {
                if (e.target === e.currentTarget) {
                    closeModal();
                }
            }}
        >
            <div className="relative bg-white px-4 py-4 rounded-2xl w-full max-w-lg h-fit">
                <button
                    className="absolute top-0.5 right-0.5 text-gray-500 hover:text-gray-700 p-1.5 rounded-full hover:bg-gray-100 cursor-pointer"
                    onClick={closeModal}
                >
                    <MdClose className="w-5 h-5" />
                </button>

                <h3 className="text-lg font-semibold text-center underline underline-offset-4 mb-4">
                    {typeof task === "undefined"
                        ? "Add new Task"
                        : "Update Task"}
                </h3>

                <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                    <label className="mb-2 text-gray-900 flex flex-col gap-2">
                        <span className="text-sm font-medium">Task</span>
                        <input
                            type="text"
                            name="title"
                            className="bg-gray-50 outline-none border-2 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full px-2.5 py-2"
                            defaultValue={task?.title}
                            placeholder="Your Task"
                            required
                        />
                    </label>

                    <label className="mb-2 text-gray-900 flex flex-col gap-2">
                        <span className="text-sm font-medium">Status</span>
                        <select
                            name="status"
                            className="bg-gray-50 outline-none border-2 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full px-2.5 py-2"
                            defaultValue={task?.status}
                        >
                            {Object.entries(STATUS).map(([key, value]) => (
                                <option key={key} value={key}>
                                    {value}
                                </option>
                            ))}
                        </select>
                    </label>

                    <label className="mb-2 text-gray-900 flex flex-col gap-2">
                        <span className="text-sm font-medium">Priority</span>
                        <select
                            name="priority"
                            className="bg-gray-50 outline-none border-2 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full px-2.5 py-2"
                            defaultValue={task?.priority}
                        >
                            {Object.entries(PRIORITY).map(([key, value]) => (
                                <option key={key} value={key}>
                                    {value}
                                </option>
                            ))}
                        </select>
                    </label>

                    <label className="mb-2 text-gray-900 flex flex-col gap-2">
                        <span className="text-sm font-medium">Project</span>
                        <select
                            name="project"
                            className="bg-gray-50 outline-none border-2 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full px-2.5 py-2"
                            defaultValue={task?.projectId ?? ""}
                        >
                            <option value="">Unlisted</option>
                            {projects.map((project) => (
                                <option key={project.id} value={project.id}>
                                    {project.name}
                                </option>
                            ))}
                        </select>
                    </label>

                    <label className="mb-2 text-gray-900 flex flex-col gap-2">
                        <span className="text-sm font-medium">Due Date</span>
                        <input
                            name="dueDate"
                            min={new Date().toISOString().split("T")[0]}
                            type="date"
                            className="bg-gray-50 outline-none border-2 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full px-2.5 py-2"
                            defaultValue={task?.dueDate}
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

export default EditTask;
