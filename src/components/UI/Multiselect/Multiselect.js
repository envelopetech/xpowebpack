// import React from 'react';
// import DropdownTreeSelect from 'react-dropdown-tree-select'
// import 'react-dropdown-tree-select/dist/styles.css'
// //import  './Multiselect.css';

// const Multiselect = ( props ) => {
//     return (        
//         <DropdownTreeSelect placeholderText="Search" data={props.data} onChange={props.changed} />   
        
//     );
// };
// export default Multiselect;

import React, { Component } from 'react';
import DropdownTreeSelect from 'react-dropdown-tree-select';
import 'react-dropdown-tree-select/dist/styles.css'
import isEqual from 'lodash/isEqual'
// const text = {
//   placeholder:"Select Industry"
// }
export default class Container extends Component {
  constructor(props){
    super(props)
    this.state = { data: props.data }
  }

  componentWillReceiveProps = (nextProps) => {
    if(!isEqual(nextProps.data, this.state.data)) {
      this.setState({ data: nextProps.data })
    }
  }

  shouldComponentUpdate = (nextProps) => {
    return !isEqual(nextProps.data, this.state.data)
  }

  render() {    
    const { data, ...rest } = this.props
    return (
      <DropdownTreeSelect data={this.state.data} {...rest}  texts={this.props.texts}/>
    )
  }
}


