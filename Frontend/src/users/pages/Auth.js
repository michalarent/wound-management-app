import React, { useState, useContext } from "react";
import {
  VALIDATOR_EMAIL,
  VALIDATOR_REQUIRE,
  VALIDATOR_MAXLENGTH,
} from "../../shared/util/validators";
import Input from "../../shared/components/FormElements/Input";
import { useForm } from "../../shared/hooks/form-hook";
import { Button } from '@material-ui/core';
import Card from "../../shared/components/UIElements/Card";
import { AuthContext } from "../../shared/context/auth-context";

import "./Auth.css";
const Auth = () => {
  const auth = useContext(AuthContext);
  const [isLoginMode, setIsLoginMode] = useState();

  const [formState, changeHandler, setFormData] = useForm(
    {
      name: {
        value: "",
        isValid: false,
      },
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

  // send data to the server!
  const submitHandler = async (event) => {
    event.preventDefault();
    // check if json is ok
    

    if (isLoginMode) {
        try {
            const response = await fetch("http://localhost:5000/api/users/login", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",

              },
              body: JSON.stringify({
                email: formState.inputs.email.value,
                password: formState.inputs.password.value,
              }),
            });
    
            const responseData = await response.json();
            if (!response.ok) {
              throw new Error(responseData.message);
            }
            // console.log(responseData.user.id);
            auth.login(responseData.user.id);
          } catch (err) {
            throw new Error(
              err.message || "Something went wrong, please try again."
            );
          }
          
    } else {
      try {
        const response = await fetch("http://localhost:5000/api/users/signup", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: formState.inputs.name.value,
            email: formState.inputs.email.value,
            password: formState.inputs.password.value,
          }),
        });

        const responseData = await response.json();
        if (!response.ok) {
          throw new Error(responseData.message);
        }
        console.log(responseData);
        auth.login(responseData.user.id);
      } catch (err) {
        throw new Error(
          err.message || "Something went wrong, please try again."
        );
      }
    }
  };

  const switchModeHandler = () => {
    if (!isLoginMode) {
      setFormData(
        { name: undefined },
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

  return (
    <Card className="authentication">
      <form onSubmit={submitHandler}>
        {!isLoginMode && (
          <Input
            element="input"
            id="name"
            type="text"
            label="Your name"
            validators={[VALIDATOR_REQUIRE]}
            errorText="Please enter your name"
            onInput={changeHandler}
          />
        )}
        <Input
          id="email"
          element="input"
          type="text"
          label="Email"
          validators={[VALIDATOR_REQUIRE(), VALIDATOR_EMAIL()]}
          errorText="Please enter a valid email!"
          onInput={changeHandler}
        />
        <Input
          id="password"
          element="input"
          type="password"
          label="Password"
          validators={[VALIDATOR_REQUIRE(), VALIDATOR_MAXLENGTH(100)]}
          errorText="Please enter a valid password!"
          onInput={changeHandler}
        />
        <Button type="submit" disabled={!formState.isValid}>
          {isLoginMode ? "LOGIN" : "SIGNUP"}
        </Button>
      </form>
      <p>{auth.isLoggedIn}</p>
      <Button onClick={switchModeHandler}>Switch</Button>
    </Card>
  );
};

export default Auth;
