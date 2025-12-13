import * as React from "react";
import * as Checkbox from "@radix-ui/react-checkbox";
import { Check } from "lucide-react";

export interface RadixCheckboxProps {
    checked?: boolean;
    defaultChecked?: boolean;
    onCheckedChange?: (checked: boolean) => void;
    label?: string;
    disabled?: boolean;
}

export const RadixCheckbox: React.FC<RadixCheckboxProps> = ({
    checked,
    defaultChecked,
    onCheckedChange,
    label,
    disabled = false,
}) => {
    return (
        <label
            className={`
                flex items-center gap-2 text-sm text-gray-900
                ${disabled ? "cursor-not-allowed text-gray-400" : "cursor-pointer"}
            `}
        >
            <Checkbox.Root
                checked={checked}
                defaultChecked={defaultChecked}
                onCheckedChange={(value) => onCheckedChange?.(value === true)}
                disabled={disabled}
                className="
                    flex h-4 w-4 items-center justify-center rounded
                    border border-gray-300 bg-white shadow-sm
                    outline-none
                    focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500
                    data-[state=checked]:border-blue-600 data-[state=checked]:bg-blue-600
                    disabled:bg-gray-100 disabled:border-gray-200
                "
            >
                <Checkbox.Indicator className="text-white">
                    <Check className="h-3 w-3" />
                </Checkbox.Indicator>
            </Checkbox.Root>

            {label && <span>{label}</span>}
        </label>
    );
};

export default RadixCheckbox;
