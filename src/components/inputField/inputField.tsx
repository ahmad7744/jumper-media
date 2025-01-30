import React from 'react';
import { SearchIcon } from 'lucide-react';
import { Input } from '../ui/input';

interface InputFieldProps {
    id: string;
    type?: string;
    placeholder?: string;
    icon?: boolean;
    size?: 'small' | 'large';
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputField: React.FC<InputFieldProps> = ({
    id,
    type = 'text',
    placeholder,
    icon = false,
    size = 'large',
    value,
    onChange
}) => {
    const sizeClasses = size === 'small' ? 'text-sm max-w-[260px]' : 'text-base w-full';

    return (
        <div className={`grid w-full items-center gap-1.5 ${sizeClasses}`}>
            <div className="relative">
                {icon && (
                    <div className="absolute left-2.5 top-2.5 h-4 w-4">
                        <SearchIcon className="h-4 w-4 text-zinc-300" />
                    </div>
                )}
                <Input
                    id={id}
                    type={type}
                    placeholder={placeholder}
                    value={value}
                    onChange={onChange}
                    className={`w-full placeholder:text-zinc-300 text-zinc-300 border border-zinc-800 bg-zinc-900 rounded-[8px] pl-8 `}
                />
                
            </div>
        </div>
    );
};

export default InputField;
