import React from 'react';

interface StatusBadgeProps {
    status: 'Excellent' | 'Need Attention' | 'Fair' | 'Good' | string;
}

const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
    const statusColors: { [key: string]: string } = {
        Excellent: 'bg-[#54FFF5]',
        'Need Attention': 'bg-[#FF6F6F]',
        Fair: 'bg-[#FACC15]',
        Good: 'bg-[#4ADE80]'
    };

    return (
        <div className={`${statusColors[status]} py-[2px] px-[10px] rounded-full items-center justify-center`}>
            <p className='text-center text-zinc-950 font-medium text-xs'>{status}</p>
        </div>
    );
};

export default StatusBadge;
