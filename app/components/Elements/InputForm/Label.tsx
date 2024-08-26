import React from "react";

interface Props {
  htmlForId: string;
  textLabel: string;
  classStyleLabel: string;
}
const Label = ({ htmlForId, textLabel, classStyleLabel }: Props) => {
  return (
    // <label htmlFor={type} className="mb-2 text-[16px] font-semibold">
    <label htmlFor={htmlForId} className={classStyleLabel}>
      {textLabel} <span className="text-red-500">*</span>
    </label>
  );
};

export default Label;
