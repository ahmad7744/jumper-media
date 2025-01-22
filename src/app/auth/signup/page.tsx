"use client"
import Header from '@/components/header/header'
import TextInput from '@/components/textInput/TextInput'
import { Button } from '@/components/ui/button'
import { Checkbox } from "@/components/ui/checkbox"
import { Icon } from 'lucide-react'
import Image from 'next/image'
import React, { useState } from 'react'
import Assets from '../../../../public/assets/assets'
import { useRouter } from 'next/navigation'


const Page: React.FC = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [telegram, setTelegram] = useState('')

    const router = useRouter();
    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value);
    };
    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    };

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
    };
    const handleTelegramChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTelegram(e.target.value);
    };
    return (
        <div className='flex items-center justify-between mx-auto w-full max-w-[1440px] p-4 '>
            <div className='justify-center w-[50%]  mx-auto items-center'>
                <Header
                    heading='Welcome Back!'
                    subheading='Enter your username and password to continue.'
                />
                <div className='w-[424px] justify-center mx-auto mt-3'>
                    <TextInput
                        label="Name"
                        type="text"
                        placeholder="Enter your email"
                        value={name}
                        onChange={handleNameChange}
                    />
                    <TextInput
                        label="Email"
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={handleEmailChange}
                    />
                    <TextInput
                        label="Telegram"
                        type="text"
                        placeholder="Enter your email"
                        value={telegram}
                        onChange={handleTelegramChange}
                    />

                    <TextInput
                        label="Password"
                        type="password"
                        placeholder="Enter your password"
                        value={password}
                        onChange={handlePasswordChange}
                        isPasswordField={true}
                    />

                </div>
                <div className='flex  justify-between mx-auto w-[424px]'>
                    <div className="flex items-start space-x-2">
                        <Checkbox className='border border-zinc-500' id="Remember" />
                        <label
                            htmlFor="Remember"
                            className="text-xs  text-zinc-500 Inter  font-normal peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                            I consent to receive informational emails from Jumper Media, with the option to withdraw my consent at any time in the future.
                        </label>
                    </div>

                </div>
                <div className='w-[424px] flex flex-col gap-5 justify-center mx-auto mt-5'>
                    <Button onClick={() => router.push('/dashboard')} variant={'secondary'} className='bg-blue-700 w-[424px] py-6 hover:bg-zinc-400 hover:text-zinc-900 text-zinc-200 Inter' >
                        Create Account
                    </Button>
                    <p className='text-zinc-500 Inter font-normal text-center'>Or</p>

                    <Button variant={'outline'} className='bg-zinc-900 w-[424px] py-6 border border-zinc-800 hover:bg-zinc-200 hover:text-zinc-900 text-zinc-200 Inter' >
                        <div
                            dangerouslySetInnerHTML={{ __html: Assets.Google }}
                        />   Sign up with Google
                    </Button>
                </div>
                <div onClick={() => router.push('/auth/login')}>
                    <p className='text-center text-zinc-400 text-sm Inter mt-8'>Already have account?<span className='text-zinc-200 text-sm Inter font-medium cursor-pointer'> Sign In</span></p>
                </div>



            </div>

            <div>
                <img src="https://tuk-cdn.s3.amazonaws.com/can-uploader/LoginImage.png"

                    alt='Login'
                />
            </div>
        </div>
    )
}

export default Page;
