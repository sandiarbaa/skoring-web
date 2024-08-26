import { NextRequest, NextResponse } from "next/server";

const dataLaporanUser = [
  {
    no: "1",
    nik: "320114573458",
    nama: "Ludwig van Biethoven",
  },
  {
    no: "2",
    nik: "320114573458",
    nama: "Ludwig van Biethoven",
  },
  {
    no: "3",
    nik: "320114573458",
    nama: "Ludwig van Biethoven",
  },
  {
    no: "4",
    nik: "320114573458",
    nama: "Ludwig van Biethoven",
  },
  {
    no: "5",
    nik: "320114573458",
    nama: "Ludwig van Biethoven",
  },
  {
    no: "6",
    nik: "320114573458",
    nama: "Ludwig van Biethoven",
  },
];

const ITEMS_PER_PAGE = 3;

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const page = parseInt(searchParams.get("page") || "1", 10);
  const offset = (page - 1) * ITEMS_PER_PAGE;
  const paginatedData = dataLaporanUser.slice(offset, offset + ITEMS_PER_PAGE);

  return NextResponse.json({
    status: 200,
    message: "Success",
    pagination: {
      last_visible_page: Math.ceil(dataLaporanUser.length / ITEMS_PER_PAGE),
      current_page: page,
      item: {
        count: paginatedData.length,
        per_page: ITEMS_PER_PAGE,
      },
    },
    data: paginatedData,
    data_length: dataLaporanUser.length,
  });
}
