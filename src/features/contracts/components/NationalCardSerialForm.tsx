import { Alert, Button, TextInput } from "@/components";
import { FC } from "react";
import { STAGE } from "../contract.type";

type NationalCardSerialForm = {
  setStage: React.Dispatch<React.SetStateAction<STAGE>>;
};

export const NationalCardSerialForm: FC<NationalCardSerialForm> = (props) => {
  return (
    <>
      {" "}
      <TextInput
        label="سریال پشت کارت ملی"
        placeholder="سریال پشت کارت ملی خود را بنویسید..."
        containerClassName="mt-5"
      />
      <Alert>
        چنانچه کارت ملی ندارید، کد رهگیری رسید کارت ملی خود را وارد کنید
      </Alert>
      <div className="flex justify-center py-4">
        <img src="national_card.png" alt="national_card" />
      </div>
      <Button
        className="min-h-12 w-full mt-3"
        variant="outline"
        onClick={() => props.setStage(STAGE.OTP)}
      >
        مرحله قبل
      </Button>
      <Button
        className="min-h-12 w-full mt-3"
        onClick={() => props.setStage(STAGE.VERIFICATION_VIDEO_PLACEHOLDER)}
      >
        مرحله بعد
      </Button>
    </>
  );
};
