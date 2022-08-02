const mobileRegex = RegExp(/^\d{10}$/);
const nameRegex = RegExp(/^[a-zA-Z]+$/);

export const checkValidation = (name, value) => {
  let errorObj = {}
  switch (name) {
    case 'fname':
      errorObj.fname = value === ''
        ? "First Name is Required"
        : nameRegex.test(value)
          ? ""
          : "Only letters are allowed"
      break;
    case 'mname':
      errorObj.mname = value === ''
        ? "Middle Name is Required"
        : nameRegex.test(value)
          ? ""
          : "Only letters are allowed"
      break;
    case 'lname':
      errorObj.lname = value === ''
        ? "Last Name is Required"
        : nameRegex.test(value)
          ? ""
          : "Only letters are allowed"
      break;
    case 'mobileNumber':
      errorObj.mobileNumber = value === ''
        ? "Mobile number is Required"
        : mobileRegex.test(value)
          ? ""
          : "Mobile number must contain 10 digits";
      break;
    case 'relation':
      errorObj.relation = value === '' ? "Relaton is Required" : ""
      break;
    default:
      break;
  }
  return errorObj
};

export const handleSubmitValidation = (user) => {
  let fields = user;
  let errors = {};
  let formIsValid = true;

  if (!fields["fname"]) {
    formIsValid = false;
    errors["fname"] = "First Name is Required";
  } else if (!fields["fname"].match(nameRegex)) {
    formIsValid = false;
    errors["fname"] = "Only letters are allowed";
  }

  if (!fields["mname"]) {
    formIsValid = false;
    errors["mname"] = "Middle Name is Required";
  } else if (!fields["mname"].match(nameRegex)) {
    formIsValid = false;
    errors["mname"] = "Only letters are allowed";
  }

  if (!fields["lname"]) {
    formIsValid = false;
    errors["lname"] = "Last Name is Required";
  } else if (!fields["lname"].match(nameRegex)) {
    formIsValid = false;
    errors["lname"] = "Only letters are allowed";
  }

  if (!fields["mobileNumber"]) {
    formIsValid = false;
    errors["mobileNumber"] = "Mobile Number is Required";
  } else if (!mobileRegex.test(fields["mobileNumber"])) {
    formIsValid = false;
    errors["mobileNumber"] = "Mobile number must contain 10 DIGITS";
  }

  if (!fields["relation"]) {
    formIsValid = false;
    errors["relation"] = "Relation is Required";
  }
  
  if (!fields["gender"]) {
    formIsValid = false;
    errors["gender"] = "Gender is Required";
  }

  if (!fields["dob"]) {
    formIsValid = false;
    errors["dob"] = "Date of birth is Required";
  }

  return { errors, formIsValid }
}