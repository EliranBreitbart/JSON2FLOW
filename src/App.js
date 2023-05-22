import React from "react";
import Header from "./components/header";
import EditorPage from "./pages/editor";
import { Container } from "react-bootstrap";

function App() {
  return (
    <>
      <Header />
      <Container className="custom-container">
        <EditorPage />
      </Container>
    </>
  );
}

export default App;
