import React from 'react'
import Assets from '../../../public/assets/assets';
import StatusBadge from '../StatusBadge/StatusBadge';

interface LocationCardProps {
    city: string;
    lastActivity: string;
    status: string;
    devices: number;
    uniqueIps: number;
    overlappingIps: number;
    downloadSpeed: string;
    uploadSpeed: string;
}

const LocationCard: React.FC<LocationCardProps> = ({
    city,
    lastActivity,
    status,
    devices,
    uniqueIps,
    overlappingIps,
    downloadSpeed,
    uploadSpeed,
}) => {
    return (
        <div className='items-center w-full max-w-[356px] Inter  bg-zinc-900 border border-[#FFFFFF0F] rounded-[8px] '>
            <div className='p-6'>
                <div className='flex items-baseline justify-between'>
                    <div className='flex flex-col'>
                        <p className='text-zinc-200 font-semibold text-2xl'> {city.length > 10 ? `${city.slice(0, 10)}...` : city}</p>
                        <p className='text-zinc-400 text-xs font-normal'>Last Activity: {lastActivity}</p>
                    </div>

                    <StatusBadge status={status} />
                </div>
                <div className='flex flex-col items-center mt-6'>
                    <div dangerouslySetInnerHTML={{ __html: Assets.LocationOval }} />
                    <div className='mt-[-70px]'>
                        <p className='text-zinc-400 text-sm font-medium text-center'>Devices</p>
                        <p className='text-center text-zinc-200 text-3xl font-bold'>{devices}</p>
                    </div>
                </div>
                <div className='flex justify-between mt-8'>
                    <div>
                        <p className='text-zinc-400 text-xs font-normal'>Unique IPs</p>
                        <p className='text-zinc-200 text-[22px] font-bold'>{uniqueIps} <span className='text-xs font-normal'>({((uniqueIps / devices) * 100).toFixed(0)}%)</span></p>
                    </div>
                    <div>
                        <p className='text-zinc-400 text-xs font-normal'>Overlapping IPs</p>
                        <p className='text-zinc-200 text-[22px] font-bold'>{overlappingIps} <span className='text-xs font-normal'>({((overlappingIps / devices) * 100).toFixed(0)}%)</span></p>
                    </div>
                </div>
            </div>

            <div className='border-t px-6 w-full border-zinc-800'>
                <div className='flex items-center justify-between'>
                    <div className='flex items-center gap-3 '>
                        <div
                            dangerouslySetInnerHTML={{ __html: Assets.DownloadSpeed }}
                        />
                        <p className='text-purple-400 text-sm font-medium'>{downloadSpeed} Mbps </p>
                    </div>

                
                    <div className='h-14 border-r border-zinc-800'></div>

                    <div className='flex items-center gap-3'>
                        <div
                            dangerouslySetInnerHTML={{ __html: Assets.UploadSpeed }}
                        />
                        <p className='text-blue-400 text-sm font-medium'>{uploadSpeed} Mbps</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LocationCard;
