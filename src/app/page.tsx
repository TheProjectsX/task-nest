"use client";

import { CTAButton } from "@/components/Button";
import { UserContext } from "@/context";
import React, { useContext } from "react";

const Home = () => {
    const { userInfo, isLoading } = useContext(UserContext)!;

    if (isLoading || userInfo) return;

    return (
        <main className="w-full h-screen flex flex-col items-center justify-center flex-1 px-4">
            {/* Hero */}
            <div
                className="relative aspect-[2/1] w-full max-width bg-no-repeat bg-cover bg-center rounded-2xl flex items-center justify-center"
                style={{
                    backgroundImage:
                        "url(https://images.unsplash.com/photo-1590402494610-2c378a9114c6)",
                }}
            >
                {/* Hero content */}
                <div className="flex flex-col items-center justify-center w-full sm:max-w-lg px-4 z-10">
                    <h2 className="mb-8 text-2xl font-medium text-white text-center">
                        TaskNest helps you organize your tasks, set priorities,
                        and stay productive.
                    </h2>

                    <div className="flex items-center justify-center gap-5 text-center w-full">
                        <CTAButton href="/login" className="flex-1">
                            Login
                        </CTAButton>
                        <CTAButton href="/signup" className="flex-1">
                            Signup
                        </CTAButton>
                    </div>
                </div>

                <div className="bg-black/40 inset-0 absolute rounded-2xl"></div>
            </div>
        </main>
    );
};

export default Home;
