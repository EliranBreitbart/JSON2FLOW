import React from "react";
import Header from "./components/header";
import EditorPage from "./pages/editor";
import { Container } from "react-bootstrap";

function App() {
  //const [json, setJson] = React.useState(require("./pages/editor/template.json"));
  return (
    <>
      <Header />
      <Container>
        <EditorPage />
      </Container>
    </>
  );
}

export default App;
