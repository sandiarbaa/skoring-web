import Image from "next/image";
import React from "react";

const SearchBox = () => {
  return (
    <div className="relative inline-block mr-2">
      <input
        type="text"
        name="search"
        id="search"
        className="border text-sm w-[288px] -mr-2 lg:mr-0 lg:w-[300px] py-2.5 rounded-md px-3 pl-10" // Tambahkan padding kiri untuk ikon
        placeholder="Search NIK, Nama, No Permintaan"
        autoComplete="off"
      />
      <Image
        src="/assets/dashboard/permintaan/search.png"
        alt="search"
        width={20}
        height={0}
        className="absolute text-lg left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
      />
    </div>
  );
};

export default SearchBox;
