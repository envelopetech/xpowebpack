
import React from 'react'
import { Form } from 'semantic-ui-react'

const UploadFiles = ({ input: {value: omitValue, ...inputProps }, meta: omitMeta, ...props , className,inputbordererrorclass, onchange}) => {    
    // let class_name= className;      
    // if(omitMeta.touched)
    // {
    //   const feedbutton = [className]
    //   feedbutton.push(inputbordererrorclass)
    //   class_name = feedbutton.join(' ');  
    // }
    // if(omitMeta.touched === true && !!! omitMeta.error)
    // {
    //      class_name= className;      
    // }       
  return (
          <React.Fragment>    
            <Form.Field>
              <input tabIndex={props.tabIndex} type='file' {...inputProps} onChange={onchange}  className={className}/>      
            </Form.Field>
          </React.Fragment>
  )
}
export default UploadFiles

