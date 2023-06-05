import React, { useRef } from "react";

import Button from "./Button";
import "./ImageUpload.css";

function ImageUpload(props) {
  const filePickerRef = useRef();

  const pickedHandler = (event) => {
    console.log(event.target);
  };

  const pickImageHandler = () => {
    filePickerRef.current.click();
  };

  return (
    <div className="form-control">
      <input
        type="file"
        id="file"
        style={{ display: "none" }}
        accept=".jpg,.png,.jpeg"
        ref={filePickerRef}
        onChange={pickedHandler}
      />

      <div className={`image-upload ${props.center ? "center" : ""}`}>
        <div className="image-upload__preview">
          <img src="" alt="Preview" />
        </div>

        <Button type={"button"} onClick={pickImageHandler}>
          Pick image
        </Button>
      </div>
    </div>
  );
}

export default ImageUpload;
