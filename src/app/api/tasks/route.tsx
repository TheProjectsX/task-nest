import { NextResponse } from "next/server";
import Tasks from "../data/tasks.json";

export const GET = () => {
    return NextResponse.json(Tasks);
};
