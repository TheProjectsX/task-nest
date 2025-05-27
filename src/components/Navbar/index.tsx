import { UserContext } from "@/context";
import React, { useContext } from "react";
import Dropdown from "../Dropdown";
import { usePathname } from "next/navigation";
import NavLink from "../Navlink";
import Link from "next/link";

const Navbar = () => {
    const { userInfo, isLoading, setUserInfo } = useContext(UserContext)!;
    const pathname = usePathname();

    return (
        <header className="flex items-center justify-between w-full py-2 max-width border-b border-gray-400">
            {/* Logo */}
            <div>
                <Link
                    href={!userInfo ? "/" : pathname}
                    className="text-xl font-medium hover:text-slate-600"
                >
                    {!userInfo && (
                        <span className="flex items-center gap-1.5">
                            <img
                                src="/logo.png"
                                alt="Task Nest Logo"
                                className="size-7"
                            />
                            <span>Task Nest</span>
                        </span>
                    )}
                    {userInfo &&
                        !["/", "/admin", "/login", "/signup"].includes(
                            pathname
                        ) &&
                        pathname
                            .replace("/", "")
                            .replace(/^./, (c) => c.toUpperCase())}
                    {userInfo &&
                        pathname === "/admin" &&
                        userInfo?.email ===
                            process.env.NEXT_PUBLIC_ADMIN_USER &&
                        "Admin"}
                </Link>
            </div>

            {/* Navigation */}
            <div>
                {userInfo && !isLoading && (
                    <ul className="font-medium flex p-0 border-gray-700 rounded-lg md:flex-row space-x-8 mt-0 border-0 [&_.active]:text-blue-500">
                        <li>
                            <NavLink
                                href="/tasks"
                                className="block py-2 px-3 hover:text-blue-500"
                            >
                                Tasks
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                href="/projects"
                                className="block py-2 px-3 hover:text-blue-500"
                            >
                                Projects
                            </NavLink>
                        </li>
                    </ul>
                )}
            </div>

            {/* User Info */}
            <div>
                {userInfo && (
                    <Dropdown
                        content={
                            <div className="divide-y divide-gray-300 rounded-lg shadow-sm w-44 overflow-hidden bg-white">
                                <div>
                                    <h3 className="block px-4 pt-2">
                                        {userInfo?.name}
                                    </h3>
                                    <p className="block px-4 pb-2 text-sm text-gray-500">
                                        {userInfo?.email}
                                    </p>
                                </div>
                                {userInfo?.email ===
                                    process.env.NEXT_PUBLIC_ADMIN_USER && (
                                    <Link
                                        href={"/admin"}
                                        className="block text-left w-full px-4 py-2 hover:bg-gray-100 cursor-pointer"
                                    >
                                        Dashboard
                                    </Link>
                                )}
                                <button
                                    className="block text-left w-full px-4 py-2 hover:bg-gray-100 cursor-pointer"
                                    onClick={() => {
                                        setUserInfo(null);
                                        localStorage.setItem(
                                            "loggedIn",
                                            "false"
                                        );
                                    }}
                                >
                                    Logout
                                </button>
                            </div>
                        }
                    >
                        <figure
                            title={userInfo?.name}
                            className="cursor-pointer"
                        >
                            <img
                                src={
                                    userInfo?.profile_picture ??
                                    "https://i.ibb.co/Dfp53bmp/user-avatar.png"
                                }
                                alt="User profile Picture"
                                className="size-10 rounded-full"
                            />
                        </figure>
                    </Dropdown>
                )}

                {!userInfo && !isLoading && (
                    <Link
                        href={"/login"}
                        className="block py-2 px-5 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100"
                    >
                        Login
                    </Link>
                )}
            </div>
        </header>
    );
};

export default Navbar;
