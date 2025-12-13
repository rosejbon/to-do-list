import * as React from "react";
import * as LabelPrimitive from "@radix-ui/react-label";

interface TextFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label: string;
    id: string;
    error?: string;
}

const TextField: React.FC<TextFieldProps> = ({ label, id, error, ...props }) => {
    return (
        <div className="flex flex-col space-y-1 w-full">
            <LabelPrimitive.Root
                htmlFor={id}
                className="text-sm font-medium text-gray-700"
            >
                {label}
            </LabelPrimitive.Root>
            <input
                id={id}
                {...props}
                className={`
                    px-3 py-2 border rounded-md text-sm 
                    focus:outline-none focus:ring-2 focus:ring-blue-500 
                    ${error ? "border-red-500" : "border-gray-300"} 
                    ${props.className || ""}
                `}
            />
            {error && <span className="text-xs text-red-500">{error}</span>}
        </div>
    );
};

export default TextField;
