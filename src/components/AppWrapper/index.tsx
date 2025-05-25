"use client";

import UserContextWrapper from "@/context";
import React from "react";
import Navbar from "../Navbar";

const AppWrapper = ({ children }: { children: React.ReactNode }) => {
    return (
        <UserContextWrapper>
            <Navbar />
            {children}
        </UserContextWrapper>
    );
};

export default AppWrapper;
