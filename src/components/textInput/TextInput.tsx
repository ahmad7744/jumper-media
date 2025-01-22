// components/TextInput.tsx
import React, { useState } from 'react';
import { Input } from '../ui/input';
import { Eye, EyeOff } from 'lucide-react';

interface TextInputProps {
    label: string;
    type: string;
    placeholder: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    value: string;
    isPasswordField?: boolean;
}

const TextInput: React.FC<TextInputProps> = ({
    label,
    type,
    placeholder,
    onChange,
    value,
    isPasswordField = false,
}) => {
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

    const togglePasswordVisibility = () => {
        setIsPasswordVisible(!isPasswordVisible);
    };

    return (
        <div className="relative my-5">
            <label className="block text-zinc-300 text-sm Inter font-normal">{label}</label>
            <Input
                type={isPasswordVisible && isPasswordField ? 'text' : type}
                placeholder={placeholder}
                onChange={onChange}
                value={value}
                className="mt-2 py-6 px-4 text-zinc-300 placeholder:text-zinc-600 Inter border border-zinc-800 bg-zinc-900 rounded-lg"
            />
            {isPasswordField && (
                <div
                    onClick={togglePasswordVisibility}
                    className="absolute right-4 top-10  cursor-pointer"
                >
                    {isPasswordVisible ? (
                        <Eye className=' text-zinc-300' />
                    ) : (
                        <EyeOff className=' text-zinc-300'  />
                    )}
                </div>
            )}
        </div>
    );
};

export default TextInput;
