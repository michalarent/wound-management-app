import React, { useContext, useState } from "react";
// import Input from "../../shared/components/FormElements/Input";

import {
  VALIDATOR_REQUIRE,
  VALIDATOR_MINLENGTH,
  VALIDATOR_URL,
} from "../../shared/util/validators";
import Button from "../../shared/components/UIElements/Button";
import { useForm, Form } from "../../shared/hooks/useForm";
import { AuthContext } from "../../shared/context/auth-context";
import { makeStyles, Paper } from "@material-ui/core/styles";

import {
  FormControl,
  InputLabel,
  FormHelperText,
  Input,
  Grid,
  TextField,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio
} from "@material-ui/core";

const initialFValues = {
  name: "",
  bodyPart: "",
  description: "",
  woundImageUpload: "",
};

const NewWound = () => {
  const auth = useContext(AuthContext);

  const { values, setValues, handleInputChange } = useForm(initialFValues);

  return (
    <Form>
      <Grid container>
        <Grid item xs={6}>
          <TextField
            variant="outlined"
            name="name"
            label="Name"
            value={values.name}
            onChange={handleInputChange}
          />
          <TextField
            variant="outlined"
            name="name"
            label="Name"
            value={values.name}
            onChange={handleInputChange}
          />
          <TextField
            variant="outlined"
            name="name"
            label="Name"
            value={values.name}
            onChange={handleInputChange}
          />
          <TextField
            variant="outlined"
            name="name"
            label="Name"
            value={values.name}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={6}>
          <FormLabel>Gender</FormLabel>
          <RadioGroup
            row
            name="gender"
            value={values.gender}
            onChange={handleInputChange}
          ></RadioGroup>
            <FormControlLabel value="male" control={<Radio />} label="Male" />
            <FormControlLabel value="female" control={<Radio />} label="Female" />
            <FormControlLabel value="other" control={<Radio />} label="Other" />
        </Grid>
      </Grid>
    </Form>
  );
};

export default NewWound;

{
  /* <form className="wound-form" onSubmit={submitHandler}>
        <p>
          This wound was created on: {formState.dateCreated} and last edited on:{" "}
          {formState.dateLastEdited}.
        </p>
        <Input
          id="name"
          element="input"
          type="text"
          label="Name"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Please enter a valid title!"
          onInput={changeHandler}
        />
        <Input
          id="bodyPart"
          element="input"
          type="text"
          label="Body Part"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Please enter a valid body part!"
          onInput={changeHandler}
        />
        <Input
          id="description"
          element="textarea"
          x
          label="Description"
          validators={[VALIDATOR_MINLENGTH(3)]}
          errorText="Please enter a valid description!"
          onInput={changeHandler}
        />

        <Button type="submit" disabled={!formState.isValid}>
          ADD WOUND
        </Button>
        <p>Is the form valid? {String(formState.isValid)}</p>
      </form> */
  // send data to the server!
  // const submitHandler = async (event) => {
  //   event.preventDefault();
  //   console.log(auth.userId);
  //   const response = await fetch("http://localhost:5000/api/wounds", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({
  //       name: formState.inputs.name.value,
  //       bodyPart: formState.inputs.bodyPart.value,
  //       description: formState.inputs.description.value,
  //       dateLastEdited: Date.now(),
  //       dateCreated: Date.now(),
  //       owner: auth.userId,
  //     }),
  //   });
  //   const responseData = await response.json();
  //   if (!response.ok) {
  //     throw new Error(responseData.message);
  //   }
  // };
}
