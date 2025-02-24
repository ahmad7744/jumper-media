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
    title?: string;
    backgroundColor?: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputField: React.FC<InputFieldProps> = ({
    id,
    type = 'text',
    placeholder,
    icon = false,
    size = 'large',
    value,
    title,
    backgroundColor = 'light',
    onChange
}) => {
    const sizeClasses = size === 'small' ? 'text-sm max-w-[260px]' : 'text-base w-full ';

    return (
        <div className={`grid w-full items-center gap-2.5 Inter ${sizeClasses}`}>
             {title && <p className='text-zinc-200 text-sm font-normal'>{title}</p>}
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
                    className={`w-full placeholder:text-zinc-300 text-zinc-300 border border-zinc-800  rounded-[8px] ${backgroundColor === 'light' ? 'bg-zinc-800' : 'bg-zinc-800'} ${size === 'small' ? 'pl-8 bg-zinc-800' : 'pl-4  '} `}
                />

            </div>
        </div>
    );
};

export default InputField;
