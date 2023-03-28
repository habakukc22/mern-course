import React, { useEffect, useState } from "react";

import { useParams } from "react-router-dom";
import Button from "../../shared/components/FormElements/Button";
import Input from "../../shared/components/FormElements/Input";
import { VALIDATOR_REQUIRE } from "../../shared/util/validators";
import { useForm } from "../../shared/hooks/form-hook";
import "./PlaceForm.css";
import Card from "../../shared/components/UIElements/Card";

const DUMMY_PLACES = [
  {
    id: "p1",
    creator: "u1",
    title: "Empire State",
    description: "hsdfsdfgdsjfkjdgsdbjk",
    imageURL:
      "https://image.visitenovayork.com.br/wp-content/uploads/2013/02/Empire-State-Building-Tickets.jpg",
    address: "20 W 34th St., New York, NY 10001, Estados Unidos",
    location: {
      lat: 40.748161,
      lng: -73.9869777,
    },
  },
  {
    id: "p2",
    creator: "u2",
    title: "Emp. State",
    description: "hsdfsdfgdsjfkjdgsdbjk",
    imageURL:
      "https://image.visitenovayork.com.br/wp-content/uploads/2013/02/Empire-State-Building-Tickets.jpg",
    address: "20 W 34th St., New York, NY 10001, Estados Unidos",
    location: {
      lat: 40.748161,
      lng: -73.9869777,
    },
  },
];

function UpdatePlace(props) {
  const [isLoading, setIsLoading] = useState(true);
  const placeId = useParams().placeId;

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

  const identifiedPlace = DUMMY_PLACES.find((p) => p.id === placeId);

  useEffect(() => {
    if (identifiedPlace) {
      setFormData(
        {
          title: {
            value: identifiedPlace.title,
            isValid: true,
          },
          description: {
            value: identifiedPlace.description,
            isValid: true,
          },
        },
        true
      );

      setIsLoading(false);
    }
  }, [identifiedPlace, setFormData]);

  const placeUpdateSubmitHandler = (event) => {
    event.preventDefault();

    console.log(formState);
  };

  if (!identifiedPlace) {
    return (
      <div className="center">
        <Card>
          <h2>Could not find place!</h2>
        </Card>
      </div>
    );
  }

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  return (
    <form className="place-form" onSubmit={placeUpdateSubmitHandler}>
      <Input
        id="title"
        element="input"
        type="text"
        label="Title"
        validators={[VALIDATOR_REQUIRE()]}
        errorText="Please enter a valid title."
        onInput={inputHandler}
        initialValue={formState.inputs.title.value}
        initialValid={formState.inputs.title.isValid}
      />

      <Input
        id="description"
        element="textarea"
        label="Description"
        validators={[VALIDATOR_REQUIRE()]}
        errorText="Please enter a valid description (min. 5 characters)."
        onInput={inputHandler}
        initialValue={formState.inputs.description.value}
        initialValid={formState.inputs.description.isValid}
      />

      <Button type="submit" disabled={!formState.isValid}>
        Update place
      </Button>
    </form>
  );
}

export default UpdatePlace;
