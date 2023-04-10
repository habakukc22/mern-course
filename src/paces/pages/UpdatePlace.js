import React, { Fragment, useContext, useEffect, useState } from "react";

import { useHistory, useParams } from "react-router-dom";
import Button from "../../shared/components/FormElements/Button";
import Input from "../../shared/components/FormElements/Input";
import { VALIDATOR_REQUIRE } from "../../shared/util/validators";
import { useForm } from "../../shared/hooks/form-hook";
import { useHttpClient } from "../../shared/hooks/http-hook";
import Card from "../../shared/components/UIElements/Card";
import "./PlaceForm.css";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import { AuthContext } from "../../shared/context/auth-context";

function UpdatePlace(props) {
  const placeId = useParams().placeId;
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [loadedPlace, setLoadedPlaces] = useState();
  const history = useHistory();
  const { userId } = useContext(AuthContext);

  const [formState, inputHandler, setFormData] = useForm(
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
    const fetchPlace = async () => {
      try {
        const responseData = await sendRequest(
          `http://localhost:5000/api/places/${placeId}`
        );

        setLoadedPlaces(responseData.place);

        setFormData(
          {
            title: {
              value: responseData.place.title,
              isValid: true,
            },
            description: {
              value: responseData.place.description,
              isValid: true,
            },
          },
          true
        );
      } catch (error) {}
    };

    fetchPlace();
  }, [sendRequest, setFormData, placeId]);

  const placeUpdateSubmitHandler = async (event) => {
    event.preventDefault();

    try {
      await sendRequest(
        `http://localhost:5000/api/places/${placeId}`,
        "PATCH",
        JSON.stringify({
          title: formState.inputs.title.value,
          description: formState.inputs.description.value,
        }),
        { "Content-Type": "application/json" }
      );

      history.push(`/${userId}/places`);
    } catch (error) {}
  };

  if (isLoading) {
    return (
      <div className="center">
        <LoadingSpinner />
      </div>
    );
  }

  if (!loadedPlace && !error) {
    return (
      <div className="center">
        <Card>
          <h2>Could not find place!</h2>
        </Card>
      </div>
    );
  }

  return (
    <Fragment>
      <ErrorModal error={error} onClear={clearError} />

      {!isLoading && loadedPlace && (
        <form className="place-form" onSubmit={placeUpdateSubmitHandler}>
          <Input
            id="title"
            element="input"
            type="text"
            label="Title"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Please enter a valid title."
            onInput={inputHandler}
            initialValue={loadedPlace.title}
            initialValid={true}
          />

          <Input
            id="description"
            element="textarea"
            label="Description"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Please enter a valid description (min. 5 characters)."
            onInput={inputHandler}
            initialValue={loadedPlace.description}
            initialValid={true}
          />

          <Button type="submit" disabled={!formState.isValid}>
            Update place
          </Button>
        </form>
      )}
    </Fragment>
  );
}

export default UpdatePlace;
