import React, { Dispatch, SetStateAction } from "react";

type DropDownRegisterProp = {
  setRole: Dispatch<SetStateAction<string>>;
};

const DropDownRegister = ({ setRole }: DropDownRegisterProp) => {
  return (
    <div className="w-48">
      <select
        id="fruits"
        name="fruits"
        onChange={(e) => setRole(e.target.value)}
        className={`block text-sm w-[200px] rounded-md border-gray-300 bg-[#F5F5F5] p-2 border shadow focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50`}
      >
        <option value="user">User</option>
        <option value="admin">Admin</option>
      </select>
    </div>
  );
};

export default DropDownRegister;
