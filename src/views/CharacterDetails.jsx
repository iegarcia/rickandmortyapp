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
  const [display, setDisplay] = useState("list-item");
  const [height, setHeight] = useState("unset");

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

      if (episodesData.length <= 2 || episodesData.length === undefined) {
        setHeight("94vh");
      }
    }
    run();
  }, [characterId]);

  return (
    <div>
      <Container style={{ height: height }}>
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
                  <ul style={{ textAlign: "left" }}>
                    <li>
                      {d.species} - {d.gender}
                    </li>
                    <li style={{ display: display }}>
                      Type: <strong>{d.type}</strong>
                    </li>
                    <li>
                      Born in:{" "}
                      <a
                        target="_blank"
                        href={`https://www.google.com/search?q=${d.origin.name}`}
                        rel="noreferrer"
                        style={{ color: "white" }}
                      >
                        {d.origin.name}
                      </a>
                    </li>
                    <li>
                      Current location:{" "}
                      <a
                        target="_blank"
                        href={`https://www.google.com/search?q=${d.location.name}`}
                        rel="noreferrer"
                        style={{ color: "white" }}
                      >
                        {d.location.name}
                      </a>
                    </li>
                  </ul>
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
