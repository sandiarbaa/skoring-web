"use client";

import React, { useState } from "react";
import ProtectedRoute from "../login/protectedRoute/ProtectedRoute";
import api from "../login/api";
import DropDownRegister from "./DropDownRegister";
import Button from "@/app/components/Elements/Button";
import ModalAuth from "../login/modalAuth/ModalAuth";
import Image from "next/image";

type ModalRegisterProp = {
  close: () => void;
};

const ModalRegister = ({ close }: ModalRegisterProp) => {
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [role, setRole] = useState<string>("user");
  const [msg, setMsg] = useState<string>("");
  const [status, setStatus] = useState<"success" | "error">("error");

  const handleCloseModal = () => {
    setIsModalVisible(false); // Fungsi untuk menutup modal
  };

  const Auth = async (e: any) => {
    const accessToken = localStorage.getItem("accessToken");

    e.preventDefault();
    try {
      const response = await api.post(
        "/users",
        {
          username: username,
          email: email,
          password: password,
          role: role,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      console.log(response);
      setMsg(response.data.message);
      setIsModalVisible(true);
      setStatus("success");
    } catch (error: any) {
      setMsg(error.response.data.message);
      setIsModalVisible(true);
      setStatus("error");
    }
  };

  return (
    <div>
      <ProtectedRoute>
        <div
          onClick={close}
          className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50"
        >
          <div onClick={(e) => e.stopPropagation()}>
            <ModalAuth
              msg={msg}
              status={status}
              isVisible={isModalVisible}
              onClose={handleCloseModal}
            />
          </div>
          <div
            className="relative w-full max-w-xs md:max-w-md bg-white shadow px-7 py-6 z-20 border-2 rounded-md"
            onClick={(e) => e.stopPropagation()}
          >
            <button onClick={close} className="absolute top-2 right-2">
              <Image
                src="/assets/login/close.png"
                alt="none"
                className="pl-3"
                width={45}
                height={45}
              />
            </button>
            <div className="text-center text-[24px] md:text-[30px] font-semibold text-ijoToska my-5">
              Register
            </div>
            <form onSubmit={Auth}>
              {/* Username */}
              <div className="flex flex-col mb-3">
                <input
                  type="text"
                  placeholder="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="px-4 py-2 rounded-md border-2 focus:border-ijoToska focus:outline-none placeholder:text-tulisan"
                />
              </div>
              {/* Email */}
              <div className="flex flex-col mb-3">
                <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="px-4 py-2 rounded-md border-2 focus:border-ijoToska focus:outline-none placeholder:text-tulisan"
                />
              </div>

              {/* Password */}
              <div className="flex flex-col mb-2">
                <input
                  type="password"
                  placeholder="Password"
                  className="px-4 py-2 rounded-md border-2 focus:border-ijoToska focus:outline-none placeholder:text-tulisan"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <DropDownRegister setRole={setRole} />
              <div className="pt-4">
                <Button classStyle="w-full bg-ijoToska text-white font-medium py-2 rounded-md mb-2 active:bg-[#E5E5E5] active:text-[#A3A3A3]">
                  Register
                </Button>
              </div>
            </form>
          </div>
        </div>
      </ProtectedRoute>
    </div>
  );
};

export default ModalRegister;
