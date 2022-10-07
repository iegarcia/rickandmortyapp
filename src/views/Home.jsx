import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Col, Container, Form, Pagination, Row } from "react-bootstrap";
import Character from "../components/Character";

import { getData, searchByName } from "../functions";

const Home = () => {
  const [characters, setCharacters] = useState([]);
  const [info, setInfo] = useState([]);
  const [value, setValue] = useState("");

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

  const search = async () => {
    let searchResults = await searchByName(value);
    setCharacters(searchResults.results);
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
        <h3>Search</h3>
        <Form onSubmit={(e) => e.preventDefault() || search()}>
          <Form.Control
            type="text"
            placeholder="Search"
            style={{ display: "inline", width: "unset" }}
            onChange={(e) => setValue(e.target.value)}
          />
          <Button variant="primary" type="submit">
            Go!
          </Button>
        </Form>
        <hr />
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
