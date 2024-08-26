import React from "react";
import {
  BiChevronLeft,
  BiChevronRight,
  BiChevronsLeft,
  BiChevronsRight,
} from "react-icons/bi";

interface PaginationProps {
  noAwal: number;
  noAkhir: number;
  totalData: number;
  page: number;
  setPage: (page: number) => void;
  prevButton: () => void;
  nextButton: () => void;
  numberPage: number[];
}

const Pagination: React.FC<PaginationProps> = ({
  noAwal,
  noAkhir,
  totalData,
  page,
  setPage,
  prevButton,
  nextButton,
  numberPage,
}) => {
  // Tentukan batas berapa page yang akan ditampilkan di pagination
  const maxPagesToShow = 5;
  const startPage = Math.max(1, page - Math.floor(maxPagesToShow / 2));
  const endPage = Math.min(startPage + maxPagesToShow - 1, numberPage.length);

  // Buat array untuk page yang akan ditampilkan
  const visiblePages = numberPage.slice(startPage - 1, endPage);

  // Fungsi untuk loncat ke halaman berikutnya sebanyak 10 page
  const handleDoubleNext = () => {
    // setPage((prevPage) => Math.min(prevPage + 10, numberPage.length));
    const newPage = Math.min(page + 10, numberPage.length);
    setPage(newPage);
  };

  // Fungsi untuk loncat ke halaman sebelumnya sebanyak 10 page
  const handleDoublePrev = () => {
    // setPage((prevPage) => Math.max(prevPage - 10, 1));
    const newPage = Math.max(page - 10, 1);
    setPage(newPage);
  };

  return (
    <div className="flex flex-col items-center justify-center w-full px-3 pt-5 lg:flex-row lg:justify-between">
      <div className="flex items-center mb-3 text-sm font-medium text-tulisan">
        Menampilkan {noAwal} - {noAkhir} dari {totalData} hasil
      </div>

      <div className="flex justify-center lg:justify-end w-full max-w-xs pb-5">
        <div
          onClick={handleDoublePrev}
          className="flex items-center p-1 mx-1 transition-all duration-300 border rounded cursor-pointer group hover:bg-ijoToska"
        >
          <BiChevronsLeft className="text-2xl text-ijoToska group-hover:text-white" />
        </div>

        <div
          onClick={prevButton}
          className="flex items-center p-1 transition-all duration-300 border rounded cursor-pointer group hover:bg-ijoToska"
        >
          <BiChevronLeft className="text-2xl text-ijoToska group-hover:text-white" />
        </div>

        <ul className="flex mx-5 space-x-2">
          {visiblePages.map((item, index) => (
            <li
              key={index}
              onClick={() => setPage(item)}
              className={`cursor-pointer px-3.5 text-sm py-0.5 rounded flex items-center border ${
                item === page ? "bg-ijoToska text-white" : "text-gray-400"
              }`}
            >
              {item}
            </li>
          ))}
        </ul>

        <div
          onClick={nextButton}
          className="flex items-center p-1 transition-all duration-300 border rounded cursor-pointer group hover:bg-ijoToska"
        >
          <BiChevronRight className="text-2xl text-ijoToska group-hover:text-white" />
        </div>

        <div
          onClick={handleDoubleNext}
          className="flex items-center p-1 mx-1 transition-all duration-300 border rounded cursor-pointer group hover:bg-ijoToska"
        >
          <BiChevronsRight className="text-2xl text-ijoToska group-hover:text-white" />
        </div>
      </div>
    </div>
  );
};

export default Pagination;
