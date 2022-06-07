import { useReducer } from 'react'

const initialState = {
    value: '',
    isTouched: false
}

const useInput = (validateValue) => {

    const inputStateReducer = (state, action) => {

        if (action.type === 'INPUT') {
            return { value: action.value, isTouched: true }
        }
        if (action.type === 'BLUR') {
            return { value: state.value, isTouched: true }
        }
        if (action.type === 'RESET') {
            return { value: '', isTouched: false }
        }

        return initialState;
    }



    const [inputState, dispatch] = useReducer(inputStateReducer, initialState)

    const valueIsValid = validateValue(inputState.value);
    const hasError = !valueIsValid && inputState.isTouched;

    const valueChangeHandler = (e) => {

        dispatch({
            type: "INPUT",
            value: e.target.value
        })

    }

    const inputBlurHandler = () => {
        dispatch({ type: "BLUR" })
    }

    const reset = () => {
        dispatch({ type: "RESET" })
    }

    return {
        value: inputState.value,
        isValid: valueIsValid,
        hasError,
        valueChangeHandler,
        inputBlurHandler,
        reset
    };
}

export default useInput;