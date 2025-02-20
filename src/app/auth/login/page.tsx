"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Header from "@/components/header/header";
import TextInput from "@/components/textInput/TextInput";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import Assets from "../../../../public/assets/assets";
import { loginUser } from "@/api/userServices";
import { LoginPayload } from "@/api/types";
import { Loader2 } from "lucide-react";

const Page: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [isRedirecting, setIsRedirecting] = useState(false);
    const router = useRouter();

    const handleLogin = async () => {
        setError('');
        setEmailError('');
        setPasswordError('');

        let hasError = false;

        if (!email.trim()) {
            setEmailError("Please enter your email");
            hasError = true;
        }
        if (!password.trim()) {
            setPasswordError("Please enter your password");
            hasError = true;
        }

        if (hasError) return;

        setLoading(true);

        const payload: LoginPayload = { email, password };

        try {
            const response = await loginUser(payload);
            localStorage.setItem("authToken", response.token);
            setIsRedirecting(true);
            router.push("/dashboard");
        } catch (err: any) {
            setError(err.message || "Login failed. Please try again.");
        } finally {
            setLoading(false);
        }
    };


    return (
        <div className="flex items-center justify-between mx-auto w-full max-w-[1440px] p-4">
            <div className="justify-center w-[50%] mx-auto items-center">
                <Header heading="Welcome Back!" subheading="Enter your username and password to continue." />

                <div className="w-[424px] justify-center mx-auto mt-3">
                    {/* Email Input */}
                    <TextInput
                        label="Email"
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    {emailError && <p className="text-red-500 text-sm mt-1">{emailError}</p>}

                    {/* Password Input */}
                    <TextInput
                        label="Password"
                        type="password"
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        isPasswordField={true}
                    />
                    {passwordError && <p className="text-red-500 text-sm mt-1">{passwordError}</p>}
                    {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
                </div>

                <div className="flex items-center justify-between mx-auto w-[424px] mt-3">
                    <div className="flex items-center space-x-2">
                        <Checkbox className="border border-zinc-500" id="Remember" />
                        <label htmlFor="Remember" className="text-sm text-zinc-500 Inter font-normal leading-none">
                            Remember me
                        </label>
                    </div>
                    <p className="text-zinc-300 text-sm Inter font-medium cursor-pointer">Forgot Password?</p>
                </div>

                <div className="w-[424px] flex flex-col gap-5 justify-center mx-auto mt-5">
                    <Button
                        onClick={handleLogin}
                        variant={"secondary"}
                        className="bg-blue-700 w-[424px] py-6 hover:bg-zinc-400 hover:text-zinc-900 text-zinc-200 Inter"
                        disabled={loading}
                    >
                        {(loading || isRedirecting) ? <Loader2 className="animate-spin w-5 h-5" /> : "Login"}
                    </Button>

                    {/* <p className="text-zinc-500 Inter font-normal text-center">Or</p>

                    <Button
                        variant={"outline"}
                        className="bg-zinc-900 w-[424px] py-6 border border-zinc-800 hover:bg-zinc-200 hover:text-zinc-900 text-zinc-200 Inter"
                    >
                        <div dangerouslySetInnerHTML={{ __html: Assets.Google }} />
                        Sign up with Google
                    </Button> */}
                </div>

                {/* <div onClick={() => router.push("/auth/signup")}>
                    <p className="text-center text-zinc-400 text-sm Inter mt-8">
                        Don’t have an account? <span className="text-zinc-200 text-sm Inter font-medium cursor-pointer">Sign Up</span>
                    </p>
                </div> */}
            </div>

            <div>
                <img src="https://tuk-cdn.s3.amazonaws.com/can-uploader/LoginImage.png" alt="Login" />
            </div>
        </div>
    );
};

export default Page;
