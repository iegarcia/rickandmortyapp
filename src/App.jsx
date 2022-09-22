import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./views/Home";
import CharacterDetails from "./views/CharacterDetails";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { Container, Navbar } from "react-bootstrap";

function App() {
  return (
    <div className="App">
      <Navbar bg="light">
        <Container className="justify-content-center">
          <Navbar.Brand href="/">Rick and Morty App</Navbar.Brand>
        </Container>
      </Navbar>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/character/:id" element={<CharacterDetails />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
