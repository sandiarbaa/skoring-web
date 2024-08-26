import React, { useEffect, useState } from "react";
import Dropdown from "../../Elements/Dropdown";
import SearchBox from "../../Elements/SearchBox";
import DatePicker from "../../Elements/DatePicker";
import TableLaporanPermintaan from "./TableLaporanPermintaan";
import Pagination from "../Pagination";
import api from "@/app/(pages)/(auth)/login/api";

const ContentDashboardLaporanPermintaan: React.FC = () => {
  const [page, setPage] = useState<number>(1);
  const [size] = useState<number>(10);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [datas, setDatas] = useState<any[]>([]);
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
      setDatas(response.data.data.requests);
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
          <Dropdown title="Semua" />
          <div className="">
            <SearchBox />
          </div>
        </div>
        <div className="ml-3">
          <DatePicker />
        </div>
      </section>

      {/* Table */}
      <section className="mt-5">
        <TableLaporanPermintaan userData={userData} />
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

export default ContentDashboardLaporanPermintaan;
