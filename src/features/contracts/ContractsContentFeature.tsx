import { useSessionStorage } from "@/hooks/useSessionStorage";
import { ContractsContextType } from "@/types";
import { ChevronDown } from "lucide-react";
import {useMemo, useState} from "react";
import {Button, Card, PdfViewer, SelectChips} from "../../components";

export const ContractsContentFeature = () => {
  const [contracts] = useSessionStorage<ContractsContextType>("CONTRACTS");
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [isShowDescription, setIsShowDescription] = useState(false);

  const activeContract = useMemo(()=>{return contracts?.result[activeIndex]},[activeIndex])

  return (
    <Card className="lg:col-span-8 xs:col-span-12 flex flex-col p-4 h-full overflow-auto">
      <Card.Body className="flex-1 flex flex-col">
        <div className="flex gap-2">
          {contracts?.result.map((item,index) => (
          <SelectChips title={item.title} key={item.id} isActive={activeIndex===index} onClick={()=>setActiveIndex(index)}></SelectChips>
          ))}
        </div>
        <div className="flex xs:flex-col md:flex-row md:items-between xs:items-start xs:gap-5 justify-between pt-5">
          {
            activeContract && <h1 className="font-yekan-bold text-lg xs:order-2 md:order-1">
            {activeContract?.title}
          </h1>
          }
          {activeContract && <div className="bg-green-600/10 text-green-600 rounded-full px-3 py-2 text-sm  xs:order-1 md:order-2">
            زمان باقی‌مانده امضا:{" "}
            { new Date(activeContract?.expirationTime).toLocaleString("fa-IR")}
          </div>}
        </div>
        {activeContract && <div className="flex text-xs text-slate-400 gap-3">
          <div>شماره سند:{activeContract?.id}</div>
        </div>}
        {activeContract && <div
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
          {activeContract?.description}
        </div>
        <div className="flex-1 mt-5 min-h-80">
          <PdfViewer
            url={activeContract?.downloadLink || ""}
            status={
              activeContract && activeContract?.downloadLink ? "success" : "pending"
            }
          />
        </div>
        {contracts && <div className="flex justify-center items-center gap-5">
          <Button variant="outline" className="w-24" onClick={() => setActiveIndex(prev => prev + 1)}
                  disabled={contracts?.result.length === activeIndex + 1}>
            سند بعدی
          </Button>
          <Button variant="outline" className="w-24" onClick={() => setActiveIndex(prev => prev - 1)}
                  disabled={activeIndex === 0}>
            سند قبلی
          </Button>
        </div>}
      </Card.Body>
    </Card>
  )
}