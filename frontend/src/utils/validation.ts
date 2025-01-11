export const validateEmail = (value: string): string => {
  if (!value) {
    return "Email is required";
  } else if (!/\S+@\S+\.\S+/.test(value)) {
    return "Email is invalid";
  }
  return "";
};

export const validatePassword = (value: string): string => {
  if (!value) {
    return "Password is required";
  } else if (value.length < 6) {
    return "Password must be at least 6 characters";
  }
  return "";
};