import { UserContext } from "@/context";
import React, { useContext } from "react";
import Dropdown from "../Dropdown";
import { usePathname } from "next/navigation";
import NavLink from "../Navlink";

const Navbar = () => {
    const { userInfo, isLoading, setUserInfo } = useContext(UserContext)!;
    if (!userInfo && !isLoading) return;

    const pathname = usePathname();

    return (
        <header className="flex items-center justify-between w-full py-2 max-width border-b border-gray-400">
            {/* Logo */}
            <div>
                <h2 className="text-2xl font-medium">
                    {pathname
                        .replace("/", "")
                        .replace(/^./, (c) => c.toUpperCase())}
                </h2>
            </div>

            {/* Navigation */}
            <div>
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
            </div>

            {/* User Info */}
            <div>
                <Dropdown
                    content={
                        <div className="divide-y divide-gray-300 rounded-lg shadow-sm w-44 overflow-hidden bg-white">
                            <h3 className="block px-4 py-2">
                                {userInfo?.name}
                            </h3>
                            <button
                                className="block text-left w-full px-4 py-2 hover:bg-gray-100 cursor-pointer"
                                onClick={() => setUserInfo(null)}
                            >
                                Logout
                            </button>
                        </div>
                    }
                >
                    <figure title={userInfo?.name} className="cursor-pointer">
                        <img
                            src={
                                userInfo?.profile_picture ??
                                "https://i.ibb.co/Dfp53bmp/user-avatar.png"
                            }
                            alt="User profile Picture"
                            className="w-10 h-10 rounded-full"
                        />
                    </figure>
                </Dropdown>
            </div>
        </header>
    );
};

export default Navbar;
