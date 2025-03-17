import * as yup from "yup";

export const schema = yup.object().shape({
  // userStatus: yup.string().oneOf(["SHAHKAR_OK", "SABTE_AHVAL_OK"]),

  // nationalCode: yup
  //   .string()
  //   .when("userStatus", {
  //     is: (status: string) => status === "SHAHKAR_OK", // Function that checks the value of userStatus
  //     then: yup.string().required("کد ملی ضروری است"), // Apply required if condition is true
  //     otherwise: yup.string().nullable(), // Make it nullable if condition is false
  //   })
  //   .nullable(),

  // birthDate: yup
  //   .string()
  //   .when("userStatus", {
  //     is: (status: string) => status === "SHAHKAR_OK", // Direct comparison with the value of "SHAHKAR_OK"
  //     then: yup.string().required("تاریخ تولد ضروری است"), // Apply required if condition is true
  //     otherwise: yup.string().nullable(), // Make it nullable if condition is false
  //   })
  //   .nullable(),

  // serial: yup
  //   .string()
  //   .when("userStatus", {
  //     is: (status: string) =>
  //       status === "SABTE_AHVAL_OK" || status === "SHAHKAR_OK", // Multiple conditions can be combined
  //     then: yup.string().required("سریال پشت کارت ملی ضروری است"), // Apply required if condition is true
  //     otherwise: yup.string().nullable(), // Make it nullable if condition is false
  //   })
  //   .nullable(),

  captcha: yup.string().required("کد امنیتی ضروری است").nullable(),
  code: yup.string().required("کد تایید ضروری است").nullable(),
});
