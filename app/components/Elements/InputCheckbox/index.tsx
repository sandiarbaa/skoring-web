import Image from "next/image";
import React from "react";

interface InputCheckboxProps {
  checkboxValue: boolean;
  setCheckboxValue: React.Dispatch<React.SetStateAction<boolean>>;
}

const InputCheckbox: React.FC<InputCheckboxProps> = ({
  checkboxValue,
  setCheckboxValue,
}) => {
  return (
    <>
      <label
        htmlFor="checkboxRememberMe"
        className={`border px-2.5 py-0.5 w-5 h-5 rounded-[3px] relative mr-1`}
      >
        <Image
          src="/assets/dashboard/permintaan/ceklisList.png"
          alt="ceklis"
          width={20}
          height={20}
          className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 ${
            checkboxValue ? "block" : "hidden"
          }`}
        />
      </label>
      <input
        type="checkbox"
        name="allButton"
        id="checkboxRememberMe"
        className="mr-2 hidden"
        onClick={() => setCheckboxValue(!checkboxValue)}
        checked={checkboxValue}
      />
    </>
  );
};

export default InputCheckbox;
