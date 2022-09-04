import React from "react";
import { Button, Card } from "../../shared/components";
import PlaceItem from "./PlaceItem";
import "./PlaceList.css";

function PlaceList({ items = [] }) {
  return (
    <div>
      {items.length !== 0 ? (
        <div>
          <ul className="place-list">
            {items.map((place) => (
              <PlaceItem key={place.id} place={place} />
            ))}
          </ul>
        </div>
      ) : (
        <div className="place-list center">
          <Card>
            <h2>no places found, maybe create one ?</h2>
            <Button to="/places/new">add a place</Button>
          </Card>
        </div>
      )}
    </div>
  );
}

export default PlaceList;
