import React, { useState } from "react";

interface DropdownProps {
    children: React.ReactElement<any, any>;
    content: React.ReactNode;
}

const Dropdown = ({ children, content }: DropdownProps) => {
    const [opened, setOpened] = useState<boolean>(false);

    const Trigger = React.cloneElement(children, {
        onClick: () => setOpened((prev) => !prev),
    });

    return (
        <div className="relative w-fit h-fit">
            {Trigger}

            <div
                className={`z-10 absolute mt-1 right-0 ${
                    opened ? "" : "hidden"
                }`}
            >
                {content}
            </div>
        </div>
    );
};

export default Dropdown;
