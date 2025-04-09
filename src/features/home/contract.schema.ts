import * as yup from "yup";
import { USER_LEVEL_STATUS } from "./contract.type";

export const schema = yup.object().shape({
  userStatus: yup.string().required(),
  birthDate: yup.string().when("userStatus", {
    is: (status: string) => status === USER_LEVEL_STATUS.SHAHKAR_OK,
    then: (schema) => schema.required("تاریخ تولد ضروری است"),
    otherwise: (schema) => schema.notRequired(),
  }),
  serial: yup.string().when("userStatus", {
    is: (status: string) =>
      status === USER_LEVEL_STATUS.SABTE_AHVAL_OK ||
      status === USER_LEVEL_STATUS.SHAHKAR_OK,
    then: (schema) => schema.required("سریال پشت کارت ملی ضروری است"),
    otherwise: (schema) => schema.notRequired(),
  }),
  captcha: yup.string().required("کد امنیتی ضروری است"),
  code: yup.string().required("کد تایید ضروری است"),
});
