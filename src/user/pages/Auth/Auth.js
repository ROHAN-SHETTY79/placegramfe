import React, { useContext, useState } from "react";
import {Routes, Route, useNavigate} from 'react-router-dom';
import { useHistory } from "react-router-dom";
import { Input, Button, Card } from "../../../shared/components";
import { AuthContext } from "../../../shared/context/authContext";
import { useForm } from "../../../shared/hooks/form-hook";
import {
  VALIDATOR_EMAIL,
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from "../../../shared/util/validators";
import "./auth.css";

export default function Auth() {
  // listening to context here
  const auth = useContext(AuthContext);

  const history = useHistory();

  const [isLoginMode, setIsLoginMode] = useState(true);
  const [formState, inputHanlder, setFormData] = useForm(
    {
      email: {
        value: "",
        isValid: false,
      },
      password: {
        value: "",
        isValid: false,
      },
    },
    false
  );

  const switchModeHandler = () => {
    // setting the required data fields depending upon the mode.

    // here we are switching to login mode (from signup mode) or signup mode (from login mode).
    if (!isLoginMode) {
      // this is for login means we are switching from sign up to login here.
      setFormData(
        {
          ...formState.inputs,
          name: undefined,
        },
        formState.inputs.email.isValid && formState.inputs.password.isValid
      );
    } else {
      setFormData(
        {
          ...formState.inputs,
          name: {
            value: "",
            isValid: false,
          },
        },
        false
      );
    }
    setIsLoginMode((prevMode) => !prevMode);
  };

  const handleAuth = (e) => {
    e.preventDefault();
    console.log({ formState });
    /* updating the context now and hence the compoenent
     which is listening to this value will re-render. */
    auth.login();
    history.push("/")
  };

  return (
    <Card className="authentication">
      <h2>Auth</h2>
      <hr />
      <form onSubmit={handleAuth}>
        {!isLoginMode && (
          <Input
            element="input"
            id="name"
            type="text"
            label="Your Name"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Please enter a name."
            onInput={inputHanlder}
          />
        )}
        <Input
          element="input"
          id="email"
          type="email"
          label="E-Mail"
          validators={[VALIDATOR_EMAIL()]}
          errorText="Please enter a valid email address."
          onInput={inputHanlder}
        />
        <Input
          element="input"
          id="password"
          type="password"
          label="Password"
          validators={[VALIDATOR_MINLENGTH(5)]}
          errorText="Please enter a valid password, at least 5 characters."
          onInput={inputHanlder}
        />
        <Button type="submit" disabled={!formState.isValid}>
          {isLoginMode ? "LOGIN" : "SIGNUP"}
        </Button>
      </form>
      <Button inverse onClick={switchModeHandler}>
        SWITCH TO {isLoginMode ? "SIGNUP" : "LOGIN"}
      </Button>
    </Card>
  );
}
