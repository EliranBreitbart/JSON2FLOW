import React, {memo} from 'react';
import { Handle, Position } from 'reactflow';
import Form from 'react-bootstrap/Form';


/*TODO:
    * Show 'isCorrectAnswer' using the data of "speaker"
    *
 *  */
const onConnect = (params) => console.log('handle onConnect', params);

function CustomNode(params) {

  return (
      <>
        <Handle type="target" position={Position.Bottom} onConnect={onConnect} />
          <Form>
              <Form.Check reverse
              style={{marginInline:5}}
              type="switch"
              id={`isCorrect-switch`}
              label={"isCorrectAnswer"}/>
          </Form>
          <div className={"label"}>
              {params.data.label}
          </div>
        <Handle type="source" position={Position.Top} />
      </>
  );
}

export default memo(CustomNode);
