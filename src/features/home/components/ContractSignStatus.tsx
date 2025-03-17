import { GreenVerifyIcon } from "@/assets/icons";
import { Card } from "@/components";
import { useSessionStorage } from "@/hooks/useSessionStorage";
import { useGetUserInfo } from "../contract.hooks";

export const ContractSignStatus = () => {
  const { data: userInfoData } = useGetUserInfo();
  const [contract] = useSessionStorage("CONTRACT");

  const checkStatus = (status: string) => {
    switch (status) {
      case "SHAHKAR_OK":
        return false;
      case "SABTE_AHVAL_OK":
        return true;
      case "IMAGE_COMPARE_OK":
        return true;
      case "IMAGE_SABTEAHVAL_OK":
        return true;
      default:
        return true;
    }
  };

  const checkInquiryType = (status: string) => {
    switch (status) {
      case "SHAHKAR":
        return false;
      case "SABTE_AHVAL":
        return true;
      case "NATIONAL_CARD_IMAGE":
        return true;
      default:
        return false;
    }
  };

  return (
    <Card className="p-[2.5rem] max-h-max  flex-wrap">
      <div className=" font-yekan-bold">پیش‌نیازهای امضای سند</div>

      <div className="flex justify-between gap-3 items-center pt-10 border-b border-dashed pb-3  flex-wrap">
        <div>
          <img src="level.png" alt="" />
        </div>
        <div className="flex-1 flex flex-col gap-2">
          <p className="font-yekan-bold">احراز هویت سطح 3</p>
          <p className="text-slate-400 text-sm">مورد نیاز برای درگاه</p>
        </div>
        {checkStatus(userInfoData?.status) &&
        checkInquiryType(userInfoData?.inquiryType) ? (
          <div className="text-green-600 flex justify-center gap-3 items-center bg-green-600/10 px-3 py-2 rounded-lg">
            <GreenVerifyIcon /> <span>احراز هویت موفق</span>
          </div>
        ) : (
          <div className="text-yellow-600 flex justify-center gap-3 items-center bg-yellow-600/10 px-3 py-2 rounded-lg">
            <span>احراز هویت نشده</span>
          </div>
        )}
      </div>

      {contract.result.faceVerificationForced && (
        <div className="flex justify-between gap-3 border-t border-dashed items-center pt-3 flex-wrap">
          <div>
            <img src="auth.png" alt="" />
          </div>
          <div className="flex-1 flex flex-col gap-2">
            <p className="font-yekan-bold">احراز هویت ویدیویی</p>
            <p className="text-slate-400 text-sm">نیازمند وبکم</p>
          </div>
          <div className="text-yellow-600 flex justify-center gap-3 items-center bg-yellow-600/10 px-3 py-2 rounded-lg">
            <span>احراز هویت نشده</span>
          </div>
        </div>
      )}
    </Card>
  );
};
