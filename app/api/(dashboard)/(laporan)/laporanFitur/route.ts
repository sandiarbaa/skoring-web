import { NextRequest, NextResponse } from "next/server";

interface dataLaporanFiturProps {
  no: number;
  namaDokumen: string;
  berhasil: number;
  gagal: number;
  total: string;
  persentaseGagal: string;
}

const dataLaporanFitur: dataLaporanFiturProps[] = [
  {
    no: 1,
    namaDokumen: "KTP",
    berhasil: 1000,
    gagal: 1000,
    total: "2.000",
    persentaseGagal: "50%",
  },
  {
    no: 2,
    namaDokumen: "Selfie Diri",
    berhasil: 1000,
    gagal: 1000,
    total: "2.000",
    persentaseGagal: "50%",
  },
  {
    no: 3,
    namaDokumen: "Surat Keterangan Domisili Usaha",
    berhasil: 1000,
    gagal: 1000,
    total: "2.000",
    persentaseGagal: "50%",
  },
  {
    no: 4,
    namaDokumen: "Surat Nomor Pokok Wajib Pajak Pribadi",
    berhasil: 1000,
    gagal: 1000,
    total: "2.000",
    persentaseGagal: "50%",
  },
  {
    no: 5,
    namaDokumen: "Surat Nomor Pokok Wajib Pajak Perusahaan",
    berhasil: 1000,
    gagal: 1000,
    total: "2.000",
    persentaseGagal: "50%",
  },
  {
    no: 6,
    namaDokumen: "Surat Nomor Akta Notaris",
    berhasil: 1000,
    gagal: 1000,
    total: "2.000",
    persentaseGagal: "50%",
  },
  {
    no: 7,
    namaDokumen: "Surat Nomor Induk Berusaha",
    berhasil: 1000,
    gagal: 1000,
    total: "2.000",
    persentaseGagal: "50%",
  },
  {
    no: 8,
    namaDokumen: "Surat Izin Usaha Perdagangan",
    berhasil: 1000,
    gagal: 1000,
    total: "2.000",
    persentaseGagal: "50%",
  },
  {
    no: 9,
    namaDokumen: "Surat Izin Dinas",
    berhasil: 1000,
    gagal: 1000,
    total: "2.000",
    persentaseGagal: "50%",
  },
  {
    no: 10,
    namaDokumen: "Surat Tanda Daftar Perusahaan",
    berhasil: 1000,
    gagal: 1000,
    total: "2.000",
    persentaseGagal: "50%",
  },
  {
    no: 11,
    namaDokumen: "Kartu Keluarga",
    berhasil: 1000,
    gagal: 1000,
    total: "2.000",
    persentaseGagal: "50%",
  },
  {
    no: 12,
    namaDokumen: "Siap Gaji",
    berhasil: 1000,
    gagal: 1000,
    total: "2.000",
    persentaseGagal: "50%",
  },
  {
    no: 13,
    namaDokumen: "NPWP",
    berhasil: 1000,
    gagal: 1000,
    total: "2.000",
    persentaseGagal: "50%",
  },
  {
    no: 14,
    namaDokumen: "Surat Izin Tempat Usaha",
    berhasil: 1000,
    gagal: 1000,
    total: "2.000",
    persentaseGagal: "50%",
  },
  {
    no: 15,
    namaDokumen: "Surat Izin Prinsip",
    berhasil: 1000,
    gagal: 1000,
    total: "2.000",
    persentaseGagal: "50%",
  },
  {
    no: 16,
    namaDokumen: "Surat Izin Tempat Usaha",
    berhasil: 1000,
    gagal: 1000,
    total: "2.000",
    persentaseGagal: "50%",
  },
  {
    no: 17,
    namaDokumen: "Surat Izin Tempat Usaha",
    berhasil: 1000,
    gagal: 1000,
    total: "2.000",
    persentaseGagal: "50%",
  },
  {
    no: 18,
    namaDokumen: "Surat Izin Tempat Usaha",
    berhasil: 1000,
    gagal: 1000,
    total: "2.000",
    persentaseGagal: "50%",
  },
  {
    no: 19,
    namaDokumen: "Surat Izin Tempat Usaha",
    berhasil: 1000,
    gagal: 1000,
    total: "2.000",
    persentaseGagal: "50%",
  },
  {
    no: 20,
    namaDokumen: "Surat Izin Tempat Usaha",
    berhasil: 1000,
    gagal: 1000,
    total: "2.000",
    persentaseGagal: "50%",
  },
];

const ITEMS_PER_PAGE = 5;

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const page = parseInt(searchParams.get("page") || "1", 10);
  const offset = (page - 1) * ITEMS_PER_PAGE;
  const paginatedData = dataLaporanFitur.slice(offset, offset + ITEMS_PER_PAGE);

  return NextResponse.json({
    status: 200,
    message: "Success",
    pagination: {
      last_visible_page: Math.ceil(dataLaporanFitur.length / ITEMS_PER_PAGE),
      current_page: page,
      item: {
        count: paginatedData.length,
        per_page: ITEMS_PER_PAGE,
      },
    },
    data: paginatedData,
    data_length: dataLaporanFitur.length,
  });
}
