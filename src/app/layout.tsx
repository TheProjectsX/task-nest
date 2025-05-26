import type { Metadata } from "next";
import "./globals.css";
import AppWrapper from "@/components/AppWrapper";

export const metadata: Metadata = {
    title: "Task Nest",
    description:
        "Manage your tasks efficiently with project-wise grouping, filtering, and more.",
    keywords: [
        "task nest",
        "task manager",
        "projects",
        "todo",
        "react app",
        "task tracking",
    ],
    authors: [{ name: "TheProjectsX", url: "https://github.com/TheProjectsX" }],
    icons: {
        icon: "/logo.png",
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={``}>
                <AppWrapper>{children}</AppWrapper>
            </body>
        </html>
    );
}
