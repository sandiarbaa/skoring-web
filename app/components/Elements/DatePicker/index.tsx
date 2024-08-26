import Image from "next/image";
import React, { useRef } from "react";

const DatePicker = () => {
  const dateInputRef = useRef<HTMLInputElement>(null);
  const placeholderRef = useRef<HTMLDivElement>(null);

  const handleFocus = () => {
    if (dateInputRef.current) {
      dateInputRef.current.type = "date";
    }
    if (placeholderRef.current) {
      placeholderRef.current.style.display = "none";
    }
  };

  const handleBlur = () => {
    if (dateInputRef.current && !dateInputRef.current.value) {
      dateInputRef.current.type = "text";
      if (placeholderRef.current) {
        placeholderRef.current.style.display = "flex";
      }
    }
  };

  return (
    <div className="relative">
      <div
        ref={placeholderRef}
        className="absolute text-sm left-3 top-1/2 transform -translate-y-1/2 text-gray-400 flex items-center space-x-2 pointer-events-none"
      >
        <span>Dari</span>
        <Image
          src="/assets/dashboard/permintaan/calendar-search.png"
          alt="arrow-down-date"
          width={20}
          height={0}
        />
        <span>Sampai</span>
        <Image
          src="/assets/dashboard/permintaan/calendar-search.png"
          alt="arrow-down-date"
          width={20}
          height={0}
        />
        <span>tt/bb/tahun</span>
        <Image
          src="/assets/dashboard/permintaan/arrow-down-date.png"
          alt="arrow-down-date"
          width={10}
          height={0}
        />
      </div>
      <input
        type="text"
        name="date"
        id="date"
        className="border w-[290px] lg:w-[270px] py-2 rounded-md px-3"
        onFocus={handleFocus}
        onBlur={handleBlur}
        ref={dateInputRef}
      />
    </div>
  );
};

export default DatePicker;
