"use client";

import { CTAButton } from "@/components/Button";
import { UserContext } from "@/context";
import ReactHead from "@theprojectsx/react-head";
import React, { useContext } from "react";
import { MdArrowOutward } from "react-icons/md";

const Home = () => {
    const { userInfo, isLoading } = useContext(UserContext)!;

    if (isLoading || userInfo) return;

    return (
        <main className="w-full h-full flex flex-col items-center justify-center flex-1 px-4">
            <ReactHead>
                <title>Homepage | Task Nest</title>
                <meta
                    name="description"
                    content="Login or Sign up to use Task Nest"
                />
            </ReactHead>

            {/* Hero */}
            <div
                className="relative flex-1 w-full max-width bg-no-repeat bg-cover bg-center rounded-2xl flex items-center justify-center"
                style={{
                    backgroundImage:
                        "url(https://images.unsplash.com/photo-1590402494610-2c378a9114c6)",
                }}
            >
                {/* Hero content */}
                <div className="flex flex-col items-center justify-center w-full sm:max-w-lg md:max-w-2xl px-4 z-10">
                    <h2 className="mb-4 text-2xl sm:text-4xl md:text-5xl font-bold text-white text-center">
                        Organize your Tasks with <br />{" "}
                        <span className="bg-gradient-to-r from-purple-300 to-blue-300 bg-clip-text text-transparent">
                            Task Nest!
                        </span>
                    </h2>

                    <p className="mb-8 text-center text-slate-200 font-semibold sm:text-lg">
                        Task Nest helps you manage tasks and projects
                        effortlessly. Organize your to-dos, set priorities, and
                        boost your productivity—all in one tidy workspace.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-5 text-center w-2/3">
                        <CTAButton href="/login" className="flex-1 w-full">
                            <span className="flex items-center gap-2">
                                Manage Your Tasks
                                <MdArrowOutward className="text-lg" />
                            </span>
                        </CTAButton>
                        <CTAButton href="/signup" className="flex-1 w-full">
                            <span className="flex items-center gap-2">
                                Join Us Now!
                                <MdArrowOutward className="text-lg" />
                            </span>
                        </CTAButton>
                    </div>
                </div>

                <div className="bg-black/40 inset-0 absolute rounded-2xl"></div>
            </div>
        </main>
    );
};

export default Home;
