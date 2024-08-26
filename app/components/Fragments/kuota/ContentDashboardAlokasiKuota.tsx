import React, { useState } from "react";
import Dropdown from "../../Elements/Dropdown";
import { fiturCards } from "@/app/utils/fiturCard";
import Image from "next/image";
import Link from "next/link";
import ModalKuota from "./ModalKuota";

type alokasiprops = {
  riwayatAlokasiKuota: () => void;
};

const ContentDashboardAlokasiKuota = ({
  riwayatAlokasiKuota,
}: alokasiprops) => {
  const [openModal, setOpenModal] = useState<boolean>(false);
  const cardsToShow = fiturCards.slice(-4);

  const handleOpenModal = (): void => {
    setOpenModal(true);
  };

  const handleCloseModal = (): void => {
    setOpenModal(false);
  };

  return (
    <>
      <section className="w-full px-3 py-5 my-5">
        <div className="font-semibold text-xl">Alokasi Kuota</div>
        <div className="font-semibold text-base pt-2 pb-3">
          Nama Departement
        </div>
        <Dropdown title="Pilih Departement" />
        <div className="font-semibold text-base pt-5">Jenis Scoring</div>
        <div className="text-sm text-tulisan py-2">Pilih Jenis Produk</div>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-2">
          {cardsToShow.map((card, index) => (
            <Link
              key={index}
              href="#"
              className={`flex space-x-3 px-4 py-2 sm:px-5 sm:py-4 text-xs items-center shadow md:px-5 md:py-5 w-full sm:max-w-[250px] md:max-w-[250px] rounded-md relative transition-all duration-300 hover:shadow-lg
              }`}
            >
              <div className={`py-2 px-3 rounded ${card.bgIcon} inline-block`}>
                <Image
                  src={card.image}
                  alt={card.title}
                  width={30}
                  height={0}
                />
              </div>
              <div>
                <h3 className="text-xs font-semibold">{card.title}</h3>
                <p className="text-xs text-tulisan">Kuota Tersisa (500)</p>
              </div>
            </Link>
          ))}
        </div>
        <div className="flex justify-center w-full pt-4">
          <button
            onClick={handleOpenModal}
            className="w-full bg-ijoToska text-center text-white p-3 rounded-md font-semibold shadow active:bg-tulisan transition-all duration-300"
          >
            Confirm Request
          </button>
        </div>
        {openModal ? (
          <ModalKuota
            close={handleCloseModal}
            riwayatAlokasiKuota={riwayatAlokasiKuota}
          />
        ) : (
          ""
        )}
      </section>
    </>
  );
};

export default ContentDashboardAlokasiKuota;
