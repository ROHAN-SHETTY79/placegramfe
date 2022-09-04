import React from "react";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import PlaceList from "../../../places/components/PlaceList";
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

function UserPlaces() {
  const selectedUserId = useParams().userId;
  const selectedUserPlaces = DUMMY_PLACES.filter(
    (place) => place.creator === selectedUserId
  );
  return <PlaceList items={selectedUserPlaces} />;
}

export default UserPlaces;
