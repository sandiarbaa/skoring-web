"use client";
import Button from "@/app/components/Elements/Button";
import InputForm from "@/app/components/Elements/InputForm";
import FormShell from "@/app/components/Fragments/FormShell";
import LoginLayout from "@/app/components/Layouts/LoginLayout";
import { useRouter } from "next/navigation";
import React, { FormEvent } from "react";

const Forgot = () => {
  const router = useRouter();
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    router.push("/login/authentication");
  };
  return (
    <LoginLayout title="LUPA KATA SANDI">
      <FormShell onSubmit={handleSubmit}>
        <InputForm
          type="email"
          textLabel="Email"
          htmlForId="email"
          placeholder="Masukan Email"
          classStyleLabel="font-semibold mb-2 text-[16px]"
          classStyleInput="px-4 py-2 rounded-md border-2 focus:border-ijoToska focus:outline-none placeholder:text-tulisan"
        />
        <Button classStyle="w-full bg-ijoToska text-white font-medium py-2 rounded-md mb-2 active:bg-[#E5E5E5] active:text-[#A3A3A3]">
          Kirim
        </Button>
      </FormShell>
    </LoginLayout>
  );
};

export default Forgot;
