import React, {useEffect} from "react";
import ReactJson from 'react-json-view'
import "./JsonView.scss";
/* //TODO
    pull json from Load
    in future when updating make sure it is saved correctly in the page
    instead of importing file, start with basic conversation. use file if loaded, and update when changed
 */
const JsonView = props =>{
    // useEffect(()=>{
    //     setJson({id:localStorage.getItem("id", "")})
    // },[])
  return (
      <div className={"JsonView"}>
          <ReactJson name={false} displayDataTypes={false} src={props.json} />
      </div>
  );
};

export default JsonView;
