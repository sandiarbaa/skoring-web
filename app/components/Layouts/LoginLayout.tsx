import Image from "next/image";
import React from "react";

interface Props {
  children: React.ReactNode;
  title: string;
}

const LoginLayout = ({ children, title }: Props) => {
  return (
    <div className="w-full bg-primary h-screen relative overflow-hidden">
      <div className="fixed top-0 left-0 m-5">
        <Image
          src="/assets/login/mknows_logo.png"
          alt="mknows-logo"
          width={100}
          height={100}
        />
      </div>
      <div className="container flex flex-col justify-center items-center h-full z-10">
        <div className="w-full max-w-xs md:max-w-md bg-white shadow px-7 py-6 z-20 border-2 rounded-md">
          <h1 className="text-center text-[24px] md:text-[30px] font-semibold text-ijoToska mb-10">
            {title}
          </h1>
          {children}
        </div>

        {/* Title */}
        <h1 className="text-ijoToska font-semibold absolute bottom-5">
          PT Menara Indonesia
        </h1>

        {/* Reactangle */}
        <div>
          <Image
            src="/assets/login/reactangle.png"
            alt="reactangle1"
            width={350}
            height={350}
            className="absolute bottom-0 left-52"
          />
          <Image
            src="/assets/login/reactangle.png"
            alt="reactangle2"
            width={200}
            height={200}
            className="absolute -top-28 right-0 rotate-180"
          />
          <Image
            src="/assets/login/reactangle.png"
            alt="reactangle3"
            width={200}
            height={200}
            className="absolute top-0 rotate-180 -right-24"
          />
        </div>
      </div>
    </div>
  );
};

export default LoginLayout;
