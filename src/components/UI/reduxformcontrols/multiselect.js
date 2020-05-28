import React from 'react'
import Select from 'react-select';

const multiselect = (props) => {

  let option = props.option
  return (
    <div className={props.divclass}>
      <Select
        tabIndex={props.tabIndex}
        classNamePrefix="react-select"
        components={{ option }}
        isMulti={props.ismulti}
        onChange={props.onchangehandler}
        options={props.data}
        placeholder={props.placeholder}
        value={props.value} />
    </div>
  )
}
export default multiselect