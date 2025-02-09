export const checkNumberValidation = (value: string) => {
  const regex = /^[0-9۰-۹]{9}$/;
  return regex.test(value);
};
