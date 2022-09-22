import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Col, Container, Row } from "react-bootstrap";
import { getDataById } from "../functions";
import Episodes from "../components/Episodes";

const CharacterDetails = () => {
  const location = useLocation();
  const characterId = location.pathname.slice(11);

  const [details, setDetails] = useState([]);
  const [episodes, setEpisodes] = useState([]);
  const [textColor, setTextColor] = useState("green");
  const [display, setDisplay] = useState("unset");

  useEffect(() => {
    async function run() {
      const characters = await getDataById("character", characterId);

      if (characters.status !== "Alive") {
        setTextColor("red");
      }

      if (characters.type === "") {
        setDisplay("none");
      }

      setDetails(() => [characters]);

      let episodesId = [];
      characters.episode.forEach((e) => {
        let episodeNumber = Number(e.slice(40));
        episodesId.push(episodeNumber);
      });

      const episodesData = await getDataById("episode", episodesId);
      setEpisodes(episodesData);
    }
    run();
  }, [characterId]);

  return (
    <div>
      <Container>
        <Row
          xs={1}
          md={4}
          className="justify-content-center align-items-center"
        >
          {details.map((d) => {
            return (
              <>
                <Col>
                  <img src={d.image} alt={d.name} />
                </Col>
                <Col>
                  <h2>
                    <strong>{d.name}</strong>
                  </h2>
                  <hr />
                  <h4>
                    Status:{" "}
                    <strong style={{ color: textColor }}>{d.status}</strong>
                  </h4>
                  <p>
                    {d.species} - {d.gender}
                  </p>
                  <p style={{ display: display }}>
                    Type: <strong>{d.type}</strong>
                  </p>
                  <p>
                    Born in:{" "}
                    <a
                      target="_blank"
                      href={`https://www.google.com/search?q=${d.origin.name}`}
                      rel="noreferrer"
                    >
                      {d.origin.name}
                    </a>
                  </p>
                  <p>
                    Current location:{" "}
                    <a
                      target="_blank"
                      href={`https://www.google.com/search?q=${d.location.name}`}
                      rel="noreferrer"
                    >
                      {d.location.name}
                    </a>
                  </p>
                </Col>
              </>
            );
          })}
        </Row>
        <hr />
        <h3>Current appearances</h3>
        <hr />

        <Episodes episodes={episodes} />
      </Container>
    </div>
  );
};

export default CharacterDetails;
