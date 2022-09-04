import React, { useContext, useState } from "react";
import "./PlaceItem.css";
// import Card from "../../shared/components/UIElements/Card";
import { Card, Button, Modal, Map } from "../../shared/components";
import { AuthContext } from "../../shared/context/authContext";
function PlaceItem({
  key = "",
  place: {
    id,
    imageUrl: image,
    title,
    description,
    address,
    creator: creatorId,
    location: coordinates,
  } = {},
}) {
  // listening to auth
  const auth = useContext(AuthContext);
  const [showMap, setShowMap] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const openMapHandler = () => setShowMap(true);

  const closeMapHandler = () => setShowMap(false);

  const showDeleteWarningHandler = () => {
    setShowConfirmModal(true);
  };

  const cancelDeleteHandler = () => {
    setShowConfirmModal(false);
  };

  const handleDelete = () => {
    console.log("handleDelete");
    cancelDeleteHandler();
  };

  return (
    <>
      <Modal
        show={showMap}
        onCancel={closeMapHandler}
        header={address}
        contentClass="place-item__modal-content"
        footer={<Button onClick={closeMapHandler}>CLOSE</Button>}
        footerClass="place-item__modal-actions"
      >
        <div className="map-container">
          <Map center={coordinates} zoom={16} />
        </div>
      </Modal>
      {/* delete modal */}
      <Modal
        show={showConfirmModal}
        onCancel={cancelDeleteHandler}
        header="Are you sure to delete this?"
        footerClass="place-item__modal-actions"
        footer={
          <React.Fragment>
            <Button inverse onClick={cancelDeleteHandler}>
              CANCEL
            </Button>
            <Button danger onClick={handleDelete}>
              DELETE
            </Button>
          </React.Fragment>
        }
      >
        <p>you are deleting {address}.</p>
      </Modal>
      <li className="place-item">
        <Card className="place-item__content">
          <div className="place-item__image">
            <img src={image} alt={title} />
          </div>
          <div className="place-item__info">
            <h2>{title}</h2>
            <h3>{address}</h3>
            <p>{description}</p>
          </div>
          <div className="place-item__actions">
            <Button onClick={openMapHandler} inverse>
              VIEW ON MAP
            </Button>
            {auth.isLoggedIn && <Button to={`/places/${id}`}>EDIT</Button>}
            {auth.isLoggedIn && (
              <Button danger onClick={showDeleteWarningHandler}>
                DELETE
              </Button>
            )}
          </div>
        </Card>
      </li>
    </>
  );
}

export default PlaceItem;
