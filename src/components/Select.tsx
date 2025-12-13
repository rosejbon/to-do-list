import * as React from "react";
import * as Select from "@radix-ui/react-select";
import { Check, ChevronDown, ChevronUp } from "lucide-react";

export type RadixSelectOption = {
    label: string;
    value: string;
};

export interface RadixSelectProps {
    options: Array<RadixSelectOption>;
    value?: string;
    defaultValue?: string;
    placeholder?: string;
    onValueChange?: (value: string) => void;
    disabled?: boolean;
}

export const RadixSelect: React.FC<RadixSelectProps> = ({
    options,
    value,
    defaultValue,
    placeholder = "Select an option",
    onValueChange,
    disabled = false,
}) => {
    return (
        <Select.Root
            value={value}
            defaultValue={defaultValue}
            onValueChange={onValueChange}
            disabled={disabled}
        >
            <Select.Trigger
                className="
                    inline-flex h-10 w-full items-center justify-between rounded-md
                    border border-gray-300 bg-white px-3 py-2 text-sm
                    text-gray-900 shadow-sm outline-none
                    focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20
                    disabled:cursor-not-allowed disabled:bg-gray-100 disabled:text-gray-400
                "
                aria-label="Select"
            >
                <Select.Value placeholder={placeholder} />
                <Select.Icon className="ml-2 text-gray-500">
                    <ChevronDown className="h-4 w-4" />
                </Select.Icon>
            </Select.Trigger>

            <Select.Portal>
                <Select.Content
                    className="
                        z-50 overflow-hidden rounded-md border border-gray-200
                        bg-white shadow-lg
                    "
                    position="popper"
                    sideOffset={4}
                >
                    <Select.ScrollUpButton className="flex items-center justify-center py-1 text-gray-500">
                        <ChevronUp className="h-4 w-4" />
                    </Select.ScrollUpButton>

                    <Select.Viewport className="p-1">
                        {options.map((option) => (
                            <Select.Item
                                key={option.value}
                                value={option.value}
                                className="
                                    relative flex cursor-pointer select-none items-center
                                    rounded-sm px-8 py-2 text-sm text-gray-900
                                    outline-none
                                    focus:bg-blue-50 focus:text-blue-700
                                    data-disabled:pointer-events-none data-disabled:opacity-50
                                "
                            >
                                <Select.ItemText>{option.label}</Select.ItemText>
                                <Select.ItemIndicator className="absolute left-2 inline-flex items-center">
                                    <Check className="h-4 w-4 text-blue-600" />
                                </Select.ItemIndicator>
                            </Select.Item>
                        ))}
                    </Select.Viewport>

                    <Select.ScrollDownButton className="flex items-center justify-center py-1 text-gray-500">
                        <ChevronDown className="h-4 w-4" />
                    </Select.ScrollDownButton>
                </Select.Content>
            </Select.Portal>
        </Select.Root>
    );
};

export default RadixSelect;
