import * as yup from "yup";

export const schema = yup.object().shape({
  userStatus: yup.string().required(),
  nationalCode: yup.string().when("userStatus", {
    is: (status: string) => status === "SHAHKAR_OK",
    then: (schema) => schema.required("کد ملی ضروری است"),
    otherwise: (schema) => schema.notRequired(),
  }),
  birthDate: yup.string().when("userStatus", {
    is: (status: string) => status === "SHAHKAR_OK",
    then: (schema) => schema.required("تاریخ تولد ضروری است"),
    otherwise: (schema) => schema.notRequired(),
  }),
  serial: yup.string().when("userStatus", {
    is: (status: string) =>
      status === "SABTE_AHVAL_OK" || status === "SHAHKAR_OK",
    then: (schema) => schema.required("سریال پشت کارت ملی ضروری است"),
    otherwise: (schema) => schema.notRequired(),
  }),
  captcha: yup.string().required("کد امنیتی ضروری است"),
  code: yup.string().required("کد تایید ضروری است"),
});
