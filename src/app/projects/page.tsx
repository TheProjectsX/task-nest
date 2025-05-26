"use client";

import ProjectCard, { ProjectProps } from "@/components/ProjectCard";
import { Project, UserContext } from "@/context";
import React, { useContext, useEffect, useState } from "react";
import EditProject from "./EditProject";
import { toast } from "react-toastify";

const Projects = () => {
    const { tasks, projects, dispatchProjects } = useContext(UserContext)!;
    const [currentProject, setCurrentProject] = useState<
        ProjectProps | undefined | null
    >(null);

    const [projectsToView, setProjectsToView] = useState<ProjectProps[]>([]);

    useEffect(() => {
        const projectSummary = projects.map((project) => ({
            ...project,
            count: tasks.filter((task) => task.projectId === project.id).length,
        }));

        setProjectsToView(projectSummary);
    }, [tasks, projects]);

    // Handle Delete Project
    const handleDeleteProject = async (project: Project) => {
        const confirmed = window.confirm("Delete Project?");
        if (!confirmed) return;

        dispatchProjects({ type: "DELETE", payload: project });
        toast.success("Project Deleted");

        const localData: Project[] =
            JSON.parse(localStorage.getItem("projects")!) ?? [];
        let newData;

        const contains = localData.find((item) => item.id === project.id);
        if (contains) {
            newData = localData.filter((item) => item.id !== project.id);
        } else {
            newData = localData;
        }

        localStorage.setItem("projects", JSON.stringify(newData));
    };

    return (
        <main className="max-width mb-8 flex-1">
            <EditProject
                project={currentProject}
                closeModal={() => setCurrentProject(null)}
            />

            {projectsToView.length === 0 && (
                <div className="w-full p-6 border border-dashed rounded-md border-gray-400 text-center text-gray-400">
                    No Project to Show!
                </div>
            )}

            {projectsToView.length > 0 && (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
                    {projectsToView.map((project, idx) => (
                        <ProjectCard
                            project={project}
                            key={idx}
                            onEdit={() => setCurrentProject(project)}
                            onDelete={() => handleDeleteProject(project)}
                        />
                    ))}
                    <div className="h-full w-full flex items-center justify-center">
                        <button
                            className="text-white bg-blue-700 hover:bg-blue-800 active:scale-95 transition-[scale] duration-200 font-medium rounded-lg text-sm px-4 py-2.5 text-center flex-1 cursor-pointer"
                            onClick={() => setCurrentProject(undefined)}
                        >
                            Add New
                        </button>
                    </div>
                </div>
            )}
        </main>
    );
};

export default Projects;
