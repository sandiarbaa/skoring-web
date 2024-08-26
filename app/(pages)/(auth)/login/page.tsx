"use client";
import { useRouter } from "next/navigation";
import React, { useState, FormEvent } from "react";
import Link from "next/link";
import Button from "@/app/components/Elements/Button";
import LoginLayout from "@/app/components/Layouts/LoginLayout";
import axios from "axios";
import ModalAuth from "./modalAuth/ModalAuth";

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [msg, setMsg] = useState<string>("");
  const [status, setStatus] = useState<"success" | "error">("error");
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const router = useRouter();

  const handleCloseModal = () => {
    setIsModalVisible(false); // Fungsi untuk menutup modal
  };

  const auth = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://13.210.185.89/authentication", {
        email,
        password,
      });
      console.log(response);
      setStatus("success");
      if (response.status === 201) {
        const { accessToken, refreshToken } = response.data.data;

        localStorage.setItem("accessToken", accessToken);
        document.cookie = `refreshToken=${refreshToken}; path=/; secure; samesite=strict; max-age=${
          30 * 24 * 60 * 60
        }`;
        router.push("/dashboard");
      }
    } catch (error: any) {
      setMsg(error.response.data.message);
      setIsModalVisible(true);
      setStatus("error")
    }
  };

  return (
    <div>
      <LoginLayout title="MASUK">
        <ModalAuth isVisible={isModalVisible} msg={msg} status={status} onClose={handleCloseModal} />
        <form onSubmit={auth}>
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

          {/* Link Forgot Password */}
          <Link href="/login/forgot-password">
            <h1 className="text-ijoToska text-sm my-5">Lupa Kata Sandi?</h1>
          </Link>

          <div>
            <Button classStyle="w-full bg-ijoToska text-white font-medium py-2 rounded-md mb-2 active:bg-[#E5E5E5] active:text-[#A3A3A3]">
              Masuk
            </Button>
          </div>
        </form>
      </LoginLayout>
    </div>
  );
};

export default LoginPage;
