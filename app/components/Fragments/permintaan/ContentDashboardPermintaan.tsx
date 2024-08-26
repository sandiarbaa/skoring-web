import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import TablePermintaan from "./TablePermintaan";
import { fiturCards } from "@/app/utils/fiturCard";
import Pagination from "../Pagination";
import { XMarkIcon } from "@heroicons/react/24/solid";
import api from "@/app/(pages)/(auth)/login/api";

interface PersonsProsesProps {
  nik: string;
  nama: string;
  tanggalInput: string;
}

interface ContentDashboardPermintaanProps {
  proses: () => void;
  hasil: () => void;
  setUsersProsesData: any;
}

const ContentDashboardPermintaan: React.FC<ContentDashboardPermintaanProps> = ({
  proses,
  hasil,
  setUsersProsesData,
}) => {
  const [showAll, setShowAll] = useState<boolean>(false); // status kartu yg ingin di tampilkan mau semua / 4 kartu terakhir
  const [activeCardIndices, setActiveCardIndices] = useState<number[]>([]); // Array untuk menyimpan index kartu yang aktif/dipilih.
  const [message, setMessage] = useState<string | null>(null); // message notif success add data person
  const [hideErrorNotif, setHideErrorNotif] = useState<boolean>(true); // untuk menutup notif succes add person
  const [nik, setNik] = useState<string[]>([]); // untuk menyimpan nik yg di pilih dari checkbox
  const [page, setPage] = useState<number>(1); // page untuk pagination
  const [size] = useState<number>(10); // menampilkan mau berapa data dalam 1 page
  const [loadingSkoring, setLoadingSkoring] = useState<boolean>(false); // untuk menampilkan teks loading saat cek skoring
  const [personsProses, setPersonsProses] = useState<PersonsProsesProps[]>([]); // menyimpan data person yg di pilih, lalu meng-overwrite isi array usersProsesData
  const [data, setData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [totalPage, setTotalPage] = useState();
  const [total, setTotal] = useState();

  // cardsToShow ber isi array fiturCards/fiturCards.slice(-4) tergantung dari state showAll
  const cardsToShow = showAll ? fiturCards : fiturCards.slice(-4);

  // untuk menambahkan atau menghapus kartu yang dipilih.
  const handleCardClick = (index: number): void => {
    setActiveCardIndices((prevActiveCardIndices) => {
      // jika sudah ada index card yg di pilih dalam activeCardIndices, fungsi akan menghapus index card lama
      if (prevActiveCardIndices.includes(index)) {
        return prevActiveCardIndices.filter((i) => i !== index);
      }
      // kalau activeCardIndices masih kosong, maka isi dengan card yg di pilih
      else {
        return [...prevActiveCardIndices, index];
      }
    });
  };

  // mengambil message uploadMessage dari local storage untuk notifikasi success add persons
  useEffect(() => {
    const uploadMessage = localStorage.getItem("uploadMessage");
    if (uploadMessage) {
      setMessage(uploadMessage);
      localStorage.removeItem("uploadMessage");
    }
  }, []);

  // menutup notifikasi success add person
  const handleHideErrorNotif = (): void => {
    setHideErrorNotif(false);
  };

  // meng-overwrite isi array usersProsesData dengan array personsProses agar datanya dapat ditampilkan di tab proses, saat proses cek skoring berlangsung
  useEffect(() => {
    setUsersProsesData(personsProses);
  }, [personsProses, setUsersProsesData]);

  const fetchPersons = async () => {
    try {
      setIsLoading(true);
      setIsError(false);
      const response = await api.get(`/persons?size=${size}&current=${page}`);
      // console.log("Fetched data:", response.data);
      setData(response.data.data.persons);
      setTotalPage(response.data.page.totalPages);
      setTotal(response.data.page.total);
    } catch (error) {
      console.error("Error fetching persons:", error);
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPersons();
  }, [page, size]);

  isLoading ? <div className="mt-5">Loading...</div> : <></>;

  // button prev - pagination
  const prevButton = (): void => {
    if (page <= 1) return;
    setPage(page - 1);
  };

  // button next - pagination
  const nextButton = (): void => {
    if (page >= lastVisiblePage) return;
    setPage(page + 1);
  };

  // data-data untuk pagination component
  const userData = data ? data : []; // menyimpan data persons yg ingin ditampilkan di tabel
  const lastVisiblePage = totalPage ?? 1;

  const noAwal = (page - 1) * size + 1;
  const noAkhir =
    userData.length > 0
      ? (page - 1) * size + userData.length
      : (page - 1) * size;
  const totalData = total ?? 0; // total data person yg ada

  // untuk membuat nomor page di pagination nya
  const numberPage = Array.from(
    { length: lastVisiblePage },
    (_, index) => index + 1
  );

  // mengelola data nik person yang dipilih - TablePermintaan Component
  const checkboxPerson = (nikPerson: string) => {
    // memperbarui state nik dengan memanfaatkan state sebelumnya (prevNik).
    setNik((prevNik) => {
      if (prevNik.includes(nikPerson)) {
        return prevNik.filter((item) => item !== nikPerson); // kalau nik yg di pilih sudah ada, fungsi akan menghapus nik lama yg cocok degan nik yg baru tersebut dari daftar
      } else {
        return [...prevNik, nikPerson]; // menambahkan nik yang dipilih
      }
    });
  };

  // mengeksekusi proses cek skoring
  const submitCekSkoring = async () => {
    const accessToken = localStorage.getItem("accessToken");
    setLoadingSkoring(true); // menampilkan teks loading di button cek skoring
    setUsersProsesData(personsProses); // overwirite data usersProsesData
    proses(); // sebelum nembak ke api, arahkan  dulu ke tab proses, untuk melihat proses cek skoring
    try {
      const res = await api.post(
        "/scoring?features=identity",
        {
          arrayOfNIK: nik, // kirim data nik berdasarkan person yg sudah di pilih
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      // console.log(res.data);
      hasil(); // setelah proses nembak api success, arahkan kembali ke tab hasil
      setUsersProsesData([]); // jadikan kosong kembali data array usersProsesData di tab proses
      setPersonsProses([]); // jadikan kosong kembali data array personsProses
    } catch (error) {
      console.log(error);
    }
    setLoadingSkoring(false); // kembalikan state loadingSkoring ke false
  };

  // periksa jika card Identity telah dipilih mau di mode "Tampilkan Semua" atau "Tutup"
  const isCard13Selected = showAll
    ? activeCardIndices.includes(12) // kalau ada card yg di pilih di activeCardIndices / ada index kartu yg di pilih yaitu indeks ke 12 (card ke 13)
    : activeCardIndices.includes(0); // sama, tapi card yg di pilih indeks ke 0 / kartu pertama

  // bernilai true ketika ada minimal 1 elemen array di state nik
  const isAnyUserSelected = nik.length > 0;

  return (
    <section className="w-full px-3 py-5 my-5">
      {/* Add Data */}
      <h1 className="mb-2 text-base font-bold">Tambah Data Baru</h1>
      <Link href="/permintaan/tambahData">
        <div className="flex items-center w-full p-5 mb-5 space-x-3 transition-all duration-300 rounded shadow-md hover:shadow-lg">
          <div className="py-2 px-3 rounded bg-[#ECEAF5] inline-block">
            <Image
              src="/assets/dashboard/dashboard/automationAi.png"
              alt="ai-automation"
              width={30}
              height={30}
            />
          </div>

          <div>
            <h3 className="text-sm font-semibold">
              AI Automation (Tambah Data Baru)
            </h3>
            <p className="text-xs text-tulisan">Data Masuk (500)</p>
          </div>
        </div>
      </Link>

      {/* Pilih Fitur AI Scoring */}
      <h1 className="mb-5 text-base font-bold">Pilih Fitur AI Skoring</h1>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:gap-0 md:flex md:justify-between md:space-x-2 md:flex-wrap md:gap-y-5 ">
        {/* Card */}
        {cardsToShow.map((card, index) => (
          <Link
            key={index}
            href="#"
            onClick={() => handleCardClick(index)}
            className={`flex space-x-3 px-4 py-2 sm:px-5 sm:py-4 text-xs items-center shadow md:px-5 md:py-5 w-full sm:max-w-[250px] md:max-w-[200px] rounded-md relative transition-all duration-300 hover:shadow-lg ${
              activeCardIndices.includes(index)
                ? "border border-ijoToska shadow shadow-ijoToska hover:shadow-md hover:shadow-ijoToska"
                : ""
            }`}
          >
            <div className={`py-2 px-3 rounded ${card.bgIcon} inline-block`}>
              <Image src={card.image} alt={card.title} width={25} height={0} />
            </div>
            <div>
              <h3 className="text-xs font-semibold">{card.title}</h3>
              <p className="text-xs text-tulisan">Data Masuk (500)</p>
            </div>
            <div className="absolute z-10 top-2 right-2 bg-[#F5F5F5] text-xs font-bold p-1 rounded-full">
              {card.score}
            </div>
          </Link>
        ))}
      </div>

      {/* Button Show All */}
      <section className="relative">
        <div className="flex justify-end mt-4 text-sm">
          <button
            className="text-ijoToska hover:text-tulisan"
            onClick={() => setShowAll(!showAll)}
          >
            {showAll ? "Tutup" : "Tampilkan Semua"}
          </button>
        </div>
      </section>

      <h1 className="my-5 text-base font-bold">Pilih Nama Untuk Cek Skor</h1>

      {/* Table */}
      <TablePermintaan
        userData={userData}
        checkboxPerson={checkboxPerson}
        setPersonsProses={setPersonsProses}
        setUsersProsesData={setUsersProsesData}
      />

      {/* Pagination */}
      {userData.length > 0 && (
        <Pagination
          noAwal={noAwal}
          noAkhir={noAkhir}
          totalData={totalData}
          page={page}
          setPage={setPage}
          prevButton={prevButton}
          nextButton={nextButton}
          numberPage={numberPage}
        />
      )}

      {/* Button Cek Skoring */}
      <section className="flex flex-col lg:flex-row justify-center items-center w-full lg:justify-between">
        <div className="order-2 lg:order-1">
          {message && (
            <div
              className={`h-12 w-52 mt-5 bg-green-500 rounded-md p-0.5 ${
                hideErrorNotif ? "" : "hidden"
              }`}
            >
              <div className="bg-white w-[95%] float-right h-full rounded flex items-center justify-between pl-5 pr-2">
                <p className="text-green-500 font-semibold text-sm mr-3">
                  {message}
                </p>
                <XMarkIcon
                  className={`w-6 cursor-pointer`}
                  onClick={handleHideErrorNotif}
                />
              </div>
            </div>
          )}
        </div>

        {/* Button Cek Skoring hanya bisa di klik ketika Card Identity telah di pilih dan minimal ada 1 user yg sudah terpilih */}
        <button
          onClick={submitCekSkoring}
          disabled={!isCard13Selected || !isAnyUserSelected} // Disable button if any user is not selected and card identity not selected
          className={`order-1 lg:order-2 mt-4 px-14 font-semibold py-2 rounded text-white ${
            !isCard13Selected || !isAnyUserSelected
              ? "bg-gray-400"
              : "bg-ijoToska"
          } ${
            !isCard13Selected || !isAnyUserSelected
              ? "cursor-not-allowed"
              : "hover:bg-ijoToska"
          } transition-all duration-300`}
        >
          {loadingSkoring ? "Loading..." : "Cek Skoring"}
        </button>
      </section>
    </section>
  );
};

export default ContentDashboardPermintaan;
