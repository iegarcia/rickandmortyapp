import { Col, Row } from "react-bootstrap";

const Episodes = ({ episodes }) => {
  return (
    <div>
      <Row xs={1} md={4}>
        {episodes.length === undefined ? (
          <Col>
            <li>{episodes.name}</li>
          </Col>
        ) : (
          episodes.map((e) => {
            return (
              <Col key={e.id}>
                <li>{e.name}</li>
                <br />
              </Col>
            );
          })
        )}
      </Row>
    </div>
  );
};

export default Episodes;
