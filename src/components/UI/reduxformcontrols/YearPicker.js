import React from 'react'
import { Form } from 'semantic-ui-react'
import { YearPicker} from 'react-dropdown-date';
import { Label } from 'semantic-ui-react'

const YearPickerSelection  = (props) => {
  let class_name= props.className;      
  if(props.meta.touched && props.meta.error)
  {
    const feedbutton = [class_name]
    feedbutton.push(props.inputbordererrorclass)
    class_name = feedbutton.join(' ');

    
    //lablelclass = labelerrorclassname;
  }
  return (
    
    <Form.Field error={props.meta.touched && !!props.meta.error} width={props.width}>      

       <YearPicker
       tabIndex={props.tabIndex}
        {...props.input}
        defaultValue={props.defaultValue}                    
        value={props.input.value}
        reverse={true}                    
        onChange={props.input.onBlur}
        id={'year'}
        name={'year'}
        classes={class_name}            
        />

      {props.meta.touched && props.meta.error && <Label className={props.errorclass}>{props.meta.error}</Label>}
    </Form.Field>
  )
}

export default YearPickerSelection
