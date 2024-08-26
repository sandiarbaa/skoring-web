import { NextRequest, NextResponse } from "next/server";
import { dataUsersPermintaanProses } from "@/app/utils/dataUsersPermintaanProses";

const ITEMS_PER_PAGE = 16;

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const page = parseInt(searchParams.get("page") || "1", 10);
  const offset = (page - 1) * ITEMS_PER_PAGE;
  const paginatedData = dataUsersPermintaanProses.slice(
    offset,
    offset + ITEMS_PER_PAGE
  );

  return NextResponse.json({
    status: 200,
    message: "Success",
    pagination: {
      last_visible_page: Math.ceil(
        dataUsersPermintaanProses.length / ITEMS_PER_PAGE
      ),
      current_page: page,
      item: {
        count: paginatedData.length,
        per_page: ITEMS_PER_PAGE,
      },
    },
    data: paginatedData,
    data_length: dataUsersPermintaanProses.length,
  });
}
