"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

type Option = {
  value: string;
  label: string;
};

type SelectProps = {
  options: Option[];
  value: string;
  onChange: (value: string) => void;
  className?: string;
};

const Select: React.FC<SelectProps> = ({
  options,
  value,
  onChange,
  className = "",
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (selectedValue: string) => {
    onChange(selectedValue);
    setIsOpen(false);
  };

  return (
    <div className={` w-full ${className}`}>
      <button
        type="button"
        className="w-full flex justify-between items-center px-4 py-2 bg-zinc-800 text-zinc-400 rounded-md border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        onClick={() => setIsOpen(!isOpen)}
      >
        {options.find((option) => option.value === value)?.label ||
          "Select an option"}
        <ChevronDown className="w-4 h-4 text-zinc-400" />
      </button>

      {isOpen && (
        <div className="absolute mt-1 w-56 md:w-80 bg-zinc-800 border border-zinc-700 rounded-md shadow-lg z-10">
          {options.map((option) => (
            <button
              key={option.value}
              className={`w-full text-left px-4 py-2 text-zinc-300 hover:bg-zinc-700 ${
                option.value === value ? "bg-zinc-700" : ""
              }`}
              onClick={() => handleSelect(option.value)}
            >
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default Select;
