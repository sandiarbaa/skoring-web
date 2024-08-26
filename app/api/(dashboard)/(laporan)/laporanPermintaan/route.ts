import { NextRequest, NextResponse } from "next/server";

interface dataLaporanPermintaanProps {
  no: string;
  tanggalInput: string;
  jenisPermintaan: string;
  jumlahCustomer: string;
  noPermintaan: string;
  tanggalPermintaan: string;
  tanggalSelesai: string;
}

const dataLaporanPermintaan: dataLaporanPermintaanProps[] = [
  {
    no: "1",
    tanggalInput: "12/12/22 09:22:30",
    jenisPermintaan: "AI Identity Scoring",
    jumlahCustomer: "4",
    noPermintaan: "0007821",
    tanggalPermintaan: "12/12/22 09:22:30",
    tanggalSelesai: "12/12/22 09:22:30",
  },
  {
    no: "2",
    tanggalInput: "12/12/22 09:22:30",
    jenisPermintaan: "AI Character Scoring",
    jumlahCustomer: "4",
    noPermintaan: "0007821",
    tanggalPermintaan: "12/12/22 09:22:30",
    tanggalSelesai: "12/12/22 09:22:30",
  },
  {
    no: "3",
    tanggalInput: "12/12/22 09:22:30",
    jenisPermintaan: "AI Identity Scoring",
    jumlahCustomer: "4",
    noPermintaan: "0007821",
    tanggalPermintaan: "12/12/22 09:22:30",
    tanggalSelesai: "12/12/22 09:22:30",
  },
  {
    no: "4",
    tanggalInput: "12/12/22 09:22:30",
    jenisPermintaan: "AI Constraint Analysis",
    jumlahCustomer: "4",
    noPermintaan: "0007821",
    tanggalPermintaan: "12/12/22 09:22:30",
    tanggalSelesai: "12/12/22 09:22:30",
  },
  {
    no: "5",
    tanggalInput: "12/12/22 09:22:30",
    jenisPermintaan: "AI Character Scoring",
    jumlahCustomer: "4",
    noPermintaan: "0007821",
    tanggalPermintaan: "12/12/22 09:22:30",
    tanggalSelesai: "12/12/22 09:22:30",
  },
  {
    no: "6",
    tanggalInput: "12/12/22 09:22:30",
    jenisPermintaan: "AI Legal & Permit Analysis",
    jumlahCustomer: "4",
    noPermintaan: "0007821",
    tanggalPermintaan: "12/12/22 09:22:30",
    tanggalSelesai: "12/12/22 09:22:30",
  },
  {
    no: "7",
    tanggalInput: "12/12/22 09:22:30",
    jenisPermintaan: "AI Collateral Guarantee",
    jumlahCustomer: "4",
    noPermintaan: "0007821",
    tanggalPermintaan: "12/12/22 09:22:30",
    tanggalSelesai: "12/12/22 09:22:30",
  },
  {
    no: "8",
    tanggalInput: "12/12/22 09:22:30",
    jenisPermintaan: "AI Legal & Permit Analysis",
    jumlahCustomer: "4",
    noPermintaan: "0007821",
    tanggalPermintaan: "12/12/22 09:22:30",
    tanggalSelesai: "12/12/22 09:22:30",
  },
  {
    no: "9",
    tanggalInput: "12/12/22 09:22:30",
    jenisPermintaan: "AI Identity Scoring",
    jumlahCustomer: "4",
    noPermintaan: "0007821",
    tanggalPermintaan: "12/12/22 09:22:30",
    tanggalSelesai: "12/12/22 09:22:30",
  },
  {
    no: "10",
    tanggalInput: "12/12/22 09:22:30",
    jenisPermintaan: "AI Constraint Analysis",
    jumlahCustomer: "4",
    noPermintaan: "0007821",
    tanggalPermintaan: "12/12/22 09:22:30",
    tanggalSelesai: "12/12/22 09:22:30",
  },
];

const ITEMS_PER_PAGE = 3;

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const page = parseInt(searchParams.get("page") || "1", 10);
  const offset = (page - 1) * ITEMS_PER_PAGE;
  const paginatedData = dataLaporanPermintaan.slice(
    offset,
    offset + ITEMS_PER_PAGE
  );

  return NextResponse.json({
    status: 200,
    message: "Success",
    pagination: {
      last_visible_page: Math.ceil(
        dataLaporanPermintaan.length / ITEMS_PER_PAGE
      ),
      current_page: page,
      item: {
        count: paginatedData.length,
        per_page: ITEMS_PER_PAGE,
      },
    },
    data: paginatedData,
    data_length: dataLaporanPermintaan.length,
  });
}
