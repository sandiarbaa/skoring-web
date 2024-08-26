import LoginLayout from "@/app/components/Layouts/LoginLayout";
import Link from "next/link";
import React, { Fragment } from "react";

const page = () => {
  return (
    <LoginLayout title="Google Authentication">
      <h1 className="text-ijoToska mb-10 text-center font-semibold text-xl lg:text-2xl -mt-5">
        Cek Email Anda
      </h1>

      {/* Inputan Digit */}
      <div className="flex justify-center space-x-1 my-3">
        <InputDigit inputan="input1" />
        <InputDigit inputan="input2" />
        <InputDigit inputan="input3" />
        <InputDigit inputan="input4" />
        <InputDigit inputan="input5" />
        <InputDigit inputan="input6" />
      </div>

      <p className="text-center text-[16px] lg:text-[18px] mt-5">
        Kami telah mengirimkan kode verifikasi ke Email Anda
      </p>
      <p className="text-center text-[12px] mt-8">
        Tidak menerima kode verifikasi? Coba dengan{" "}
        <Link
          href={"/login/forgot-password"}
          className="text-blue-500 hover:underline"
        >
          Email Lain
        </Link>
      </p>
    </LoginLayout>
  );
};

export default page;

const InputDigit: React.FC<{ inputan: string }> = ({ inputan }) => {
  return (
    <Fragment>
      <label htmlFor={`${inputan}`}></label>
      <input
        type="text"
        id={`${inputan}`}
        className="border border-ijoToska rounded-md w-8 h-8 lg:w-10 lg:h-10 text-center"
      />
    </Fragment>
  );
};
