"use client";

import { useEffect, useState, useCallback } from "react";
import { Modal } from "@/components/custom/modal";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { InputOTPGroup, InputOTP, InputOTPSlot } from "@/components/ui/input-otp";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
} from "@/components/ui/form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import toast from "react-hot-toast";

interface VerifyModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: {
    phone: string;
  }
}

export default function VerifyModal({
  isOpen,
  onClose,
  data,
}: VerifyModalProps) {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const formSchema = z.object({
    otp: z.string().min(6, { message: "رمز التحقق مطلوب" }),
  });

  type FormValues = z.infer<typeof formSchema>;
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      otp: "",
    },
  });

  const obfuscatePhoneNumber = (phoneNumber: string) => {
    if (!phoneNumber) return "";
    const firstVisible = 4;
    const lastVisible = 2;

    const first = phoneNumber.slice(0, firstVisible);
    const last = phoneNumber.slice(-lastVisible);
    const middle = phoneNumber.slice(firstVisible, -lastVisible).replace(/\d/g, "*");

    return first + middle + last;
  };

  const onSubmit = useCallback(() => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      toast.success("تم التحقق بنجاح");
      onClose();
      window.location.reload();
    }, 3000);
  }, [onClose]);

  const otpValue = form.watch("otp");

  useEffect(() => {
    if (otpValue.length === 6) {
      onSubmit();
    }
  }, [otpValue, onSubmit]);

  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-[520px] relative mt-10 mx-auto flex flex-col items-center justify-center"

      >
        <div className="w-full h-full p-8">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <Image src="/assets/images/sm-logo.svg" alt="logo" width={40} height={40} className="mx-auto absolute top-0 left-0 right-0" />
          </motion.div>
          <motion.main
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="mt-10 space-y-3"
          >

            <h1 className="text-2xl font-semibold text-center">رمز التحقق</h1>
            <p className="text-base text-muted-foreground text-center" dir="rtl">
              أرسلنا رمز التحقق إلى <span dir="ltr">{obfuscatePhoneNumber(data.phone)}</span></p>
            <Form {...form}>
              <motion.form
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.5 }}
                className="mt-8 space-y-10"
                onSubmit={form.handleSubmit(onSubmit)}
              >
                <FormField
                  control={form.control}
                  name="otp"
                  render={({ field }) => (
                    <FormItem className="flex flex-row gap-2 items-start space-x-3 space-y-0" >
                      <FormControl>
                        <div dir="ltr" className="mx-auto w-full">
                          <InputOTP
                            maxLength={6}
                            {...field}
                            className="w-full justify-between"
                          >
                            <InputOTPGroup className="w-full gap-2">
                              <InputOTPSlot
                                index={0}
                                className="flex-1 border"
                              />
                              <InputOTPSlot
                                index={1}
                                className="flex-1 border"
                              />
                              <InputOTPSlot
                                index={2}
                                className="flex-1 border"
                              />
                              <InputOTPSlot
                                index={3}
                                className="flex-1 border"
                              />
                              <InputOTPSlot
                                index={4}
                                className="flex-1 border"
                              />
                              <InputOTPSlot
                                index={5}
                                className="flex-1 border"
                              />
                            </InputOTPGroup>
                          </InputOTP>
                        </div>
                      </FormControl>

                    </FormItem>
                  )}
                />
                {form.formState.errors.otp && (
                  <p className="text-red-500 text-sm mt-1 text-start" dir="rtl">
                    {form.formState.errors.otp.message}
                  </p>
                )}

                <Button type="submit" size={"lg"} disabled={isLoading} loading={isLoading} className="w-full">
                  {isLoading ? "جاري التحقق..." : "التحقق"}
                </Button>

              </motion.form>
            </Form>
          </motion.main>
        </div>
      </motion.div>

    </Modal>
  );
}