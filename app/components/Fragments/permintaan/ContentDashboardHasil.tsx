import React, { useEffect, useState } from "react";
import TablePermintaanHasil from "./TablePermintaanHasil";
import Dropdown from "../../Elements/Dropdown";
import SearchBox from "../../Elements/SearchBox";
import Pagination from "../Pagination";
import api from "@/app/(pages)/(auth)/login/api";

const ContentDashboardHasil: React.FC = () => {
  const [page, setPage] = useState<number>(1);
  const [size] = useState<number>(10);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [data, setData] = useState<any[]>([]);
  const [totalPage, setTotalPage] = useState();
  const [total, setTotal] = useState();

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
      const response = await api.get(`/requests?size=${size}&current=${page}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      // console.log("Fetched data:", response.data);
      setData(response.data.data.requests);
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

  const userData = data ?? [];
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
      {/* Title */}
      <section className="flex flex-col lg:flex-row items-center justify-between">
        <h1 className="text-xl font-bold">Permintaan Hari Ini</h1>
        {/* Search & Dropdown */}
        <div className="flex flex-col lg:flex-row mt-5 lg:mt-0 space-y-3 lg:space-y-0 items-center space-x-3">
          {/* Dropdown */}
          <Dropdown title="semua" />

          {/* Searchbox */}
          <SearchBox />
        </div>
      </section>

      {/* Table */}
      <section className="mt-5">
        <TablePermintaanHasil userData={userData} />
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

export default ContentDashboardHasil;
