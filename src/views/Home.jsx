import axios from "axios";
import { useEffect, useState } from "react";
import { Col, Container, Pagination, Row } from "react-bootstrap";
import Character from "../components/Character";
import { getData } from "../functions";

const Home = () => {
  const [characters, setCharacters] = useState([]);
  const [info, setInfo] = useState([]);

  const paginate = (url) => {
    axios.get(url).then((data) => {
      setCharacters(data.data.results);
      setInfo(data.data.info);
    });
  };

  const handleNextPage = () => {
    paginate(info.next);
  };

  const handlePreviousPage = () => {
    paginate(info.prev);
  };

  useEffect(() => {
    async function run() {
      const data = await getData("character");
      setInfo(data.info);
      setCharacters(data.results);
    }
    run();
  }, []);

  return (
    <div>
      <div className="paginate">
        <Pagination className="justify-content-center">
          {info.prev ? (
            <Pagination.Item onClick={handlePreviousPage}>
              Previous
            </Pagination.Item>
          ) : null}
          {info.next ? (
            <Pagination.Item onClick={handleNextPage}>Next</Pagination.Item>
          ) : null}
        </Pagination>
      </div>

      <Container>
        <Row xs={1} md={2} lg={4} className="g-4">
          {characters.map((c) => {
            return (
              <Col key={c.id}>
                <Character id={c.id} image={c.image} name={c.name} />
              </Col>
            );
          })}
        </Row>
      </Container>
    </div>
  );
};

export default Home;
