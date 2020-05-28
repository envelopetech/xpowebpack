import React from 'react'
import ReactPhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'

const phonenumber  = (props) => {    
  return (  
       
        <ReactPhoneInput country={'in'}  
        tabIndex={props.tabIndex} 
        value={props.phone} 
        onChange={props.phonenumberchange} 
        onBlur={props.onBlur} />
   
  )
}
export default phonenumber



