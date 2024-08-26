import React from "react";
import Label from "./Label";
import Input from "./Input";

interface Props {
  type: string;
  htmlForId: string;
  textLabel: string;
  placeholder: string;
  classStyleLabel: string;
  classStyleInput: string;
  inputState?: boolean;
  classStyleInputTrue?: string;
}
const InputForm = ({
  type,
  htmlForId,
  textLabel,
  placeholder,
  classStyleLabel,
  classStyleInput,
  inputState,
  classStyleInputTrue,
}: Props) => {
  return (
    <div className="flex flex-col mb-3">
      <Label
        htmlForId={type}
        textLabel={textLabel}
        classStyleLabel={classStyleLabel}
      />
      <Input
        type={type}
        htmlForId={htmlForId}
        placeholder={placeholder}
        classStyleInput={classStyleInput}
        inputState={inputState}
        classStyleInputTrue={classStyleInputTrue}
      />
    </div>
  );
};

export default InputForm;
