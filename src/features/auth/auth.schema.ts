import { nationalCodeValidator } from "@/lib/customValidation";
import * as yup from "yup";



// Yup Schema
export const schema = yup.object().shape({
  phoneNumber: yup
    .string()
    .required("شماره همراه الزامی است.")
    .matches(/^[0-9۰-۹]{11}$/, "شماره همراه معتبر نیست.")
    .max(11, "شماره همراه باید حداکثر 11 رقم باشد."),

  nationalCode: yup
    .string()
    .required("کد ملی الزامی است.")
    .max(10, "کد ملی باید حداکثر 10 رقم باشد.")
    .test(
      "national-code-validator",
      "کد ملی معتبر نیست",
      nationalCodeValidator()
    ), 
});

export const verifySchema = yup.object().shape({
  code: yup
    .string()
    .required("کد الزامی است.")
    .matches(/^[0-9۰-۹]{6}$/, "کد معتبر نیست."),
});
