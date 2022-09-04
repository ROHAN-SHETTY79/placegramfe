import { useCallback, useReducer } from "react";

const formReducer = (state, action) => {
  switch (action.type) {
    case "INPUT_CHANGE":
      let formIsValid = true;
      // state.inputs will have every object with input id
      for (const inputId in state.inputs) {
        // this for name field which is undefined.
        if (!state.inputs[inputId]) {
          continue;
        }
        // checking for id i.e., ex: text, description and etc.,
        if (inputId === action.inputId) {
          formIsValid = formIsValid && action.isValid;
        } else {
          // for other values
          formIsValid = formIsValid && state.inputs[inputId].isValid;
        }
      }

      return {
        ...state,
        inputs: {
          ...state.inputs,
          // now set the state according to the id (title, description=, address etc)
          [action?.inputId]: {
            value: action?.value,
            isValid: action?.isValid,
          },
        },
        isValid: formIsValid,
      };

    case "SET_DATA":
      // this is to set the entire state to any desired values
      // for initial values or something like that
      return {
        inputs: action.inputs,
        isValid: action.formIsValid,
      };

    default:
      return state;
  }
};

export const useForm = (initialInputs, initialFormValidity) => {
  /*it may be create or update place,
    IMPORTANT => this will be reuseable across any compoenents like an function. Don't get confused.
    This will have separate copy for different components.
    1. we pass the initial value from the component to useForm.
    2. the initial value will be in formState.
    3. when there's a dispatch happens the value gets updated and will update the formState also.
    4. whenever there's update in formState component also gets updated (same as states).
    */
  const [formState, dispatch] = useReducer(formReducer, {
    inputs: initialInputs,
    //to keep track of entire form validation
    isValid: initialFormValidity,
  });

  // we don't want to execute this again and again
  // Think of memoization as caching a value so that it does not need to be recalculated.
  const inputHanlder = useCallback((id, value, isValid) => {
    dispatch({
      type: "INPUT_CHANGE",
      value,
      inputId: id,
      isValid,
    });
  }, []);

  //   this is only for UpdatePlace Component;
  const setFormData = useCallback((inputData, formValidity) => {
    dispatch({
      type: "SET_DATA",
      inputs: inputData,
      formIsValid: formValidity,
    });
  }, []);

  return [formState, inputHanlder, setFormData];
};
