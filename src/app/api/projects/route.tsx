import { NextResponse } from "next/server";
import Projects from "../data/projects.json";

export const GET = () => {
    return NextResponse.json(Projects);
};
