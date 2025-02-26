import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useSessionStorage } from "@/hooks/useSessionStorage";
import { ChevronDown } from "lucide-react";
import { Card, PdfViewer } from "../../components";

export const ContractFeature = () => {
  const [contract] = useSessionStorage("CONTRACT");

  return (
    <Card className="lg:col-span-8 xs:col-span-12 flex flex-col p-4">
      <Card.Body className="flex-1 flex flex-col">
        <div className="flex gap-2">
          <Select defaultValue="سند شماره 1">
            <SelectTrigger className="w-[180px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="سند شماره 1">سند شماره 1</SelectItem>
                <SelectItem value="سند شماره 2">سند شماره 2</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <div className="flex xs:flex-col md:flex-row md:items-between xs:items-start xs:gap-5 justify-between pt-5">
          <h1 className="font-yekan-bold text-lg xs:order-2 md:order-1">
            {contract.result.title}
          </h1>
          <div className="bg-green-600/10 text-green-600 rounded-full px-3 py-2 text-sm  xs:order-1 md:order-2">
            زمان باقی‌مانده امضا:{" "}
            {new Date(contract.result.expirationTime).toLocaleString("fa-IR")}
          </div>
        </div>
        <div className="flex text-xs text-slate-400 gap-3">
          <div>شماره سند:{contract.result.id}</div>
        </div>
        <div className="text-primary flex gap-2 py-3 cursor-pointer select-none">
          <p className="text-sm">اطلاعات بیشتر</p>
          <ChevronDown />
        </div>
        <div className="flex-1">
          <PdfViewer
            url={contract.result.downloadLink || ""}
            status={contract ? "success" : "pending"}
          />
        </div>
      </Card.Body>
    </Card>
  );
};
