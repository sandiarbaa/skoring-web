import Image from "next/image";
import React, { useState, useEffect } from "react";

interface userDataProps {
  no: number;
  nik: string;
  nama: string;
  created_at: string;
}

interface tablePermintaanProps {
  userData: userDataProps[];
  checkboxPerson: (nik: string) => void;
  setPersonsProses: any;
  setUsersProsesData: any;
}

const TablePermintaan: React.FC<tablePermintaanProps> = ({
  userData,
  checkboxPerson,
  setPersonsProses,
  setUsersProsesData,
}) => {
  const [checkboxListPermintaan, setCheckboxListPermintaan] = useState<
    boolean[]
  >(new Array(userData.length).fill(false)); // Array boolean yang menyimpan status checkbox untuk setiap baris data pengguna. Misalnya, true berarti checkbox dicentang.
  const [selectAll, setSelectAll] = useState<boolean>(false); // Boolean yang menyimpan status checkbox "Select All". Jika true, berarti semua checkbox dipilih.

  // Mengatur ulang checkboxListPermintaan ketika data pengguna (userData) berubah. (selalu ter-update)
  useEffect(() => {
    setCheckboxListPermintaan(new Array(userData.length).fill(false));
  }, [userData]);

  // Jika selectAll dicentang (true), semua user data akan ditambahkan ke dalam personsProses dan usersProsesData.
  const handleSelectAll = () => {
    const newSelectAll = !selectAll; // state selectAll di isi dengan kebalikan nya
    setSelectAll(newSelectAll);
    const updatedCheckboxes = new Array(userData.length).fill(newSelectAll);
    setCheckboxListPermintaan(updatedCheckboxes); // mengisi state array checkboxListPermintaan dengan array updatedCheckboxes yg semua elemen nya bernilai sesuai newSelectAll

    if (newSelectAll) {
      // Jika semua checkbox dicentang, tambahkan semua user data ke personsProses dan usersProsesData
      const allSelectedUsers = userData.map(({ nik, nama, created_at }) => ({
        nik,
        nama,
        tanggalInput: created_at,
      }));

      setPersonsProses(allSelectedUsers);
      setUsersProsesData(allSelectedUsers);
      userData.forEach((data) => checkboxPerson(data.nik)); // Pastikan memanggil checkboxPerson untuk setiap NIK
    } else {
      // Jika checkbox dicentang ulang untuk membatalkan select all, kosongkan personsProses dan usersProsesData
      setPersonsProses([]);
      setUsersProsesData([]);
      userData.forEach((data) => checkboxPerson(data.nik)); // Pastikan memanggil checkboxPerson untuk setiap NIK
    }
  };

  const handleCheckboxChange = (
    index: number,
    nikPerson: string,
    nama: string,
    tanggalInput: string
  ) => {
    const updatedCheckboxes = [...checkboxListPermintaan];
    updatedCheckboxes[index] = !updatedCheckboxes[index];
    setCheckboxListPermintaan(updatedCheckboxes);

    const selected = updatedCheckboxes[index];
    if (selected) {
      setPersonsProses((prev: any) => [
        ...prev,
        { nik: nikPerson, nama, tanggalInput },
      ]);
      setUsersProsesData((prev: any) => [
        ...prev,
        { nik: nikPerson, nama, tanggalInput },
      ]);
    } else {
      setPersonsProses((prev: any) =>
        prev.filter((person: any) => person.nik !== nikPerson)
      );
      setUsersProsesData((prev: any) =>
        prev.filter((person: any) => person.nik !== nikPerson)
      );
    }

    // kalau ada salah 1 checkbox yg di ubah maka selectAll akan false, tapi kalau semua checkbox di centang, selectAll akan bernilai true
    setSelectAll(updatedCheckboxes.every((checkbox) => checkbox));
    checkboxPerson(nikPerson); // kirim nik checkbox yg di centang atau di un-centang ke fungsi checkboxPerson
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-xs bg-white table-auto text-start">
        <thead className="bg-[#F5F8FF] text-tulisan">
          <tr>
            <th className="p-2 min-w-[50px]">No</th>
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
            <th className="min-w-[150px]">
              Tanggal Input
              <Image
                src="/assets/dashboard/permintaan/arrowTable.png"
                alt="arrow-table"
                width={8}
                height={8}
                className="inline-block ml-2"
              />
            </th>
            <th className="min-w-[120px]">Berkas</th>
            <th className="min-w-[100px]">Action</th>
            <th className="min-w-[100px] p-2">
              <div className="flex justify-center items-center">
                {userData.length > 0 && (
                  <>
                    <label
                      htmlFor="checkboxListAllPermintaan"
                      className={`border px-2.5 py-0.5 w-5 h-5 rounded-[3px] relative mr-1`}
                    >
                      <Image
                        src="/assets/dashboard/permintaan/ceklisList.png"
                        alt="ceklis"
                        width={20}
                        height={20}
                        className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 ${
                          selectAll ? "block" : "hidden"
                        }`}
                      />
                    </label>
                    <input
                      type="checkbox"
                      name="allButton"
                      id="checkboxListAllPermintaan"
                      className="mr-2 hidden"
                      onClick={handleSelectAll}
                      checked={selectAll}
                    />
                  </>
                )}
                Semua
              </div>
            </th>
          </tr>
        </thead>
        <tbody>
          {userData.length > 0 ? (
            userData.map((data: userDataProps, index: number) => (
              <tr key={index} className="border-t border-b">
                <td className="p-2 text-center">{index + 1}</td>
                <td className="text-center text-tulisan">{data.nik}</td>
                <td className="pl-5 font-medium">{data.nama}</td>
                <td className="text-center text-tulisan">{data.created_at}</td>
                <td className="font-medium text-center text-blue-800">
                  Lihat Detail
                  <Image
                    src="/assets/dashboard/permintaan/ceklis.png"
                    alt="arrow-table"
                    width={15}
                    height={0}
                    className="inline-block ml-2"
                  />
                </td>
                <td className="text-center">
                  <Image
                    src="/assets/dashboard/permintaan/edit.png"
                    alt="arrow-table"
                    width={25}
                    height={25}
                    className="inline-block ml-2"
                  />
                  <Image
                    src="/assets/dashboard/permintaan/delete.png"
                    alt="arrow-table"
                    width={25}
                    height={25}
                    className="inline-block ml-2"
                  />
                </td>
                <td className="text-center">
                  <label
                    htmlFor={`checkboxList${index}`}
                    className={`border px-2.5 py-0.5 rounded-[3px] relative`}
                  >
                    <Image
                      src="/assets/dashboard/permintaan/ceklisList.png"
                      alt="ceklis"
                      width={20}
                      height={20}
                      className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 ${
                        checkboxListPermintaan[index] ? "block" : "hidden"
                      }`}
                    />
                  </label>
                  <input
                    type="checkbox"
                    name={`checkboxList${index}`}
                    id={`checkboxList${index}`}
                    checked={checkboxListPermintaan[index]}
                    onChange={() =>
                      handleCheckboxChange(
                        index,
                        data.nik,
                        data.nama,
                        data.created_at
                      )
                    }
                    className="hidden"
                  />
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan={7}
                className="text-center py-2 text-sm text-tulisan border-y italic"
              >
                Data masih kosong!
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default TablePermintaan;
