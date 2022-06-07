import useInput from "../hooks/use-input";

const SimpleInput = (props) => {

  const { value: enteredName, isValid: enteredNameIsValid, hasError: nameInputHasError, valueChangeHandler: nameChangeHandler, inputBlurHandler: nameBlurHandler, reset: nameInputReset } = useInput(value => value.trim() !== '')
  const { value: enteredEmail, isValid: enteredEmailIsValid, hasError: emailInputHasError, valueChangeHandler: emailChangeHandler, inputBlurHandler: emailBlurHandler, reset: emailInputReset } = useInput(value => /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value))

  let formIsValid = false;

  if (enteredNameIsValid && enteredEmailIsValid) {
    formIsValid = true;
  }

  const FormSubmissionHandler = (e) => {

    e.preventDefault();

    if (!enteredNameIsValid || !enteredEmailIsValid) {
      return;
    }

    nameInputReset()
    emailInputReset()
  }

  const nameInputClasses = nameInputHasError ? 'form-control invalid' : 'form-control'
  const emailInputClasses = emailInputHasError ? 'form-control invalid' : 'form-control'
  return (
    <form onSubmit={FormSubmissionHandler}>
      <div className={nameInputClasses}>
        <label htmlFor='name'>Your Name</label>
        <input
          onBlur={nameBlurHandler}
          onChange={nameChangeHandler}
          value={enteredName}
          type='text'
          id='name'
        />
        {nameInputHasError && <p className="error-text">Invalid</p>}
      </div>
      <div className={emailInputClasses}>
        <label htmlFor='email'>Your Email</label>
        <input
          onBlur={emailBlurHandler}
          onChange={emailChangeHandler}
          value={enteredEmail}
          type='email'
          id='email'
        />
        {emailInputHasError && <p className="error-text">Invalid</p>}
      </div>
      <div className="form-actions">
        <button disabled={!formIsValid}>Submit</button>
      </div>
    </form>
  );
};

export default SimpleInput;
