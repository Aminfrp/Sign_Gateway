import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ChevronDown } from "lucide-react";
import { Card } from "../../components";
import { PDFViewer } from "./components/PDFViewer";

export const ContractFeature = () => {
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
            سند شماره 1
          </h1>
          <div className="bg-green-600/10 text-green-600 rounded-full px-3 py-2 text-sm  xs:order-1 md:order-2">
            زمان باقی‌مانده امضا: 14:59
          </div>
        </div>
        <div className="flex text-xs text-slate-400 gap-3">
          <div>شماره سند:1259678</div>
          <div>تاریخ ایجاد سند:۳۱/ مرداد/۱۴۰۲ </div>
        </div>
        <div className="text-primary flex gap-2 py-3 cursor-pointer select-none">
          <p className="text-sm">اطلاعات بیشتر</p>
          <ChevronDown />
        </div>
        <div className="flex-1">
          <PDFViewer />
        </div>
      </Card.Body>
    </Card>
  );
};
