import Image from "next/image";
import Link from "next/link";

type empetyData = {
  href?: string;
  label?: string;
  props: boolean;
};

const EmpetyData: React.FC<empetyData> = ({ href, label, props }) => {
  return (
    <div className="flex justify-center items-center text-xl h-40">
      <div className="flex flex-col justify-center items-center">
        <div>
          <Image
            src="/assets/dataEmpety/empety.png"
            width={50}
            height={50}
            alt="none"
          />
        </div>
        <div className="text-lg font-semibold py-1 text-tulisan italic">Fitur Belum Tersedia</div>
        {/* <div className="text-lg font-semibold py-1">Data Tidak Tersedia</div> */}
        {/* <div className="text-xs text-slate-700">
          Data akan ditampilkan apabila sudah tersedia{" "}
        </div> */}
        {/* <div className="text-xs text-slate-700 pb-4">data yang diperlukan</div> */}
        {props && href ? (
          <Link href={href}>
            <div className="bg-ijoToska py-1 px-10 text-base text-white rounded-md">
              {label}
            </div>
          </Link>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default EmpetyData;
