import {update} from "../Node/nodeSlice";
import React, {useCallback, useEffect, useState} from "react";

const InputState = (props)=>{
    const onChange = (field, value) =>{ if(props.id != undefined) props.dispatch(update(props.id,field, value))};
    const [value, setValue] = useState(props.node[[props.field]]);
    return(
        <input className={"sm-input"}
               value={value}
               onChange={e => setValue(e.target.value)}
               onBlur={e =>onChange(props.field,value)}
        />
    )
}
export default InputState;