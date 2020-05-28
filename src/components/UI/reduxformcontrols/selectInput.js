import React from 'react'
import { SingleSelect } from "react-select-material-ui";
import { Label } from 'semantic-ui-react'

const selectInput = (props) => {

  
  return (
    <div className={props.divclass}>
     <SingleSelect 
     placeholder="Select a wingster" 
     style={{ width: 300 }} 
     options={props.options} 
     onChange={props.handlewingsterchange} />
      {props.meta.touched && props.meta.error && <Label className={props.errorclass}>{props.error}</Label>}
    </div>
  )
}
export default selectInput