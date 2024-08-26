import { NextRequest, NextResponse } from "next/server";

interface dataRiwayatAlokasiKuotaProps {
  no: string;
  tanggalRequest: string;
  noPermintaan: string;
  cabang: string;
  departement: string;
  jenisProduk: string;
  jumlahKuota: string;
}

const dataRiwayatAlokasiKuota: dataRiwayatAlokasiKuotaProps[] = [
  {
    no: "1",
    tanggalRequest: "12/12/22 09:22:30",
    noPermintaan: "0007821",
    cabang: "BCA KCP Bintaro Utama",
    departement: "Pengelolaan Moneter",
    jenisProduk: "AI Identity Scoring",
    jumlahKuota: "1000",
  },
  {
    no: "2",
    tanggalRequest: "12/12/22 09:22:30",
    noPermintaan: "0007822",
    cabang: "BCA Kantor Kas Rempoa",
    departement: "Keuangan Syariah",
    jenisProduk: "AI Identity Scoring",
    jumlahKuota: "1000",
  },
  {
    no: "3",
    tanggalRequest: "12/12/22 09:22:30",
    noPermintaan: "0007862",
    cabang: "BCA KCP Radio Dalam",
    departement: "Keuangan Syariah",
    jenisProduk: "AI Character Scoring",
    jumlahKuota: "5000",
  },
  {
    no: "4",
    tanggalRequest: "12/12/22 09:22:30",
    noPermintaan: "0007866",
    cabang: "BCA KCP Cirendeu",
    departement: "0007821",
    jenisProduk: "AI Character Scoring",
    jumlahKuota: "5000",
  },
  {
    no: "5",
    tanggalRequest: "12/12/22 09:22:30",
    noPermintaan: "0007866",
    cabang: "BCA KCP Cirendeu",
    departement: "0007821",
    jenisProduk: "AI Character Scoring",
    jumlahKuota: "5000",
  },
  {
    no: "6",
    tanggalRequest: "12/12/22 09:22:30",
    noPermintaan: "0007866",
    cabang: "BCA KCP Cirendeu",
    departement: "0007821",
    jenisProduk: "AI Character Scoring",
    jumlahKuota: "5000",
  },
  {
    no: "7",
    tanggalRequest: "12/12/22 09:22:30",
    noPermintaan: "0007866",
    cabang: "BCA KCP Cirendeu",
    departement: "0007821",
    jenisProduk: "AI Character Scoring",
    jumlahKuota: "5000",
  },
  {
    no: "8",
    tanggalRequest: "12/12/22 09:22:30",
    noPermintaan: "0007866",
    cabang: "BCA KCP Cirendeu",
    departement: "0007821",
    jenisProduk: "AI Character Scoring",
    jumlahKuota: "5000",
  },
  {
    no: "9",
    tanggalRequest: "12/12/22 09:22:30",
    noPermintaan: "0007866",
    cabang: "BCA KCP Cirendeu",
    departement: "0007821",
    jenisProduk: "AI Character Scoring",
    jumlahKuota: "5000",
  },
  {
    no: "10",
    tanggalRequest: "12/12/22 09:22:30",
    noPermintaan: "0007866",
    cabang: "BCA KCP Cirendeu",
    departement: "0007821",
    jenisProduk: "AI Character Scoring",
    jumlahKuota: "5000",
  },
];

const ITEMS_PER_PAGE = 3;

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const page = parseInt(searchParams.get("page") || "1", 10);
  const offset = (page - 1) * ITEMS_PER_PAGE;
  const paginatedData = dataRiwayatAlokasiKuota.slice(
    offset,
    offset + ITEMS_PER_PAGE
  );

  return NextResponse.json({
    status: 200,
    message: "Success",
    pagination: {
      last_visible_page: Math.ceil(
        dataRiwayatAlokasiKuota.length / ITEMS_PER_PAGE
      ),
      current_page: page,
      item: {
        count: paginatedData.length,
        per_page: ITEMS_PER_PAGE,
      },
    },
    data: paginatedData,
    data_length: dataRiwayatAlokasiKuota.length,
  });
}
