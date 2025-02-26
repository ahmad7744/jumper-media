import React from 'react'

interface OpenCardProps {
    totalPhones: string;
    percentageChange: string;
    activePhones: number | string;
    offlinePhones: string;
}

const StatCard: React.FC<OpenCardProps> = ({ totalPhones, percentageChange, activePhones, offlinePhones }) => {
    return (
        <div className="items-center w-full  gap-8 Inter bg-zinc-900 border border-[#FFFFFF0F] rounded-lg Inter p-6 xl:p-8">
            <div className='flex items-center  flex-wrap justify-between gap-4'>
                <div className='flex flex-col gap-5 xl:border-r-[1px] border-[#FFFFFF0F] flex-1 min-w-60 max-w-80 2xl:max-w-[500px]'>
                    <p className='text-zinc-200 text-sm xl:text-lg font-medium xl:font-bold'>TOTAL PHONES</p>
                    <p className='text-zinc-200 text-xl lg:text-3xl xl:text-4xl font-semibold'>{totalPhones} <span className='text-xs xl:text-sm text-zinc-400 font-normal'>+{percentageChange}% from last month</span></p>

                </div>
                <div className='flex flex-col gap-5  xl:border-r-[1px] border-[#FFFFFF0F]  flex-1 min-w-60 max-w-80 2xl:max-w-[500px]'>
                    <p className='text-zinc-200 text-sm xl:text-lg font-medium xl:font-bold'>ACTIVE PHONES</p>
                    <p className='text-zinc-200 text-xl lg:text-3xl xl:text-4xl font-semibold'>{activePhones} <span className='text-xs xl:text-sm text-zinc-400 font-normal'>+{percentageChange}% from last month</span></p>

                </div>
                <div className='flex flex-col gap-5 min-w-60  max-w-80 2xl:max-w-[500px] flex-1'>
                    <p className='text-zinc-200 text-sm xl:text-lg font-medium xl:font-bold'>OFFLINE PHONES</p>
                    <p className='text-zinc-200 text-xl lg:text-3xl xl:text-4xl font-semibold'>{offlinePhones} <span className='text-xs xl:text-sm text-zinc-400 font-normal'>+{percentageChange}% from last month</span></p>

                </div>
            </div>
        </div>
    )
}

export default StatCard;