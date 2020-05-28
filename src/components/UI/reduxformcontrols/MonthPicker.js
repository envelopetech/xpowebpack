// import React from 'react'
// import { Form } from 'semantic-ui-react'
// import { MonthPicker} from 'react-dropdown-date';

//   class  MonthPickerSelection extends React.Component { 

//     state= {
//       monthvalue : this.props.input.value,
//       classname:this.props.className
//     }


//     // onChange = (result) => {      
//     //   this.setState({monthvalue: result})

//     //   if(!this.props.istomonth)
//     //   {
//     //     if(result === "" && this.props.meta.error !== undefined)
//     //     {
//     //       const feedbutton = [this.props.className]
//     //       feedbutton.push(this.props.inputbordererrorclass)
//     //       let class_name = feedbutton.join(' '); 
//     //       this.setState({classname: class_name})      
//     //     }
//     //     else{
//     //       this.setState({classname: this.props.className}) 
//     //     }
//     //   }

//    //}

//   render()
//   {

//     return (      
//       <Form.Field error={this.props.meta.error} width={this.props.width}>
//         <MonthPicker
//           {...this.props.input}
//           defaultValue={this.props.defaultValue}                    
//           value={this.state.monthvalue}
//           reverse={true}                    
//           //onChange={this.onChange}
//           id={'month'}
//           name={'month'}
//           classes={this.state.classname}            
//           />

//         {/* {props.meta.touched && props.meta.error && <Label className={props.errorclass}>{props.meta.error}</Label>} */}
//       </Form.Field>
//     )
//  }

// }

// export default MonthPickerSelection
import React from 'react'
import { Form } from 'semantic-ui-react'
import { MonthPicker } from 'react-dropdown-date';
import { Label } from 'semantic-ui-react'

const MonthPickerSelection = (props) => {
  let class_name = props.className;
  if (props.meta.touched && props.meta.error) {
    const feedbutton = [class_name]
    feedbutton.push(props.inputbordererrorclass)
    class_name = feedbutton.join(' ');
  }
  return (

    <Form.Field error={props.meta.touched && !!props.meta.error} width={props.width}>
      <MonthPicker
        tabIndex={props.tabIndex}
        {...props.input}
        defaultValue={props.defaultValue}
        value={props.input.value}
        reverse={true}
        onChange={props.input.onBlur}
        id={'month'}
        name={'month'}
        classes={class_name}
      />
      {props.meta.touched && props.meta.error && <Label className={props.errorclass}>{props.meta.error}</Label>}
    </Form.Field>
  )
}
export default MonthPickerSelection