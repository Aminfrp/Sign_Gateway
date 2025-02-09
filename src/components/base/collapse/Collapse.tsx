import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { CollapseType } from "./collapse.type";

export const Collapse: React.FC<CollapseType> = (props) => {
  const { className = "" } = props;
  return (
    <Accordion
      type="single"
      collapsible
      className={`rounded-2xl  ${className}`}
    >
      <AccordionItem value="item-1">
        <AccordionTrigger className="font-bold">نکات مهم</AccordionTrigger>
        <AccordionContent>
          درگاه پرداخت اینترنتی ابران کیش با استفاده از پروتکل امن SSL به
          مشتریان خود ارائه خدمت نموده است و با آدرس https://ikc.shaparak.ir
          شروع می شود،خواهشمند است به منظور جلوگیری از سو استفاده های احتمالی
          پیش از ورود هر گونه اطلاعات،آدرس موجود در بخش مرورگر وب را با آدرس فوق
          مقایسه نمایید و در صورت مشاهده هر نوع مغایرت احتمالی سریعا با شماره
          ۱۶۸۸ مرکز ارتباط با مشتریان ایران کیش تماس حاصل نمایید.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};
