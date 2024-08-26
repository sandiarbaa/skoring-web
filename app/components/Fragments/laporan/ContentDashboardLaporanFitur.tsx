import React, { useCallback, useEffect, useState } from "react";
import Dropdown from "../../Elements/Dropdown";
import SearchBox from "../../Elements/SearchBox";
import BarChart from "@/app/(pages)/(dashboard)/laporan/chart/BarChart";
import TableLaporanFitur from "./TableLaporanFitur";
import { BiChevronLeft, BiChevronRight } from "react-icons/bi";

const ContentDashboardLaporanFitur: React.FC = () => {
  const [userData, setUserData] = useState<any[]>([]);
  const [page, setPage] = useState<number>(1);
  const [lastVisiblePage, setLastVisiblePage] = useState<number>(1);
  const [noAwal, setNoAwal] = useState<number>(1);
  const [noAkhir, setNoAkhir] = useState<number>(10);
  const [totalData, setTotalData] = useState<number>(0);

  const fetchData = useCallback(async () => {
    const res = await fetch(
      `http://localhost:3000/api/laporanFitur?page=${page}`
    ).then((res) => res.json());

    setUserData(res.data);
    setLastVisiblePage(res.pagination.last_visible_page);
    setNoAwal(res.data[0].no);
    setNoAkhir(
      res.data.length > 0 ? res.data[res.data.length - 1].no : noAkhir
    );

    setTotalData(res.data_length);
  }, [page, noAkhir]);

  useEffect(() => {
    fetchData();
  }, [page, fetchData, noAwal]);

  const prevButton = () => {
    if (page <= 1) return;
    setPage(page - 1);
  };

  const nextButton = () => {
    if (page >= lastVisiblePage) return;
    setPage(page + 1);
  };

  // Generate numberPage array based on lastVisiblePage
  const numberPage = Array.from(
    { length: lastVisiblePage },
    (_, index) => index + 1
  );

  return (
    <section className="w-full px-3 py-5 my-5">
      {/* Grafik */}
      <Dropdown title="Automation" />
      <section className="mt-2 border p-2 rounded">
        <div className="flex justify-between flex-col items-center lg:flex-row lg:space-y-0">
          <div>
            <h1 className="font-bold">
              Grafik Pemakaian Kuota Per-Cabang Tahun 2023
            </h1>
            <p className="text-xs text-tulisan">Data Periode Tahun 2023</p>
          </div>
          <div className="mt-5 lg:mt-0 flex flex-col items-center gap-y-2">
            <select
              name="dropdownTahunLaporanFitur"
              id="dropdownTahunLaporanFitur"
              className="border rounded px-2 py-1 text-sm shadow"
            >
              <option value="tahun">Tahun</option>
              <option value="tahun">Tahun</option>
              <option value="tahun">Tahun</option>
            </select>
            <p className="text-sm text-tulisan italic">1 Tahun Terakhir</p>
          </div>
        </div>
        {/* Grafik */}
        <div className="w-full mt-5">
          <BarChart />
        </div>
      </section>

      {/* Dokumen Gagal OCR */}
      <section className="mt-10 flex flex-col justify-center">
        <h1 className="font-bold">
          Jumlah Dokumen gagal di OCR (Quality of Document Source)
        </h1>
        <div className="flex flex-col items-center lg:flex-row lg:items-center mt-5 space-y-3 lg:space-y-0 lg:space-x-5">
          <Dropdown title="Dokumen Gagal di OCR" />
          <SearchBox />
        </div>
      </section>

      {/* Table */}
      <section className="mt-5">
        <TableLaporanFitur userData={userData} />
      </section>

      {/* Pagination */}
      <div className="flex flex-col items-start justify-center w-full px-3 pt-5">
        <div className="flex items-center self-center lg:self-start mb-3 text-sm font-medium text-tulisan">
          Menampilkan {noAwal} - {noAkhir} dari {totalData} hasil
        </div>

        <div className="flex justify-center w-full max-w-xs pb-5 self-center">
          <div
            onClick={prevButton}
            className="flex items-center p-1 transition-all duration-300 border rounded cursor-pointer group hover:bg-ijoToska"
          >
            <BiChevronLeft className="text-2xl text-ijoToska group-hover:text-white" />
          </div>
          <ul className="flex mx-5 space-x-2">
            {numberPage.map((item, index) => (
              <li
                key={index}
                onClick={() => setPage(item)}
                className={`cursor-pointer px-3.5 text-sm py-0.5 rounded flex items-center border ${
                  item === page ? "bg-ijoToska text-white" : "text-gray-400"
                }`}
              >
                {item}
              </li>
            ))}
          </ul>
          <div
            onClick={nextButton}
            className="flex items-center p-1 transition-all duration-300 border rounded cursor-pointer group hover:bg-ijoToska"
          >
            <BiChevronRight className="text-2xl text-ijoToska group-hover:text-white" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContentDashboardLaporanFitur;
