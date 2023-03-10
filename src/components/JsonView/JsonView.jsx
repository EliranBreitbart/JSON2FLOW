import React from "react";
import ReactJson from 'react-json-view'
import "./JsonView.scss";
import example_conversation_1 from './../../mock/example_conversation_1.json';
{/* //TODO
    pull json from Load
    in future when updating make sure it is saved correctly in the page
    instead of importing file, start with basic conversation. use file if loaded, and update when changed
 */}
function isJsonString(str) {
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
}
const JsonView = () =>{
    if(isJsonString(example_conversation_1)){
        console.log("Not Valid JSON file");
    }
  return (
      <div className={"JsonView"}>
          <ReactJson displayDataTypes={false} src={example_conversation_1} />
      </div>
  );
};

export default JsonView;
