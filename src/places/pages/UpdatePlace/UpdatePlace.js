import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { Input, Button, Card } from "../../../shared/components";
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_MINLENGTH,
} from "../../../shared/util/validators";
import "./UpdatePlace.css";
import { useForm } from "../../../shared/hooks/form-hook";

const DUMMY_PLACES = [
  {
    id: "p1",
    title: "Maranakatte Brahmalingeshwara Temple",
    description: "Temple at Udupi",
    imageUrl:
      "https://lh3.googleusercontent.com/p/AF1QipP5S6Mg_Xf81a999SaP8Dd50xrCnAsEZt0xgSvA=s1600-w400",
    address:
      "Maranakatte Post, Chittur Village, Kundapura Taluk, Udupi, Karnataka 576233",
    location: {
      lat: 13.7251933,
      lng: 75.0568226,
    },
    creator: "u1",
  },
  {
    id: "p2",
    title: "Maranakatte Brahmalingeshwara Temple",
    description: "Beach at Udupi",
    imageUrl:
      "https://lh3.googleusercontent.com/p/AF1QipP5S6Mg_Xf81a999SaP8Dd50xrCnAsEZt0xgSvA=s1600-w400",
    address:
      "Maranakatte Post, Chittur Village, Kundapura Taluk, Udupi, Karnataka 576233",
    location: {
      lat: 13.7251933,
      lng: 75.0568226,
    },
    creator: "u2",
  },
];

function UpdatePlace() {
  const [loading, setLoading] = useState(true);

  const placeId = useParams().placeId;

  const [formState, inputHanlder, setFormData] = useForm(
    {
      title: {
        value: "",
        isValid: false,
      },
      description: {
        value: "",
        isValid: false,
      },
      address: {
        value: "",
        isValid: false,
      },
    },
    false
  );

  const selectedPlace = DUMMY_PLACES.find((place) => place.id === placeId);
  // setting the values after getting the values
  useEffect(() => {
    if (selectedPlace) {
      setFormData(
        {
          title: {
            value: selectedPlace.title,
            isValid: true,
          },
          description: {
            value: selectedPlace.description,
            isValid: true,
          },
          address: {
            value: selectedPlace.address,
            isValid: true,
          },
        },
        true
      );
    }

    setLoading(false);
  }, [selectedPlace, setFormData]);

  if (loading) {
    return (
     
        <div className="center">
           <Card>
          <h1>loading</h1>
          </Card>
        </div>
      
    );
  }

  if (!selectedPlace) {
    return (
     
      <div className="center">
         <Card>
        <h2>could not find the place you're looking for.</h2>
        </Card>
      </div>
    );
  }

  const handlePlaceUpdate = (e) => {
    e.preventDefault();
    console.log(formState.inputs, "updated");
  };
  console.log("update place", formState);
  return (
    <form className="place-form" onSubmit={handlePlaceUpdate}>
      <Input
        id="title"
        element="input"
        type="text"
        label="Title"
        validators={[VALIDATOR_REQUIRE]}
        errorText="Please enter a valid title."
        onInput={inputHanlder}
        value={formState.inputs.title.value}
        valid={formState.inputs.title.isValid}
      />
      <Input
        id="description"
        element="textarea"
        label="Description"
        validators={[VALIDATOR_REQUIRE(), VALIDATOR_MINLENGTH(5)]}
        errorText="Please enter a valid description (at 5 characters)."
        onInput={inputHanlder}
        value={formState.inputs.description.value}
        valid={formState.inputs.description.isValid}
      />
      <Button type="submit" disabled={!formState.isValid}>
        UPDATE PLACE
      </Button>
    </form>
  );
}

export default UpdatePlace;
