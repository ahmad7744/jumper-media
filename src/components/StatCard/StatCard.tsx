import React from 'react'

interface OpenCardProps {
    totalPhones: string;
    percentageChange: string;
    activePhones: number | string;
    offlinePhones: string;
}

const StatCard: React.FC<OpenCardProps> = ({ totalPhones, percentageChange, activePhones, offlinePhones }) => {
    return (
        <div className="items-center w-full  Inter bg-zinc-900 border border-[#FFFFFF0F] rounded-[8px] Inter p-6">
            <div className='flex items-center  flex-wrap justify-between'>
                <div className='flex flex-col gap-5'>
                    <p className='text-zinc-200 text-xs font-medium'>TOTAL PHONES</p>
                    <p className='text-zinc-200 text-[32px] font-semibold'>{totalPhones} <span className='text-xs text-zinc-400 font-normal'>+{percentageChange}% from last month</span></p>

                </div>
                <div className='flex flex-col gap-5'>
                    <p className='text-zinc-200 text-xs font-medium'>ACTIVE PHONES</p>
                    <p className='text-zinc-200 text-[32px] font-semibold'>{activePhones} <span className='text-xs text-zinc-400 font-normal'>+{percentageChange}% from last month</span></p>

                </div>
                <div className='flex flex-col gap-5'>
                    <p className='text-zinc-200 text-xs font-medium'>OFFLINE PHONES</p>
                    <p className='text-zinc-200 text-[32px] font-semibold'>{offlinePhones} <span className='text-xs text-zinc-400 font-normal'>+{percentageChange}% from last month</span></p>

                </div>
            </div>
        </div>
    )
}

export default StatCard;