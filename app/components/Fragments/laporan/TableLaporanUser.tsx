import api from "@/app/(pages)/(auth)/login/api";
import Image from "next/image";
import React, { useState } from "react";

interface userDataProps {
  id: string;
  nik: string;
  person: {
    nik: string;
    nama: string;
  };
}

interface expandedRowsDataProps {
  id: number;
  id_permintaan: string;
  request: {
    jenis_permintaan: string;
  };
  nik: string;
  created_at: string;
  person: {
    nama: string;
  };
  status: string;
  skor: string;
}

const TableLaporanUser = ({ userData }: { userData: userDataProps[] }) => {
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  const [loadingShowPDF, setLoadingShowPDF] = useState<boolean>(false);
  const [dataTableExpanded, setDataTableExpanded] = useState<any>([]);
  const [expandedRows, setExpandedRows] = useState<number[]>([]);
  const [idDownload, setIdDownload] = useState<string[]>([]);
  const [checkboxListExpanded, setCheckboxListExpanded] = useState<{
    [key: number]: boolean[];
  }>({});
  const [selectAllExpanded, setSelectAllExpanded] = useState<{
    [key: number]: boolean;
  }>({});

  const [permintaanHasilDatas, setPermintaanHasilDatas] = useState<{
    [key: number]: expandedRowsDataProps[];
  }>({});
  const [loadingRows, setLoadingRows] = useState<{
    [key: number]: boolean;
  }>({});

  // Menyimpan status loading untuk setiap baris
  const [loadingDownloadPerRow, setLoadingDownloadPerRow] = useState<{
    [key: number]: boolean;
  }>({});

  const handleCheckboxListExpanded = (index: number) => {
    const allChecked = !selectAllExpanded[index];
    setSelectAllExpanded({
      ...selectAllExpanded,
      [index]: allChecked,
    });

    const idsForThisRow = permintaanHasilDatas[index].map((data) => data.id);

    setCheckboxListExpanded({
      ...checkboxListExpanded,
      [index]: new Array(idsForThisRow.length).fill(allChecked),
    });

    if (allChecked) {
      // Tambahkan semua ID ke dalam idDownload jika semua checkbox dipilih
      setIdDownload((prevIdDownload) => [
        ...Array.from(
          new Set([...prevIdDownload, ...idsForThisRow.map(String)])
        ),
      ]);
    } else {
      // Hapus semua ID dari idDownload jika semua checkbox di-uncheck
      setIdDownload((prevIdDownload) =>
        prevIdDownload.filter((id) => !idsForThisRow.includes(Number(id)))
      );
    }
  };

  const handleCheckboxChangeExpanded = (
    index: number,
    expandedIndex: number,
    id: string
  ) => {
    // console.log("ini clik");
    const newCheckboxList = [...(checkboxListExpanded[index] || [])];
    newCheckboxList[expandedIndex] = !newCheckboxList[expandedIndex];
    setCheckboxListExpanded({
      ...checkboxListExpanded,
      [index]: newCheckboxList,
    });
    setSelectAllExpanded({
      ...selectAllExpanded,
      [index]: newCheckboxList.every((checkbox) => checkbox),
    });

    setIdDownload((prevIdDownload) => {
      if (prevIdDownload.includes(id)) {
        const results = prevIdDownload.filter((prevId) => prevId !== id);
        return results;
      } else {
        const results = [...prevIdDownload, id];
        return results;
      }
    });
  };

  const toggleRow = async (index: number, nik: string) => {
    const accessToken = localStorage.getItem("accessToken");
    if (expandedRows.includes(index)) {
      setExpandedRows(expandedRows.filter((rowIndex) => rowIndex !== index));
    } else {
      setExpandedRows([...expandedRows, index]);
      setLoadingRows({ ...loadingRows, [index]: true });

      try {
        const { data } = await api.get(`/reports?nik=${nik}`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        // console.log(data);
        setDataTableExpanded(data.data.reports);
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
        console.error("Error fetching data:", error);
      } finally {
        setLoadingRows({ ...loadingRows, [index]: false });
      }
    }
  };

  // API Lihat Detail PDF Person by ID
  const handleLihatDetail = async (id: number) => {
    const accessToken = localStorage.getItem("accessToken");
    try {
      setLoadingShowPDF(true);
      const response = await api.get(`/reports/pdf/${id}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      const pdfUrl = response.data.data.pdfUrl;

      // Buka PDF di tab baru
      window.open(pdfUrl, "_blank");

      // Atau tampilkan PDF di halaman
      setPdfUrl(pdfUrl);
    } catch (error) {
      console.error("Error fetching PDF:", error);
    } finally {
      setLoadingShowPDF(false);
    }
  };

  const downloadFiles = async (index: number) => {
    const accessToken = localStorage.getItem("accessToken");
    // kalau ada id yg di pilih
    if (idDownload.length > 0) {
      try {
        // setLoadingShowPDF(true);

        setLoadingDownloadPerRow({
          ...loadingDownloadPerRow,
          [index]: true,
        });

        let response;

        // Jika hanya ada 1 ID, maka akan download PDF tunggal
        if (idDownload.length === 1) {
          try {
            response = await api.post(
              `/reports/pdf`,
              { arrayOfIdReport: idDownload },
              {
                responseType: "arraybuffer",
                headers: {
                  Authorization: `Bearer ${accessToken}`,
                },
              }
            );

            // Membuat URL dan link untuk PDF
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement("a");
            link.href = url;
            link.setAttribute("download", "report.pdf"); // Nama file PDF
            document.body.appendChild(link);
            link.click();
            link.remove();
          } catch (error) {
            console.error("Error downloading PDF:", error);
          }
        } else {
          // Jika lebih dari satu ID, download file ZIP yang berisi beberapa file PDF
          try {
            response = await api.post(
              "/reports/pdf",
              { arrayOfIdReport: idDownload },
              {
                responseType: "blob",
                headers: {
                  Authorization: `Bearer ${accessToken}`,
                },
              }
            );

            // Membuat URL dan link untuk ZIP
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement("a");
            link.href = url;
            link.setAttribute("download", "reports.zip"); // Nama file ZIP
            document.body.appendChild(link);
            link.click();
            link.remove();
          } catch (error) {
            console.error("Error downloading ZIP:", error);
          }
        }

        // Resetting checkbox states
        const newCheckboxListExpanded = { ...checkboxListExpanded };
        Object.keys(newCheckboxListExpanded).forEach((key: any) => {
          newCheckboxListExpanded[key] = new Array(
            permintaanHasilDatas[parseInt(key)]?.length || 0
          ).fill(false);
        });
        setCheckboxListExpanded(newCheckboxListExpanded);
        setSelectAllExpanded({});
        setIdDownload([]);
      } catch (error) {
        console.error("Error downloading file:", error);
      } finally {
        // setLoadingShowPDF(false);
        setLoadingDownloadPerRow({
          ...loadingDownloadPerRow,
          [index]: false,
        });
      }
    } else {
      alert("Pilih data terlebih dahulu");
    }
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-xs bg-white table-auto text-start">
        <thead className="bg-[#F5F8FF] text-tulisan">
          <tr>
            <th colSpan={2} className="py-2">
              No
            </th>
            <th colSpan={3} className="min-w-[120px] border-b-[1.8px]">
              NIK
            </th>
            <th colSpan={3} className="min-w-[150px] border-b-[1.8px]">
              Nama
            </th>
          </tr>
        </thead>
        <tbody>
          {userData.length > 0 ? (
            userData.map((data: userDataProps, index: number) => (
              <React.Fragment key={index}>
                <tr
                  className="border-t border-b cursor-pointer"
                  onClick={() => toggleRow(index, data.person.nik)}
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
                  <td>{index + 1}</td>
                  <td
                    colSpan={3}
                    className="text-center border-b-[1.8px] text-tulisan"
                  >
                    {data.person.nik}
                  </td>
                  <td
                    colSpan={3}
                    className="text-center border-b-[1.8px] text-tulisan"
                  >
                    {data.person.nama}
                  </td>
                </tr>
                {expandedRows.includes(index) && (
                  <>
                    {loadingRows[index] ? (
                      <tr>
                        <td colSpan={8} className="text-center p-2">
                          <span>Loading...</span>
                        </td>
                      </tr>
                    ) : (
                      <>
                        <tr className="text-ijoToska">
                          <th className="p-2 min-w-[70px]"></th>
                          <th className="p-2 bg-[#F5F8FF] border-y-[1.4px]">
                            No
                          </th>
                          <th className="bg-[#F5F8FF] min-w-[150px] border-b-[1.4px]">
                            No. Permintaan
                          </th>
                          <th className="bg-[#F5F8FF] min-w-[150px] border-b-[1.4px]">
                            Tanggal Permintaan
                          </th>
                          <th className="bg-[#F5F8FF] min-w-[150px] border-b-[1.4px]">
                            Jenis Permintaan
                          </th>
                          <th className="bg-[#F5F8FF] min-w-[150px] border-b-[1.4px]">
                            Hasil
                          </th>
                          <th className="bg-[#F5F8FF] min-w-[150px] border-b-[1.4px]">
                            Lihat Detail
                          </th>
                          <th className="min-w-[100px] bg-[#F5F8FF] border-b-[1.4px]">
                            <div className="flex justify-center items-center">
                              <span className="mr-2">Semua</span>
                              <label
                                htmlFor={`selectAll-${index}`}
                                className="cursor-pointer flex items-center"
                              >
                                <input
                                  type="checkbox"
                                  id={`selectAll-${index}`}
                                  className="hidden"
                                  onChange={() =>
                                    handleCheckboxListExpanded(index)
                                  }
                                  checked={selectAllExpanded[index] || false}
                                />
                                <span className="border-[1.5px] bg-slate-100 px-2.5 py-0.5 w-5 h-5 rounded-[3px] flex items-center justify-center relative">
                                  <Image
                                    src="/assets/dashboard/permintaan/ceklisList.png"
                                    alt="ceklis"
                                    width={20}
                                    height={20}
                                    className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 ${
                                      selectAllExpanded[index]
                                        ? "block"
                                        : "hidden"
                                    }`}
                                  />
                                </span>
                              </label>
                            </div>
                          </th>
                        </tr>
                        {permintaanHasilDatas[index]?.map(
                          (item, expandedIndex) => {
                            if (
                              !item.request ||
                              item.request.jenis_permintaan === null
                            ) {
                              return null;
                            }
                            return (
                              <tr key={item.id}>
                                <td></td>
                                <td className="text-center border-b">
                                  {expandedIndex + 1}
                                </td>
                                <td className="text-center border-b">
                                  {item.id_permintaan || "no data"}
                                </td>
                                <td className="text-center border-b">
                                  {item.created_at}
                                </td>
                                <td className="text-center border-b">
                                  {item.request?.jenis_permintaan || "no data"}
                                </td>
                                <td className="text-center border-b">
                                  <div className="bg-green-500 w-24 mx-auto text-white font-semibold py-1 rounded-md">
                                    {item.skor}
                                  </div>
                                </td>
                                <td className="text-center border-b">
                                  <div
                                    onClick={() => handleLihatDetail(item.id)}
                                    className="bg-[#4AC1A2] cursor-pointer w-16 mx-auto font-medium text-white py-1 rounded"
                                  >
                                    Lihat
                                  </div>
                                </td>
                                <td className="flex justify-center border-b py-2">
                                  <label
                                    htmlFor={`checkbox-${index}-${expandedIndex}`}
                                    className="cursor-pointer flex items-center"
                                  >
                                    <input
                                      type="checkbox"
                                      id={`checkbox-${index}-${expandedIndex}`}
                                      className="hidden"
                                      checked={
                                        checkboxListExpanded[index]?.[
                                          expandedIndex
                                        ] || false
                                      }
                                      onChange={() =>
                                        handleCheckboxChangeExpanded(
                                          index,
                                          expandedIndex,
                                          item.id.toString()
                                        )
                                      }
                                    />
                                    <span className="border-[1.5px] bg-[#F6FBFA] px-2.5 py-0.5 w-5 h-5 rounded-[3px] flex items-center justify-center relative">
                                      <Image
                                        src="/assets/dashboard/permintaan/ceklisList.png"
                                        alt="ceklis"
                                        width={20}
                                        height={20}
                                        className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 ${
                                          checkboxListExpanded[index]?.[
                                            expandedIndex
                                          ]
                                            ? "block"
                                            : "hidden"
                                        }`}
                                      />
                                    </span>
                                  </label>
                                </td>
                              </tr>
                            );
                          }
                        )}
                        <tr>
                          <td colSpan={8}>
                            <div className="flex justify-end">
                              <button
                                onClick={() => downloadFiles(index)}
                                className={`flex cursor-pointer justify-center space-x-1 rounded-md mt-2 items-center border-[1.3px] py-1.5 px-2 w-24 float-right mb-2 ${
                                  loadingDownloadPerRow[index]
                                    ? "opacity-50 cursor-not-allowed"
                                    : ""
                                }`}
                                disabled={loadingDownloadPerRow[index]}
                              >
                                {loadingDownloadPerRow[index] ? (
                                  "Downloading.."
                                ) : (
                                  <div>
                                    <Image
                                      src="/assets/dashboard/laporan/download.png"
                                      alt="download-button"
                                      className="inline-block"
                                      width={20}
                                      height={20}
                                    />
                                    <span>Unduh</span>
                                  </div>
                                )}
                              </button>
                            </div>
                          </td>
                        </tr>
                      </>
                    )}
                  </>
                )}
              </React.Fragment>
            ))
          ) : (
            <tr>
              <td
                colSpan={8}
                className="text-center py-2 text-sm text-tulisan border-y"
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

export default TableLaporanUser;
