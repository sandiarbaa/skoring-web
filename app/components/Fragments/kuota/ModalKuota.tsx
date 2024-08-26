"use client";

import React from "react";
import Image from "next/image";

type ModalKuotaProps = {
  close: () => void;
  riwayatAlokasiKuota: () => void;
};

const ModalKuota = ({ close, riwayatAlokasiKuota }: ModalKuotaProps) => {
  return (
    <>
      <div className="px-5 fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-gray-500 bg-opacity-75">
        <div className="bg-white w-[450px] rounded-md shadow-xl">
          <div className="px-2">
            <div>
              <Image
                src="/assets/dashboard/kuota/checklist.png"
                alt="none"
                width={50}
                height={50}
                className="pt-4 pl-2"
              />
            </div>
            <div className="px-4 pt-5 bg-white sm:p-3 sm:pb-2">
              <h3 className="text-sm sm:text-base font-medium leading-6 text-gray-900">
                Permintaan Kuota Terkirim
              </h3>
              <div className="mt-2">
                <div className="text-xs sm:text-sm text-gray-500">
                  Proses permintaan kuota Anda sedang berlangsung. Untuk
                  memantau status pembaruan kuota, silahkan masuk ke bagian{" "}
                  {'"'}Riwayat Kuota{'"'}
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-row justify-center gap-2 md:gap-4 pt-3 pb-8 bg-grey-50 sm:flex sm:flex-row">
            <button
              onClick={close}
              className="inline-flex justify-center text-xs sm:text-sm px-10 md:px-16 py-1 text-green-600 border border-green-600 border-outline rounded shadow-sm hover:bg-green-700 focus:outline-none"
            >
              Kembali
            </button>
            <button
              onClick={riwayatAlokasiKuota}
              className="inline-flex justify-center px-2 md:px-4 py-1 text-white text-xs sm:text-sm bg-green-600 border border-transparent rounded shadow-sm hover:bg-green-700 focus:outline-none"
            >
              Lihat Riwayat Alokasi Kuota
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ModalKuota;
