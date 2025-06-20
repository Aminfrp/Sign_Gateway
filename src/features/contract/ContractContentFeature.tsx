import { useSessionStorage } from "@/hooks/useSessionStorage";
import { ContractContextType } from "@/types";
import { ChevronDown } from "lucide-react";
import { useState} from "react";
import { Card, PdfViewer} from "../../components";

export const ContractContentFeature = () => {
  const [contract] = useSessionStorage<ContractContextType>("CONTRACT");
  const [isShowDescription, setIsShowDescription] = useState(false);


  return (
    <Card className="lg:col-span-8 xs:col-span-12 flex flex-col p-4 h-full overflow-auto">
      <Card.Body className="flex-1 flex flex-col">
        <div className="flex xs:flex-col md:flex-row md:items-between xs:items-start xs:gap-5 justify-between pt-5">
          {
              contract?.result?.title && <h1 className="font-yekan-bold text-lg xs:order-2 md:order-1">
            {contract?.result?.title}
          </h1>
          }
          {contract && <div className="bg-green-600/10 text-green-600 rounded-full px-3 py-2 text-sm  xs:order-1 md:order-2">
            زمان باقی‌مانده امضا:{" "}
            { new Date(contract?.result?.expirationTime).toLocaleString("fa-IR")}
          </div>}
        </div>
        {contract && <div className="flex text-xs text-slate-400 gap-3">
          <div>شماره سند:{contract?.result?.id}</div>
        </div>}
        {contract && <div
            className="text-primary flex gap-2 py-3 cursor-pointer select-none"
            onClick={() => setIsShowDescription(!isShowDescription)}
        >
          <p className={`text-sm `}>اطلاعات بیشتر</p>
          <ChevronDown
              className={`transition-transform ${
                  isShowDescription && "rotate-180"
              }`}
          />
        </div>}
        <div
          className={`transition-[max-height] 
                duration-200 
                ease-in-out
                overflow-hidden
                flex items-center
                ${isShowDescription ? "max-h-[1000px] " : "max-h-0"}`}
        >
          {contract?.result?.description}
        </div>
        <div className="flex-1 mt-5 min-h-80">
          <PdfViewer
            url={contract?.result?.downloadLink || ""}
            status={
              contract && contract.result?.downloadLink ? "success" : "pending"
            }
          />
        </div>
      </Card.Body>
    </Card>
  )
}