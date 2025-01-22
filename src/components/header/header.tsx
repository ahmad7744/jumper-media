import Image from 'next/image';
import Assets from '../../../public/assets/assets';

interface HeaderProps {
    heading: string; // Required heading text
    subheading?: string; // Optional subheading text

}

const Header: React.FC<HeaderProps> = ({ heading, subheading }) => {
    return (
        <header className='items-center flex flex-col gap-8'>
            <div>
                <div
                    dangerouslySetInnerHTML={{ __html: Assets.Logo }}
                />
            </div>

            <div>
                <h1 className="text-[32px] Inter font-semibold text-zinc-200 text-center ">{heading}</h1>
                {subheading && <p className="text-sm text-zinc-400 Inter font-normal text-center mt-2">{subheading}</p>}
            </div>
        </header>
    );
};

export default Header;
