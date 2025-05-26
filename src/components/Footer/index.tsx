import React from "react";

const Footer = () => {
    return (
        <div className="py-4 border-t border-dashed border-gray-500 w-full max-width text-center text-sm text-gray-700">
            Made with ❤️ using Next JS + TypeScript. &copy;{" "}
            <a
                href="https://github.com/TheProjectsX"
                target="_blank"
                className="hover:underline underline-offset-4"
            >
                TheProjectsX
            </a>
        </div>
    );
};

export default Footer;
