"use client";

import { UserContext, UserContextProps } from "@/context";
import React, { useContext } from "react";

interface DrawerProps {
    children: React.ReactNode;
    drawerContent: React.ReactNode;
}

const Drawer = ({ children, drawerContent }: DrawerProps) => {
    const { drawerOpened, setDrawerOpened }: UserContextProps =
        useContext(UserContext)!;

    console.log(drawerOpened);

    return (
        <div
            className={`relative h-full grid transition-[grid-template-columns] ease-in-out duration-300 delay-100 grid-cols-[0px_1fr] ${
                drawerOpened
                    ? "lg:grid-cols-[280px_1fr]"
                    : "lg:grid-cols-[0px_1fr]"
            }`}
        >
            {/* Drawer Content */}
            <div className="h-screen">
                <div
                    className={`h-full bg-gray-700 z-20 fixed transition-[translate] ease-in-out duration-300 delay-100 border-r border-neutral-300 w-[280px] ${
                        drawerOpened ? "" : "-translate-x-[280px]"
                    }`}
                >
                    {drawerContent}
                </div>
            </div>

            {/* Content */}
            <div className="relative">
                {children}

                {/* Black Cover */}
                {drawerOpened && (
                    <div
                        className="absolute inset-0 bg-white/20 z-10 overscroll-none touch-none lg:hidden"
                        onClick={() => setDrawerOpened(false)}
                    />
                )}
            </div>
        </div>
    );
};

export default Drawer;
