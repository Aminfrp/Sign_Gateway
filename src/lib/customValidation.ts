export const checkNumberValidation = (value: string) => {
  const regex = /^[0-9۰-۹]{9}$/;
  return regex.test(value);
};

export function nationalCodeValidator(errorMessage = "کد ملی معتبر نیست") {
  return function (value:string) {
    const { path, createError } = this;

    // Check if the input is exactly 10 digits
    if (!/^\d{10}$/.test(value)) {
      return createError({ path, message: errorMessage });
    }

    const check = +value[9]; // The 10th digit
    const sum =
      value
        .split("")
        .slice(0, 9)
        .reduce((acc, x, i) => acc + +x * (10 - i), 0) % 11; 

    if (sum < 2 ? check !== sum : check + sum !== 11) {
      return createError({ path, message: errorMessage });
    }

    return true; 
  };
}
