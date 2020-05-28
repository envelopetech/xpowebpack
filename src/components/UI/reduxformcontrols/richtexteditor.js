import React from 'react'
import { Form } from 'semantic-ui-react'
import RichTextEditor from 'react-rte';

const richtexteditor  = (props) => {  
  return (    
    <Form.Field error={props.meta.touched && !! props.meta.error} width={props.width}>
         <RichTextEditor
         tabIndex={props.tabIndex}
            className={props.className}
            value={props.productdescription}
            onChange={props.onChangeproductdescription}
        />
     </Form.Field>
  )
}
export default richtexteditor
