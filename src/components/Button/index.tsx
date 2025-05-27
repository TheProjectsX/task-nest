import Link from "next/link";

interface CTAButtonProps {
    href: string;
    children: React.ReactNode;
    className?: string;
}

export const CTAButton = ({ href, children, className }: CTAButtonProps) => {
    return (
        <Link
            href={href}
            className={`relative z-30 inline-flex items-center justify-center w-auto px-8 py-3 overflow-hidden font-bold text-gray-500 transition-all duration-500 border border-gray-200 rounded-md cursor-pointer group ease bg-gradient-to-b from-white to-gray-50 hover:from-gray-50 hover:to-white active:to-white whitespace-nowrap ${
                className ?? ""
            }`}
        >
            <span className="w-full h-0.5 absolute bottom-0 group-active:bg-transparent left-0 bg-gray-100"></span>
            <span className="h-full w-0.5 absolute bottom-0 group-active:bg-transparent right-0 bg-gray-100"></span>
            {children}
        </Link>
    );
};
