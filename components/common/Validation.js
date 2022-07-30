export const checkValidation = (name, value) => {
  const emailRegex = RegExp(/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/);
  var mobileRegex = RegExp(/^\d{10}$/);

  let errorObj = {}
  switch (name) {
    case 'fname':
      errorObj.fname = value === '' ? "First Name is Required" : ""
      break;
    case 'mname':
      errorObj.mname = value === '' ? "Middle Name is Required" : ""
      break;
    case 'lname':
      errorObj.lname = value === '' ? "Last Name is Required" : ""
      break;
    case 'email':
      errorObj.email = value === ''
        ? "Email is Required"
        : emailRegex.test(value)
          ? ""
          : "Invalid email address";
      break;
    case 'mobileNumber':
      errorObj.mobileNumber = value === ''
        ? "Mobile number is Required"
        : mobileRegex.test(value)
          ? ""
          : "Mobile number must be 10 digits";
      break;
    case 'relation':
      errorObj.relation = value === '' ? "Relaton is Required" : ""
      break;
    default:
      break;
  }
  return errorObj
};