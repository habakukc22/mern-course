import React from "react";
import { useParams } from "react-router-dom";

import PlaceList from "../components/PlaceList";

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
];

function UserPlaces() {
  const { userId } = useParams();

  const loadedPlaces = DUMMY_PLACES.filter((place) => place.creator === userId);

  return <PlaceList items={loadedPlaces} />;
}

export default UserPlaces;
