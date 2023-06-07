import React, {useState} from "react";
import Header from "./components/header";
import EditorPage from "./pages/editor";
import { Container } from "react-bootstrap";
import { Steps, Hints } from 'intro.js-react';
import 'intro.js/introjs.css';
import './App.css'
function App() {
    const [state, setState] = useState({
        stepsEnabled: false,
        disableInteraction: false,
        initialStep: 0,
        steps: [
            {
                title:'Tour start',
                element: '.root',
                intro: 'Welcome to the Conversation Editor',
            },
            {
                title:'Navigation Bar',
                element: '.container',
                intro: 'This is the Navigation menu',
            },
            {
                title:'Navigation Bar',
                element: '.load-export',
                intro: `<ul>
                <li>Load: To upload a JSON file for a conversation</li>
                <li>Export: To Download the JSON conversation file</li>
              </ul>`,
            },
            {
                title:'Navigation Bar',
                element: '.example',
                intro: `Will load an example conversation`,
            },
            {
                title:'The Editor',
                element: '.diagram_container',
                intro: 'this is the flow window, it will display the conversation the JSON represents'
            },
            {
                title:'The Editor - Controls',
                element: '.react-flow__controls',
                intro: 'these are your controls to create and edit the flow'
            },
            {
                title:'The Editor - Controls',
                element: '.react-flow__controls',
                intro: `<ul>
                <li>+ : Zoom in</li>
                <li>- : Zoom out</li>
                <li>[] : Fit the view to the flow</li>
                <li>lock : Toggle dragging</li>
              </ul>`,
            },
            {
                title:'The Editor - Controls',
                element: '.buttons_',
                intro: `<ul>
                <li>🗑️ : Delete Chosen Node or edge</li>
                <li>[]+ : Add a new node</li>
                <li>/|\\ : Re-Order nodes in a Tree</li>
              </ul>`,
            },
            {
                title:'The Editor - Node',
                element: '.react-flow__node',
                intro: `The Nodes represent a step in the conversation
                <ul>
                <li>A red node for Bot</li>
                <li>A Green Node for User</li>
              </ul>`,
            },
            {
                title:'The Editor - Node',
                element: '.react-flow__node',
                intro: `by clicking and dragging the little dots, you can connect nodes`,
            },
            {
                title:'The Editor - Node',
                element: '.modal-container',
                intro: `When you click on a node, this window will pop up with fields to update, relating to the part of the conversation this node represents`,
            },
            {
                title:'JSON-view',
                element: '.JsonView',
                intro: `This pane shows the JSON file, it will update in real time according to the flow`,
            },
            {
                title:'JSON-view',
                element: '.button',
                intro: `click this button to open a window to edit the general information of the JSON`,
            },
            {
                title:'Thats it!',
                element: '.root',
                intro: `You've finished the Tour and ready to Edit!`,
            }
        ],
        hintsEnabled: false,
        hints: [
        ],
    });
    const updateStepsEnabled = () => {
        setState(prevState => ({
            ...prevState,
            stepsEnabled: true
        }));
    };
  return (
    <>
    <Steps
        enabled={state.stepsEnabled}
        steps={state.steps}
        initialStep={state.initialStep}
        onExit={() => {
            setState(prevState => ({
                ...prevState,
                stepsEnabled: false
            }));
        }}
    />
    <Hints
        enabled={state.hintsEnabled}
        hints={state.hints}
        />
      <Header updateStepsEnabled={updateStepsEnabled} />
      <Container className="custom-container">
        <EditorPage />
      </Container>
    </>
  );
}

export default App;
