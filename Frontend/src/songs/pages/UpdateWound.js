import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import Input from "../../shared/components/FormElements/Input";
import Button from "../../shared/components/UIElements/Button";
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_MINLENGTH,
} from "../../shared/util/validators";

import "./NewSong.css";
import { useForm } from "../../shared/hooks/form-hook";

const UpdateWound = () => {
  const [isLoading, setIsLoading] = useState(true);
  const woundId = useParams().woundId;

  const [formState, changeHandler, setFormData] = useForm(
    {
      title: {
        value: "",
        isValid: false,
      },
      description: {
        value: "",
        isValid: false,
      },
    },
    false
  );

  useEffect(() => {
    const fetchWound = async () => {
      try {
        const responseData = await sendRequest(
          `http:://localhost:5000/api/wounds/${woundId}`
        );
        setLoadedWound(responseData.wound);
        setFormData({
            name: {
              value: responseData.wound.name,
              isValid: false,
            },
            bodyPart: {
                value: responseData.wound.bodyPart,
                isValid: false,
            },
            description: {
              value: responseData.wound.description,
              isValid: false,
            },
          },
          false)
      } catch (err) {
        return new HttpError(err);
      }
    };
  }, [sendRequest, woundId]);

  

  const songSubmitHandler = (event) => {
    event.preventDefault();
    console.log(formState.inputs);
  };

  if (!identifiedSong) {
    return (
      <div className="center">
        <h2>Could not find place!</h2>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="center">
        <h2>Loading...</h2>
      </div>
    );
  }

  return (
    <form className="song-form" onSubmit={songSubmitHandler}>
      <Input
        id="title"
        element="input"
        type="text"
        label="Title"
        validators={[VALIDATOR_REQUIRE()]}
        errorText="Please enter a valid title."
        onInput={changeHandler}
        initialValue={formState.inputs.title.value}
        initialValid={formState.inputs.title.isValid}
      />
      <Input
        id="description"
        element="textarea"
        label="Description"
        validators={[VALIDATOR_MINLENGTH(5)]}
        errorText="Please enter a valid description (min. 5 characters)."
        onInput={changeHandler}
        initialValue={formState.inputs.description.value}
        initialValid={formState.inputs.description.isValid}
      />
      <Button type="submit" disabled={!formState.isValid}>
        UPDATE PLACE
      </Button>
    </form>
  );
};

export default UpdateWound;
