// import RiwayatAlokasiKuota from "./RiwayatAlokasiKuota";
import EmpetyData from "../../Elements/EmpetyData";
import React, { useCallback, useEffect, useState } from "react";
import DatePicker from "../../Elements/DatePicker";
import Dropdown from "../../Elements/Dropdown";
import SearchBox from "../../Elements/SearchBox";
import TableRiwayatAlokasiKuota from "./TableRiwayatAlokasiKuota";

const ContentDashboardRiwayatKuota: React.FC = () => {
  const [inActive, setInActive] = useState<string | null>(null);
  const [userData, setUserData] = useState<any[]>([]);
  const [page, setPage] = useState<number>(1);
  const [lastVisiblePage, setLastVisiblePage] = useState<number>(1);
  const [noAwal, setNoAwal] = useState<number>(1);
  const [noAkhir, setNoAkhir] = useState<number>(10);
  const [totalData, setTotalData] = useState<number>(0);

  const fetchData = useCallback(async () => {
    const res = await fetch(
      `http://localhost:3000/api/kuota/riwayatAlokasiKuota?page=${page}`
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

  const numberPage = Array.from(
    { length: lastVisiblePage },
    (_, index) => index + 1
  );

  return (
    <>
      <section className="w-full px-3 py-5 my-5">
        <div>
          <div className="font-semibold text-xl py-3">
            Riwayat Alokasi Kuota
          </div>
          <div className="flex flex-col-reverse gap-2 md:flex-row md:gap-2 justify-between py-3">
            <DatePicker />
            <div className="flex flex-col gap-2 md:flex-row md:gap-4">
              <Dropdown title="Semua" />
              <SearchBox />
            </div>
          </div>
          <div>
            {inActive === "" ? (
              <EmpetyData
                props={true}
                href="/dashboard"
                label="+ Request Kuota"
              />
            ) : (
              <TableRiwayatAlokasiKuota userData={userData} />
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default ContentDashboardRiwayatKuota;
