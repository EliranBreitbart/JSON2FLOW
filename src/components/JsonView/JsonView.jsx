import React from "react";
import ReactJson from 'react-json-view'
import "./JsonView.scss";

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
