"use client";
import DashboardLayout from "@/app/components/Layouts/DashboardLayout";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React, { useState } from "react";
import { BiChevronLeft, BiChevronRight } from "react-icons/bi";
import { XMarkIcon } from "@heroicons/react/24/solid";
import api from "@/app/(pages)/(auth)/login/api";
import ProtectedRoute from "@/app/(pages)/(auth)/login/protectedRoute/ProtectedRoute";

const TambahDataDanInputTemplate = () => {
  const pathname: string = usePathname();
  const router = useRouter();

  const [ktp, setKtp] = useState<File | null>(null);
  const [selfie, setSelfie] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [ktpFileName, setKtpFileName] = useState<string>("");
  const [selfieFileName, setSelfieFileName] = useState<string>("");
  const [hideErrorNotif, setHideErrorNotif] = useState<boolean>(true);

  const handleHideErrorNotif = (): void => {
    setHideErrorNotif(false);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // console.log(e.target.files);
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      if (e.target.id === "ktp") {
        setKtp(file);
        setKtpFileName(file.name);
      } else if (e.target.id === "selfie") {
        setSelfie(file);
        setSelfieFileName(file.name);
      }
    }
  };

  const HandleUpload = async (event: React.FormEvent<HTMLFormElement>) => {
    
    const accessToken = localStorage.getItem("accessToken");
    event.preventDefault();
    setIsLoading(true);
    setIsError(false);
    setError("");

    const formData = new FormData();
    formData.append("ktp", ktp!);
    formData.append("selfie", selfie!);

    try {
      const response = await api.post(
        "/persons",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      // console.log(response.data.message);
      localStorage.setItem("uploadMessage", response.data.message);
      router.push("/permintaan");
    } catch (error: any) {
      // console.log(error);
      setIsError(true);
      setError(error.response.data.message);
      setHideErrorNotif(true);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ProtectedRoute>
      <DashboardLayout hover={pathname}>
      <div className="px-5 py-10 md:py-5">
        {/* Navigasi */}
        <div className="flex flex-wrap items-center w-full max-w-lg space-x-1">
          <Link
            href="/permintaan"
            className="text-sm font-semibold text-tulisan"
          >
            Permintaan
          </Link>
          <BiChevronRight className="text-2xl text-tulisan" />
          <Link
            href="/permintaan/tambahData"
            className="text-sm font-semibold text-tulisan"
          >
            Tambah Data
          </Link>
          <BiChevronRight className="text-2xl text-tulisan" />
          <Link
            href="/permintaan/tambahData/inputTemplate"
            className="text-sm font-semibold text-ijoToska"
          >
            Tambah Data Dan Input Template
          </Link>
        </div>

        {/* Title & Button Upload */}
        <div className="flex flex-col gap-y-5 md:gap-y-0 items-center justify-center mt-5 md:flex-row md:justify-between">
          <h1 className="text-xl font-bold md:mr-3 lg:mr-0 lg:text-2xl">
            Tambah Data Dan Input Template
          </h1>
          {/* Button Upload */}
          <div className="flex flex-col md:flex-row gap-3">
            <Link
              href="#"
              className="bg-ijoToska active:bg-tulisan text-sm rounded font-semibold text-white py-2 text-center px-5"
            >
              Unduh Template
            </Link>
            <Link
              href="#"
              className="border-2 active:border-tulisan active:text-tulisan border-ijoToska text-sm py-2 rounded text-ijoToska px-5 font-semibold"
            >
              Unggah Template
            </Link>
          </div>
        </div>

        {/* Back Button */}
        <Link
          href="/permintaan/tambahData"
          className="flex mt-8 font-semibold text-blue-400"
        >
          <BiChevronLeft className="text-2xl" /> Kembali
        </Link>

        <hr className="my-5 border-b-2 bg-tulisan" />

        <form onSubmit={HandleUpload}>
          <div className="w-full grid grid-cols-1 lg:grid-cols-2">
            {/* Foto KTP */}
            <UploadCard
              title1="Foto KTP"
              title2="Unggah Foto KTP"
              text="*Pastikan KTP terlihat jelas dengan pencahayaan yang baik"
              bgColor="bg-[#B4FFD7]"
              borderColor="border-ijoToska"
              ceklisStatus={true}
              htmlForId="ktp"
              ktpFileName={ktpFileName}
              fileNameKTPUploadIcon={ktpFileName}
              onChange={handleFileChange}
            />
            {/* Foto Selfie Diri */}
            <UploadCard
              title1="Foto Selfie Diri"
              title2="Unggah Selfie / Swafoto"
              text="*Pastikan wajah terlihat jelas, pencahayaan yang baik dan sesuai dengan KTP"
              bgColor="bg-[#B4FFD7]"
              borderColor="border-ijoToska"
              ceklisStatus={true}
              htmlForId="selfie"
              selfieFileName={selfieFileName}
              fileNameSelfieUploadIcon={selfieFileName}
              onChange={handleFileChange}
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 place-items-center lg:place-items-end">
            {/* Button Submit Form */}
            <button
              type="submit"
              className={`text-sm mb-1 font-medium text-white w-full py-3 lg:py-4 rounded-md inline-block active:bg-tulisan ${
                isLoading ? "bg-tulisan" : "bg-ijoToska"
              }`}
              disabled={isLoading}
            >
              {isLoading ? "Mengunggah Data..." : "Tambah Data Baru"}
            </button>
            {/* Pesan Error */}
            {isError && (
              <div
                className={`h-full w-full mt-5 lg:w-8/12 bg-red-500 rounded-md p-0.5 ${
                  hideErrorNotif ? "" : "hidden"
                }`}
              >
                <div className="bg-white w-[95%] float-right h-full rounded flex items-center justify-between pl-5 pr-2">
                  <p className="text-red-500 font-semibold text-sm mr-3">
                    {error ? error : "Terjadi kesalahan saat mengunggah data"}
                  </p>
                  <XMarkIcon
                    className={"w-6 cursor-pointer"}
                    onClick={handleHideErrorNotif}
                  />
                </div>
              </div>
            )}
          </div>
        </form>
      </div>
    </DashboardLayout>
    </ProtectedRoute>
  );
};

export default TambahDataDanInputTemplate;

interface UploadCardProps {
  title1: string;
  title2: string;
  text: string;
  bgColor: string;
  borderColor: string;
  ceklisStatus: boolean;
  htmlForId: string;
  ktpFileName?: string;
  selfieFileName?: string;
  fileNameKTPUploadIcon?: string;
  fileNameSelfieUploadIcon?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const UploadCard: React.FC<UploadCardProps> = ({
  title1,
  title2,
  text,
  bgColor,
  borderColor,
  ceklisStatus,
  htmlForId,
  ktpFileName,
  selfieFileName,
  fileNameKTPUploadIcon,
  fileNameSelfieUploadIcon,
  onChange,
}) => {
  return (
    <>
      {/* Upload KTP */}
      <div className="mb-5">
        <label
          htmlFor={htmlForId}
          className={`${bgColor} active:bg-tulisan px-5 cursor-pointer w-full inline-block py-5 border-dashed border-2 ${borderColor} rounded-md`}
        >
          <div className="flex space-x-3">
            <div className="bg-[#EDEDED] rounded-md">
              <Image
                src="/assets/dashboard/permintaan/upload.png"
                alt="upload-KTP"
                width={50}
                height={0}
                className="scale-50"
              />
            </div>
            <div>
              <p className="font-semibold text-sm">{title1}</p>
              <p className="text-xs">{title2}</p>
            </div>
          </div>
        </label>
        <input
          type="file"
          name={htmlForId}
          id={htmlForId}
          className="hidden"
          onChange={onChange}
        />
        <p
          className={`text-blue-400 text-xs mt-2 ${
            ceklisStatus ? "" : "hidden"
          }`}
        >
          {text}
        </p>
        <p className={`text-blue-400 text-xs ${ceklisStatus ? "" : "hidden"}`}>
          *Format file (.Jpg, .Png)
        </p>
      </div>
      {/* Image Status Upload */}
      <div className="flex lg:px-5 h-5 items-center space-x-2 -mt-3 mb-8 lg:mt-0">
        {/* KTP Upload Notif */}
        <div className="flex space-x-2 items-center">
          {fileNameKTPUploadIcon && (
            <Image
              src="/assets/dashboard/permintaan/ceklis.png"
              alt="ktp-filename"
              width={20}
              height={0}
            />
          )}
          <h1 className="text-xs">{ktpFileName ? ktpFileName : ""}</h1>
        </div>

        {/* Selfie Upload Notif */}
        <div className="flex space-x-2 items-center">
          {fileNameSelfieUploadIcon && (
            <Image
              src="/assets/dashboard/permintaan/ceklis.png"
              alt="ktp-filename"
              width={20}
              height={0}
            />
          )}
          <h1 className="text-xs lg:text-sm">
            {selfieFileName ? selfieFileName : ""}
          </h1>
        </div>
      </div>
    </>
  );
};
