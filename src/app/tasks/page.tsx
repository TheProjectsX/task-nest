"use client";

import { UserContext } from "@/context";
import React, { useContext } from "react";

const Task = () => {
    const { drawerOpened, setDrawerOpened } = useContext(UserContext)!;

    return (
        <div>
            <button onClick={() => setDrawerOpened((prev) => !prev)}>
                Set
            </button>
        </div>
    );
};

export default Task;
