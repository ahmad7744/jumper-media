import React from "react";

interface RadioOption {
  id: string;
  label: string;
  value: string;
}

interface CustomRadioButtonProps<T extends string> {
  options: RadioOption[];
  selectedValue: T;
  onChange: (value: T) => void;
}

const CustomRadioButton = <T extends string>({
  options,
  selectedValue,
  onChange,
}: CustomRadioButtonProps<T>) => {
  return (
    <div>
      {options.map((option) => (
        <div
          key={option.id}
          className={`flex items-center space-x-2 p-2 rounded-md cursor-pointer transition-colors ${
            selectedValue === option.value
              ? "bg-neutral-800"
              : "bg-transparent hover:bg-neutral-800"
          }`}
          onClick={() => onChange(option.value as T)}
        >
          <div
            className={`relative w-[12px] h-[12px] rounded-full border ${
              selectedValue === option.value
                ? "border-neutral-50 opacity-100"
                : "border-gray-500 opacity-50"
            }`}
          >
            {selectedValue === option.value && (
              <div className="absolute top-[1px] left-[1px] w-[8px] h-[8px] rounded-full bg-neutral-50 border border-neutral-50"></div>
            )}
          </div>
          <label
            htmlFor={option.id}
            className="text-sm text-white cursor-pointer select-none"
          >
            {option.label}
          </label>
        </div>
      ))}
    </div>
  );
};

export default CustomRadioButton;