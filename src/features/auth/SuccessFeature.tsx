import {
  CameraIcon,
  ClockIcon,
  MemoryIcon,
  UserInfoIcon,
} from "@/assets/icons";
import { Alert, Button, Card } from "@/components";
import { SuccessInfoItem } from "./components/SuccessInfoItem";

export const SuccessFeature = () => {
  return (
    <Card className="max-w-96">
      <Card.Header>
        <h1 className="text-center font-yekan-bold pb-2">
          ورود شما موفقیت آمیز بود
        </h1>
      </Card.Header>
      <div className="p-3">
        <div className="text-sm text-slate-500 px-4">
          برای ادامه فرایند نیاز به احراز هویت دارید، برای این کار نیاز به موارد
          زیر نیاز خواهید داشت:
        </div>
        <div className="text-sm pt-5 px-4">موارد لازم برای احزار هویت</div>
        <hr className="my-3" />
        <div className="px-3 flex flex-col gap-3">
          <SuccessInfoItem title="کمتر از 7 دقیقه زمان" icon={<ClockIcon />} />
          <SuccessInfoItem
            title="شماره همراه متعلق به خودتان"
            icon={<MemoryIcon />}
          />
          <SuccessInfoItem title="سریال پشت کارت ملی" icon={<UserInfoIcon />} />
          <SuccessInfoItem
            title="آمادگی لازم برای ویدیوی سلفی کوتاه"
            icon={<CameraIcon />}
          />
        </div>
        <Alert>
          <span className="font-bold">توجه !</span> در صورت عدم احراز هویت موقع
          امضای سند لازم است احراز هویت کرده و این فرایند ممکن است کمی طول بکشد.
        </Alert>
        <div className="flex flex-col pt-4 gap-4">
          <Button>شروع احراز هویت</Button>
          <Button variant="outline">مشاهده سند بدون احراز هویت</Button>
        </div>
      </div>
    </Card>
  );
};
