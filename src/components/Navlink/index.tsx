"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

interface NavLinkProps {
    href: string;
    children: React.ReactNode;
}

const NavLink = ({
    href,
    children,
    className,
    ...options
}: NavLinkProps & React.AnchorHTMLAttributes<HTMLAnchorElement>) => {
    const pathname = usePathname();

    return (
        <Link
            href={href}
            className={`${className ?? ""} ${
                pathname === href ? "active" : ""
            }`}
            {...options}
        >
            {children}
        </Link>
    );
};

export default NavLink;
