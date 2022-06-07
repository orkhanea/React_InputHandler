import useInput from "../hooks/use-input";

const BasicForm = (props) => {

  const { value: enteredName, isValid: enteredNameIsValid, hasError: nameInputHasError, valueChangeHandler: nameChangeHandler, inputBlurHandler: nameBlurHandler, reset: nameInputReset } = useInput(value => value.trim() !== '')
  const { value: enteredSurname, isValid: enteredSurnameIsValid, hasError: surnameInputHasError, valueChangeHandler: surnameChangeHandler, inputBlurHandler: surnameBlurHandler, reset: surnameInputReset } = useInput(value => value.trim() !== '')
  const { value: enteredEmail, isValid: enteredEmailIsValid, hasError: emailInputHasError, valueChangeHandler: emailChangeHandler, inputBlurHandler: emailBlurHandler, reset: emailInputReset } = useInput(value => /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value))

  let isFormValid = false;
  if (enteredNameIsValid && enteredSurnameIsValid && enteredEmailIsValid) {
    isFormValid = true
  }

  const FormSubmissionHandler = (e) => {
    e.preventDefault()

    if (!enteredNameIsValid || !enteredSurnameIsValid || !enteredEmailIsValid) {
      return;
    }

    nameInputReset()
    surnameInputReset()
    emailInputReset()
  }

  const nameInputClasses = nameInputHasError ? "form-control invalid" : "form-control"
  const surnameInputClasses = surnameInputHasError ? "form-control invalid" : "form-control"
  const emailInputClasses = emailInputHasError ? "form-control invalid" : "form-control"

  return (
    <form onSubmit={FormSubmissionHandler}>
      <div className="control-group">

        <div className={nameInputClasses}>
          <label htmlFor='name'>First Name</label>
          <input
            type='text'
            id='name'
            value={enteredName}
            onBlur={nameBlurHandler}
            onChange={nameChangeHandler}
          />
          {nameInputHasError && <p className="error-text">Invalid</p>}
        </div>

        <div className={surnameInputClasses}>
          <label htmlFor='surname'>Last Name</label>
          <input
            type='text'
            id='surname'
            value={enteredSurname}
            onBlur={surnameBlurHandler}
            onChange={surnameChangeHandler}
          />
          {surnameInputHasError && <p className="error-text">Invalid</p>}
        </div>
      </div>

      <div className={emailInputClasses}>
        <label htmlFor='email'>E-Mail Address</label>
        <input
          type='email'
          id='email'
          value={enteredEmail}
          onBlur={emailBlurHandler}
          onChange={emailChangeHandler}
        />
        {emailInputHasError && <p className="error-text">Invalid</p>}
      </div>

      <div className='form-actions'>
        <button disabled={!isFormValid}>Submit</button>
      </div>
    </form>
  );
};

export default BasicForm;
