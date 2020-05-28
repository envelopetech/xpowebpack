import React from 'react'
import { Form, Label } from 'semantic-ui-react'
import Toggle from 'react-toggle';
import "react-toggle/style.css";


const ToggleCheckbox = (props) => {
  return (
    <Form.Field error={props.meta.touched && !!props.meta.error} width={props.width}>
      <Toggle
        //defaultChecked={props.defaultChecked}
        tabIndex={props.input.tabIndex}
        onChange={props.input.onChange}
        checked={props.input.value} />

      {props.meta.touched && props.meta.error && <Label basic color='red'>{props.meta.error}</Label>}
    </Form.Field>
  )
}
export default ToggleCheckbox
