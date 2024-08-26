import React from "react";

interface userDataProps {
  no: number;
  namaDokumen: string;
  berhasil: number;
  gagal: number;
  total: string;
  persentaseGagal: string;
}

const TableLaporanFitur = ({ userData }: { userData: userDataProps[] }) => {
  return (
    <div className="bg-blue-500 overflow-x-auto">
      <table className="w-full text-xs bg-white table-auto text-start">
        <thead className="bg-[#F5F8FF] text-tulisan">
          <tr>
            <th className="p-2 text-center w-1/6">No</th>
            <th className="text-center min-w-[150px]">Nama Dokumen</th>
            <th className="text-center w-1/6">Berhasil</th>
            <th className="text-center w-1/6">Gagal</th>
            <th className="text-center w-1/6">Total</th>
            <th className="text-center min-w-[150px]">Persentase Gagal</th>
          </tr>
        </thead>
        <tbody>
          {userData.map((data: userDataProps, index: number) => (
            <React.Fragment key={index}>
              <tr className="border-t border-b cursor-pointer">
                <td className="p-2 text-center w-1/6">{data.no}</td>
                <td className="text-center w-1/6 text-tulisan">
                  {data.namaDokumen}
                </td>
                <td className="text-center w-1/6 text-tulisan">
                  {data.berhasil}
                </td>
                <td className="text-center w-1/6 text-tulisan">{data.gagal}</td>
                <td className="text-center w-1/6 text-tulisan">{data.total}</td>
                <td className="text-center w-1/6 text-tulisan">
                  {data.persentaseGagal}
                </td>
              </tr>
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TableLaporanFitur;
