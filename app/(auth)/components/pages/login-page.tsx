"use client"
import Icon from "@/components/custom/icon";
import { Button } from "@/components/ui/button";
import { inputStyles } from "@/components/ui/input";
import { Check } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import {
    PhoneInput,
} from "react-international-phone";
import { PhoneNumberUtil } from 'google-libphonenumber';
import { useForm } from "react-hook-form";
import { useState } from "react";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
} from "@/components/ui/form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import VerifyModal from "@/components/modal/verify-modal";
const phoneUtil = PhoneNumberUtil.getInstance();

const isPhoneValid = (phone: string) => {
    if (!phone) return false;
    try {
        const parsed = phoneUtil.parseAndKeepRawInput(phone, 'SA');
        return phoneUtil.isValidNumber(parsed);
    } catch (error: unknown) {
        console.log("phone error:", error);
        return false;
    }
};

export function LoginForm() {
    const formSchema = z.object({
        phone: z.string({ required_error: "الجوال مطلوب" }),
    });

    type FormValues = z.infer<typeof formSchema>;
    const form = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            phone: "",
        },
    });

    const phone = form.watch("phone");
    const [isLoading, setisLoading] = useState<boolean>(false);
    const [isOpenVerify, setIsOpenVerify] = useState<boolean>(false);

    const onSubmit = () => {
        setisLoading(true);
        setTimeout(() => {
            setisLoading(false);
            setIsOpenVerify(true);
        }, 2000);
    };

    return (
        <>
            <VerifyModal isOpen={isOpenVerify} onClose={() => setIsOpenVerify(false)} data={form.getValues()} />
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="w-full max-w-sm"
            >
                <motion.h1
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                    className="text-3xl text-center font-bold"
                >
                    تسجيل الدخول
                </motion.h1>

                <Form {...form}>
                    <motion.form
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4, duration: 0.5 }}
                        className="mt-10"
                        onSubmit={form.handleSubmit(onSubmit)}
                    >
                        <FormField
                            control={form.control}
                            name="phone"
                            render={({ field }) => (
                                <FormItem className="flex flex-row gap-2 items-start space-x-3 space-y-0" >
                                    <FormControl>
                                        <div className="relative w-full">
                                            <PhoneInput
                                                defaultCountry="sa"
                                                className={`${inputStyles} w-full outline-none ring-none`}
                                                placeholder="الجوال"
                                                value={phone}
                                                onChange={(phone) => {
                                                    field.onChange(phone);
                                                }}
                                            />
                                            {isPhoneValid(phone) && (
                                                <motion.div
                                                    initial={{ opacity: 0, scale: 0 }}
                                                    animate={{ opacity: 1, scale: 1 }}
                                                    transition={{ duration: 0.3 }}
                                                    className="absolute right-4 top-1/2 -translate-y-1/2 "
                                                >
                                                    <Check className="w-4 h-4" color="#41CE8E" />
                                                </motion.div>
                                            )}

                                        </div>
                                    </FormControl>

                                </FormItem>
                            )}
                        />
                        <Button
                            disabled={!isPhoneValid(phone) || isLoading}
                            type="submit"
                            variant={"default"}
                            size={"lg"}
                            className="w-full my-9"
                            loading={isLoading}
                        >
                            تسجيل الدخول
                        </Button>
                    </motion.form>
                </Form>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6, duration: 0.5 }}
                    className="space-y-6"
                >
                    <p className="text-center text-base text-muted-foreground">أو الدخول باستخدام</p>
                    <div className="flex items-center justify-center gap-2 px-1" dir="ltr">
                        <motion.div
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.8, duration: 0.5 }}
                            className="w-full"
                        >
                            <Button variant={"outline"} type="button" size={"lg"} className="w-full flex items-center justify-center gap-3">
                                <Icon icon="google" />
                                Google
                            </Button>
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.8, duration: 0.5 }}
                            className="w-full"

                        >
                            <Button variant={"outline"} type="button" size={"lg"} className="w-full flex items-center justify-center gap-3">
                                <Icon icon="apple" />
                                Apple
                            </Button>
                        </motion.div>
                    </div>
                </motion.div>
            </motion.div>
        </>
    )
}

export default function LoginPage() {
    return (
        <div
            className="flex relative max-h-screen overflow-hidden"
        >
            {/* Left Side */}
            <div
                className="relative hidden bg-[#121C30] w-[45%] h-screen lg:block overflow-hidden"
            >
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="flex flex-col h-full p-6 sm:p-12 md:p-16 z-50 relative"
                >

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4, duration: 0.5 }}
                    >

                        <Link href="/"><Image src="/assets/images/logo.svg" className="cursor-pointer mx-auto" alt="Ousol" width={320} height={110} priority /></Link>
                    </motion.div>
                    <div className="flex flex-1 items-center mx-auto justify-center ">
                        <motion.h1
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.2, duration: 0.25 }}
                            className="text-white xl:text-5xl lg:text-3xl  lg:leading-normal leading-16 font-bold text-center"
                        >
                            الطريقة الأحدث لأي شخص
                            للعمل في العقارات

                        </motion.h1>
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, borderBottomWidth: "1vh", size: 0.5 }}
                    animate={{ opacity: 1, borderBottomWidth: "100vh", size: 1 }}
                    transition={{ duration: 0.45 }}
                    className="absolute bottom-0 right-0 w-0 h-0 
          border-l-transparent border-l-[45vw]
          border-b-[#4C4DDC]
        "
                />
                <div >
                </div>
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                >

                    <Image src="/assets/images/AlFaisaliyahTower.svg" className="absolute bottom-0 left-0 right-0 mx-auto z-10" alt="Ousol" width={720} height={720} priority />
                </motion.div>
            </div>

            {/* Right Side */}
            <div className={`relative lg:w-[55%] w-full h-screen`}>
                <div className="flex items-center justify-center mx-auto h-full p-6 sm:p-12 md:p-16 z-50 relative">
                    <LoginForm />
                </div>
            </div>
        </div>
    );
}