import React from "react";
import PropTypes from "prop-types";
import { Card } from "react-bootstrap";

const Character = ({ id, image, name }) => {
  return (
    <>
      <Card style={{ width: "18rem" }}>
        <Card.Img variant="top" src={image} />
        <Card.Body>
          <Card.Title>{name}</Card.Title>
          <a href={`/character/${id}`} className="btn btn-success">
            More information
          </a>
        </Card.Body>
      </Card>
    </>
  );
};

Character.propTypes = {
  image: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};

export default Character;
