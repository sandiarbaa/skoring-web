import React, { useEffect, useState } from "react";
import TablePermintaanProses from "./TablePermintaanProses";
import api from "@/app/(pages)/(auth)/login/api";
import Pagination from "../Pagination";

interface UsersProsesDataProps {
  nik: string;
  nama: string;
  tanggalInput: string;
}

interface ContentDashboardProsesProps {
  usersProsesData: UsersProsesDataProps[];
}
const ContentDashboardProses: React.FC<ContentDashboardProsesProps> = ({
  usersProsesData,
}) => {
  const [page, setPage] = useState<number>(1);
  const [size] = useState<number>(10);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [data, setData] = useState<any[]>([]);
  const [totalPage, setTotalPage] = useState();
  const [total, setTotal] = useState();

  const prevButton = (): void => {
    if (page <= 1) return;
    setPage(page - 1);
  };

  const nextButton = (): void => {
    if (page >= lastVisiblePage) return;
    setPage(page + 1);
  };

  const fetchReports = async () => {
    const accessToken = localStorage.getItem("accessToken");

    try {
      setIsLoading(true);
      setIsError(false);
      const response = await api.get(`/reports?size=${size}&current=${page}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      setData(response.data.data.reports);
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
    fetchReports();
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
      <div className="flex flex-col lg:flex-row items-center justify-between">
        <h1 className="text-xl font-bold mb-3 lg:mb-0">Permintaan Hari Ini</h1>
        {/* Search & Button Tambah */}
      </div>

      {/* Table */}
      <div className="mt-5">
        <TablePermintaanProses usersProsesData={usersProsesData} />
      </div>

      {/* Pagination */}
      {/* {usersProsesData.length > 0 && (
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
      )} */}
    </section>
  );
};

export default ContentDashboardProses;
