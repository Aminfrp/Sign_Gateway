import * as yup from "yup";

export const schema = yup.object().shape({
  phoneNumber: yup
    .string()
    .required("شماره همراه الزامی است.")
    .matches(/^[0-9۰-۹]{11}$/, "شماره همراه معتبر نیست.")
    .max(11, "شماره همراه باید حداکثر 11 رقم باشد."),
});

export const verifySchema = yup.object().shape({
  code: yup
    .string()
    .required("کد الزامی است.")
    .matches(/^[0-9۰-۹]{6}$/, "کد معتبر نیست."),
});
