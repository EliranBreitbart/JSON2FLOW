import React, {memo, useState} from 'react';
import { Handle, Position } from 'reactflow';
import Form from 'react-bootstrap/Form';
import {useDispatch} from "react-redux";
import {updateField, removeField} from "../../redux/nodeDataSlice";

const deFocus = () =>{
    if (document.activeElement) {
        document.activeElement.blur();
    }
}
function CustomNode(props) {
    const {id} = props;
    const {sentence, speaker} = props.data;
    const [checked, setChecked] = useState(sentence["isCorrectAnswer"]);
    const [bot, setBot] = useState(speaker === "bot");
    const dispatch = useDispatch();
    const onSwitch = () => {
        dispatch(updateField(id, "isCorrectAnswer", !checked));
        setChecked(!checked);
        deFocus();
    };
    const onSwitchBot = () => {
        if(!bot)
            dispatch(removeField(id, "isCorrectAnswer"));
        dispatch(updateField(id, "speaker", bot ? "speaker" : "bot" ));
        setBot(!bot);
        deFocus();
    };
    return (
      <>
        <Handle type="source" position={Position.Bottom} />
         <Form>
              <Form.Switch tabIndex="-1"
              style={{marginInline:5 ,textAlign:"left"}}
              type="switch"
              id={`isBot-switch`}
              label={"isBot"}
              defaultChecked={bot}
              onChange={onSwitchBot}/>
          {!bot && (<Form.Switch tabIndex="-1"
                  style={{marginInline:5, marginTop:-12,textAlign:"left", direction:"ltr"}}
                  type="switch"
                  id={`isCorrect-switch`}
                  label={"isAnswer?"}
                  defaultChecked={checked}
                  onChange={onSwitch}/>)}
          </Form>
          <div className={"NodeLabel"}>
              {props.data.label}
          </div>
        <Handle type="target" position={Position.Top} />
      </>
  );
}

export default memo(CustomNode);
