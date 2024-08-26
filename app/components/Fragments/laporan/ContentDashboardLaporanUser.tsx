import React, { useEffect, useState } from "react";
import DatePicker from "../../Elements/DatePicker";
import Pagination from "../Pagination";
import TableLaporanUser from "./TableLaporanUser";
import api from "@/app/(pages)/(auth)/login/api";
import Image from "next/image";

const ContentDashboardLaporanUser = () => {
  const [page, setPage] = useState<number>(1);
  const [size] = useState<number>(10);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [datas, setDatas] = useState([]);
  const [totalPage, setTotalPage] = useState();
  const [total, setTotal] = useState();

  // Search
  const [search, setSearch] = useState<string>("");
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    // kalau ada pencarian
    if (search !== "") {
      const results = datas.filter(
        (data: { person: { nik: string; nama: string } }) =>
          data.person.nik.toLowerCase().includes(search.toLowerCase()) ||
          data.person.nama.toLowerCase().includes(search.toLowerCase())
      );
      setSearchResults(results);
    } else {
      setSearchResults(datas);
    }
  }, [datas, search]);

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

  const fetchRequests = async () => {
    const accessToken = localStorage.getItem("accessToken");

    try {
      setIsLoading(true);
      setIsError(false);
      const response = await api.get(`/reports?size=${size}&current=${page}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      setDatas(response.data.data.reports);
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
    fetchRequests();
  }, [page, size]);

  if (isLoading) {
    return <div className="mt-5">Loading...</div>;
  }

  const userData = datas ?? [];
  const lastVisiblePage = totalPage ?? 1;
  const noAwal = (page - 1) * size + 1;
  const noAkhir =
    userData.length > 0
      ? (page - 1) * size + userData.length
      : (page - 1) * size;
  const totalData = total ?? 0;

  const numberPage = Array.from(
    { length: lastVisiblePage },
    (_, index) => index + 1
  );

  return (
    <section className="w-full px-3 py-5 my-5">
      {/* Header */}
      <section className="flex flex-col items-center lg:flex-row justify-between space-y-3 lg:space-y-0">
        <div className="flex flex-col lg:flex-row items-center space-x-3 space-y-3 lg:space-y-0">
          {/* <SearchBox /> */}
          <div className="relative inline-block mr-2">
            <input
              type="text"
              name="search"
              id="search"
              className="border text-sm w-[288px] -mr-2 lg:mr-0 lg:w-[300px] py-2.5 rounded-md px-3 pl-10"
              placeholder="Search by NIK or Nama"
              autoComplete="off"
              onChange={(e) => setSearch(e.target.value)}
            />
            <Image
              src="/assets/dashboard/permintaan/search.png"
              alt="search"
              width={20}
              height={0}
              className="absolute text-lg left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            />
          </div>
        </div>
        <div className="pl-3">
          <DatePicker />
        </div>
      </section>

      {/* Table */}
      <section className="mt-5">
        <TableLaporanUser userData={searchResults} />
      </section>

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
    </section>
  );
};

export default ContentDashboardLaporanUser;
