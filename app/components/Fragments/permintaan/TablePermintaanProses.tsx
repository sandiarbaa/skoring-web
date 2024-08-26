import Image from "next/image";
import React from "react";

interface userDataProps {
  no: number;
  nik: string;
  person: {
    nama: string;
  };
  id_permintaan: string;
  created_at: string;
  kendala_proses: string;
  status: string;
}

interface usersProsesDataProps {
  nik: string;
  nama: string;
  tanggalInput: string;
}

const TablePermintaanProses = ({
  userData,
  usersProsesData,
}: {
  userData?: userDataProps[];
  usersProsesData: usersProsesDataProps[];
}) => {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-xs bg-white table-auto text-start">
        <thead className="bg-[#F5F8FF] text-tulisan">
          <tr>
            <th className="p-2 min-w-[50px]">No</th>
            <th className="min-w-[120px]">
              Tanggal Input
              <Image
                src="/assets/dashboard/permintaan/arrowTable.png"
                alt="arrow-table"
                width={8}
                height={8}
                className="inline-block ml-2"
              />
            </th>
            <th className="min-w-[100px]">
              NIK
              <Image
                src="/assets/dashboard/permintaan/arrowTable.png"
                alt="arrow-table"
                width={8}
                height={8}
                className="inline-block ml-2"
              />
            </th>
            <th className="min-w-[150px]">
              Nama
              <Image
                src="/assets/dashboard/permintaan/arrowTable.png"
                alt="arrow-table"
                width={8}
                height={8}
                className="inline-block ml-2"
              />
            </th>
            <th className="min-w-[150px]">Hasil</th>
          </tr>
        </thead>
        <tbody>
          {usersProsesData.length > 0 ? (
            usersProsesData.map((data: usersProsesDataProps, index: number) => (
              <tr key={index} className="border-t border-b">
                <td className="p-3 text-center">{index + 1}</td>
                <td className="text-center text-tulisan">
                  {data.tanggalInput}
                </td>
                <td className="text-center text-tulisan">{data.nik}</td>
                <td className="pl-5 font-medium">{data.nama}</td>
                <td className="pl-5 font-medium">
                  <div className="bg-[#F59E0B] mx-auto px-2 py-1 w-28 rounded-md flex items-center justify-center">
                    <span className="text-white">Menunggu</span>
                    <div className="loader mx-auto"></div>
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan={5}
                className="text-center py-2 text-sm text-tulisan border-y italic"
              >
                Belum ada permintaan yang sedang di proses!
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default TablePermintaanProses;
