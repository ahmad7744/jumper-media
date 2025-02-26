import React from "react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { ChevronDown, Check } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import CustomRadioButton from "../mainTable/cutomRadioButton";
import { CheckboxIndicator } from "@radix-ui/react-checkbox";

interface DropdownFilterProps {
    title: string;
    options: { id: string; label: string; value: string }[];
    selectedValue: string | string[];
    onChange: (value: string | string[]) => void;
    isMultiSelect?: boolean;
    align?: 'start' | 'center' | 'end',
}

const DropdownFilter: React.FC<DropdownFilterProps> = ({
    title,
    options,
    selectedValue,
    onChange,
    isMultiSelect = false,
    align = "start",
}) => {
    const handleSelect = (value: string) => {
        console.log("Selected Value:", value);
        if (isMultiSelect) {
            const newValue = Array.isArray(selectedValue)
                ? selectedValue.includes(value)
                    ? selectedValue.filter((item) => item !== value)
                    : [...selectedValue, value]
                : [value];

            console.log("New Value:", newValue);
            onChange(newValue);
        } else {
            console.log("Single Select Value:", value);
            onChange(value);
        }
    };

    const displayText =
        Array.isArray(selectedValue) && selectedValue.length > 2
            ? `${selectedValue.slice(0, 2).join(", ")}...`
            : Array.isArray(selectedValue)
                ? selectedValue.join(", ")
                : selectedValue;

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button
                    variant="outline"
                    className=" bg-transparent border Inter font-medium border-neutral-800 text-neutral-50"
                    size="sm"
                >
                    {title}: {displayText || "Name"} <ChevronDown />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
                className="bg-[#0A0A0A] border border-neutral-800 mt-3 rounded-md shadow-lg w-[198px] p-1"
                align={align}
            >
                {isMultiSelect ? (
                    options.map((option) => {
                        const isSelected = Array.isArray(selectedValue) && selectedValue.includes(option.value);
                        return (
                            <div
                                key={option.id}
                                className={`flex items-center space-x-2 p-2  hover:bg-zinc-800 ${isSelected ? "bg-zinc-800 rounded-[2px]" : ""}`}
                            >
                                <div className="flex items-center w-full space-x-2">
                                    <Checkbox
                                        checked={isSelected}
                                        id={option.id}
                                        onCheckedChange={() => handleSelect(option.value)} 
                                        className="border border-zinc-500 w-4 h-4 rounded-sm"
                                    >
                                        <CheckboxIndicator className="text-zinc-950">
                                            <Check className="w-4 h-4" />
                                        </CheckboxIndicator>
                                    </Checkbox>
                                    <label
                                        htmlFor={option.id} 
                                        className="text-sm text-zinc-200 cursor-pointer Inter font-normal leading-none"
                                    >
                                        {option.label}
                                    </label>
                                </div>
                            </div>
                        );
                    })
                ) : (
                    <CustomRadioButton
                        options={options}
                        selectedValue={selectedValue as string}
                        onChange={(value) => onChange(value)}
                    />
                )}
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

export default DropdownFilter;
