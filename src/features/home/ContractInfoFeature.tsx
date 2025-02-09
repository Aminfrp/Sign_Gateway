import { InfoIcon, UserPrimaryIcon } from "@/assets/icons";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { FC, useState } from "react";
import { SlRefresh } from "react-icons/sl";
import { Button, Card, Datepicker, TextInput } from "../../components";
import { ContractSignStatus } from "./components/ContractSignStatus";
import { ContractInfoProps, STAGE } from "./contract.type";

const ContractInfoFeature: FC<ContractInfoProps> = (props) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleDialogClose = () => {
    setIsDialogOpen(false);
  };
  return (
    <div className="lg:col-span-4 xs:col-span-12 flex flex-col gap-3">
      <Card className="p-10 max-h-max">
        <div className="flex gap-3">
          <div>
            <UserPrimaryIcon />
          </div>
          <div className="space-y-2 flex-1 ">
            <h2 className="text-primary font-yekan-bold text-lg">
              اطلاعات اولیه
            </h2>
            <div className="text-xs">کد ملی و تاریخ تولد خود را وارد کنید</div>
          </div>
        </div>
        <div className="flex flex-col gap-5 pt-5">
          <TextInput
            label="کد ملی"
            placeholder="کد ملی 10 رقمی خود را بنویسید..."
          />
          <Datepicker
            onChange={() => {}}
            value={null}
            label="تاریخ تولد"
            placeholder="تاریخ تولد خود را بنویسید..."
          />
          <div className="relative">
            <TextInput
              label="سریال پشت کارت ملی"
              placeholder="متن راهنمای اینپوت"
            />
            <Dialog
              open={isDialogOpen}
              onOpenChange={(open) => setIsDialogOpen(open)}
            >
              <DialogTrigger>
                <span
                  className="absolute top-2 left-2 cursor-pointer opacity-50"
                  onClick={() => console.log("open serial card modal")}
                >
                  <InfoIcon />
                </span>
              </DialogTrigger>
              <DialogContent>
                <div className="flex gap-3 text-end">
                  <div className="space-y-2 flex-1 ">
                    <h2 className="font-yekan-bold text-lg">
                      راهنمای سریال پشت کارت ملی
                    </h2>
                    <div className="text-xs">
                      سریال 10 رقمی مشابه تصویر زیر در پشت کارت ملی شما قرار
                      دارد{" "}
                    </div>
                  </div>
                </div>
                <div className="flex justify-center py-4">
                  <img src="national_card.png" alt="national_card" />
                </div>
                <Button
                  className="min-h-12 w-full mt-3"
                  onClick={handleDialogClose}
                >
                  متوجه شدم
                </Button>
              </DialogContent>
            </Dialog>
          </div>

          <div className="flex gap-4 w-full">
            <TextInput
              label="کد امنیتی"
              placeholder="کد امنیتی را وارد کنید ..."
              containerClassName="flex-1"
            />
            <div className="flex items-center border border-rounded rounded-2xl flex-1 h-14 self-end">
              <div className="flex-1 flex justify-center items-center h-10">
                <img
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQWpP10u8DWOFTeXZUCsDuV_JUVfzrrca_XyQ&s"
                  className="w-14 h-full"
                />
              </div>
              <div className="border-r h-full flex justify-center items-center rounded-2xl w-16">
                <SlRefresh size={20} />
              </div>
            </div>
          </div>
          <div className="flex gap-4 w-full">
            <TextInput
              label="کد تایید"
              placeholder="کد تایید را وارد کنید ..."
              containerClassName="flex-1"
            />
            <div className="flex items-center justify-center border border-rounded rounded-2xl flex-1  h-14  self-end bg-muted text-slate-400">
              1:59
            </div>
          </div>
          <Button variant="outline">انصراف</Button>
          <Button
            onClick={() => {
              props.setStage(STAGE.VERIFICATION_VIDEO_PLACEHOLDER);
            }}
          >
            اعتبارسنجی و امضای سند
          </Button>
        </div>
      </Card>
      <ContractSignStatus />
    </div>
  );
};

export default ContractInfoFeature;
