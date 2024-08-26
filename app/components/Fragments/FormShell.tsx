import React from "react";

interface FormProps {
  children: React.ReactNode;
  onSubmit?: (event: React.FormEvent<HTMLFormElement>) => void;
}
const FormShell: React.FC<FormProps> = ({ children, onSubmit }) => {
  return (
    <form action="" onSubmit={onSubmit}>
      {children}
    </form>
  );
};

export default FormShell;
