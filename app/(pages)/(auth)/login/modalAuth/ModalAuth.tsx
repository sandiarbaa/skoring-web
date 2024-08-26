import Image from "next/image";
import { useEffect, useState } from "react";

type ModalAuthProp = {
  isVisible: boolean;
  msg: string;
  status: "success" | "error";
  onClose: () => void;
};

const ModalAuth = ({ msg, isVisible, onClose, status }: ModalAuthProp) => {
  const [visible, setVisible] = useState(isVisible);
  const bgColor = status === "success" ? "bg-ijoToska" : "bg-red-500";

  useEffect(() => {
    setVisible(isVisible);
  }, [isVisible]);

  if (!visible) return null;

  return (
    <div className="fixed top-10 left-1/2 transform -translate-x-1/2 z-50">
      <div
        className={`${bgColor} text-white p-4 rounded-md shadow-lg flex items-center`}
      >
        {msg}
        <button
          onClick={() => {
            setVisible(false); // Menyembunyikan modal
            onClose(); // Memanggil fungsi onClose untuk memberi tahu komponen induk
          }}
        >
          <Image
            src="/assets/login/close.png"
            alt="none"
            className="pl-3"
            width={35}
            height={35}
          />
        </button>
      </div>
    </div>
  );
};

export default ModalAuth;
