export const validatePassword = ({ password, setErrorMsg }) => {
  const specialCharacters = /[!@#$%^&*]/;

  if (!password) {
    setErrorMsg("Password Required !");
    return false;
  } else if (password.includes(" ")) {
    setErrorMsg("Invalid Password !");
    return false;
  } else if (password.length < 6) {
    setErrorMsg("Password must be more than 5 characters long");
    return false;
  } else if (!specialCharacters.test(password)) {
    setErrorMsg("Password must contain at least one special character");
    return false;
  }

  return true;
};
