import React from "react";

interface ButtonProps {
  children: React.ReactNode;
  classStyle: string;
}

const Button: React.FC<ButtonProps> = ({ children, classStyle }) => {
  return (
    <button type="submit" className={classStyle}>
      {children}
    </button>
  );
};

export default Button;
