import api from "@/app/(pages)/(auth)/login/api";
import Image from "next/image";
import React, { useState } from "react";

interface userDataProps {
  id: string;
  jenis_permintaan: string;
  jumlah_customer: string;
  created_at: string;
  finished_at: string;
}

interface expandedRowsDataProps {
  nik: string;
  created_at: string;
  person: {
    nik: string;
    nama: string;
  };
  status: string;
}

const TablePermintaanHasil = ({ userData }: { userData: userDataProps[] }) => {
  const [expandedRows, setExpandedRows] = useState<number[]>([]);
  const [checkboxListExpanded, setCheckboxListExpanded] = useState<{
    [key: number]: boolean[];
  }>({});
  const [selectAllExpanded, setSelectAllExpanded] = useState<{
    [key: number]: boolean;
  }>({});
  const [permintaanHasilDatas, setPermintaanHasilDatas] = useState<{
    [key: number]: expandedRowsDataProps[];
  }>({});
  const [loading, setLoading] = useState<{
    [key: number]: boolean;
  }>({}); // Menambahkan state loading

  // ketika baris dari tabel utama di klik
  const toggleRow = async (index: number, reqId: string) => {
    const accessToken = localStorage.getItem("accessToken");

    if (expandedRows.includes(index)) {
      setExpandedRows(expandedRows.filter((rowIndex) => rowIndex !== index));
    } else {
      setExpandedRows([...expandedRows, index]);

      // Menandai bahwa data sedang di-fetch
      setLoading({
        ...loading,
        [index]: true,
      });

      try {
        // Fetch data dari API setiap kali baris di-expand
        const { data } = await api.get(`/reports?reqId=${reqId}`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        // console.log(data);
        setPermintaanHasilDatas({
          ...permintaanHasilDatas,
          [index]: data.data.reports,
        });
        setCheckboxListExpanded({
          ...checkboxListExpanded,
          [index]: new Array(data.data.reports.length).fill(false),
        });
        setSelectAllExpanded({
          ...selectAllExpanded,
          [index]: false,
        });
      } catch (error) {
        console.error("Failed to fetch data:", error);
      } finally {
        // Menghapus status loading setelah data di-fetch
        setLoading({
          ...loading,
          [index]: false,
        });
      }
    }
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-xs bg-white table-auto text-start">
        <thead className="bg-[#F5F8FF] text-tulisan">
          <tr>
            <th className="p-2 text-end border-b-[1.8px] w-[50px]" colSpan={2}>
              No
            </th>
            <th className="min-w-[120px] border-b-[1.8px]">Tanggal Input</th>
            <th className="min-w-[150px] border-b-[1.8px]">Jenis Permintaan</th>
            <th className="min-w-[140px] border-b-[1.8px]">Jumlah Customer</th>
            <th className="min-w-[140px] border-b-[1.8px]">No. Permintaan</th>
            <th className="min-w-[150px] border-b-[1.8px]">
              Tanggal Permintaan
            </th>
            <th className="min-w-[150px] border-b-[1.8px]">Tanggal Selesai</th>
          </tr>
        </thead>
        <tbody>
          {userData.length > 0 ? (
            userData.map((data: userDataProps, index: number) => (
              <React.Fragment key={index}>
                <tr
                  className="border-t border-b cursor-pointer"
                  onClick={() => toggleRow(index, data.id)}
                >
                  <td className="p-2 text-center border-b-[1.8px]">
                    <Image
                      src="/assets/dashboard/permintaan/play.png"
                      alt="play-dropdown"
                      width={20}
                      height={20}
                      className={
                        expandedRows.includes(index) ? "rotate-90" : ""
                      }
                    />
                  </td>
                  <td className="p-2 text-center border-b-[1.8px]">
                    {index + 1}
                  </td>
                  <td className="text-center border-b-[1.8px] text-tulisan">
                    {data.created_at}
                  </td>
                  <td className="text-center border-b-[1.8px] text-tulisan">
                    {data.jenis_permintaan}
                  </td>
                  <td className="font-medium text-center border-b-[1.8px]">
                    {data.jumlah_customer}
                  </td>
                  <td className="text-center border-b-[1.8px] text-tulisan">
                    {data.id}
                  </td>
                  <td className="text-center border-b-[1.8px] text-tulisan">
                    {data.created_at}
                  </td>
                  <td className="text-center border-b-[1.8px] text-tulisan">
                    {data.finished_at}
                  </td>
                </tr>
                {expandedRows.includes(index) && (
                  <>
                    <tr className="text-ijoToska">
                      <th className="p-2 min-w-[30px]"></th>
                      <th className="p-2 min-w-[70px]"></th>
                      <th className="p-2 bg-[#F5F8FF]">No</th>
                      <th className="bg-[#F5F8FF] min-w-[150px]">NIK</th>
                      <th className="bg-[#F5F8FF] min-w-[150px]">
                        Tanggal Permintaan
                      </th>
                      <th className="bg-[#F5F8FF] min-w-[250px]">Nama</th>
                      <th className="bg-[#F5F8FF] min-w-[150px]">Hasil</th>
                    </tr>
                    {loading[index] ? ( // Menampilkan indikator loading jika data sedang di-fetch
                      <tr>
                        <td colSpan={6} className="text-center py-3">
                          Loading...
                        </td>
                      </tr>
                    ) : permintaanHasilDatas[index] &&
                      permintaanHasilDatas[index].length > 0 ? (
                      permintaanHasilDatas[index].map(
                        (
                          expandedData: expandedRowsDataProps,
                          expandedIndex: number
                        ) => (
                          <tr key={expandedIndex} className="py-3">
                            <td></td>
                            <td></td>
                            <td className="text-center border-y py-3">
                              {expandedIndex + 1}
                            </td>
                            <td className="text-center border-y">
                              {expandedData.person.nik}
                            </td>
                            <td className="text-center border-y">
                              {expandedData.created_at}
                            </td>
                            <td className="border-y text-center">
                              {expandedData.person.nama}
                            </td>
                            <td className="text-center border-y">
                              <div className="bg-ijoToska w-20 py-1.5 rounded-md text-white font-medium mx-auto">
                                {expandedData.status}
                              </div>
                            </td>
                          </tr>
                        )
                      )
                    ) : (
                      <tr>
                        <td colSpan={8} className="text-center py-3">
                          Data tidak ditemukan.
                        </td>
                      </tr>
                    )}
                  </>
                )}
              </React.Fragment>
            ))
          ) : (
            <tr>
              <td
                colSpan={8}
                className="text-center py-2 text-sm text-tulisan border-b-[1.4px] italic"
              >
                Tidak ada data!
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default TablePermintaanHasil;
