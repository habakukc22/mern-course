import React from "react";

import Input from "../../shared/components/FormElements/Input";
import "./NewPlace.css";

function NewPlace() {
  return (
    <form className="place-form">
      <Input
        type="text"
        label="Title"
        element="input"
        validators={[]}
        errorText="Please, enter a valid title."
      />
    </form>
  );
}

export default NewPlace;
