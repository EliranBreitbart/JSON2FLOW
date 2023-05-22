import React, {memo, useEffect, useState} from 'react';
import { Handle, Position } from 'reactflow';
import Form from 'react-bootstrap/Form';
import {useDispatch} from "react-redux";
import {updateField, removeField} from "../../redux/nodeDataSlice";
import {Col, Row} from "react-bootstrap";

const deFocus = () =>{
    if (document.activeElement) {
        document.activeElement.blur();
    }
}
function CustomNode(props) {
    const {id} = props;
    const {sentence, speaker} = props.data;
    const [checked, setChecked] = useState(sentence["isCorrectAnswer"] || false);
    const [bot, setBot] = useState(speaker === "bot");
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(updateField(id, "isCorrectAnswer", checked));
        deFocus();
    },[checked])

    useEffect(() => {
        bot ? //remove or add back isCorrectAnswer Field depending on what type of speaker we are
            dispatch(removeField(id, "isCorrectAnswer")) :
            dispatch(updateField(id, "isCorrectAnswer", checked));

        dispatch(updateField(id, "speaker", bot ? "bot" : "speaker"));
        deFocus();
        props.data.updateClass(id, bot? "customNodeBot" : "customNodeSpeaker");
    },[bot])

    return (
      <>
        <Handle type="source" position={Position.Bottom} />
         <Form>
             <Row  style={{}}>
                 <Col><Form.Switch tabIndex="-1"
              style={{marginInlineEnd:5 ,textAlign:"left"}}
                                   type="switch"
                                   id={`isBot-switch`}
                                   label={"isBot"}
                                   defaultChecked={bot}
                                   onChange={() => setBot(!bot)}
                 /></Col>
             </Row>
          {!bot && (
              <Row  style={{}}>
                  <Col><Form.Switch tabIndex="-1"
                      style={{marginInline:5, marginTop:-12,textAlign:"left", direction:"ltr"}}
                      type="switch"
                      id={`isCorrect-switch`}
                      label={"isAnswer?"}
                      defaultChecked={checked}
                      onChange={() => setChecked(!checked)}/>
                  </Col></Row>
          )}
          </Form>
          <div className={"NodeLabel"} >
              {props.data.label}
          </div>
        <Handle type="target" position={Position.Top} />
      </>
  );
}

export default memo(CustomNode);
